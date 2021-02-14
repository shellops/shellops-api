import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as chalk from 'chalk';
import { exec } from 'child_process';
import { ensureDir, writeFile, writeJson } from 'fs-extra';
import * as getPort from 'get-port';
import { join } from 'path';
import { AppService } from '../app/app.service';
import { Config } from '../config';

import { LoggerService } from '../database/logger.service';
import { SysinfoService } from '../sysinfo/sysinfo.service';


@Injectable()
export class ShellService implements OnModuleInit {

    constructor(
        public readonly loggerService: LoggerService,
        public readonly appService: AppService,
        public readonly sysInfoService: SysinfoService) {

    }


    async onModuleInit() {

        if (Config.mode !== 'AGENT') return;


        const docker = await this.dockerIsInstalled();

        if (!docker.isInstalled) {
            this.loggerService.verbose(chalk.cyanBright`\n\n Installing Docker ...\n\n`);
            await this.installDocker();
        }

        if (!await this.traefikIsInstalled()) {

            if (await getPort({ port: 80 }) !== 80) {
                this.loggerService.error('Please run as root user or use sudo, otherwise freeup port 80, Shellops Agent needs it to bind domains and create SSL certificates.')
                process.exit();
            }

            this.loggerService.verbose(chalk.cyanBright`\n\nInstalling Traefik on Docker ...\n\n`);
            await this.installTraefik();
        }

        await this.installClient();

        this.loggerService.log(chalk.greenBright.bgBlack`\n\nShellops agent is installed on Docker and ready to use with above credentials. Copy and URL to panel.shellops.io \n\n`)

        process.exit();

    }

    async traefikIsInstalled() {
        try {
            await this.runCommand('docker inspect traefik');
            return true;
        } catch (error) {
            return false;
        }
    }

    async dockerIsInstalled(): Promise<{ isInstalled: boolean, version: string }> {
        const result = await this.runCommand('docker -v');
        return { isInstalled: result?.includes('version'), version: result }
    }


    async updateApt(): Promise<void> {
        await this.runCommand('sudo apt update');
    }


    async installDnsProxy(): Promise<void> {

        await this.runCommand(['sudo apt install resolvconf',
            'sudo systemctl status resolvconf.service',
            'sudo systemctl start resolvconf.service',
            'sudo systemctl enable resolvconf.service',
            'sudo systemctl status resolvconf.service',
            'sudo rm /etc/resolvconf/resolv.conf.d/head',
            'sudo echo "nameserver 178.22.122.100" >> /etc/resolvconf/resolv.conf.d/head',
            'sudo echo "nameserver 185.51.200.2" >> /etc/resolvconf/resolv.conf.d/head',
            'sudo systemctl stop resolvconf.service',
            'sudo systemctl start resolvconf.service',].join(' ; '));

    }


    async installDockerAptKey(): Promise<void> {
        try {


            await this.runCommand('curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -');

        } catch (e) {
            await this.installDnsProxy();
            await this.installDockerAptKey();
        }
    }


    async uninstallDocker(): Promise<void> {

        await this.runCommand('sudo apt remove docker-ce containerd.io -y');
        await this.runCommand('sudo apt remove docker-ce-cli -y');

    }

    async installDocker(): Promise<any> {

        await this.runCommand('sudo apt-get install -y ' +
            [
                'apt-transport-https',
                'ca-certificates',
                'curl',
                'gnupg-agent',
                'software-properties-common'
            ].join(' '));


        await this.installDockerAptKey();

        await this.runCommand(
            [
                'sudo add-apt-repository ',
                '"deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"',
            ].join(' '));

        await this.updateApt();


        const installDockerResult = await this.runCommand('sudo apt-get install -y docker-ce docker-ce-cli containerd.io');



        return installDockerResult;
    }


    async installTraefik(): Promise<void> {

        const ipSubdomain = await this.sysInfoService.ipSubdomain();

        await ensureDir('/home/traefik');

        await writeFile('/home/traefik/traefik.toml',
            [
                `[entryPoints]`,
                `[entryPoints.http]`,
                `address = ":80"`,
                `[entryPoints.https]`,
                `address = ":443"`,
                `[entryPoints.https.tls]`,
                `[docker]`,
                `endpoint = "unix:///var/run/docker.sock"`,
                `domain = "${ipSubdomain}"`,
                `watch = true`,
                `exposedbydefault = false`,
                `[acme]`,
                `email = "acme@${ipSubdomain}"`,
                `storage = "acme.json"`,
                `entryPoint = "https"`,
                `onHostRule = true`,
                `[acme.httpChallenge]`,
                `entryPoint = "http"`,
            ].join('\n'));

        await writeJson('/home/traefik/acme.json', {});
        await this.runCommand('chmod 600 /home/traefik/acme.json');

        await this.runCommand(
            [
                'docker run -d --name traefik --restart always',
                '-p 80:80',
                '-p 443:443',
                '-v /home/traefik/acme.json:/acme.json',
                '-v /home/traefik/tmp:/tmp',
                '-v /home/traefik/traefik.toml:/traefik.toml',
                '-v /home/traefik/ssl:/home/ssl',
                '-v /var/run/docker.sock:/var/run/docker.sock',
                '-l traefik.backend=traefik',
                '-l traefik.docker.network=bridge',
                '-l traefik.enable=true',
                '-l traefik.frontend.entryPoints=http,https',
                '-l traefik.frontend.rule=Host:traefik.' + ipSubdomain,
                '-l traefik.port=8080',
                'traefik:v1.7.16'
            ].join(' '));
    }

    async installClient() {


        const ipSubdomain = await this.sysInfoService.ipSubdomain();

        try {
            await this.runCommand('sudo docker container rm shellops-agent --force');
        } catch (error) { }

        await this.runCommand(
            [
                'docker run -d --name shellops-agent --restart always',
                `-w /code`,
                `-v ${join(__dirname, '../../')}:/code`,
                '-l traefik.backend=shellops-agent',
                '-l traefik.docker.network=bridge',
                '-l traefik.enable=true',
                '-l traefik.frontend.entryPoints=http,https',
                '-l traefik.frontend.rule=Host:' + ipSubdomain,
                '-l traefik.port=3000',
                'node:alpine',
                'node dist/main.js'
            ].join(' '));
    }

    async runCommand(command: string): Promise<string> {

        const result = await new Promise<string>((resolve, reject) => {
            exec(command, (err, stdOut, stdErr) => {

                if (err) return reject(err);
                if (stdErr) return reject(stdErr.toString());
                return resolve(stdOut.toString().trim());
            });

        });

        return result;
    }


}

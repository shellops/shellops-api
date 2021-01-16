import { Injectable } from '@nestjs/common';
import { NodeSSH as ssh } from 'node-ssh';
import { ShellCommandResultDto } from './shell-command-result.dto';
import { ShellConnectDto } from './shell-connect.dto';

@Injectable()
export class ShellService {

    async createAndConnectClient({ username, password, host, port } : ShellConnectDto) {

        const client = new ssh();

        await client.connect({
            host,
            port,
            username,
            password,
        });

        return client;

    }

    async nodeIsInstalled(client: ssh): Promise<{ isInstalled: boolean, version: string }> {
        const result = await this.runCommand('node -v', client);

        return { isInstalled: result.outputs[0]?.startsWith('v') || false, version: result.outputs[0]?.slice(1) }
    }

    async npmIsInstalled(client: ssh): Promise<{ isInstalled: boolean, version: string }> {
        const result = await this.runCommand('npm -v', client);
        return { isInstalled: result.outputs[0]?.startsWith('v') || false, version: result.outputs[0]?.slice(1) }
    }

    async nIsInstalled(client: ssh): Promise<{ isInstalled: boolean, version: string }> {
        const result = await this.runCommand('n -V', client);
        return { isInstalled: result.outputs[0]?.split('.')?.length === 3 || false, version: result.outputs[0] }
    }


    async updateApt(client: ssh): Promise<ShellCommandResultDto> {
        const result = await this.runCommand('sudo apt update', client);
        if (result.code)
            throw new Error(JSON.stringify(result, null, 2));

        return result;
    }


    async installNode(client: ssh): Promise<void> {

        if ((await this.nodeIsInstalled(client)).isInstalled) return;



        const result = await this.runCommand('sudo apt install nodejs -y', client);

        if (result.code)
            throw new Error(JSON.stringify(result, null, 2));

    }

    async installNpm(client: ssh): Promise<void> {

        if ((await this.npmIsInstalled(client)).isInstalled) return;



        const result = await this.runCommand('sudo apt install npm -y', client);

        if (result.code)
            throw new Error(JSON.stringify(result, null, 2));

    }


    async installDnsProxy(client: ssh): Promise<void> {

        const result = await this.runCommand(['sudo apt install resolvconf',
            'sudo systemctl status resolvconf.service',
            'sudo systemctl start resolvconf.service',
            'sudo systemctl enable resolvconf.service',
            'sudo systemctl status resolvconf.service',
            'sudo rm /etc/resolvconf/resolv.conf.d/head',
            'sudo echo "nameserver 178.22.122.100" >> /etc/resolvconf/resolv.conf.d/head',
            'sudo echo "nameserver 185.51.200.2" >> /etc/resolvconf/resolv.conf.d/head',
            'sudo systemctl stop resolvconf.service',
            'sudo systemctl start resolvconf.service',].join(' ; '), client);

        if (result.code)
            throw new Error(JSON.stringify(result, null, 2));


    }
    async installDockerAptKey(client: ssh): Promise<void> {
        const aptKeyInstallResult = await this.runCommand('curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -', client);
        if (aptKeyInstallResult.code)
            if (aptKeyInstallResult.errors.find(p => p.includes('403'))) {
                await this.installDnsProxy(client);
                await this.installDockerAptKey(client);
                return;
            } else
                throw new Error(JSON.stringify(aptKeyInstallResult, null, 2));
    }



    async installDocker(client: ssh): Promise<void> {

        const depInstallResult = await this.runCommand('sudo apt-get install -y ' +
            ['apt-transport-https',
                'ca-certificates',
                'curl',
                'gnupg-agent',
                'software-properties-common'].join(' '), client);

        if (depInstallResult.code)
            throw new Error(JSON.stringify(depInstallResult, null, 2));

        await this.installDockerAptKey(client);

        const addRepoResult = await this.runCommand(
            [
                'sudo add-apt-repository ',
                '"deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"',
            ].join(' '), client);

        if (addRepoResult.code)
            throw new Error(JSON.stringify(addRepoResult, null, 2));

        await this.updateApt(client);


        const installDockerResult = await this.runCommand('sudo apt-get install -y docker-ce docker-ce-cli containerd.io', client);


        if (installDockerResult.code)
            throw new Error(JSON.stringify(installDockerResult, null, 2));


    }

    async installN(client: ssh): Promise<void> {

        await this.installNode(client);

        await this.installNpm(client);

        if ((await this.nIsInstalled(client)).isInstalled) return;

        const installResult = await this.runCommand('sudo npm i -g n', client);

        if (installResult.code)
            throw new Error(JSON.stringify(installResult, null, 2));


        await this.runCommand('PATH="$PATH"', client);



    }

    async latestNodeLtsAvailable(client: ssh): Promise<ShellCommandResultDto> {


        const result = await this.runCommand('n --lts', client);


        if (result.code)
            throw new Error(JSON.stringify(result, null, 2));

        return result;

    }

    async installNodeLTS(client: ssh): Promise<void> {

        await this.installN(client);

        const { outputs: [latestNodeVersion] } = await this.latestNodeLtsAvailable(client);
        const { version: currentNodeVersion } = await this.nodeIsInstalled(client);


        if (latestNodeVersion === currentNodeVersion) return;

        const result = await this.runCommand('n lts', client);

        if (result.code)
            throw new Error(JSON.stringify(result, null, 2));

    }



    async runCommand(command: string, client: ssh): Promise<ShellCommandResultDto> {

        console.log('running ', command);

        const result = await client.execCommand(command, {
            onStderr: (chunk) => {
                console.log(command + ' stderr ', chunk.toString());
            },
            onStdout: (chunk) => {
                console.log(command + ' stdout ', chunk.toString());
            }
        });

        return {
            code: result.code,
            signal: result.signal,
            errors: result.stderr?.split('\n'),
            outputs: result.stdout?.split('\n')
        };

    }


}

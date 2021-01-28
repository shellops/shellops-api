import { Injectable } from '@nestjs/common';
import * as fbAdmin from 'firebase-admin';
import { readJsonSync, writeJson } from 'fs-extra';
import * as _ from 'lodash';
import { homedir } from 'os';
import { join } from 'path';

@Injectable()
export class DatabaseService {

    firebase: fbAdmin.app.App;
    jsonPath = join(homedir(), '.shellops.json');
    json: any = readJsonSync(this.jsonPath);

    constructor() { }

    async get<T>(path: string): Promise<T> {
        if (this.firebase)
            return (await this.firebase.database().ref(path).get()).toJSON() as T;
        else
            _.get(this.json, path);
    }

    async update(path: string, update: any): Promise<void> {
        if (this.firebase)
            await this.firebase.database().ref(path).update(update);
        else {
            _.set(this.json, path, _.extend(this.get(path), update));

            await writeJson(this.jsonPath, this.json, { spaces: 2 });
        }


    }
}

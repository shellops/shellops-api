import { Injectable } from '@nestjs/common';
import * as fbAdmin from 'firebase-admin';
import * as _ from 'lodash'
@Injectable()
export class DatabaseService {

    firebase: fbAdmin.app.App;
    temporary: any = {};

    constructor() { }

    async get(path: string) {
        if (this.firebase)
            return (await this.firebase.database().ref(path).get()).toJSON();
        else
            _.get(this.temporary, path);
    }

    async update(path: string, update: any) {
        if (this.firebase)
            await this.firebase.database().ref(path).update(update);
        else
            _.set(this.temporary, path, _.extend(this.get(path), update));
    }
}

import * as fbAdmin from 'firebase-admin';
import { existsSync, readJsonSync, writeJsonSync } from 'fs-extra';
import * as _ from 'lodash';
import { homedir } from 'os';
import { join } from 'path';

export class DatabaseService {
  private firebase: fbAdmin.app.App;
  private jsonPath: string = join(homedir(), '.shellops.json');
  private json: any = existsSync(this.jsonPath)
    ? readJsonSync(this.jsonPath)
    : {};

  async get<T>(path: string): Promise<T> {
    path = path.replace(/\//g, '.');

    if (this.firebase)
      return (await this.firebase.database().ref(path).get()).toJSON() as T;
    else return _.get(this.json, path);
  }

  async update(path: string, update: any): Promise<void> {
    path = path.replace(/\//g, '.');
    if (this.firebase) await this.firebase.database().ref(path).update(update);
    else {
      _.set(this.json, path, _.extend(this.get(path), update));

      writeJsonSync(this.jsonPath, this.json, { spaces: 2 });
    }
  }

  async remove(path: string): Promise<void> {
    path = path.replace(/\//g, '.');
    if (this.firebase) await this.firebase.database().ref(path).remove();
    else {
      _.unset(this.json, path);

      writeJsonSync(this.jsonPath, this.json, { spaces: 2 });
    }
  }
}

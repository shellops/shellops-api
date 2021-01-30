import * as fbAdmin from 'firebase-admin';
import { readJsonSync, writeJson } from 'fs-extra';
import * as _ from 'lodash';
import { homedir } from 'os';
import { join } from 'path';
import { Database } from './database/db.class';

export class DatabaseService implements Database {
  _firebase: fbAdmin.app.App;
  _jsonPath: string;
  _json: any;

  constructor() {
    this.jsonPath = join(homedir(), '.shellops.json');
    this.json = readJsonSync(this._jsonPath);
  }

  connect(): Promise<void> {
    return null;
  }

  // Getters and setters methods for properties.
  // This will helps us in future changes || new features.
  get firebase(): fbAdmin.app.App {
    return this._firebase;
  }

  set firebase(newValue: fbAdmin.app.App) {
    this._firebase = newValue;
  }

  get jsonPath(): string {
    return this._jsonPath;
  }

  set jsonPath(newValue: string) {
    this._jsonPath = newValue;
  }

  get json() {
    return this._json;
  }

  set json(newValue: any) {
    this._json = newValue;
  }

  async get<T>(path: string): Promise<T> {
    if (this.firebase)
      return (await this.firebase.database().ref(path).get()).toJSON() as T;
    else _.get(this.json, path);
  }

  async update(path: string, update: any): Promise<void> {
    if (this.firebase) await this.firebase.database().ref(path).update(update);
    else {
      _.set(this.json, path, _.extend(this.get(path), update));

      await writeJson(this.jsonPath, this.json, { spaces: 2 });
    }
  }
}

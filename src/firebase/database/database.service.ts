import { Injectable } from '@nestjs/common';
import * as fbAdmin from 'firebase-admin';

@Injectable()
export class DatabaseService {
  firebase = fbAdmin.initializeApp({});

  constructor() {}

  async get(path: string) {
    return (await this.firebase.database().ref(path).get()).toJSON();
  }

  async update(path: string, update: any) {
    await this.firebase.database().ref(path).update(update);
  }
}

import { v4 } from 'uuid';
import { AppTemplate } from '../store/app-template.dto';
import * as mustache from 'mustache';
import * as _ from 'lodash';
import { randomBytes } from 'crypto';
export class MachineApp extends AppTemplate {
  constructor(public id: string, template: Partial<AppTemplate>) {
    super();

    const rendered = mustache.render(JSON.stringify(template), {
      RANDOM_PORT: () => _.random(10000, 60000, false),
      RANDOM_PASSWORD: () => randomBytes(24).toString('hex'),
      RANDOM_USERNAME: () => randomBytes(6).toString('hex'),
    });

    Object.assign(this, JSON.parse(rendered));

    this.container = `${this.name.toLowerCase().replace(/\s/g, '-')}_${
      id || v4()
    }`;
  }

  container: string;

  domains?: string[];

  restarts: number;

  healthy: boolean;

  ready: boolean;

  links: { host: string; container: string }[];
}

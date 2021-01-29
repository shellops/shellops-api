import { AppTemplate } from '../store/app-template.dto';

export class MachineApp extends AppTemplate {

  constructor(public id: string, template: Partial<AppTemplate>) {
    super();
    Object.assign(this, template);
  }

  domains?: string[];

  restarts: number;

  healthy: boolean;

  ready: boolean;

  links: { host: string, container: string }[]

}

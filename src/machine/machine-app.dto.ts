import { AppTemplate } from '../store/app-template.dto';

export class MachineApp extends AppTemplate {

  constructor(public id: string, template: AppTemplate) {
    super();
    Object.assign(this, template);
  }

  restarts: number;

  healthy: boolean;

  ready: boolean;

}

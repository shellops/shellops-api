import { AppTemplate } from "../store/app-template.interface";

export interface MachineApp extends AppTemplate {

    id: string;

    restarts: number;

    healthy: boolean;

    ready: boolean;

    connected: boolean;

}
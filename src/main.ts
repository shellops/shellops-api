import { bootstrap } from "./bootstrap";
import { Config } from "./config";

if (Config.mode === 'AGENT')
    require('./agent');

if (Config.mode === 'PANEL')
    require('./panel')

if (Config.mode === 'API')
    bootstrap();

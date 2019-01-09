import * as express from 'express';
import Server from './core/classes/Server';

import { port } from './config.json';

const app = express();
const instance = new Server({ app, port });

instance.start();
import * as express from 'express';
import Server from './core/classes/Server';

import { port, db } from './config.json';

const app = express();
const instance = new Server({ app, port, db });

instance.start();
instance.loadRoutes();
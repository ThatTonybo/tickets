import Options from '../interfaces/Options';

import { static as Static } from 'express';

import * as Session from 'express-session';
import * as randomstring from 'random-string';

import * as helmet from 'helmet';
import * as compression from 'compression';
import { json, urlencoded } from 'body-parser';

/* routes */
import IndexRouter from '../../routes/index';

export default class Server {
    app: any;
    readonly port: number;
    _ready: boolean;
    
    constructor(options: Options) {
        this.app = options.app;
        this.port = options.port || 80;

        this._ready = false;

        this.app
            .set('view engine', 'ejs')
            .use(Static('assets'))
            .use(helmet())
            .use(compression())
            .use(json())
            .use(urlencoded({ extended: true }));

        this.app.use(Session({
            secret: randomstring({ length: 12 }),
            resave: false,
            saveUninitialized: true,
            cookie: {
                secure: false,
                maxAge: 1000 * 60
            }
        }));
    }

    start() {
        this.app.listen(this.port, () => {
            console.log(`App started on port ${this.port}`);
            this._ready = true;
        });
    }

    loadRoutes() {
        this.app.use(async (req, res, next) => {
            res.locals.user = req.session.user || null;
            res.locals.website = { name: 'Tickets' };

            next();
        });

        this.app.use('/', IndexRouter);

        this.app.use(async (req, res) => {
            return res.status(404).send('<h1>404 Not Found</h1><br /><p>The requested page could not be found.</p>');
        });
    }
}
import StopsRouter from './routes/stops';
import BusAPI from './services/busAPI';
import * as express from 'express';
import * as path from 'path';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as compression from 'compression';
import * as boolParser from 'express-query-boolean';
import * as helmet from 'helmet';

class App {
    public express: express.Application;
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
        this.errorHandler();

        // BusAPI.load();
    }

    private middleware(): void {
        this.express.use(helmet());
        this.express.use(cors());
        this.express.use(compression());
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(boolParser());
        this.express.use(bodyParser.urlencoded({extended: false}));
    }

    private routes(): void {
        // Normal user routes
        this.express.use('/api/stops', StopsRouter);
    }

    private errorHandler() {
        this.express.use(function (err: Error, req, res, next) {
            console.log(err.stack);
            res.status(500).end('Unexpected error');
        });
    }
}

export default new App().express;
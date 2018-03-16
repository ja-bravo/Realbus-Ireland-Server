"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stops_1 = require("./routes/stops");
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const compression = require("compression");
const boolParser = require("express-query-boolean");
const helmet = require("helmet");
class App {
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
        this.errorHandler();
        //BusAPI.load();
    }
    middleware() {
        this.express.use(helmet());
        this.express.use(cors());
        this.express.use(compression());
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(boolParser());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }
    routes() {
        // Normal user routes
        this.express.use('/api/stops', stops_1.default);
    }
    errorHandler() {
        this.express.use(function (err, req, res, next) {
            console.log(err.stack);
            res.status(500).end('Unexpected error');
        });
    }
}
exports.default = new App().express;

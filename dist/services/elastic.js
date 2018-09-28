"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const elasticsearch_1 = require("elasticsearch");
const opts = {
    host: 'elastic:9200',
    password: process.env.ELASTIC_PASSWORD,
    log: ['error', 'warning']
};
const client = new elasticsearch_1.Client(opts);
exports.default = client;

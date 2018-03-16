"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const client = axios_1.default.create({
    baseURL: 'https://data.dublinked.ie/cgi-bin/rtpi',
});
exports.default = client;

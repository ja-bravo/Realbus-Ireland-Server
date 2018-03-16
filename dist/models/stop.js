"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Stop {
    constructor(data) {
        this.id = data.stopid;
        this.fullName = data.fullname;
        this.shortName = data.shortname;
        this.location = {
            lat: data.latitude,
            lon: data.longitude
        };
        this.operator = data.operators[0].name;
        this.routes = data.operators[0].routes;
    }
}
exports.Stop = Stop;

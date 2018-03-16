"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const stop_1 = require("./../models/stop");
const route_1 = require("./../models/route");
const operator_1 = require("./../models/operator");
const http_1 = require("./http");
const elastic_1 = require("./elastic");
class BusAPI {
    constructor() {
        this.TRY_DELAY = 3000;
    }
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('--------PINGING ELASTIC SEARCH---------');
                yield elastic_1.default.ping({});
                yield elastic_1.default.indices.delete({ index: '*' });
                yield this.createIndex();
                const ops = yield this.getOperators();
                ops.forEach(op => {
                    elastic_1.default.create({
                        index: 'operators',
                        type: 'operator',
                        id: op.reference,
                        body: op
                    }, (err, res) => {
                        if (!err) {
                            console.log(`Created OP: ${op.reference}`);
                        }
                    });
                });
                const routes = yield this.getRoutes();
                routes.forEach(route => {
                    elastic_1.default.create({
                        index: 'routes',
                        type: 'route',
                        id: route.name,
                        body: route
                    }, (err, res) => {
                        if (!err) {
                            console.log(`Created Route: ${route.name}`);
                        }
                    });
                });
                const stops = yield this.getBusStops();
                stops.forEach(stop => {
                    elastic_1.default.create({
                        index: 'stops',
                        type: 'stop',
                        id: stop.id.toString(),
                        body: stop
                    }, (err, res) => {
                        if (!err) {
                            console.log(`Created Stop: ${stop.fullName}`);
                        }
                    });
                });
            }
            catch (e) {
                console.dir(e);
                console.log('--------PINGING FAILED--------');
                setTimeout(() => {
                    this.load();
                }, this.TRY_DELAY);
            }
        });
    }
    createIndex() {
        return __awaiter(this, void 0, void 0, function* () {
            yield elastic_1.default.indices.create({ index: 'stops' });
            yield elastic_1.default.indices.putMapping({
                index: 'stops',
                type: 'stop',
                body: {
                    properties: {
                        'location': {
                            'type': 'geo_point'
                        },
                    }
                }
            });
        });
    }
    getOperators() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('GETTING OPERATORS');
            const operators = yield http_1.default.get('/operatorinformation');
            return operators.data.results.map(op => new operator_1.Operator(op));
        });
    }
    getRoutes() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('GETTING ROUTES');
            const routes = yield http_1.default.get('/routelistinformation');
            return routes.data.results.map(route => new route_1.Route(route.route, route.operator));
        });
    }
    getBusStops() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('GETTING STOPS');
            const stops = yield http_1.default.get('/busstopinformation');
            return stops.data.results.map(stop => new stop_1.Stop(stop));
        });
    }
}
const api = new BusAPI();
exports.default = api;

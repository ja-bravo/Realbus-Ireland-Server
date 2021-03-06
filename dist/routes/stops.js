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
const express_1 = require("express");
const stops_1 = require("../backends/stops");
class StopsRouter {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    getStops(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            stops_1.default.getStops()
                .then(data => res.json(data))
                .catch(next);
        });
    }
    byDistance(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            stops_1.default.getByDistance(Object.assign({}, req.query))
                .then(data => res.json(data))
                .catch(next);
        });
    }
    byKeyword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const location = { lat: req.query.lat, lon: req.query.lon };
            stops_1.default.getByKeyword(req.query.keyword, location)
                .then(data => res.json(data))
                .catch(next);
        });
    }
    byBounds(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const topRight = { lat: req.query.topLat, lon: req.query.topLon };
            const bottomLeft = { lat: req.query.botLat, lon: req.query.botLon };
            stops_1.default.getByBounds({ topRight, bottomLeft })
                .then(data => res.json(data))
                .catch(next);
        });
    }
    init() {
        this.router.get('/', this.getStops);
        this.router.get('/bounds', this.byBounds);
        this.router.get('/distance', this.byDistance);
        this.router.get('/keyword', this.byKeyword);
    }
}
exports.StopsRouter = StopsRouter;
const stopsRouter = new StopsRouter();
stopsRouter.init();
exports.default = stopsRouter.router;

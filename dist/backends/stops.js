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
const elastic_1 = require("../services/elastic");
class StopsBackend {
    getStops() {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield elastic_1.default.search({
                index: 'stops',
                type: 'stop',
                size: 10000
            });
            return response.hits.hits;
        });
    }
    getByDistance(opts) {
        return __awaiter(this, void 0, void 0, function* () {
            const { lat, lon, distance } = opts;
            let response = yield elastic_1.default.search({
                index: 'stops',
                type: 'stop',
                size: 10000,
                body: {
                    query: {
                        bool: {
                            must: { match_all: {} },
                            filter: {
                                geo_distance: {
                                    distance: distance,
                                    location: { lat, lon }
                                }
                            }
                        }
                    }
                }
            });
            return response.hits.hits;
        });
    }
    getByBounds(opts) {
        return __awaiter(this, void 0, void 0, function* () {
            const { topLeft, bottomRight } = opts;
            let response = yield elastic_1.default.search({
                index: 'stops',
                type: 'stop',
                size: 10000,
                body: {
                    query: {
                        bool: {
                            must: { match_all: {} },
                            filter: {
                                geo_bounding_box: {
                                    location: {
                                        top_left: topLeft,
                                        bottom_right: bottomRight,
                                    }
                                }
                            }
                        }
                    }
                }
            });
            return response.hits.hits;
        });
    }
}
const backend = new StopsBackend();
exports.default = backend;

import elastic from '../services/elastic';

class StopsBackend {

    async getStops() {
        let response = await elastic.search({
            index: 'stops',
            type: 'stop',
            size: 10000
        });

        return response.hits.hits;

    }

    async getByKeyword(keyword: string, location: {lat, lon}) {
        let response = await elastic.search({
            index: 'stops',
            type: 'stop',
            size: 10,
            body: {
                query: {
                    match: {
                        fullName: keyword
                    }
                },
                sort: {
                    _geo_distance: {
                        location: location,
                        order: "asc",
                        unit: "km"
                    }
                }
            }
        });

        return response.hits.hits;
    }

    async getByDistance(opts: { lat, lon, distance }) {
        const { lat, lon, distance } = opts;
        let response = await elastic.search({
            index: 'stops',
            type: 'stop',
            size: 200,
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
                },
                sort: {
                    _geo_distance: {
                        location: { lat, lon },
                        order: "asc",
                        unit: "km"
                    }
                }
            }
        });

        return response.hits.hits;
    }

    async getByBounds(opts: { topRight: { lat, lon }, bottomLeft: { lat, lon } }) {
        const { topRight, bottomLeft } = opts;

        let response = await elastic.search({
            index: 'stops',
            type: 'stop',
            size: 2000,
            body: {
                query: {
                    bool: {
                        must: { match_all: {} },
                        filter: {
                            geo_bounding_box: {
                                location: {
                                    top_right: topRight,
                                    bottom_left: bottomLeft,
                                }
                            }
                        }
                    }
                }
            }
        });

        return response.hits.hits.map(stop => stop._source);
    }
}

const backend = new StopsBackend();
export default backend;
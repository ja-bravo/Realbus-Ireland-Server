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

    async getByDistance(opts: { lat, lon, distance }) {
        const { lat, lon, distance } = opts;
        let response = await elastic.search({
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
    }

    async getByBounds(opts: { topLeft: { lat, lon }, bottomRight: { lat, lon } }) {
        const { topLeft, bottomRight } = opts;
        let response = await elastic.search({
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
    }
}

const backend = new StopsBackend();
export default backend;
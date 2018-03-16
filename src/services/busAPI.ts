import { Stop } from './../models/stop';
import { Route } from './../models/route';
import { Operator } from './../models/operator';
import http from './http';
import elastic from './elastic';

class BusAPI {
    TRY_DELAY = 3000;

    async load() {
        try {
            console.log('--------PINGING ELASTIC SEARCH---------')
            await elastic.ping({});
            await elastic.indices.delete({ index: '*' });

            await this.createIndex();

            const ops = await this.getOperators();
            ops.forEach(op => {
                elastic.create({
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

            const routes = await this.getRoutes();
            routes.forEach(route => {
                elastic.create({
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

            const stops = await this.getBusStops();
            stops.forEach(stop => {
                elastic.create({
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
            console.log('--------PINGING FAILED--------')
            setTimeout(() => {
                this.load();
            }, this.TRY_DELAY);
        }
    }

    private async createIndex() {
        await elastic.indices.create({ index: 'stops' });
        await elastic.indices.putMapping({
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
    }

    private async getOperators(): Promise<Operator[]> {
        console.log('GETTING OPERATORS');
        const operators = await http.get('/operatorinformation');
        return operators.data.results.map(op => new Operator(op));
    }

    private async getRoutes(): Promise<Route[]> {
        console.log('GETTING ROUTES');
        const routes = await http.get('/routelistinformation');
        return routes.data.results.map(route => new Route(route.route, route.operator));
    }

    private async getBusStops(): Promise<Stop[]> {
        console.log('GETTING STOPS')
        const stops = await http.get('/busstopinformation');
        return stops.data.results.map(stop => new Stop(stop));
    }
}

const api = new BusAPI();
export default api;

const http = require('./http');
const elastic = require('./elastic');

class BusAPI {
    constructor() {
        this.operators = [];
        this.routes = [];
        this.stops = [];
    }

    async load() {
        this.operators = await this.getOperators();
        this.operators.forEach(op => {
            // elastic.create({
            //     index: 'operators',
            //     type: 'operator',
            //     id: op.operatorreference,
            //     body: op
            // }, (er, res) => {
            //     console.dir(res);
            // });
        });
        this.routes = await this.getRoutes();
        this.stops = await this.getBusStops();

        // this.operators.forEach((operator) => {
        //     operator.routes = this.routes.filter(route => route.operator === operator.operatorreference);
        // });

        return this.operators;
    }

    async getOperators() {
        const operators = await http.get('/operatorinformation');
        return operators.data.results;
    }

    async getRoutes() {
        const routes = await http.get('/routelistinformation');
        return routes.data.results;
    }

    async getBusStops() {
        const stops = await http.get('/busstopinformation');
        return stops.data.results;
    }
}

const api = new BusAPI();
module.exports = api;

import http from './http';

class BusAPI {
  constructor() {
    this.operators = [];
    this.routes = [];
    this.stops = [];
  }

  async load() {
    this.operators = await this.getOperators();
    this.routes = await this.getRoutes();

    this.stops = await this.getBusStops();
    return this.stops;
    this.operators.forEach(operator => {
        operator.routes = this.routes.filter(route => route.operator === operator.operatorreference);
    });
    
    return this.operators;
  }

  async getOperators() {
    let operators = await http.get(`/operatorinformation`);
    return operators.data.results;
  }

  async getRoutes() {
    let routes = await http.get('/routelistinformation');
    return routes.data.results;
  }

  async getBusStops() {
    let stops = await http.get(`/busstopinformation`);
    return stops.data.results;
  }
}

const api = new BusAPI();
export default api;

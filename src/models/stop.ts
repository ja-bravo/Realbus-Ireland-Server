export class Stop {
    id: number;
    fullName: string;
    shortName: string;
    location: {lat, lon};
    operator: string;
    routes: string[];

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
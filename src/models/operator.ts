import { Route } from "./route";

export class Operator {
    reference: string;
    name: string;
    routes: Route[];
    
    constructor(data) {
        this.reference = data.operatorreference;
        this.name = data.operatorname;
    }
}
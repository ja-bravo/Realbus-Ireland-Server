import { Stop } from "./stop";

export class Route {
    name: string;
    operator: string;
    stops: Stop[];
    
    constructor(name: string,operator: string) {
        this.name = name;
        this.operator = operator;
    }
}
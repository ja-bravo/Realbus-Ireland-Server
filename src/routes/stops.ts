import { Router, Request, Response, NextFunction } from 'express';
import backend from '../backends/stops';

export class StopsRouter {
    router: Router

    constructor() {
        this.router = Router();
        this.init();
    }

    public async getStops(req: Request, res: Response, next: NextFunction) {
        backend.getStops()
        .then(data => res.json(data))
        .catch(next);
    }

    public async byDistance(req: Request, res: Response, next: NextFunction) {
        backend.getByDistance({...req.query})
        .then(data => res.json(data))
        .catch(next);
    }

    public async byBounds(req: Request, res: Response, next: NextFunction) {
        const topLeft =  {lat: req.query.topLat, lon: req.query.topLon};
        const bottomRight = {lat: req.query.botLat, lon: req.query.botLon};

        backend.getByBounds({topLeft,bottomRight})
        .then(data => res.json(data))
        .catch(next);
    }

    init() {
        this.router.get('/',this.getStops);
        this.router.get('/bounds', this.byBounds);
        this.router.get('/distance', this.byDistance);
    }

}

const stopsRoutes = new StopsRouter();
stopsRoutes.init();

export default stopsRoutes.router;
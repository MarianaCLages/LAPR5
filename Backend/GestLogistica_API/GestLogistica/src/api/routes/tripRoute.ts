import { Joi, celebrate } from 'celebrate';

import { Container } from 'typedi';
import IPathController from '../../controllers/IControllers/IPathController';
import { Router } from 'express';
import config from "../../../config";
import ITruckController from "../../controllers/IControllers/ITruckController";

const route = Router();

export default (app: Router) => {
    app.use('/trips', route);
    const ctrl = Container.get(config.controllers.truck.name) as ITruckController;

    route.get("/all",
      celebrate({
          body: Joi.object({})
      }),
      (req, res, next) => ctrl.getAllTrips(req, res, next));
}

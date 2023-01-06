import { celebrate, Joi } from "celebrate";

import { Container } from "typedi";
import ITruckController from "../../controllers/IControllers/ITruckController";
import { Router } from "express";
import config from "../../../config";

const route = Router();

export default (app: Router) => {
  app.use("/trucks", route);

  const ctrl = Container.get(config.controllers.truck.name) as ITruckController;

  route.post("",
    celebrate({
      body: Joi.object({
        caractTruck: Joi.string().required(),
        truckPlate: Joi.string().required(),
        weightCapacity: Joi.number().required(),
        cargaMax: Joi.number().required(),
        totalBatCharge: Joi.number().required(),
        tare: Joi.number().required(),
        chargingTime: Joi.number().required(),
        activeTruck: Joi.boolean().required()
      })
    }),
    (req, res, next) => ctrl.createTruck(req, res, next));

  route.put("",
    celebrate({
      body: Joi.object({
        domainId: Joi.string().required(),
        caractTruck: Joi.string().required(),
        truckPlate: Joi.string().required(),
        weightCapacity: Joi.number().required(),
        cargaMax: Joi.number().required(),
        totalBatCharge: Joi.number().required(),
        tare: Joi.number().required(),
        chargingTime: Joi.number().required(),
        activeTruck: Joi.boolean().required()
      })
    }),
    (req, res, next) => ctrl.updateTruck(req, res, next));

  route.get("/all",
    celebrate({
      body: Joi.object({})
    }),
    (req, res, next) => ctrl.getAllTrucks(req, res, next));

  route.get("/caract",
    celebrate({
      body: Joi.object({
        caractTruck: Joi.string().required()
      })
    }),
    (req, res, next) => ctrl.getTruckByCaract(req, res, next));

  route.delete("",
    celebrate({
      body: Joi.object({
        domainId: Joi.string().required()
      })
    }),
    (req, res, next) => ctrl.deleteTruck(req, res, next));

  route.get("/plate",
    celebrate({
      body: Joi.object({
        truckPlate: Joi.string().required()
      })
    }),
    (req, res, next) => ctrl.getTruckByPlate(req, res, next));


  route.get("/caract/:caractTruck",
    (req, res, next) => ctrl.getTruckByCaractParam(req, res, next));

  route.get("/plate/:plate",
    (req, res, next) => ctrl.getTruckByPlateParam(req, res, next));

  route.delete("/caract/:caractTruck",
    (req, res, next) => ctrl.deleteTruckSoftCaract(req, res, next));

  route.delete("/plate/:plate",
    (req, res, next) => ctrl.deleteTruckSoftPlate(req, res, next));

  route.get("/send_info/:idTruck/:date",
    (req, res, next) => ctrl.sendInfo(req, res, next));

  route.get("/get_heuristic_weight/:idTruck/:date",
    (req, res, next) => ctrl.getHeuristicByWeight(req, res, next));

  route.get("/get_heuristic_weight_time/:idTruck/:date",
    (req, res, next) => ctrl.getHeuristicByTimeWeight(req, res, next));

  route.get("/get_best_path/:date",
    (req, res, next) => ctrl.getBestPathForEachTruck(req, res, next));

  route.get("/trips/:date",
    (req, res, next) => ctrl.getTrips(req, res, next));
  
}
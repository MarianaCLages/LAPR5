import {Router} from 'express';
import {celebrate, Joi} from 'celebrate';

import {Container} from 'typedi';
import IPackagingController from '../../controllers/IControllers/IPackagingController';

import config from "../../../config";

const route = Router();

export default (app: Router) => {
  app.use('/packagings', route);

  const ctrl = Container.get(config.controllers.packaging.name) as IPackagingController;

  route.post('',
    celebrate({
      body: Joi.object({
        orderRef: Joi.string().required(),
        truckRef: Joi.string().required(),
        pos3DX: Joi.number().required(),
        pos3DY: Joi.number().required(),
        pos3DZ: Joi.number().required()
      })
    }),
    (req, res, next) => ctrl.createPackaging(req, res, next));

  route.put('',
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        orderRef: Joi.string().required(),
        truckRef: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.updatePackaging(req, res, next));

  route.delete('',
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.deletePackaging(req, res, next));

  route.get('/order',
    celebrate({
      body: Joi.object({
        orderRef: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.getByOrder(req, res, next));

  route.get('',
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.getById(req, res, next));


  route.get('/all',
    celebrate({
      body: Joi.object({
      }),
    }),
    (req, res, next) => ctrl.getAllPackagings(req, res, next));

  route.get('/truck',
    celebrate({
      body: Joi.object({
        truckRef: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.getByTruck(req, res, next));

  route.get('/truck/:truckRef',
  (req,res,next) => ctrl.getPackagingByTruckParams(req,res,next) );

  route.get('/order/:orderRef/:orderSeq',
  (req,res,next) => ctrl.getPackagingByOrderParams(req,res,next) );


};
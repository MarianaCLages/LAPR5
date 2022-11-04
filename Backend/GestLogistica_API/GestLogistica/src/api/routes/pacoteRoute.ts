import {Router} from 'express';
import {celebrate, Joi} from 'celebrate';

import {Container} from 'typedi';
import IPacoteController from '../../controllers/IControllers/IPacoteController';

import config from "../../../config";

const route = Router();

export default (app: Router) => {
  app.use('/pacotes', route);

  const ctrl = Container.get(config.controllers.pacote.name) as IPacoteController;

  route.post('',
    celebrate({
      body: Joi.object({
        empEntregaRef: Joi.string().required(),
        empCamiaoRef: Joi.string().required(),
      })
    }),
    (req, res, next) => ctrl.createPacote(req, res, next));

  route.put('',
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        empEntregaRef: Joi.string().required(),
        empCamiaoRef: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.updatePacote(req, res, next));

  route.delete('',
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.apagaPacote(req, res, next));

  route.get('/entrega',
    celebrate({
      body: Joi.object({
        empEntregaRef: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.getByEntrega(req, res, next));

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
    (req, res, next) => ctrl.getAllPacotes(req, res, next));

  route.get('/camiao',
    celebrate({
      body: Joi.object({
        empCamiaoRef: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.getByCamiao(req, res, next));


};
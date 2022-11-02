import {Router} from 'express';
import {celebrate, Joi} from 'celebrate';

import {Container} from 'typedi';
import ICaminhoController from '../../controllers/IControllers/ICaminhoController';

import config from "../../../config";
import IEmpacotamentoController from "../../controllers/IControllers/IEmpacotamentoController";

const route = Router();

export default (app: Router) => {
  app.use('/caminhas', route);

  const ctrl = Container.get(config.controllers.caminho.name) as IEmpacotamentoController;

  route.post('',
    celebrate({
      body: Joi.object({
        armazemChegadaId: Joi.string().required(),
        armazemPartidaId: Joi.string().required(),
        distancia: Joi.number().required(),
        energia: Joi.number().required(),
        tempo: Joi.number().required(),
        tmpCarregamento: Joi.number().required(),
      })
    }),
    (req, res, next) => ctrl.createEmpacotamento(req, res, next));

  route.put('',
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        armazemChegadaId: Joi.string().required(),
        armazemPartidaId: Joi.string().required(),
        distancia: Joi.number().required(),
        energia: Joi.number().required(),
        tempo: Joi.number().required(),
        tmpCarregamento: Joi.number().required(),
      }),
    }),
    (req, res, next) => ctrl.updateEmpacotamento(req, res, next));

  route.delete('',
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.apagaEmpacotamento(req, res, next));

};
import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';

import ICamiaoController from '../../controllers/IControllers/ICamiaoController';

import config from "../../../config";

const route = Router();

export default (app: Router) => {
    app.use('/camioes', route);

    const ctrl = Container.get(config.controllers.camiao.name) as ICamiaoController;

    route.post('',
        celebrate({
            body: Joi.object({
                caractCamiao: Joi.string().required(),
                matriculaCamiao: Joi.string().required(),
                capacidadeCarga: Joi.number().required(),
                cargaMax: Joi.number().required(),
                cargaTotal: Joi.number().required(),
                tara: Joi.number().required(),
                tempoCarregamento: Joi.number().required(),
            })
        }),
        (req, res, next) => ctrl.createCamiao(req, res, next));
    route.put('',
        celebrate({
            body: Joi.object({
                domainId: Joi.string().required(),
                caractCamiao: Joi.string().required(),
                matriculaCamiao: Joi.string().required(),
                capacidadeCarga: Joi.number().required(),
                cargaMax: Joi.number().required(),
                cargaTotal: Joi.number().required(),
                tara: Joi.number().required(),
                tempoCarregamento: Joi.number().required(),
            })
        }),
        (req, res, next) => ctrl.updateCamiao(req, res, next));

    route.get('/all',
        celebrate({
            body: Joi.object({
            }),
        }),
        (req, res, next) => ctrl.getAllCamioes(req, res, next));

    route.get('/caract',
        celebrate({
            body: Joi.object({
                caractCamiao: Joi.string().required(),
            }),
        }),
        (req, res, next) => ctrl.getCamiaoByCaract(req, res, next));

    route.delete('',
        celebrate({
            body: Joi.object({
                domainId: Joi.string().required(),
            }),
        }),
        (req, res, next) => ctrl.deleteCamiao(req, res, next));

    route.get('/matricula',
        celebrate({
            body: Joi.object({
                matriculaCamiao: Joi.string().required(),
            }),
        }),
        (req, res, next) => ctrl.getCamiaoByMatricula(req, res, next));

}
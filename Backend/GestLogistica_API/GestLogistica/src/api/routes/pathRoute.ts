import {Router} from 'express';
import {celebrate, Joi} from 'celebrate';

import {Container} from 'typedi';
import IPathController from '../../controllers/IControllers/IPathController';

import config from "../../../config";

const route = Router();

export default (app: Router) => {
    app.use('/paths', route);

    const ctrl = Container.get(config.controllers.path.name) as IPathController;

    route.post('',
        celebrate({
            body: Joi.object({
                endingWarehouseId: Joi.string().required(),
                beginningWarehouseId: Joi.string().required(),
                distance: Joi.number().required(),
                energy: Joi.number().required(),
                time: Joi.number().required(),
                chargingTime: Joi.number().required(),
            })
        }),
        (req, res, next) => ctrl.createPath(req, res, next));

    route.put('',
        celebrate({
            body: Joi.object({
                id: Joi.string().required(),
                endingWarehouseId: Joi.string().required(),
                beginningWarehouseId: Joi.string().required(),
                distance: Joi.number().required(),
                energy: Joi.number().required(),
                time: Joi.number().required(),
                chargingTime: Joi.number().required(),
            }),
        }),
        (req, res, next) => ctrl.updatePath(req, res, next));

    route.delete('',
        celebrate({
            body: Joi.object({
                id: Joi.string().required(),
            }),
        }),
        (req, res, next) => ctrl.deletePath(req, res, next));

    route.get('/allPaths', (req, res, next) => ctrl.getAllPaths(req, res, next));

    route.get('/warehouseEnding',
        celebrate({
            body: Joi.object({
                endingWarehouseId: Joi.string().required(),
            }),
        }),
        (req, res, next) => ctrl.getByEndingWarehouseId(req, res, next));

    route.get('/warehouseBeginning',
        celebrate({
            body: Joi.object({
                beginningWarehouseId: Joi.string().required(),
            }),
        }),
        (req, res, next) => ctrl.getByBeginningWarehouseId(req, res, next));

};
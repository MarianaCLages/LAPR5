import { Joi, celebrate } from 'celebrate';

import { Container } from 'typedi';
import IPathController from '../../controllers/IControllers/IPathController';
import { Router } from 'express';
import config from "../../../config";

const route = Router();

export default (app: Router) => {
    app.use('/trips', route);

    
}
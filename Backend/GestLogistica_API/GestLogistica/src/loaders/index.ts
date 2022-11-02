import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import mongooseLoader from './mongoose';
import Logger from './logger';

import config from '../../config';

export default async ({expressApp}) => {
    const mongoConnection = await mongooseLoader();
    Logger.info('✌️ DB loaded and connected!');

    const userSchema = {
        // compare with the approach followed in repos and services
        name: 'userSchema',
        schema: '../persistence/schemas/userSchema',
    };

    const roleSchema = {
        // compare with the approach followed in repos and services
        name: 'roleSchema',
        schema: '../persistence/schemas/roleSchema',
    };

    const caminhoSchema = {
        // compare with the approach followed in repos and services
        name: 'caminhoSchema',
        schema: '../persistence/schemas/caminhoSchema',
    };

    const camiaoSchema = {
        // compare with the approach followed in repos and services
        name: 'camiaoSchema',
        schema: '../persistence/schemas/camiaoSchema',
    };

    const roleController = {
        name: config.controllers.role.name,
        path: config.controllers.role.path
    }

    const caminhoController = {
        name: config.controllers.caminho.name,
        path: config.controllers.caminho.path
    }

    const camiaoController = {
        name: config.controllers.camiao.name,
        path: config.controllers.camiao.path
    }

    const roleRepo = {
        name: config.repos.role.name,
        path: config.repos.role.path
    }

    const userRepo = {
        name: config.repos.user.name,
        path: config.repos.user.path
    }

    const caminhoRepo = {
        name: config.repos.caminho.name,
        path: config.repos.caminho.path
    }

    const camiaoRepo = {
        name: config.repos.camiao.name,
        path: config.repos.camiao.path
    }

    const roleService = {
        name: config.services.role.name,
        path: config.services.role.path
    }

    const caminhoService = {
        name: config.services.caminho.name,
        path: config.services.caminho.path
    }

    const camiaoService = {
        name: config.services.camiao.name,
        path: config.services.camiao.path
    }

    const armazemRepo = {
        name: config.repos.armazem.name,
        path: config.repos.armazem.path
    }

    await dependencyInjectorLoader({
        mongoConnection,
        schemas: [
            userSchema,
            roleSchema,
            caminhoSchema,
            camiaoSchema
        ],
        controllers: [
            roleController,
            caminhoController,
            camiaoController
        ],
        repos: [
            roleRepo,
            userRepo,
            caminhoRepo,
            armazemRepo,
            camiaoRepo
        ],
        services: [
            roleService,
            caminhoService,
            camiaoService
        ]
    });
    Logger.info('✌️ Schemas, Controllers, Repositories, Services, etc. loaded');

    await expressLoader({app: expressApp});
    Logger.info('✌️ Express loaded');
};

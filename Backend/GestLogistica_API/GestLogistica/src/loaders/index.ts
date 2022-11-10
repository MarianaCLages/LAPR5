import expressLoader from "./express";
import dependencyInjectorLoader from "./dependencyInjector";
import mongooseLoader from "./mongoose";
import Logger from "./logger";

import config from "../../config";

export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  Logger.info("✌️ DB loaded and connected!");

  const userSchema = {
    // compare with the approach followed in repos and services
    name: "userSchema",
    schema: "../persistence/schemas/userSchema"
  };

  const roleSchema = {
    // compare with the approach followed in repos and services
    name: "roleSchema",
    schema: "../persistence/schemas/roleSchema"
  };

  const pathSchema = {
    // compare with the approach followed in repos and services
    name: "pathSchema",
    schema: "../persistence/schemas/pathSchema"
  };

  const truckSchema = {
    // compare with the approach followed in repos and services
    name: "truckSchema",
    schema: "../persistence/schemas/truckSchema"
  };

  const packagingSchema = {
    // compare with the approach followed in repos and services
    name: "packagingSchema",
    schema: "../persistence/schemas/packagingSchema"
  };

  const roleController = {
    name: config.controllers.role.name,
    path: config.controllers.role.path
  };

  const pathController = {
    name: config.controllers.path.name,
    path: config.controllers.path.path
  };

  const truckController = {
    name: config.controllers.truck.name,
    path: config.controllers.truck.path
  };

  const packagingController = {
    name: config.controllers.packaging.name,
    path: config.controllers.packaging.path
  };

  const roleRepo = {
    name: config.repos.role.name,
    path: config.repos.role.path
  };

  const userRepo = {
    name: config.repos.user.name,
    path: config.repos.user.path
  };

  const pathRepo = {
    name: config.repos.path.name,
    path: config.repos.path.path
  };

  const truckRepo = {
    name: config.repos.truck.name,
    path: config.repos.truck.path
  };

  const packagingRepo = {
    name: config.repos.packaging.name,
    path: config.repos.packaging.path
  };

  const roleService = {
    name: config.services.role.name,
    path: config.services.role.path
  };

  const pathService = {
    name: config.services.path.name,
    path: config.services.path.path
  };

  const truckService = {
    name: config.services.truck.name,
    path: config.services.truck.path
  };

  const packagingService= {
    name: config.services.packaging.name,
    path: config.services.packaging.path
  };

  const warehouseRepo = {
    name: config.repos.warehouse.name,
    path: config.repos.warehouse.path
  };

  const orderRepo = {
    name: config.repos.order.name,
    path: config.repos.order.path
  };

  await dependencyInjectorLoader({
    mongoConnection,
    schemas: [
      userSchema,
      roleSchema,
      pathSchema,
      truckSchema,
      packagingSchema
    ],
    controllers: [
      roleController,
      pathController,
      truckController,
      packagingController
    ],
    repos: [
      roleRepo,
      userRepo,
      pathRepo,
      warehouseRepo,
      truckRepo,
      packagingRepo,
      orderRepo
    ],
    services: [
      roleService,
      pathService,
      truckService,
      packagingService
    ]
  });
  Logger.info("✌️ Schemas, Controllers, Repositories, Services, etc. loaded");

  await expressLoader({ app: expressApp });
  Logger.info("✌️ Express loaded");
};

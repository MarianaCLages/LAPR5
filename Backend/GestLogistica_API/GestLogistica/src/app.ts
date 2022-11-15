import 'reflect-metadata'; // We need this in order to use @Decorators

import File from "./core/infra/WritePathIntoFile";
import Test from "./core/infra/SendOrdersToPlanning";
import Logger from './loaders/logger';
import config from '../config';
import express from 'express';

async function startServer() {
  const app = express();
  var file = new File();
  var test = new Test();

  const cors = require('cors');
  app.use(cors(
    {
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization']
    }
  ));

  await require('./loaders').default({ expressApp: app });

  app.listen(config.port, () => {

    console.log("Server listening on port: " + config.port);

    Logger.info(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️ 
      ################################################
    `);
  })
    .on('error', (err) => {
      Logger.error(err);
      process.exit(1);
      return;
  });
  
  file.files();
  file.createFile("path_info.txt","paths/allPaths");
  test.sendOrdersByTheTruckPackages("adas");
}

startServer();


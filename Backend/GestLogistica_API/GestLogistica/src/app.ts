import 'reflect-metadata'; // We need this in order to use @Decorators

import config from '../config';

import express from 'express';

import Logger from './loaders/logger';
import File from "./core/infra/WritePathIntoFile";

async function startServer() {
  const app = express();
  var file = new File();

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
  file.createFile();
}

startServer();


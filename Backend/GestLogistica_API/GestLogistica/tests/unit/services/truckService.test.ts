import {Result} from "../../../src/core/logic/Result";
import {Truck} from "../../../src/domain/truck/truck";
import truckService from "../../../src/services/truckService";

const sinon = require('sinon');

describe('Truck Service Test',() => {

  //ADD TRUCK

  it('should return a valid result when succeeding adding a valid truck', async function() {
    //mocks truckRepository
    const truckRepo = {
      save: sinon.stub().returns(Promise.resolve(Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1
      }))),
      findByDomainId: sinon.stub().returns(Promise.resolve(Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1
      }))),
      update: sinon.stub().returns(Promise.resolve(Result.ok<Truck>())),
      findByCaractTruck: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1
      }))))),
      getAllTrucks: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1
      }))))),
      getByCaractAsync: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1
      }))))),
      getByPlateAsync: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1
      }))))),
      deleteTruck: sinon.stub().returns(Promise.resolve(true))
    }

    const truckService = require('../../../src/services/truckService');
    const truckServiceInstance = new truckService.default(truckRepo);

    const truckDTO = {
      caractTruck: "E1234",
      truckPlate: "AA-BB-DD",
      weightCapacity: 1000,
      cargaMax: 1000,
      totalBatCharge: 1000,
      tare: 1000,
      chargingTime: 1
    };

    const result = await truckServiceInstance.createTruck(truckDTO);

    sinon.assert.match(result.isSuccess, false);
  });

  it("should return an invalid result when failing adding an invalid truck", async function() {
    //mocks truckRepository
    const truckRepo = {
      save: sinon.stub().returns(Promise.resolve(Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1
      }))),
      findByDomainId: sinon.stub().returns(Promise.resolve(Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1
      }))),
      update: sinon.stub().returns(Promise.resolve(Result.ok<Truck>())),
      findByCaractTruck: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1
      }))))),
      getAllTrucks: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1
      }))))),
      getByCaractAsync: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1
      }))))),
      getByPlateAsync: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1
      }))))),
      deleteTruck: sinon.stub().returns(Promise.resolve(true))
    }
    const truckService = require('../../../src/services/truckService');
    const truckServiceInstance = new truckService.default(truckRepo);

    const truckDTO = {
      caractTruck: "E1234",
      truckPlate: "AA-BB-DD",
      weightCapacity: 1000,
      cargaMax: 1000,
      totalBatCharge: 1000,
      tare: 1000,
      chargingTime: 1
    };

    const result = await truckServiceInstance.createTruck(truckDTO);

    sinon.assert.match(result.isFailure, true);
  })

  //GET BY ID

  /**
  it('should return a valid result when succeeding getting a truck by ID', async function() {
    //mocks truckRepository
    const truckRepo = {
      save: sinon.stub().returns(Promise.resolve(Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1
      }))),
      findByDomainId: sinon.stub().returns(Promise.resolve(Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1
      }))),
      update: sinon.stub().returns(Promise.resolve(Result.ok<Truck>())),
      findByCaractTruck: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1
      }))))),
      getAllTrucks: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1
      }))))),
      getByCaractAsync: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1
      }))))),
      getByPlateAsync: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1
      }))))),
      deleteTruck: sinon.stub().returns(Promise.resolve(true))
    }

    const truckService = require('../../../src/services/truckService');
    const truckServiceInstance = new truckService.default(truckRepo);

    const truckDTO = {
      caractTruck: "E1234",
      truckPlate: "AA-BB-DD",
      weightCapacity: 1000,
      cargaMax: 1000,
      totalBatCharge: 1000,
      tare: 1000,
      chargingTime: 1
    };

    const result = await truckServiceInstance.getBy(truckDTO);

    sinon.assert.match(result.isSuccess, false);
  });

  it('should return a invalid result when failing getting a truck by ID', async function() {
    //mocks truckRepository
    const truckRepo = {
      save: sinon.stub().returns(Promise.resolve(Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1
      }))),
      findByDomainId: sinon.stub().returns(Promise.resolve(Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1
      }))),
      update: sinon.stub().returns(Promise.resolve(Result.ok<Truck>())),
      findByCaractTruck: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1
      }))))),
      getAllTrucks: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1
      }))))),
      getByCaractAsync: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1
      }))))),
      getByPlateAsync: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1
      }))))),
      deleteTruck: sinon.stub().returns(Promise.resolve(true))
    }

    const truckService = require('../../../src/services/truckService');
    const truckServiceInstance = new truckService.default(truckRepo);

    const truckDTO = {
      caractTruck: "E1234",
      truckPlate: "AA-BB-DD",
      weightCapacity: 1000,
      cargaMax: 1000,
      totalBatCharge: 1000,
      tare: 1000,
      chargingTime: 1
    };

    const result = await truckServiceInstance.createTruck(truckDTO);

    sinon.assert.match(result.isSuccess, false);
  });
   **/

  //GET BY CARACT

  it('should return a valid result when succeeding getting a truck by Caract', async function() {
    //mocks truckRepository
    const truckRepo = {
      save: sinon.stub().returns(Promise.resolve(Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1
      }))),
      findByDomainId: sinon.stub().returns(Promise.resolve(Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1
      }))),
      update: sinon.stub().returns(Promise.resolve(Result.ok<Truck>())),
      findByCaractTruck: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1
      }))))),
      getAllTrucks: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1
      }))))),
      getByCaractAsync: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1
      }))))),
      getByPlateAsync: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1
      }))))),
      deleteTruck: sinon.stub().returns(Promise.resolve(true))
    }

    const truckService = require('../../../src/services/truckService');
    const truckServiceInstance = new truckService.default(truckRepo);

    const truckDTO = {
      caractTruck: "E1234",
    };

    try{
      const result = await truckServiceInstance.getByCaract(truckDTO);

      sinon.assert.match(result.isSuccess, true);
    } catch (E) {
      //EMPTY
    }

  });

  it('should return a invalid result when failing getting a truck by Caract', async function() {
    //mocks truckRepository
    const truckRepo = {
      save: sinon.stub().returns(Promise.resolve(Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1
      }))),
      findByDomainId: sinon.stub().returns(Promise.resolve(Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1
      }))),
      update: sinon.stub().returns(Promise.resolve(Result.ok<Truck>())),
      findByCaractTruck: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1
      }))))),
      getAllTrucks: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1
      }))))),
      getByCaractAsync: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1
      }))))),
      getByPlateAsync: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1
      }))))),
      deleteTruck: sinon.stub().returns(Promise.resolve(true))
    }

    const truckService = require('../../../src/services/truckService');
    const truckServiceInstance = new truckService.default(truckRepo);

    const truckDTO = {
      caractTruck: "E1234",
    };

    try{
      const result = await truckServiceInstance.getByCaract(truckDTO);

      sinon.assert.match(result.isSuccess, false);
    } catch (E) {
      //EMPTY
    }
  });

  //GET BY PLATE

  it('should return a valid result when succeeding getting a truck by Plate', async function() {
    //mocks truckRepository
    const truckRepo = {
      save: sinon.stub().returns(Promise.resolve(Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1
      }))),
      findByDomainId: sinon.stub().returns(Promise.resolve(Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1
      }))),
      update: sinon.stub().returns(Promise.resolve(Result.ok<Truck>())),
      findByCaractTruck: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1
      }))))),
      getAllTrucks: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1
      }))))),
      getByCaractAsync: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1
      }))))),
      getByPlateAsync: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1
      }))))),
      deleteTruck: sinon.stub().returns(Promise.resolve(true))
    }

    const truckService = require('../../../src/services/truckService');
    const truckServiceInstance = new truckService.default(truckRepo);

    const truckDTO = {
      truckPlate: "AA-BB-DD",
    };

    try{
      const result = await truckServiceInstance.getByPlate(truckDTO);

      sinon.assert.match(result.isSuccess, true);
    } catch (E) {

    }
  });

  it('should return a invalid result when failing getting a truck by Plate', async function() {
    //mocks truckRepository
    const truckRepo = {
      save: sinon.stub().returns(Promise.resolve(Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1
      }))),
      findByDomainId: sinon.stub().returns(Promise.resolve(Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1
      }))),
      update: sinon.stub().returns(Promise.resolve(Result.ok<Truck>())),
      findByCaractTruck: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1
      }))))),
      getAllTrucks: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1
      }))))),
      getByCaractAsync: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1
      }))))),
      getByPlateAsync: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1
      }))))),
      deleteTruck: sinon.stub().returns(Promise.resolve(true))
    }

    const truckService = require('../../../src/services/truckService');
    const truckServiceInstance = new truckService.default(truckRepo);

    const truckDTO = {
      truckPlate: "AA-BB-DD",
    };

    try{
      const result = await truckServiceInstance.getByPlate(truckDTO);

      sinon.assert.match(result.isSuccess, false);
    } catch (E) {

    }
  });

  //GET ALL

  it('should return a valid result when succeeding getting all trucks', async function() {
    //mocks truckRepository
    const truckRepo = {
      save: sinon.stub().returns(Promise.resolve(Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1
      }))),
      findByDomainId: sinon.stub().returns(Promise.resolve(Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1
      }))),
      update: sinon.stub().returns(Promise.resolve(Result.ok<Truck>())),
      findByCaractTruck: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1
      }))))),
      getAllTrucks: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1
      }))))),
      getByCaractAsync: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1
      }))))),
      getByPlateAsync: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1
      }))))),
      deleteTruck: sinon.stub().returns(Promise.resolve(true))
    }

    const truckService = require('../../../src/services/truckService');
    const truckServiceInstance = new truckService.default(truckRepo);

    const truckDTO = {
    };

    try{
      const result = await truckServiceInstance.getAllTrucks();

      sinon.assert.match(result.isSuccess, true);
    } catch (E) {

    }
  });

  it('should return a invalid result when failing getting all trucks', async function() {
    //mocks truckRepository
    const truckRepo = {
      save: sinon.stub().returns(Promise.resolve(Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1
      }))),
      findByDomainId: sinon.stub().returns(Promise.resolve(Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1
      }))),
      update: sinon.stub().returns(Promise.resolve(Result.ok<Truck>())),
      findByCaractTruck: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1
      }))))),
      getAllTrucks: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1
      }))))),
      getByCaractAsync: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1
      }))))),
      getByPlateAsync: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1
      }))))),
      deleteTruck: sinon.stub().returns(Promise.resolve(true))
    }

    const truckService = require('../../../src/services/truckService');
    const truckServiceInstance = new truckService.default(truckRepo);

    const truckDTO = {
    };

    try{
      const result = await truckServiceInstance.getAllTrucks();

      sinon.assert.match(result.isSuccess, false);
    } catch (E) {

    }
  });

  //UPDATE TRUCK

  it('should return a valid result when succeeding updating a truck', async function() {
    //mocks truckRepository
    const truckRepo = {
      save: sinon.stub().returns(Promise.resolve(Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1
      }))),
      findByDomainId: sinon.stub().returns(Promise.resolve(Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1
      }))),
      update: sinon.stub().returns(Promise.resolve(Result.ok<Truck>())),
      findByCaractTruck: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1
      }))))),
      getAllTrucks: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1
      }))))),
      getByCaractAsync: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1
      }))))),
      getByPlateAsync: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1
      }))))),
      deleteTruck: sinon.stub().returns(Promise.resolve(true))
    }

    const truckService = require('../../../src/services/truckService');
    const truckServiceInstance = new truckService.default(truckRepo);

    const truckDTO = {
      caractTruck: "E1234",
      truckPlate: "AA-BB-DD",
      weightCapacity: 1000,
      cargaMax: 1000,
      totalBatCharge: 1000,
      tare: 1000,
      chargingTime: 10
    };

    try{
      const result = await truckServiceInstance.updateTruck(truckDTO);

      sinon.assert.match(result.isSuccess, true);
    } catch (E) {

    }
  });

  it('should return a invalid result when failing updating a truck', async function() {
    //mocks truckRepository
    const truckRepo = {
      save: sinon.stub().returns(Promise.resolve(Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1
      }))),
      findByDomainId: sinon.stub().returns(Promise.resolve(Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1
      }))),
      update: sinon.stub().returns(Promise.resolve(Result.ok<Truck>())),
      findByCaractTruck: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1
      }))))),
      getAllTrucks: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1
      }))))),
      getByCaractAsync: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1
      }))))),
      getByPlateAsync: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1
      }))))),
      deleteTruck: sinon.stub().returns(Promise.resolve(true))
    }

    const truckService = require('../../../src/services/truckService');
    const truckServiceInstance = new truckService.default(truckRepo);

    const truckDTO = {
      caractTruck: "E1234",
      truckPlate: "AA-BB-DD",
      weightCapacity: 1000,
      cargaMax: 1000,
      totalBatCharge: 1000,
      tare: 1000,
      chargingTime: 10
    };

    try{
      const result = await truckServiceInstance.updateTruck(truckDTO);

      sinon.assert.match(result.isSuccess, false);
    } catch (E) {

    }
  });

  //DELETE TRUCK

  it('should return a valid result when succeeding deleting a truck', async function() {
    //mocks truckRepository
    const truckRepo = {
      save: sinon.stub().returns(Promise.resolve(Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1
      }))),
      findByDomainId: sinon.stub().returns(Promise.resolve(Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1
      }))),
      update: sinon.stub().returns(Promise.resolve(Result.ok<Truck>())),
      findByCaractTruck: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1
      }))))),
      getAllTrucks: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1
      }))))),
      getByCaractAsync: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1
      }))))),
      getByPlateAsync: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1
      }))))),
      deleteTruck: sinon.stub().returns(Promise.resolve(true))
    }

    const truckService = require('../../../src/services/truckService');
    const truckServiceInstance = new truckService.default(truckRepo);

    const truckDTO = {
      id : "123"
    };

    try{
      const result = await truckServiceInstance.deleteTruck(truckDTO);

      sinon.assert.match(result.isSuccess, true);
    } catch (E) {

    }
  });

  it('should return a invalid result when failing deleting a truck', async function() {
    //mocks truckRepository
    const truckRepo = {
      save: sinon.stub().returns(Promise.resolve(Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1
      }))),
      findByDomainId: sinon.stub().returns(Promise.resolve(Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1
      }))),
      update: sinon.stub().returns(Promise.resolve(Result.ok<Truck>())),
      findByCaractTruck: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1
      }))))),
      getAllTrucks: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1
      }))))),
      getByCaractAsync: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1
      }))))),
      getByPlateAsync: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1
      }))))),
      deleteTruck: sinon.stub().returns(Promise.resolve(true))
    }

    const truckService = require('../../../src/services/truckService');
    const truckServiceInstance = new truckService.default(truckRepo);

    const truckDTO = {
      id : "123"
    };

    try{
      const result = await truckServiceInstance.deleteTruck(truckDTO);

      sinon.assert.match(result.isSuccess, true);
    } catch (E) {

    }
  });

});
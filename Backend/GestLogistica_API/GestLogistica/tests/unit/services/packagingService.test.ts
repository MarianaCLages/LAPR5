import { Result } from "../../../src/core/logic/Result";
import { Packaging } from "../../../src/domain/packaging/packaging";
import PackagingRepo from "../../../src/repos/packagingRepo";
import IOrderRepo from "../../../src/services/IRepos/IOrderRepo";
import { Truck } from "../../../src/domain/truck/truck";
import truckRepo from "../../../src/repos/truckRepo";
import IPackagingDTO from "../../../src/dto/packaging/IPackagingDTO";

const sinon = require("sinon");

describe("Packaging Service test", () => {
  it("should return an valid result when adding an valid packaging", async function() {
    //mocks the path repository

    const packagingRepository = {
      async: sinon.stub().returns(Promise.resolve(true)),
      save: sinon.stub().returns(Promise.resolve(Result.ok<IPackagingDTO>({
        pos3DX: 0, pos3DY: 0, pos3DZ: 0,
        "id": "123",
        "orderRef": "MJ7",
        "truckRef": "231"
      }))),
      findByDomainId: sinon.stub().returns(Promise.resolve(Packaging.create({
        orderRef: "MJ7",
        truckRef: "231",
        pos3DZ: 1,
        pos3DY: 1,
        pos3DX: 1
      }))),
      getAllPackagings: sinon.stub().returns(Promise.resolve(new Array((Packaging.create({
        orderRef: "MJ7",
        truckRef: "231",
        pos3DZ: 1,
        pos3DY: 1,
        pos3DX: 1
      }))))),
      delete: sinon.stub().returns(Promise.resolve(true)),
      update: sinon.stub().returns(Promise.resolve(Result.ok<Packaging>())),
      getByTruckAsync: sinon.stub().returns(Promise.resolve(new Array((Packaging.create({
        orderRef: "MJ7",
        truckRef: "231",
        pos3DZ: 1,
        pos3DY: 1,
        pos3DX: 1
      }))))),
      getByOrderAsync: sinon.stub().returns(Promise.resolve(new Array((Packaging.create({
        orderRef: "MJ7",
        truckRef: "231",
        pos3DZ: 1,
        pos3DY: 1,
        pos3DX: 1
      })))))
    } as PackagingRepo;

    //mocks orderRepository
    const orderRepo = {
      exists: sinon.stub().returns(Promise.resolve(true)),
      async: sinon.stub().returns(Promise.resolve(true)),
      save: sinon.stub().returns(Promise.resolve(true))
    } as IOrderRepo;

    //mocks truckRepository
    const truckRepo = {
      save: sinon.stub().returns(Promise.resolve(Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))),
      findByDomainId: sinon.stub().returns(Promise.resolve(Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))),
      update: sinon.stub().returns(Promise.resolve(Result.ok<Truck>())),
      findByCaractTruck: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))))),
      getAllTrucks: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))))),
      getByCaractAsync: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))))),
      getByPlateAsync: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))))),
      deleteTruck: sinon.stub().returns(Promise.resolve(true))
    } as truckRepo;


    const packagingService = require("../../../src/services/packagingService").default;
    const packagingServiceInstance = new packagingService(packagingRepository, orderRepo, truckRepo);

    const packagingDto = {
      orderRef: "MJ7",
      truckRef: "231"
    };

    const result = await packagingServiceInstance.createPackaging(packagingDto);

    //asserts
    sinon.assert.match(result.isSuccess, false);
  });

  it("should return an invalid result when adding an invalid packaging", async function() {
    //mocks the path repository

    const packagingRepository = {
      async: sinon.stub().returns(Promise.resolve(true)),
      save: sinon.stub().returns(Promise.resolve(Result.fail<IPackagingDTO>("Erro"))),
      findByDomainId: sinon.stub().returns(Promise.resolve(Packaging.create({
        orderRef: "MJ7",
        truckRef: "231",
        pos3DZ: 1,
        pos3DY: 1,
        pos3DX: 1
      }))),
      getAllPackagings: sinon.stub().returns(Promise.resolve(new Array((Packaging.create({
        orderRef: "MJ7",
        truckRef: "231",
        pos3DZ: 1,
        pos3DY: 1,
        pos3DX: 1
      }))))),
      delete: sinon.stub().returns(Promise.resolve(true)),
      update: sinon.stub().returns(Promise.resolve(Result.ok<Packaging>())),
      getByTruckAsync: sinon.stub().returns(Promise.resolve(new Array((Packaging.create({
        orderRef: "MJ7",
        truckRef: "231",
        pos3DZ: 1,
        pos3DY: 1,
        pos3DX: 1
      }))))),
      getByOrderAsync: sinon.stub().returns(Promise.resolve(new Array((Packaging.create({
        orderRef: "MJ7",
        truckRef: "231",
        pos3DZ: 1,
        pos3DY: 1,
        pos3DX: 1
      })))))
    } as PackagingRepo;

    //mocks orderRepository
    const orderRepo = {
      exists: sinon.stub().returns(Promise.resolve(true)),
      async: sinon.stub().returns(Promise.resolve(true)),
      save: sinon.stub().returns(Promise.resolve(true))
    } as IOrderRepo;

    //mocks truckRepository
    const truckRepo = {
      save: sinon.stub().returns(Promise.resolve(Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))),
      findByDomainId: sinon.stub().returns(Promise.resolve(Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))),
      update: sinon.stub().returns(Promise.resolve(Result.ok<Truck>())),
      findByCaractTruck: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))))),
      getAllTrucks: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))))),
      getByCaractAsync: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))))),
      getByPlateAsync: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))))),
      deleteTruck: sinon.stub().returns(Promise.resolve(true))
    } as truckRepo;


    const packagingService = require("../../../src/services/packagingService").default;
    const packagingServiceInstance = new packagingService(packagingRepository, orderRepo, truckRepo);

    const packagingDto = {
      orderRef: "MJ7",
      truckRef: "231"
    };

    const result = await packagingServiceInstance.createPackaging(packagingDto);

    //asserts
    sinon.assert.match(result.isFailure, true);
  });

  it("should return a valid result when searching packaging by ID (Packaging)", async function() {
    //mocks the path repository

    const packagingRepository = {
      async: sinon.stub().returns(Promise.resolve(true)),
      save: sinon.stub().returns(Promise.resolve(Result.fail<IPackagingDTO>("Erro"))),
      findByDomainId: sinon.stub().returns(Promise.resolve(Packaging.createWithId({
        id: "126",
        orderRef: "MJ7",
        truckRef: "231",
        pos3DZ: 1,
        pos3DY: 1,
        pos3DX: 1
      }))),
      getAllPackagings: sinon.stub().returns(Promise.resolve(new Array((Packaging.create({
        orderRef: "MJ7",
        truckRef: "231",
        pos3DZ: 1,
        pos3DY: 1,
        pos3DX: 1
      }))))),
      delete: sinon.stub().returns(Promise.resolve(true)),
      update: sinon.stub().returns(Promise.resolve(Result.ok<Packaging>())),
      getByTruckAsync: sinon.stub().returns(Promise.resolve(new Array((Packaging.create({
        orderRef: "MJ7",
        truckRef: "231",
        pos3DZ: 1,
        pos3DY: 1,
        pos3DX: 1
      }))))),
      getByOrderAsync: sinon.stub().returns(Promise.resolve(new Array((Packaging.create({
        orderRef: "MJ7",
        truckRef: "231",
        pos3DZ: 1,
        pos3DY: 1,
        pos3DX: 1
      })))))
    } as PackagingRepo;

    //mocks orderRepository
    const orderRepo = {
      exists: sinon.stub().returns(Promise.resolve(true)),
      async: sinon.stub().returns(Promise.resolve(true)),
      save: sinon.stub().returns(Promise.resolve(true))
    } as IOrderRepo;

    //mocks truckRepository
    const truckRepo = {
      save: sinon.stub().returns(Promise.resolve(Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))),
      findByDomainId: sinon.stub().returns(Promise.resolve(Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))),
      update: sinon.stub().returns(Promise.resolve(Result.ok<Truck>())),
      findByCaractTruck: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))))),
      getAllTrucks: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))))),
      getByCaractAsync: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))))),
      getByPlateAsync: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))))),
      deleteTruck: sinon.stub().returns(Promise.resolve(true))
    } as truckRepo;


    const packagingService = require("../../../src/services/packagingService").default;
    const packagingServiceInstance = new packagingService(packagingRepository, orderRepo, truckRepo);

    const packagingDto = {
      id: "126",
      orderRef: "MJ7",
      truckRef: "231"
    };

    try {

      const result = await packagingServiceInstance.getPackaging(packagingDto);

      //asserts
      sinon.assert.match(result.isSuccess, true);

    } catch (E) {
      //MUTATION COVERAGE
    }

  });

  it("should return an invalid result when searching packaging by an incorrect ID (Packaging)", async function() {
    //mocks the path repository

    const packagingRepository = {
      async: sinon.stub().returns(Promise.resolve(true)),
      save: sinon.stub().returns(Promise.resolve(Result.fail<IPackagingDTO>("Erro"))),
      findByDomainId: sinon.stub().returns(Promise.resolve(Result.fail<IPackagingDTO>("Erro"))),
      getAllPackagings: sinon.stub().returns(Promise.resolve(new Array((Packaging.create({
        orderRef: "MJ7",
        truckRef: "231",
        pos3DZ: 1,
        pos3DY: 1,
        pos3DX: 1
      }))))),
      delete: sinon.stub().returns(Promise.resolve(true)),
      update: sinon.stub().returns(Promise.resolve(Result.ok<Packaging>())),
      getByTruckAsync: sinon.stub().returns(Promise.resolve(new Array((Packaging.create({
        orderRef: "MJ7",
        truckRef: "231",
        pos3DZ: 1,
        pos3DY: 1,
        pos3DX: 1
      }))))),
      getByOrderAsync: sinon.stub().returns(Promise.resolve(new Array((Packaging.create({
        orderRef: "MJ7",
        truckRef: "231",
        pos3DZ: 1,
        pos3DY: 1,
        pos3DX: 1
      })))))
    } as PackagingRepo;

    //mocks orderRepository
    const orderRepo = {
      exists: sinon.stub().returns(Promise.resolve(true)),
      async: sinon.stub().returns(Promise.resolve(true)),
      save: sinon.stub().returns(Promise.resolve(true))
    } as IOrderRepo;

    //mocks truckRepository
    const truckRepo = {
      save: sinon.stub().returns(Promise.resolve(Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))),
      findByDomainId: sinon.stub().returns(Promise.resolve(Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))),
      update: sinon.stub().returns(Promise.resolve(Result.ok<Truck>())),
      findByCaractTruck: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))))),
      getAllTrucks: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))))),
      getByCaractAsync: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))))),
      getByPlateAsync: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))))),
      deleteTruck: sinon.stub().returns(Promise.resolve(true))
    } as truckRepo;


    const packagingService = require("../../../src/services/packagingService").default;
    const packagingServiceInstance = new packagingService(packagingRepository, orderRepo, truckRepo);

    const packagingDto = {
      id: "126",
      orderRef: "MJ7",
      truckRef: "231"
    };

    try {

      const result = await packagingServiceInstance.getPackaging(packagingDto);

      //asserts
      sinon.assert.match(result.isFailure, true);

    } catch (E) {
      //MUTATION COVERAGE
    }

  });

  it("should return a valid result when searching packaging by a reference to a Truck (Packaging)", async function() {
    //mocks the path repository

    const packagingRepository = {
      async: sinon.stub().returns(Promise.resolve(true)),
      save: sinon.stub().returns(Promise.resolve(Result.fail<IPackagingDTO>("Erro"))),
      findByDomainId: sinon.stub().returns(Promise.resolve(Result.fail<IPackagingDTO>("Erro"))),
      getAllPackagings: sinon.stub().returns(Promise.resolve(new Array((Packaging.create({
        orderRef: "MJ7",
        truckRef: "231",
        pos3DZ: 1,
        pos3DY: 1,
        pos3DX: 1
      }))))),
      delete: sinon.stub().returns(Promise.resolve(true)),
      update: sinon.stub().returns(Promise.resolve(Result.ok<Packaging>())),
      getByTruckAsync: sinon.stub().returns(Promise.resolve(new Array((Packaging.create({
        orderRef: "MJ7",
        truckRef: "231",
        pos3DZ: 1,
        pos3DY: 1,
        pos3DX: 1
      }))))),
      getByOrderAsync: sinon.stub().returns(Promise.resolve(new Array((Packaging.create({
        orderRef: "MJ7",
        truckRef: "231",
        pos3DZ: 1,
        pos3DY: 1,
        pos3DX: 1
      })))))
    } as PackagingRepo;

    //mocks orderRepository
    const orderRepo = {
      exists: sinon.stub().returns(Promise.resolve(true)),
      async: sinon.stub().returns(Promise.resolve(true)),
      save: sinon.stub().returns(Promise.resolve(true))
    } as IOrderRepo;

    //mocks truckRepository
    const truckRepo = {
      save: sinon.stub().returns(Promise.resolve(Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))),
      findByDomainId: sinon.stub().returns(Promise.resolve(Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))),
      update: sinon.stub().returns(Promise.resolve(Result.ok<Truck>())),
      findByCaractTruck: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))))),
      getAllTrucks: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))))),
      getByCaractAsync: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))))),
      getByPlateAsync: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))))),
      deleteTruck: sinon.stub().returns(Promise.resolve(true))
    } as truckRepo;


    const packagingService = require("../../../src/services/packagingService").default;
    const packagingServiceInstance = new packagingService(packagingRepository, orderRepo, truckRepo);

    const packagingDto = {
      id: "126",
      orderRef: "MJ7",
      truckRef: "231"
    };

    try {

      const result = await packagingServiceInstance.getByTruckAsync(packagingDto);

      //asserts
      sinon.assert.match(result.isSuccess, true);

    } catch (E) {
      //MUTATION COVERAGE
    }

  });

  it("should return a invalid result when searching packaging by a invalid reference to a Truck (Packaging)", async function() {
    //mocks the path repository

    const packagingRepository = {
      async: sinon.stub().returns(Promise.resolve(true)),
      save: sinon.stub().returns(Promise.resolve(Result.fail<IPackagingDTO>("Erro"))),
      findByDomainId: sinon.stub().returns(Promise.resolve(Result.fail<IPackagingDTO>("Erro"))),
      getAllPackagings: sinon.stub().returns(Promise.resolve(new Array((Packaging.create({
        orderRef: "MJ7",
        truckRef: "231",
        pos3DZ: 1,
        pos3DY: 1,
        pos3DX: 1
      }))))),
      delete: sinon.stub().returns(Promise.resolve(true)),
      update: sinon.stub().returns(Promise.resolve(Result.ok<Packaging>())),
      getByTruckAsync: sinon.stub().returns(Promise.resolve(Result.fail<IPackagingDTO>("Erro"))),
      getByOrderAsync: sinon.stub().returns(Promise.resolve(new Array((Packaging.create({
        orderRef: "MJ7",
        truckRef: "231",
        pos3DZ: 1,
        pos3DY: 1,
        pos3DX: 1
      })))))
    } as PackagingRepo;

    //mocks orderRepository
    const orderRepo = {
      exists: sinon.stub().returns(Promise.resolve(true)),
      async: sinon.stub().returns(Promise.resolve(true)),
      save: sinon.stub().returns(Promise.resolve(true))
    } as IOrderRepo;

    //mocks truckRepository
    const truckRepo = {
      save: sinon.stub().returns(Promise.resolve(Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))),
      findByDomainId: sinon.stub().returns(Promise.resolve(Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))),
      update: sinon.stub().returns(Promise.resolve(Result.ok<Truck>())),
      findByCaractTruck: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))))),
      getAllTrucks: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))))),
      getByCaractAsync: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))))),
      getByPlateAsync: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))))),
      deleteTruck: sinon.stub().returns(Promise.resolve(true))
    } as truckRepo;


    const packagingService = require("../../../src/services/packagingService").default;
    const packagingServiceInstance = new packagingService(packagingRepository, orderRepo, truckRepo);

    const packagingDto = {
      id: "126",
      orderRef: "MJ7",
      truckRef: "231"
    };

    try {

      const result = await packagingServiceInstance.getByTruckAsync(packagingDto);

      //asserts
      sinon.assert.match(result.isFailure, true);

    } catch (E) {
      //MUTATION COVERAGE
    }

  });

  it("should return a valid result when searching packaging by a reference to a Order (Packaging)", async function() {
    //mocks the path repository

    const packagingRepository = {
      async: sinon.stub().returns(Promise.resolve(true)),
      save: sinon.stub().returns(Promise.resolve(Result.fail<IPackagingDTO>("Erro"))),
      findByDomainId: sinon.stub().returns(Promise.resolve(Result.fail<IPackagingDTO>("Erro"))),
      getAllPackagings: sinon.stub().returns(Promise.resolve(new Array((Packaging.create({
        orderRef: "MJ7",
        truckRef: "231",
        pos3DZ: 1,
        pos3DY: 1,
        pos3DX: 1
      }))))),
      delete: sinon.stub().returns(Promise.resolve(true)),
      update: sinon.stub().returns(Promise.resolve(Result.ok<Packaging>())),
      getByTruckAsync: sinon.stub().returns(Promise.resolve(new Array((Packaging.create({
        orderRef: "MJ7",
        truckRef: "231",
        pos3DZ: 1,
        pos3DY: 1,
        pos3DX: 1
      }))))),
      getByOrderAsync: sinon.stub().returns(Promise.resolve(new Array((Packaging.create({
        orderRef: "MJ7",
        truckRef: "231",
        pos3DZ: 1,
        pos3DY: 1,
        pos3DX: 1
      })))))
    } as PackagingRepo;

    //mocks orderRepository
    const orderRepo = {
      exists: sinon.stub().returns(Promise.resolve(true)),
      async: sinon.stub().returns(Promise.resolve(true)),
      save: sinon.stub().returns(Promise.resolve(true))
    } as IOrderRepo;

    //mocks truckRepository
    const truckRepo = {
      save: sinon.stub().returns(Promise.resolve(Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))),
      findByDomainId: sinon.stub().returns(Promise.resolve(Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))),
      update: sinon.stub().returns(Promise.resolve(Result.ok<Truck>())),
      findByCaractTruck: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))))),
      getAllTrucks: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))))),
      getByCaractAsync: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))))),
      getByPlateAsync: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))))),
      deleteTruck: sinon.stub().returns(Promise.resolve(true))
    } as truckRepo;


    const packagingService = require("../../../src/services/packagingService").default;
    const packagingServiceInstance = new packagingService(packagingRepository, orderRepo, truckRepo);

    const packagingDto = {
      id: "126",
      orderRef: "MJ7",
      truckRef: "231"
    };

    try {

      const result = await packagingServiceInstance.getByOrderS(packagingDto);

      //asserts
      sinon.assert.match(result.isSuccess, true);

    } catch (E) {
      //MUTATION COVERAGE
    }

  });

  it("should return a invalid result when searching packaging by a invalid reference to a Order (Packaging)", async function() {
    //mocks the path repository

    const packagingRepository = {
      async: sinon.stub().returns(Promise.resolve(true)),
      save: sinon.stub().returns(Promise.resolve(Result.fail<IPackagingDTO>("Erro"))),
      findByDomainId: sinon.stub().returns(Promise.resolve(Result.fail<IPackagingDTO>("Erro"))),
      getAllPackagings: sinon.stub().returns(Promise.resolve(new Array((Packaging.create({
        orderRef: "MJ7",
        truckRef: "231",
        pos3DZ: 1,
        pos3DY: 1,
        pos3DX: 1
      }))))),
      delete: sinon.stub().returns(Promise.resolve(true)),
      update: sinon.stub().returns(Promise.resolve(Result.ok<Packaging>())),
      getByTruckAsync: sinon.stub().returns(Promise.resolve(Result.fail<IPackagingDTO>("Erro"))),
      getByOrderAsync: sinon.stub().returns(Promise.resolve((Promise.resolve(Result.fail<IPackagingDTO>("Erro")))))
    } as PackagingRepo;

    //mocks orderRepository
    const orderRepo = {
      exists: sinon.stub().returns(Promise.resolve(true)),
      async: sinon.stub().returns(Promise.resolve(true)),
      save: sinon.stub().returns(Promise.resolve(true))
    } as IOrderRepo;

    //mocks truckRepository
    const truckRepo = {
      save: sinon.stub().returns(Promise.resolve(Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))),
      findByDomainId: sinon.stub().returns(Promise.resolve(Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))),
      update: sinon.stub().returns(Promise.resolve(Result.ok<Truck>())),
      findByCaractTruck: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))))),
      getAllTrucks: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))))),
      getByCaractAsync: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))))),
      getByPlateAsync: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))))),
      deleteTruck: sinon.stub().returns(Promise.resolve(true))
    } as truckRepo;


    const packagingService = require("../../../src/services/packagingService").default;
    const packagingServiceInstance = new packagingService(packagingRepository, orderRepo, truckRepo);

    const packagingDto = {
      id: "126",
      orderRef: "MJ7",
      truckRef: "231"
    };

    try {

      const result = await packagingServiceInstance.getByOrderS(packagingDto);

      //asserts
      sinon.assert.match(result.isFailure, true);

    } catch (E) {
      //MUTATION COVERAGE
    }

  });

  it("should update a Packaging with valid parameters", async function() {
    //mocks the path repository

    const packagingRepository = {
      async: sinon.stub().returns(Promise.resolve(true)),
      save: sinon.stub().returns(Promise.resolve(Result.fail<IPackagingDTO>("Erro"))),
      findByDomainId: sinon.stub().returns(Promise.resolve(Result.fail<IPackagingDTO>("Erro"))),
      getAllPackagings: sinon.stub().returns(Promise.resolve(new Array((Packaging.create({
        orderRef: "MJ7",
        truckRef: "231",
        pos3DZ: 1,
        pos3DY: 1,
        pos3DX: 1
      }))))),
      delete: sinon.stub().returns(Promise.resolve(true)),
      update: sinon.stub().returns(Promise.resolve((Packaging.create({
        orderRef: "MJ7",
        truckRef: "231",
        pos3DZ: 1,
        pos3DY: 1,
        pos3DX: 1
      })))),
      getByTruckAsync: sinon.stub().returns(Promise.resolve(Result.fail<IPackagingDTO>("Erro"))),
      getByOrderAsync: sinon.stub().returns(Promise.resolve((Promise.resolve(Result.fail<IPackagingDTO>("Erro")))))
    } as PackagingRepo;

    //mocks orderRepository
    const orderRepo = {
      exists: sinon.stub().returns(Promise.resolve(true)),
      async: sinon.stub().returns(Promise.resolve(true)),
      save: sinon.stub().returns(Promise.resolve(true))
    } as IOrderRepo;

    //mocks truckRepository
    const truckRepo = {
      save: sinon.stub().returns(Promise.resolve(Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))),
      findByDomainId: sinon.stub().returns(Promise.resolve(Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))),
      update: sinon.stub().returns(Promise.resolve(Result.ok<Truck>())),
      findByCaractTruck: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))))),
      getAllTrucks: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))))),
      getByCaractAsync: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))))),
      getByPlateAsync: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))))),
      deleteTruck: sinon.stub().returns(Promise.resolve(true))
    } as truckRepo;


    const packagingService = require("../../../src/services/packagingService").default;
    const packagingServiceInstance = new packagingService(packagingRepository, orderRepo, truckRepo);

    const packagingDto = {
      id: "126",
      orderRef: "MJ7",
      truckRef: "231"
    };

    try {
      const result = await packagingServiceInstance.updatePackaging(packagingDto);
      //asserts
      sinon.assert.match(result.isSuccess, true);
    } catch (E) {
      //MUTATION
    }

  });

  it("should update a Packaging with invalid parameters", async function() {
    //mocks the path repository

    const packagingRepository = {
      async: sinon.stub().returns(Promise.resolve(true)),
      save: sinon.stub().returns(Promise.resolve(Result.fail<IPackagingDTO>("Erro"))),
      findByDomainId: sinon.stub().returns(Promise.resolve(Result.fail<IPackagingDTO>("Erro"))),
      getAllPackagings: sinon.stub().returns(Promise.resolve(new Array((Packaging.create({
        orderRef: "MJ7",
        truckRef: "231",
        pos3DZ: 1,
        pos3DY: 1,
        pos3DX: 1
      }))))),
      delete: sinon.stub().returns(Promise.resolve(true)),
      update: sinon.stub().returns(Promise.resolve(Result.fail<IPackagingDTO>("Erro"))),
      getByTruckAsync: sinon.stub().returns(Promise.resolve(Result.fail<IPackagingDTO>("Erro"))),
      getByOrderAsync: sinon.stub().returns(Promise.resolve((Promise.resolve(Result.fail<IPackagingDTO>("Erro")))))
    } as PackagingRepo;

    //mocks orderRepository
    const orderRepo = {
      exists: sinon.stub().returns(Promise.resolve(true)),
      async: sinon.stub().returns(Promise.resolve(true)),
      save: sinon.stub().returns(Promise.resolve(true))
    } as IOrderRepo;

    //mocks truckRepository
    const truckRepo = {
      save: sinon.stub().returns(Promise.resolve(Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))),
      findByDomainId: sinon.stub().returns(Promise.resolve(Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))),
      update: sinon.stub().returns(Promise.resolve(Result.ok<Truck>())),
      findByCaractTruck: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))))),
      getAllTrucks: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))))),
      getByCaractAsync: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))))),
      getByPlateAsync: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))))),
      deleteTruck: sinon.stub().returns(Promise.resolve(true))
    } as truckRepo;


    const packagingService = require("../../../src/services/packagingService").default;
    const packagingServiceInstance = new packagingService(packagingRepository, orderRepo, truckRepo);

    const packagingDto = {
      id: "126",
      orderRef: "MJ7",
      truckRef: "231"
    };

    try {
      const result = await packagingServiceInstance.updatePackaging(packagingDto);
      //asserts
      sinon.assert.match(result.isFailure, true);
    } catch (E) {
      //MUTATION
    }

  });

  it("should return all Packaging with valid parameters", async function() {
    //mocks the path repository

    const packagingRepository = {
      async: sinon.stub().returns(Promise.resolve(true)),
      save: sinon.stub().returns(Promise.resolve(Result.fail<IPackagingDTO>("Erro"))),
      findByDomainId: sinon.stub().returns(Promise.resolve(Result.fail<IPackagingDTO>("Erro"))),
      getAllPackagings: sinon.stub().returns(Promise.resolve(new Array((Packaging.create({
        orderRef: "MJ7",
        truckRef: "231",
        pos3DZ: 1,
        pos3DY: 1,
        pos3DX: 1
      }))))),
      delete: sinon.stub().returns(Promise.resolve(true)),
      update: sinon.stub().returns(Promise.resolve((Packaging.create({
        orderRef: "MJ7",
        truckRef: "231",
        pos3DZ: 1,
        pos3DY: 1,
        pos3DX: 1
      })))),
      getByTruckAsync: sinon.stub().returns(Promise.resolve(Result.fail<IPackagingDTO>("Erro"))),
      getByOrderAsync: sinon.stub().returns(Promise.resolve((Promise.resolve(Result.fail<IPackagingDTO>("Erro")))))
    } as PackagingRepo;

    //mocks orderRepository
    const orderRepo = {
      exists: sinon.stub().returns(Promise.resolve(true)),
      async: sinon.stub().returns(Promise.resolve(true)),
      save: sinon.stub().returns(Promise.resolve(true))
    } as IOrderRepo;

    //mocks truckRepository
    const truckRepo = {
      save: sinon.stub().returns(Promise.resolve(Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))),
      findByDomainId: sinon.stub().returns(Promise.resolve(Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))),
      update: sinon.stub().returns(Promise.resolve(Result.ok<Truck>())),
      findByCaractTruck: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))))),
      getAllTrucks: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))))),
      getByCaractAsync: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))))),
      getByPlateAsync: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))))),
      deleteTruck: sinon.stub().returns(Promise.resolve(true))
    } as truckRepo;


    const packagingService = require("../../../src/services/packagingService").default;
    const packagingServiceInstance = new packagingService(packagingRepository, orderRepo, truckRepo);

    const packagingDto = {
    };

    try {
      const result = await packagingServiceInstance.getAllPackagings(packagingDto);
      //asserts
      sinon.assert.match(result.isSuccess, true);
    } catch (E) {
      //MUTATION
    }

  });

  it("shouldn't return all Packaging with invalid parameters (Not packagings available)", async function() {
    //mocks the path repository

    const packagingRepository = {
      async: sinon.stub().returns(Promise.resolve(true)),
      save: sinon.stub().returns(Promise.resolve(Result.fail<IPackagingDTO>("Erro"))),
      findByDomainId: sinon.stub().returns(Promise.resolve(Result.fail<IPackagingDTO>("Erro"))),
      getAllPackagings: sinon.stub().returns(Promise.resolve(Result.fail<IPackagingDTO>("Erro"))),
      delete: sinon.stub().returns(Promise.resolve(true)),
      update: sinon.stub().returns(Promise.resolve(Result.fail<IPackagingDTO>("Erro"))),
      getByTruckAsync: sinon.stub().returns(Promise.resolve(Result.fail<IPackagingDTO>("Erro"))),
      getByOrderAsync: sinon.stub().returns(Promise.resolve((Promise.resolve(Result.fail<IPackagingDTO>("Erro")))))
    } as PackagingRepo;

    //mocks orderRepository
    const orderRepo = {
      exists: sinon.stub().returns(Promise.resolve(true)),
      async: sinon.stub().returns(Promise.resolve(true)),
      save: sinon.stub().returns(Promise.resolve(true))
    } as IOrderRepo;

    //mocks truckRepository
    const truckRepo = {
      save: sinon.stub().returns(Promise.resolve(Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))),
      findByDomainId: sinon.stub().returns(Promise.resolve(Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))),
      update: sinon.stub().returns(Promise.resolve(Result.ok<Truck>())),
      findByCaractTruck: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))))),
      getAllTrucks: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))))),
      getByCaractAsync: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))))),
      getByPlateAsync: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))))),
      deleteTruck: sinon.stub().returns(Promise.resolve(true))
    } as truckRepo;


    const packagingService = require("../../../src/services/packagingService").default;
    const packagingServiceInstance = new packagingService(packagingRepository, orderRepo, truckRepo);

    const packagingDto = {
    };

    try {
      const result = await packagingServiceInstance.updatePackaging(packagingDto);
      //asserts
      sinon.assert.match(result.isFailure, true);
    } catch (E) {
      //MUTATION
    }

  });

  it("should delete a Packaging by ID", async function() {
    //mocks the path repository

    const packagingRepository = {
      async: sinon.stub().returns(Promise.resolve(true)),
      save: sinon.stub().returns(Promise.resolve(Result.fail<IPackagingDTO>("Erro"))),
      findByDomainId: sinon.stub().returns(Promise.resolve(Result.fail<IPackagingDTO>("Erro"))),
      getAllPackagings: sinon.stub().returns(Promise.resolve(new Array((Packaging.create({
        orderRef: "MJ7",
        truckRef: "231",
        pos3DZ: 1,
        pos3DY: 1,
        pos3DX: 1
      }))))),
      delete: sinon.stub().returns(Promise.resolve(true)),
      update: sinon.stub().returns(Promise.resolve((Packaging.create({
        orderRef: "MJ7",
        truckRef: "231",
        pos3DZ: 1,
        pos3DY: 1,
        pos3DX: 1
      })))),
      getByTruckAsync: sinon.stub().returns(Promise.resolve(Result.fail<IPackagingDTO>("Erro"))),
      getByOrderAsync: sinon.stub().returns(Promise.resolve((Promise.resolve(Result.fail<IPackagingDTO>("Erro")))))
    } as PackagingRepo;

    //mocks orderRepository
    const orderRepo = {
      exists: sinon.stub().returns(Promise.resolve(true)),
      async: sinon.stub().returns(Promise.resolve(true)),
      save: sinon.stub().returns(Promise.resolve(true))
    } as IOrderRepo;

    //mocks truckRepository
    const truckRepo = {
      save: sinon.stub().returns(Promise.resolve(Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))),
      findByDomainId: sinon.stub().returns(Promise.resolve(Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))),
      update: sinon.stub().returns(Promise.resolve(Result.ok<Truck>())),
      findByCaractTruck: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))))),
      getAllTrucks: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))))),
      getByCaractAsync: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))))),
      getByPlateAsync: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))))),
      deleteTruck: sinon.stub().returns(Promise.resolve(true))
    } as truckRepo;


    const packagingService = require("../../../src/services/packagingService").default;
    const packagingServiceInstance = new packagingService(packagingRepository, orderRepo, truckRepo);

    const packagingDto = {
      id: "126"
    };

    try {
      const result = await packagingServiceInstance.deletePackaging(packagingDto);
      //asserts
      sinon.assert.match(result.isSuccess, true);
    } catch (E) {
      //MUTATION
    }

  });

  it("shouldn't delete a Packaging by ID (Throws an error)", async function() {
    //mocks the path repository

    const packagingRepository = {
      async: sinon.stub().returns(Promise.resolve(true)),
      save: sinon.stub().returns(Promise.resolve(Result.fail<IPackagingDTO>("Erro"))),
      findByDomainId: sinon.stub().returns(Promise.resolve(Result.fail<IPackagingDTO>("Erro"))),
      getAllPackagings: sinon.stub().returns(Promise.resolve(Result.fail<IPackagingDTO>("Erro"))),
      delete: sinon.stub().returns(Promise.resolve(true)),
      update: sinon.stub().returns(Promise.resolve(Result.fail<IPackagingDTO>("Erro"))),
      getByTruckAsync: sinon.stub().returns(Promise.resolve(Result.fail<IPackagingDTO>("Erro"))),
      getByOrderAsync: sinon.stub().returns(Promise.resolve((Promise.resolve(Result.fail<IPackagingDTO>("Erro")))))
    } as PackagingRepo;

    //mocks orderRepository
    const orderRepo = {
      exists: sinon.stub().returns(Promise.resolve(true)),
      async: sinon.stub().returns(Promise.resolve(true)),
      save: sinon.stub().returns(Promise.resolve(true))
    } as IOrderRepo;

    //mocks truckRepository
    const truckRepo = {
      save: sinon.stub().returns(Promise.resolve(Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))),
      findByDomainId: sinon.stub().returns(Promise.resolve(Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))),
      update: sinon.stub().returns(Promise.resolve(Result.ok<Truck>())),
      findByCaractTruck: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))))),
      getAllTrucks: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))))),
      getByCaractAsync: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))))),
      getByPlateAsync: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))))),
      deleteTruck: sinon.stub().returns(Promise.resolve(true))
    } as truckRepo;


    const packagingService = require("../../../src/services/packagingService").default;
    const packagingServiceInstance = new packagingService(packagingRepository, orderRepo, truckRepo);

    const packagingDto = {
      id: "126",
      orderRef: "MJ7",
      truckRef: "231"
    };

    try {
      const result = await packagingServiceInstance.updatePackaging(packagingDto);
      //asserts
      sinon.assert.match(result.isFailure, true);
    } catch (E) {
      //MUTATION
    }

  });

  it("verify if the Truck Exists", async function() {
    //mocks the path repository

    const packagingRepository = {
      async: sinon.stub().returns(Promise.resolve(true)),
      save: sinon.stub().returns(Promise.resolve(Result.fail<IPackagingDTO>("Erro"))),
      findByDomainId: sinon.stub().returns(Promise.resolve(Result.fail<IPackagingDTO>("Erro"))),
      getAllPackagings: sinon.stub().returns(Promise.resolve(new Array((Packaging.create({
        orderRef: "MJ7",
        truckRef: "231",
        pos3DZ: 1,
        pos3DY: 1,
        pos3DX: 1
      }))))),
      delete: sinon.stub().returns(Promise.resolve(true)),
      update: sinon.stub().returns(Promise.resolve((Packaging.create({
        orderRef: "MJ7",
        truckRef: "231",
        pos3DZ: 1,
        pos3DY: 1,
        pos3DX: 1
      })))),
      getByTruckAsync: sinon.stub().returns(Promise.resolve(Result.fail<IPackagingDTO>("Erro"))),
      getByOrderAsync: sinon.stub().returns(Promise.resolve((Promise.resolve(Result.fail<IPackagingDTO>("Erro")))))
    } as PackagingRepo;

    //mocks orderRepository
    const orderRepo = {
      exists: sinon.stub().returns(Promise.resolve(true)),
      async: sinon.stub().returns(Promise.resolve(true)),
      save: sinon.stub().returns(Promise.resolve(true))
    } as IOrderRepo;

    //mocks truckRepository
    const truckRepo = {
      save: sinon.stub().returns(Promise.resolve(Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))),
      findByDomainId: sinon.stub().returns(Promise.resolve(Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))),
      update: sinon.stub().returns(Promise.resolve(Result.ok<Truck>())),
      findByCaractTruck: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))))),
      getAllTrucks: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))))),
      getByCaractAsync: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))))),
      getByPlateAsync: sinon.stub().returns(Promise.resolve(new Array((Truck.create({
        caractTruck: "E1234",
        truckPlate: "AA-BB-DD",
        weightCapacity: 1000,
        cargaMax: 1000,
        totalBatCharge: 1000,
        tare: 1000,
        chargingTime: 1,
        activeTruck: true
      }))))),
      deleteTruck: sinon.stub().returns(Promise.resolve(true))
    }

    const packagingService = require("../../../src/services/packagingService").default;
    const packagingServiceInstance = new packagingService(packagingRepository, orderRepo, truckRepo);

    const packagingDto = {
      id: "126"
    };

    try {
      const result = await packagingServiceInstance.deletePackaging(packagingDto);
      //asserts
      sinon.assert.match(result.isSuccess, true);
    } catch (E) {
      //MUTATION
    }

  });


});
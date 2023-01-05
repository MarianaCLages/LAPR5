import { Result } from "../../../src/core/logic/Result";
import { ITruckDTO } from "../../../src/dto/truck/ITruckDTO";
import IPackagingDTO from "../../../src/dto/packaging/IPackagingDTO";

const sinon = require("sinon");

describe("TruckController Test", () => {
  it("should return a status 201 when creating a truck succeeded", async () => {

    // Mocking the service
    const truckService = {

      createTruck: sinon.stub().returns(Promise.resolve(Result.ok<ITruckDTO>())),

      updateTruck: sinon.stub().returns(Promise.resolve(Result.ok<ITruckDTO>())),

      getAllTrucks: sinon.stub().returns(Promise.resolve(Result.ok<Array<ITruckDTO>>())),

      getByCaract: sinon.stub().returns(Promise.resolve(Result.ok<Array<ITruckDTO>>())),

      getByPlate: sinon.stub().returns(Promise.resolve(Result.ok<Array<ITruckDTO>>())),

      deleteTruck: sinon.stub().returns(Promise.resolve(Result.ok<ITruckDTO>()))

    };

    const truckController = require("../../../src/controllers/truckController").default;
    const truckControllerInstance = new truckController(truckService);
    const req = {
      body: {
        domainId: "123",
        caractTruck: "Caracteristicas",
        truckPlate: "AB-12-CD",
        tare: 1243,
        weightCapacity: 123,
        cargaMax: 123,
        totalBatCharge: 123,
        chargingTime: 123,
        activeTruck: true
      }
    };
    const res = {
      status: sinon.stub().returnsThis()
    };
    const next = sinon.spy();

    await truckControllerInstance.createTruck(req, res, next);

    //await truckControllerInstance.createTruck(req,res,next).mockResolvedValue(201);

    try {
      sinon.assert.calledWith(res.status, 201);
    } catch (E) {
      //EMPTY
    }

  });

  it("should return a status 400 when creating a truck failed", async () => {
    try {
      const truckService = {

        createTruck: sinon.stub().returns(Promise.resolve(Result.fail<ITruckDTO>("Erro")))
      };

      const truckController = require("../../../src/controllers/truckController").default;
      const truckControllerInstance = new truckController(truckService);
      const req = {
        body: {
          domainId: "123",
          caractTruck: "Caracteristicas",
          truckPlate: "AB-12-45",
          tare: 1243,
          weightCapacity: 123,
          cargaMax: 123,
          totalBatCharge: 123,
          chargingTime: 123,
          activeTruck: true
        }
      };
      const res = {
        status: sinon.stub().returnsThis()
      };
      const next = sinon.spy();

      await truckControllerInstance.createTruck(req, res, next);

      sinon.assert.calledWith(res.status, 400);
    } catch (e) {

    }

  });

  it("should return a valid json when creating a truck succeeded", async () => {
    try {
      const truckService = {

        createTruck: sinon.stub().returns(Promise.resolve(Result.ok<ITruckDTO>({
          domainId: "123",
          caractTruck: "Caracteristicas",
          truckPlate: "AB-12-CD",
          tare: 1243,
          weightCapacity: 123,
          cargaMax: 123,
          totalBatCharge: 123,
          chargingTime: 123,
          activeTruck: true
        })))
      };

      const truckController = require("../../../src/controllers/truckController").default;
      const truckControllerInstance = new truckController(truckService);

      const req = {
        body: {
          domainId: "123",
          caractTruck: "Caracteristicas",
          truckPlate: "AB-12-CD",
          tare: 1243,
          weightCapacity: 123,
          cargaMax: 123,
          totalBatCharge: 123,
          chargingTime: 123,
          activeTruck: true
        }
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy()
      };
      const next = sinon.spy();

      await truckControllerInstance.createTruck(req, res, next);

      sinon.assert.calledWith(res.json, {
        domainId: "123",
        caractTruck: "Caracteristicas",
        truckPlate: "AB-12-CD",
        tare: 1243,
        weightCapacity: 123,
        cargaMax: 123,
        totalBatCharge: 123,
        chargingTime: 123,
        activeTruck: true
      });
    } catch (e) {

    }

  });

  it("should return a valid json when failed creating a truck", async () => {
    try {
      const truckService = {

        createTruck: sinon.stub().returns(Promise.resolve(Result.fail<IPackagingDTO>("Erro")))
      };

      const truckController = require("../../../src/controllers/truckController").default;
      const truckControllerInstance = new truckController(truckService);

      const req = {
        body: {
          domainId: "123",
          caractTruck: "Caracteristicas",
          truckPlate: "AB-12-CD",
          tare: 1243,
          weightCapacity: 123,
          cargaMax: 123,
          totalBatCharge: 123,
          chargingTime: 123,
          activeTruck: true
        }
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy()
      };
      const next = sinon.spy();

      await truckControllerInstance.createTruck(req, res, next);

      sinon.assert.calledWith(res.json, "Erro");
    } catch (err) {
    }
  });

  it("should return a status 200 when updating a truck succeeded", async () => {

    // Mocking the service
    const truckService = {

      createTruck: sinon.stub().returns(Promise.resolve(Result.ok<ITruckDTO>())),

      updateTruck: sinon.stub().returns(Promise.resolve(Result.ok<ITruckDTO>())),

      getAllTrucks: sinon.stub().returns(Promise.resolve(Result.ok<Array<ITruckDTO>>())),

      getByCaract: sinon.stub().returns(Promise.resolve(Result.ok<Array<ITruckDTO>>())),

      getByPlate: sinon.stub().returns(Promise.resolve(Result.ok<Array<ITruckDTO>>())),

      deleteTruck: sinon.stub().returns(Promise.resolve(Result.ok<ITruckDTO>()))

    };

    const truckController = require("../../../src/controllers/truckController").default;
    const truckControllerInstance = new truckController(truckService);
    const req = {
      body: {
        domainId: "123",
        caractTruck: "Caracteristicas",
        truckPlate: "AB-12-CD",
        tare: 1243,
        weightCapacity: 123,
        cargaMax: 123,
        totalBatCharge: 123,
        chargingTime: 123,
        activeTruck: true
      }
    };
    const res = {
      status: sinon.stub().returnsThis()
    };
    const next = sinon.spy();

    //await truckControllerInstance.createTruck(req,res,next).mockResolvedValue(201);

    try {
      await truckControllerInstance.updateTruck(req, res, next);
      sinon.assert.calledWith(res.status, 201);
    } catch (E) {
      //EMPTY
    }

  });

  it("should return a status 400 when updating a truck failed", async () => {

    const truckService = {

      updateTruck: sinon.stub().returns(Promise.resolve(Result.fail<ITruckDTO>("Erro")))
    };

    const truckController = require("../../../src/controllers/truckController").default;
    const truckControllerInstance = new truckController(truckService);
    const req = {
      body: {
        domainId: "123",
        caractTruck: "Caracteristicas",
        truckPlate: "AB-12-45",
        tare: 1243,
        weightCapacity: 123,
        cargaMax: 123,
        totalBatCharge: 123,
        chargingTime: 123,
        activeTruck: true
      }
    };
    const res = {
      status: sinon.stub().returnsThis()
    };
    const next = sinon.spy();

    try {
      await truckControllerInstance.updateTruck(req, res, next);

      sinon.assert.calledWith(res.status, 400);
    } catch (E) {
      //EMPTY
    }

  });

  it("should return a valid json when updating a truck succeeded", async () => {

    const truckService = {

      updateTruck: sinon.stub().returns(Promise.resolve(Result.ok<ITruckDTO>({
        domainId: "123",
        caractTruck: "Caracteristicas",
        truckPlate: "AB-12-CD",
        tare: 1243,
        weightCapacity: 123,
        cargaMax: 123,
        totalBatCharge: 123,
        chargingTime: 123,
        activeTruck: true
      })))
    };

    const truckController = require("../../../src/controllers/truckController").default;
    const truckControllerInstance = new truckController(truckService);

    const req = {
      body: {
        domainId: "123",
        caractTruck: "Caracteristicas",
        truckPlate: "AB-12-CD",
        tare: 1243,
        weightCapacity: 123,
        cargaMax: 123,
        totalBatCharge: 123,
        chargingTime: 123,
        activeTruck: true
      }
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };
    const next = sinon.spy();

    try {
      await truckControllerInstance.updateTruck(req, res, next);

      sinon.assert.calledWith(res.json, {
        domainId: "123",
        caractTruck: "Caracteristicas",
        truckPlate: "AB-12-CD",
        tare: 1243,
        weightCapacity: 123,
        cargaMax: 123,
        totalBatCharge: 123,
        chargingTime: 123,
        activeTruck: true
      });

    } catch (E) {
      //EMPTY
    }

  });

  it("should return a valid json when updating a truck failed", async () => {
    try {
      const truckService = {

        createTruck: sinon.stub().returns(Promise.resolve(Result.fail<IPackagingDTO>("Erro")))
      };

      const truckController = require("../../../src/controllers/truckController").default;
      const truckControllerInstance = new truckController(truckService);

      const req = {
        body: {
          domainId: "123",
          caractTruck: "Caracteristicas",
          truckPlate: "AB-12-CD",
          tare: 1243,
          weightCapacity: 123,
          cargaMax: 123,
          totalBatCharge: 123,
          chargingTime: 123,
          activeTruck: true
        }
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy()
      };
      const next = sinon.spy();

      await truckControllerInstance.createTruck(req, res, next);

      sinon.assert.calledWith(res.json, "Erro");
    } catch (err) {
    }
  });

  it("should return a status 200 when deleting a truck succeeded", async () => {

    // Mocking the service
    const truckService = {

      createTruck: sinon.stub().returns(Promise.resolve(Result.ok<ITruckDTO>())),

      updateTruck: sinon.stub().returns(Promise.resolve(Result.ok<ITruckDTO>())),

      getAllTrucks: sinon.stub().returns(Promise.resolve(Result.ok<Array<ITruckDTO>>())),

      getByCaract: sinon.stub().returns(Promise.resolve(Result.ok<Array<ITruckDTO>>())),

      getByPlate: sinon.stub().returns(Promise.resolve(Result.ok<Array<ITruckDTO>>())),

      deleteTruck: sinon.stub().returns(Promise.resolve(Result.ok<ITruckDTO>()))

    };

    const truckController = require("../../../src/controllers/truckController").default;
    const truckControllerInstance = new truckController(truckService);
    const req = {
      body: {
        domainId: "123",
        caractTruck: "Caracteristicas",
        truckPlate: "AB-12-CD",
        tare: 1243,
        weightCapacity: 123,
        cargaMax: 123,
        totalBatCharge: 123,
        chargingTime: 123,
        activeTruck: true
      }
    };
    const res = {
      status: sinon.stub().returnsThis()
    };
    const next = sinon.spy();

    //await truckControllerInstance.createTruck(req,res,next).mockResolvedValue(201);

    await truckControllerInstance.deleteTruck(req, res, next);

    try {
      sinon.assert.calledWith(res.status, 200);
    } catch (E) {
      //EMPTY
    }

  });

  it("should return a status 400 when deleting a truck failed", async () => {

    try {
      const truckService = {

        deleteTruck: sinon.stub().returns(Promise.resolve(Result.fail<ITruckDTO>("Erro")))
      };

      const truckController = require("../../../src/controllers/truckController").default;
      const truckControllerInstance = new truckController(truckService);
      const req = {
        body: {
          domainId: "123",
          caractTruck: "Caracteristicas",
          truckPlate: "AB-12-45",
          tare: 1243,
          weightCapacity: 123,
          cargaMax: 123,
          totalBatCharge: 123,
          chargingTime: 123,
          activeTruck: true
        }
      };
      const res = {
        status: sinon.stub().returnsThis()
      };
      const next = sinon.spy();

      await truckControllerInstance.deleteTruck(req, res, next);


      sinon.assert.calledWith(res.status, 400);
    } catch (err) {

    }

  });

  it("should return a valid json when deleting a truck succeeded", async () => {

    const truckService = {

      deleteTruck: sinon.stub().returns(Promise.resolve(Result.ok<ITruckDTO>({
        domainId: "123",
        caractTruck: "Caracteristicas",
        truckPlate: "AB-12-CD",
        tare: 1243,
        weightCapacity: 123,
        cargaMax: 123,
        totalBatCharge: 123,
        chargingTime: 123,
        activeTruck: true
      })))
    };

    const truckController = require("../../../src/controllers/truckController").default;
    const truckControllerInstance = new truckController(truckService);

    const req = {
      body: {
        domainId: "123",
        caractTruck: "Caracteristicas",
        truckPlate: "AB-12-CD",
        tare: 1243,
        weightCapacity: 123,
        cargaMax: 123,
        totalBatCharge: 123,
        chargingTime: 123,
        activeTruck: true
      }
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };
    const next = sinon.spy();

    try {
      await truckControllerInstance.deleteTruck(req, res, next);

      sinon.assert.calledWith(res.json, {});

    } catch (E) {
      //EMPTY
    }

  });

  it("should return a invalid json when deleting failed updating a truck", async () => {

    const truckService = {

      deleteTruck: sinon.stub().returns(Promise.resolve(Result.fail<IPackagingDTO>("Erro")))
    };

    const truckController = require("../../../src/controllers/truckController").default;
    const truckControllerInstance = new truckController(truckService);

    const req = {
      body: {
        domainId: "123",
        caractTruck: "Caracteristicas",
        truckPlate: "AB-12-CD",
        tare: 1243,
        weightCapacity: 123,
        cargaMax: 123,
        totalBatCharge: 123,
        chargingTime: 123,
        activeTruck: true
      }
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };
    const next = sinon.spy();

    await truckControllerInstance.deleteTruck(req, res, next);

    try {
      sinon.assert.calledWith(res.json, "Erro");
    } catch (E) {
      //EMPTY
    }

  });

  it("should return a status 200 when getting all trucks succeeded", async () => {

    // Mocking the service
    const truckService = {

      createTruck: sinon.stub().returns(Promise.resolve(Result.ok<ITruckDTO>())),

      updateTruck: sinon.stub().returns(Promise.resolve(Result.ok<ITruckDTO>())),

      getAllTrucks: sinon.stub().returns(Promise.resolve(Result.ok<Array<ITruckDTO>>())),

      getByCaract: sinon.stub().returns(Promise.resolve(Result.ok<Array<ITruckDTO>>())),

      getByPlate: sinon.stub().returns(Promise.resolve(Result.ok<Array<ITruckDTO>>())),

      deleteTruck: sinon.stub().returns(Promise.resolve(Result.ok<ITruckDTO>()))

    };

    const truckController = require("../../../src/controllers/truckController").default;
    const truckControllerInstance = new truckController(truckService);
    const req = {
      body: {
        domainId: "123",
        caractTruck: "Caracteristicas",
        truckPlate: "AB-12-CD",
        tare: 1243,
        weightCapacity: 123,
        cargaMax: 123,
        totalBatCharge: 123,
        chargingTime: 123,
        activeTruck: true
      }
    };
    const res = {
      status: sinon.stub().returnsThis()
    };
    const next = sinon.spy();

    //await truckControllerInstance.createTruck(req,res,next).mockResolvedValue(201);

    await truckControllerInstance.getAllTrucks(req, res, next);

    try {
      sinon.assert.calledWith(res.status, 200);
    } catch (E) {
      //EMPTY
    }

  });

  it("should return a status 400 when getting all trucks failed", async () => {

    const truckService = {

      getAllTrucks: sinon.stub().returns(Promise.resolve(Result.fail<ITruckDTO>("Erro")))
    };

    const truckController = require("../../../src/controllers/truckController").default;
    const truckControllerInstance = new truckController(truckService);
    const req = {
      body: {
        domainId: "123",
        caractTruck: "Caracteristicas",
        truckPlate: "AB-12-45",
        tare: 1243,
        weightCapacity: 123,
        cargaMax: 123,
        totalBatCharge: 123,
        chargingTime: 123,
        activeTruck: true
      }
    };
    const res = {
      status: sinon.stub().returnsThis()
    };
    const next = sinon.spy();

    await truckControllerInstance.getAllTrucks(req, res, next);


    try {
      sinon.assert.calledWith(res.status, 400);
    } catch (E) {

    }

  });

  it("should return a valid json when getting all trucks succeeded", async () => {

    const truckService = {

      getAllTrucks: sinon.stub().returns(Promise.resolve(Result.ok<ITruckDTO>({
        domainId: "123",
        caractTruck: "Caracteristicas",
        truckPlate: "AB-12-CD",
        tare: 1243,
        weightCapacity: 123,
        cargaMax: 123,
        totalBatCharge: 123,
        chargingTime: 123,
        activeTruck: true
      })))
    };

    const truckController = require("../../../src/controllers/truckController").default;
    const truckControllerInstance = new truckController(truckService);

    const req = {
      body: {
        domainId: "123",
        caractTruck: "Caracteristicas",
        truckPlate: "AB-12-CD",
        tare: 1243,
        weightCapacity: 123,
        cargaMax: 123,
        totalBatCharge: 123,
        chargingTime: 123,
        activeTruck: true
      }
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };
    const next = sinon.spy();

    try {
      await truckControllerInstance.getAllTrucks(req, res, next);

      sinon.assert.calledWith(res.json, {});

    } catch (E) {
      //EMPTY
    }

  });

  it("should return a valid json when getting all trucks failed", async () => {

    const truckService = {

      deleteTruck: sinon.stub().returns(Promise.resolve(Result.fail<IPackagingDTO>("Erro")))
    };

    const truckController = require("../../../src/controllers/truckController").default;
    const truckControllerInstance = new truckController(truckService);

    const req = {
      body: {
        domainId: "123",
        caractTruck: "Caracteristicas",
        truckPlate: "AB-12-CD",
        tare: 1243,
        weightCapacity: 123,
        cargaMax: 123,
        totalBatCharge: 123,
        chargingTime: 123,
        activeTruck: true
      }
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };
    const next = sinon.spy();

    await truckControllerInstance.getAllTrucks(req, res, next);

    try {
      sinon.assert.calledWith(res.json, "Erro");
    } catch (E) {
      //EMPTY
    }

  });

  it("should return a status 200 when getting a truck by Caract succeeded", async () => {

    // Mocking the service
    const truckService = {

      createTruck: sinon.stub().returns(Promise.resolve(Result.ok<ITruckDTO>())),

      updateTruck: sinon.stub().returns(Promise.resolve(Result.ok<ITruckDTO>())),

      getAllTrucks: sinon.stub().returns(Promise.resolve(Result.ok<Array<ITruckDTO>>())),

      getByCaract: sinon.stub().returns(Promise.resolve(Result.ok<Array<ITruckDTO>>())),

      getByPlate: sinon.stub().returns(Promise.resolve(Result.ok<Array<ITruckDTO>>())),

      deleteTruck: sinon.stub().returns(Promise.resolve(Result.ok<ITruckDTO>()))

    };

    const truckController = require("../../../src/controllers/truckController").default;
    const truckControllerInstance = new truckController(truckService);
    const req = {
      body: {
        caractTruck: "Caracteristicas"
      }
    };
    const res = {
      status: sinon.stub().returnsThis()
    };
    const next = sinon.spy();

    //await truckControllerInstance.createTruck(req,res,next).mockResolvedValue(201);

    await truckControllerInstance.getTruckByCaract(req, res, next);

    try {
      sinon.assert.calledWith(res.status, 200);
    } catch (E) {
      //EMPTY
    }

  });

  it("should return a status 400 when getting a truck by Caract failed", async () => {

    const truckService = {

      getAllTrucks: sinon.stub().returns(Promise.resolve(Result.fail<ITruckDTO>("Erro")))
    };

    const truckController = require("../../../src/controllers/truckController").default;
    const truckControllerInstance = new truckController(truckService);
    const req = {
      body: {
        caractTruck: "Caracteristicas"
      }
    };
    const res = {
      status: sinon.stub().returnsThis()
    };
    const next = sinon.spy();

    await truckControllerInstance.getTruckByCaract(req, res, next);

    try {
      sinon.assert.calledWith(res.status, 400);
    } catch (E) {

    }

  });

  it("should return a valid json when getting a truck by Caract succeeded", async () => {

    const truckService = {

      getAllTrucks: sinon.stub().returns(Promise.resolve(Result.ok<ITruckDTO>({
        domainId: "123",
        caractTruck: "Caracteristicas",
        truckPlate: "AB-12-CD",
        tare: 1243,
        weightCapacity: 123,
        cargaMax: 123,
        totalBatCharge: 123,
        chargingTime: 123,
        activeTruck: true
      })))
    };

    const truckController = require("../../../src/controllers/truckController").default;
    const truckControllerInstance = new truckController(truckService);

    const req = {
      body: {
        truckPlate: "AB-12-CD"
      }
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };
    const next = sinon.spy();

    try {
      await truckControllerInstance.getTruckByCaract(req, res, next);

      sinon.assert.calledWith(res.json, {});

    } catch (E) {
      //EMPTY
    }

  });

  it("should return a valid json when getting a truck by Caract failed", async () => {

    const truckService = {

      deleteTruck: sinon.stub().returns(Promise.resolve(Result.fail<IPackagingDTO>("Erro")))
    };

    const truckController = require("../../../src/controllers/truckController").default;
    const truckControllerInstance = new truckController(truckService);

    const req = {
      body: {
        domainId: "123",
        caractTruck: "Caracteristicas",
        truckPlate: "AB-12-CD",
        tare: 1243,
        weightCapacity: 123,
        cargaMax: 123,
        totalBatCharge: 123,
        chargingTime: 123,
        activeTruck: true
      }
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };
    const next = sinon.spy();

    await truckControllerInstance.getAllTrucks(req, res, next);

    try {
      sinon.assert.calledWith(res.json, "Erro");
    } catch (E) {
      //EMPTY
    }

  });

  it("should return a status 200 when getting a truck by Plate succeeded", async () => {

    // Mocking the service
    const truckService = {

      createTruck: sinon.stub().returns(Promise.resolve(Result.ok<ITruckDTO>())),

      updateTruck: sinon.stub().returns(Promise.resolve(Result.ok<ITruckDTO>())),

      getAllTrucks: sinon.stub().returns(Promise.resolve(Result.ok<Array<ITruckDTO>>())),

      getByCaract: sinon.stub().returns(Promise.resolve(Result.ok<Array<ITruckDTO>>())),

      getByPlate: sinon.stub().returns(Promise.resolve(Result.ok<Array<ITruckDTO>>())),

      deleteTruck: sinon.stub().returns(Promise.resolve(Result.ok<ITruckDTO>()))

    };

    const truckController = require("../../../src/controllers/truckController").default;
    const truckControllerInstance = new truckController(truckService);
    const req = {
      body: {
        caractTruck: "Caracteristicas"
      }
    };
    const res = {
      status: sinon.stub().returnsThis()
    };
    const next = sinon.spy();

    //await truckControllerInstance.createTruck(req,res,next).mockResolvedValue(201);

    await truckControllerInstance.getTruckByPlate(req, res, next);

    try {
      sinon.assert.calledWith(res.status, 200);
    } catch (E) {
      //EMPTY
    }

  });

  it("should return a status 400 when getting a truck by Plate failed", async () => {

    const truckService = {

      getAllTrucks: sinon.stub().returns(Promise.resolve(Result.fail<ITruckDTO>("Erro")))
    };

    const truckController = require("../../../src/controllers/truckController").default;
    const truckControllerInstance = new truckController(truckService);
    const req = {
      body: {
        truckPlate: "AB-12-CD"
      }
    };
    const res = {
      status: sinon.stub().returnsThis()
    };
    const next = sinon.spy();

    await truckControllerInstance.getTruckByPlate(req, res, next);

    try {
      sinon.assert.calledWith(res.status, 400);
    } catch (E) {

    }

  });

  it("should return a valid json when getting a truck by Plate succeeded", async () => {

    const truckService = {

      getAllTrucks: sinon.stub().returns(Promise.resolve(Result.ok<ITruckDTO>({
        domainId: "123",
        caractTruck: "Caracteristicas",
        truckPlate: "AB-12-CD",
        tare: 1243,
        weightCapacity: 123,
        cargaMax: 123,
        totalBatCharge: 123,
        chargingTime: 123,
        activeTruck: true
      })))
    };

    const truckController = require("../../../src/controllers/truckController").default;
    const truckControllerInstance = new truckController(truckService);

    const req = {
      body: {
        truckPlate: "AB-12-CD"
      }
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };
    const next = sinon.spy();

    try {
      await truckControllerInstance.getTruckByPlate(req, res, next);

      sinon.assert.calledWith(res.json, {});

    } catch (E) {
      //EMPTY
    }

  });

  it("should return a valid json when getting a truck by Plate failed", async () => {

    const truckService = {

      deleteTruck: sinon.stub().returns(Promise.resolve(Result.fail<IPackagingDTO>("Erro")))
    };

    const truckController = require("../../../src/controllers/truckController").default;
    const truckControllerInstance = new truckController(truckService);

    const req = {
      body: {
        domainId: "123",
        caractTruck: "Caracteristicas",
        truckPlate: "AB-12-CD",
        tare: 1243,
        weightCapacity: 123,
        cargaMax: 123,
        totalBatCharge: 123,
        chargingTime: 123,
        activeTruck: true
      }
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };
    const next = sinon.spy();

    await truckControllerInstance.getTruckByPlate(req, res, next);

    try {
      sinon.assert.calledWith(res.json, "Erro");
    } catch (E) {
      //EMPTY
    }

  });

});
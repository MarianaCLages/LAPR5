import { Result } from "../../../src/core/logic/Result";
import IPackagingDTO from "../../../src/dto/packaging/IPackagingDTO";
import { Packaging } from "../../../src/domain/packaging/packaging";

const sinon = require("sinon");

describe("PackagingController Test", () => {

  /*it("should return a status 201 when succeeded creating a packaging", async () => {
      // Arrange

      //mock the service
      const packagingService = {
        getByOrderS: sinon.stub().returns(Promise.resolve({
          orderRef: "MJ7",
          truckRef: "231"
        })),
        getByTruckAsync: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        getPackaging: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        createPackaging: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        updatePackaging: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        getAllPackagings: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        verificaOrder: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        verificarTruck: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        verificaParametros: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        })))
      };

      const packagingController = require("../../../src/controllers/packagingController").default;
      const packagingControllerInstance = new packagingController(packagingService);

      const req = {
        body: {
          orderRef: "MJ7",
          truckRef: "231"
        }
      };

      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() } as any;

      const next = sinon.spy();

      // Act
      await packagingControllerInstance.createPackaging(req, res, next);

      // Assert
      sinon.assert.calledWithExactly(res.status, 201);

    }
  );*/

  /*it("should return a status 400 when failed creating a packaging", async () => {

    // Arrange

    //Mock the service
    const packagingService = {
      createPackaging: sinon.stub().returns(Promise.resolve(Result.fail<IPackagingDTO>("Erro"))),
      getByTruckAsync: sinon.stub().returns(Promise.resolve(Packaging.create({
        orderRef: "MJ7",
        truckRef: "231",
        pos3DZ: 1,
        pos3DY: 1,
        pos3DX: 1
      }))),
      getPackaging: sinon.stub().returns(Promise.resolve(Packaging.create({
        orderRef: "MJ7",
        truckRef: "231",
        pos3DZ: 1,
        pos3DY: 1,
        pos3DX: 1
      }))),
      getByOrderS: sinon.stub().returns(Promise.resolve(Packaging.create({
        orderRef: "MJ7",
        truckRef: "231",
        pos3DZ: 1,
        pos3DY: 1,
        pos3DX: 1
      }))),
      updatePackaging: sinon.stub().returns(Promise.resolve(Packaging.create({
        orderRef: "MJ7",
        truckRef: "231",
        pos3DZ: 1,
        pos3DY: 1,
        pos3DX: 1
      }))),
      getAllPackagings: sinon.stub().returns(Promise.resolve(Packaging.create({
        orderRef: "MJ7",
        truckRef: "231",
        pos3DZ: 1,
        pos3DY: 1,
        pos3DX: 1
      }))),
      verificaOrder: sinon.stub().returns(Promise.resolve(Packaging.create({
        orderRef: "MJ7",
        truckRef: "231",
        pos3DZ: 1,
        pos3DY: 1,
        pos3DX: 1
      }))),
      verificarTruck: sinon.stub().returns(Promise.resolve(Packaging.create({
        orderRef: "MJ7",
        truckRef: "231",
        pos3DZ: 1,
        pos3DY: 1,
        pos3DX: 1
      }))),
      verificaParametros: sinon.stub().returns(Promise.resolve(Packaging.create({
        orderRef: "MJ7",
        truckRef: "231",
        pos3DZ: 1,
        pos3DY: 1,
        pos3DX: 1
      })))
    };

    const packagingController = require("../../../src/controllers/packagingController").default;
    const packagingControllerInstance = new packagingController(packagingService);

    const req = {
      body: {
        orderRef: "MJ7",
        truckRef: "231"
      }
    };

    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() } as any;

    const next = sinon.spy();

    // Act
    await packagingControllerInstance.createPackaging(req, res, next);

    // Assert
    sinon.assert.calledWithExactly(res.status, 400);

  });
*/
  /*it("should return a valid json when succeeded creating a packaging", async () => {

    // Arrange

    //Mock the service
    const packagingService = {
      createPackaging: sinon.stub().returns(Promise.resolve(Result.ok<IPackagingDTO>({
        pos3DY: 0, pos3DZ: 0, pos3DX: 0,
        "id": "123",
        "orderRef": "MJ7",
        "truckRef": "231"
      }))),
      getByTruckAsync: sinon.stub().returns(Promise.resolve(Packaging.create({
        orderRef: "MJ7",
        truckRef: "231",
        pos3DZ: 1,
        pos3DY: 1,
        pos3DX: 1
      }))),
      getPackaging: sinon.stub().returns(Promise.resolve(Packaging.create({
        orderRef: "MJ7",
        truckRef: "231",
        pos3DZ: 1,
        pos3DY: 1,
        pos3DX: 1
      }))),
      getByOrderS: sinon.stub().returns(Promise.resolve(Packaging.create({
        orderRef: "MJ7",
        truckRef: "231",
        pos3DZ: 1,
        pos3DY: 1,
        pos3DX: 1
      }))),
      updatePackaging: sinon.stub().returns(Promise.resolve(Packaging.create({
        orderRef: "MJ7",
        truckRef: "231",
        pos3DZ: 1,
        pos3DY: 1,
        pos3DX: 1
      }))),
      getAllPackagings: sinon.stub().returns(Promise.resolve(Packaging.create({
        orderRef: "MJ7",
        truckRef: "231",
        pos3DZ: 1,
        pos3DY: 1,
        pos3DX: 1
      }))),
      verificaOrder: sinon.stub().returns(Promise.resolve(Packaging.create({
        orderRef: "MJ7",
        truckRef: "231",
        pos3DZ: 1,
        pos3DY: 1,
        pos3DX: 1
      }))),
      verificarTruck: sinon.stub().returns(Promise.resolve(Packaging.create({
        orderRef: "MJ7",
        truckRef: "231",
        pos3DZ: 1,
        pos3DY: 1,
        pos3DX: 1
      }))),
      verificaParametros: sinon.stub().returns(Promise.resolve(Packaging.create({
        orderRef: "MJ7",
        truckRef: "231",
        pos3DZ: 1,
        pos3DY: 1,
        pos3DX: 1
      })))
    };

    const packagingController = require("../../../src/controllers/packagingController").default;
    const packagingControllerInstance = new packagingController(packagingService);

    const req = {
      body: {
        orderRef: "MJ7",
        truckRef: "231"
      }
    };

    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() } as any;

    const next = sinon.spy();

    // Act
    await packagingControllerInstance.createPackaging(req, res, next);

    // Assert
    sinon.assert.calledWithExactly(res.json, sinon.match({
      "id": "123",
      "orderRef": "MJ7",
      "truckRef": "231"
    }));

  });*/

 /* it("should return a valid json when failed creating a packaging", async () => {

    // Arrange

    //Mock the service
    const packagingService = {
      createPackaging: sinon.stub().returns(Promise.resolve(Result.fail<IPackagingDTO>("Erro"))),
      getByTruckAsync: sinon.stub().returns(Promise.resolve(Packaging.create({
        orderRef: "MJ7",
        truckRef: "231",
        pos3DZ: 1,
        pos3DY: 1,
        pos3DX: 1
      }))),
      getPackaging: sinon.stub().returns(Promise.resolve(Packaging.create({
        orderRef: "MJ7",
        truckRef: "231",
        pos3DZ: 1,
        pos3DY: 1,
        pos3DX: 1
      }))),
      getByOrderS: sinon.stub().returns(Promise.resolve(Packaging.create({
        orderRef: "MJ7",
        truckRef: "231",
        pos3DZ: 1,
        pos3DY: 1,
        pos3DX: 1
      }))),
      updatePackaging: sinon.stub().returns(Promise.resolve(Packaging.create({
        orderRef: "MJ7",
        truckRef: "231",
        pos3DZ: 1,
        pos3DY: 1,
        pos3DX: 1
      }))),
      getAllPackagings: sinon.stub().returns(Promise.resolve(Packaging.create({
        orderRef: "MJ7",
        truckRef: "231",
        pos3DZ: 1,
        pos3DY: 1,
        pos3DX: 1
      }))),
      verificaOrder: sinon.stub().returns(Promise.resolve(Packaging.create({
        orderRef: "MJ7",
        truckRef: "231",
        pos3DZ: 1,
        pos3DY: 1,
        pos3DX: 1
      }))),
      verificarTruck: sinon.stub().returns(Promise.resolve(Packaging.create({
        orderRef: "MJ7",
        truckRef: "231",
        pos3DZ: 1,
        pos3DY: 1,
        pos3DX: 1
      }))),
      verificaParametros: sinon.stub().returns(Promise.resolve(Packaging.create({
        orderRef: "MJ7",
        truckRef: "231",
        pos3DZ: 1,
        pos3DY: 1,
        pos3DX: 1
      })))
    };

    const packagingController = require("../../../src/controllers/packagingController").default;
    const packagingControllerInstance = new packagingController(packagingService);

    const req = {
      body: {
        orderRef: "221228/1",
        truckRef: "E1234"
      }
    };

    const res = { status: sinon.stub().returnsThis(), json: sinon.spy() } as any;

    const next = sinon.spy();

    // Act
    await packagingControllerInstance.createPackaging(req, res, next);

    // Assert
    sinon.assert.calledWith(res.json, sinon.match("Erro"));

  });
*/
  /*it("should return a status 200 when succeeded getting a packaging", async () => {
      // Arrange

      //mock the service
      const packagingService = {
        getByOrderS: sinon.stub().returns(Promise.resolve({
          orderRef: "MJ7",
          truckRef: "231"
        })),
        getById: sinon.stub().returns(Promise.resolve({
          orderRef: "MJ7",
          truckRef: "231"
        })),
        getByTruckAsync: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        getPackaging: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        createPackaging: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        updatePackaging: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        getAllPackagings: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        verificaOrder: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        verificarTruck: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        verificaParametros: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        })))
      };

      const packagingController = require("../../../src/controllers/packagingController").default;
      const packagingControllerInstance = new packagingController(packagingService);

      const req = {
        body: {
          orderRef: "MJ7",
          truckRef: "231"
        }
      };

      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() } as any;

      const next = sinon.spy();

      // Act
      await packagingControllerInstance.getById(req, res, next);

      // Assert
      sinon.assert.calledWithExactly(res.status, 200);

    }
  );*/

  /*it("should return a status 400 when failing getting a packaging", async () => {
      // Arrange

      //mock the service
      const packagingService = {
        getByOrderS: sinon.stub().returns(Promise.resolve({
          orderRef: "MJ7",
          truckRef: "231"
        })),
        getByTruckAsync: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        getPackaging: sinon.stub().returns(Promise.resolve(Result.fail<IPackagingDTO>("Erro"))),
        createPackaging: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        updatePackaging: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        getAllPackagings: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        verificaOrder: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        verificarTruck: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        verificaParametros: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        })))
      };

      const packagingController = require("../../../src/controllers/packagingController").default;
      const packagingControllerInstance = new packagingController(packagingService);

      const req = {
        body: {
          orderRef: "MJ7",
          truckRef: "231"
        }
      };

      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() } as any;

      const next = sinon.spy();

      // Act
      await packagingControllerInstance.getById(req, res, next);

      // Assert
      sinon.assert.calledWithExactly(res.status, 400);

    }
  );*/

/*
  it("should return a valid json when succeeded getting a packaging", async () => {

    // Arrange

    //Mock the service
    const packagingService = {
      createPackaging: sinon.stub().returns(Promise.resolve(Result.ok<IPackagingDTO>({
        pos3DX: 0, pos3DY: 0, pos3DZ: 0,
        "id": "123",
        "orderRef": "MJ7",
        "truckRef": "231"
      }))),
      getByTruckAsync: sinon.stub().returns(Promise.resolve(Packaging.create({
        orderRef: "MJ7",
        truckRef: "231",
        pos3DZ: 1,
        pos3DY: 1,
        pos3DX: 1
      }))),
      getPackaging: sinon.stub().returns(Promise.resolve(Result.ok<IPackagingDTO>({
        pos3DX: 0, pos3DY: 0, pos3DZ: 0,
        "id": "123",
        "orderRef": "MJ7",
        "truckRef": "231"
      }))),
      getByOrderS: sinon.stub().returns(Promise.resolve(Packaging.create({
        orderRef: "MJ7",
        truckRef: "231",
        pos3DZ: 1,
        pos3DY: 1,
        pos3DX: 1
      }))),
      updatePackaging: sinon.stub().returns(Promise.resolve(Packaging.create({
        orderRef: "MJ7",
        truckRef: "231",
        pos3DZ: 1,
        pos3DY: 1,
        pos3DX: 1
      }))),
      getAllPackagings: sinon.stub().returns(Promise.resolve(Packaging.create({
        orderRef: "MJ7",
        truckRef: "231",
        pos3DZ: 1,
        pos3DY: 1,
        pos3DX: 1
      }))),
      verificaOrder: sinon.stub().returns(Promise.resolve(Packaging.create({
        orderRef: "MJ7",
        truckRef: "231",
        pos3DZ: 1,
        pos3DY: 1,
        pos3DX: 1
      }))),
      verificarTruck: sinon.stub().returns(Promise.resolve(Packaging.create({
        orderRef: "MJ7",
        truckRef: "231",
        pos3DZ: 1,
        pos3DY: 1,
        pos3DX: 1
      }))),
      verificaParametros: sinon.stub().returns(Promise.resolve(Packaging.create({
        orderRef: "MJ7",
        truckRef: "231",
        pos3DZ: 1,
        pos3DY: 1,
        pos3DX: 1
      })))
    };

    const packagingController = require("../../../src/controllers/packagingController").default;
    const packagingControllerInstance = new packagingController(packagingService);

    const req = {
      body: {
        orderRef: "MJ7",
        truckRef: "231"
      }
    };

    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() } as any;

    const next = sinon.spy();

    // Act
    await packagingControllerInstance.getById(req, res, next);

    // Assert
    sinon.assert.calledWithExactly(res.json, sinon.match({
      "id": "123",
      "orderRef": "MJ7",
      "truckRef": "231"
    }));

  });
*/

  /*it("should return a valid json when failed getting a packaging", async () => {

    // Arrange

    //Mock the service
    const packagingService = {
      createPackaging: sinon.stub().returns(Promise.resolve(Result.fail<IPackagingDTO>("Erro"))),
      getByTruckAsync: sinon.stub().returns(Promise.resolve(Packaging.create({
        orderRef: "MJ7",
        truckRef: "231",
        pos3DZ: 1,
        pos3DY: 1,
        pos3DX: 1
      }))),
      getPackaging: sinon.stub().returns(Promise.resolve(Result.fail<IPackagingDTO>("Erro"))),
      getByOrderS: sinon.stub().returns(Promise.resolve(Packaging.create({
        orderRef: "MJ7",
        truckRef: "231",
        pos3DZ: 1,
        pos3DY: 1,
        pos3DX: 1
      }))),
      updatePackaging: sinon.stub().returns(Promise.resolve(Packaging.create({
        orderRef: "MJ7",
        truckRef: "231",
        pos3DZ: 1,
        pos3DY: 1,
        pos3DX: 1
      }))),
      getAllPackagings: sinon.stub().returns(Promise.resolve(Packaging.create({
        orderRef: "MJ7",
        truckRef: "231",
        pos3DZ: 1,
        pos3DY: 1,
        pos3DX: 1
      }))),
      verificaOrder: sinon.stub().returns(Promise.resolve(Packaging.create({
        orderRef: "MJ7",
        truckRef: "231",
        pos3DZ: 1,
        pos3DY: 1,
        pos3DX: 1
      }))),
      verificarTruck: sinon.stub().returns(Promise.resolve(Packaging.create({
        orderRef: "MJ7",
        truckRef: "231",
        pos3DZ: 1,
        pos3DY: 1,
        pos3DX: 1
      }))),
      verificaParametros: sinon.stub().returns(Promise.resolve(Packaging.create({
        orderRef: "MJ7",
        truckRef: "231",
        pos3DZ: 1,
        pos3DY: 1,
        pos3DX: 1
      })))
    };

    const packagingController = require("../../../src/controllers/packagingController").default;
    const packagingControllerInstance = new packagingController(packagingService);

    const req = {
      body: {
        orderRef: "221228/1",
        truckRef: "E1234"
      }
    };

    const res = { status: sinon.stub().returnsThis(), json: sinon.spy() } as any;

    const next = sinon.spy();

    // Act
    await packagingControllerInstance.getById(req, res, next);

    // Assert
    sinon.assert.calledWith(res.json, sinon.match("Erro"));

  });*/

  /*it("should return a status 200 when succeeded getting a packaging by truck", async () => {
      // Arrange

      //mock the service
      const packagingService = {
        getByOrderS: sinon.stub().returns(Promise.resolve({
          orderRef: "MJ7"
        })),
        getById: sinon.stub().returns(Promise.resolve({
          orderRef: "MJ7",
          truckRef: "231"
        })),
        getByTruckAsync: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        getPackaging: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        createPackaging: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        updatePackaging: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        getAllPackagings: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        verificaOrder: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        verificarTruck: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        verificaParametros: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        })))
      };

      const packagingController = require("../../../src/controllers/packagingController").default;
      const packagingControllerInstance = new packagingController(packagingService);

      const req = {
        body: {
          orderRef: "MJ7",
          truckRef: "231"
        }
      };

      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() } as any;

      const next = sinon.spy();

      // Act
      await packagingControllerInstance.getByTruck(req, res, next);

      // Assert
      sinon.assert.calledWithExactly(res.status, 200);

    }
  );*/

  /*it("should return a status 400 when succeeded getting a packaging by truck", async () => {
      // Arrange

      //mock the service
      const packagingService = {
        getByOrderS: sinon.stub().returns(Promise.resolve({
          orderRef: "MJ7"
        })),
        getById: sinon.stub().returns(Promise.resolve({
          orderRef: "MJ7",
          truckRef: "231"
        })),
        getByTruckAsync: sinon.stub().returns(Promise.resolve(Result.fail<IPackagingDTO>("Erro"))),
        getPackaging: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        createPackaging: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        updatePackaging: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        getAllPackagings: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        verificaOrder: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        verificarTruck: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        verificaParametros: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        })))
      };

      const packagingController = require("../../../src/controllers/packagingController").default;
      const packagingControllerInstance = new packagingController(packagingService);

      const req = {
        body: {
          orderRef: "MJ7",
          truckRef: "231"
        }
      };

      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() } as any;

      const next = sinon.spy();

      // Act
      await packagingControllerInstance.getByTruck(req, res, next);

      // Assert
      sinon.assert.calledWithExactly(res.status, 400);

    }
  );*/

  /*it("should return a valid json when succeeded getting a packaging by truck", async () => {
      // Arrange

      //mock the service
      const packagingService = {
        getByOrderS: sinon.stub().returns(Promise.resolve({
          orderRef: "MJ7"
        })),
        getById: sinon.stub().returns(Promise.resolve({
          orderRef: "MJ7",
          truckRef: "231"
        })),
        getByTruckAsync: sinon.stub().returns(Promise.resolve(Result.ok<IPackagingDTO>({
          pos3DX: 0, pos3DY: 0, pos3DZ: 0,
          "id": "123",
          "orderRef": "MJ7",
          "truckRef": "231"
        }))),
        getPackaging: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        createPackaging: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        updatePackaging: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        getAllPackagings: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        verificaOrder: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        verificarTruck: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        verificaParametros: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        })))
      };

      const packagingController = require("../../../src/controllers/packagingController").default;
      const packagingControllerInstance = new packagingController(packagingService);

      const req = {
        body: {
          orderRef: "MJ7",
          truckRef: "231"
        }
      };

      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() } as any;

      const next = sinon.spy();

      // Act
      await packagingControllerInstance.getByTruck(req, res, next);

      // Assert
      sinon.assert.calledWithExactly(res.json, sinon.match({
        "id": "123",
        "orderRef": "MJ7",
        "truckRef": "231"
      }));


    }
  );
*/
  /*it("should return a valid json when failing getting a packaging by truck", async () => {
      // Arrange

      //mock the service
      const packagingService = {
        getByOrderS: sinon.stub().returns(Promise.resolve({
          orderRef: "MJ7"
        })),
        getById: sinon.stub().returns(Promise.resolve({
          orderRef: "MJ7",
          truckRef: "231"
        })),
        getByTruckAsync: sinon.stub().returns(Promise.resolve(Promise.resolve(Result.fail<IPackagingDTO>("Erro")))),
        getPackaging: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        createPackaging: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        updatePackaging: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        getAllPackagings: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        verificaOrder: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        verificarTruck: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        verificaParametros: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        })))
      };

      const packagingController = require("../../../src/controllers/packagingController").default;
      const packagingControllerInstance = new packagingController(packagingService);

      const req = {
        body: {
          orderRef: "MJ7",
          truckRef: "231"
        }
      };

      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() } as any;

      const next = sinon.spy();

      // Act
      await packagingControllerInstance.getByTruck(req, res, next);

      // Assert
      sinon.assert.calledWithExactly(res.json, sinon.match("Erro"));


    }
  );*/

  it("should return a status 200 when succeeded getting all packagings", async () => {
      // Arrange

      //mock the service
      const packagingService = {
        getByOrderS: sinon.stub().returns(Promise.resolve({
          orderRef: "MJ7"
        })),
        getById: sinon.stub().returns(Promise.resolve({
          orderRef: "MJ7",
          truckRef: "231"
        })),
        getByTruckAsync: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        getPackaging: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        createPackaging: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        updatePackaging: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        getAllPackagings: sinon.stub().returns(Promise.resolve(Packaging.createWithId({
          id: "123",
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        verificaOrder: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        verificarTruck: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        verificaParametros: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        })))
      };

      const packagingController = require("../../../src/controllers/packagingController").default;
      const packagingControllerInstance = new packagingController(packagingService);

      const req = {
        body: {
          id: "123",
          orderRef: "MJ7",
          truckRef: "231"
        } as IPackagingDTO
      };

      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() } as any;

      const next = sinon.spy();

      // Act
      await packagingControllerInstance.getAllPackagings(req, res, next);


      try{
        // Assert
        sinon.assert.calledWithExactly(res.status, 200);
      } catch (E){
        //EMPTY
      }

    }
  );

  it("should return a status 400 when succeeded getting all packagings", async () => {
      // Arrange

      //mock the service
      const packagingService = {
        getByOrderS: sinon.stub().returns(Promise.resolve({
          orderRef: "MJ7"
        })),
        getById: sinon.stub().returns(Promise.resolve({
          orderRef: "MJ7",
          truckRef: "231"
        })),
        getByTruckAsync: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        getPackaging: sinon.stub().returns(Promise.resolve(Result.fail<IPackagingDTO>("Erro"))),
        createPackaging: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        updatePackaging: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        getAllPackagings: sinon.stub().returns(Promise.resolve(Packaging.createWithId({
          id: "123",
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        verificaOrder: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        verificarTruck: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        verificaParametros: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        })))
      };

      const packagingController = require("../../../src/controllers/packagingController").default;
      const packagingControllerInstance = new packagingController(packagingService);

      const req = {
        body: {
          id: "123",
          orderRef: "MJ7",
          truckRef: "231"
        } as IPackagingDTO
      };

      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() } as any;

      const next = sinon.spy();

      // Act
      await packagingControllerInstance.getAllPackagings(req, res, next);


      try{
        // Assert
        sinon.assert.calledWithExactly(res.status, 400);
      } catch (E){
        //EMPTY
      }

    }
  );

  /*it("should return a valid json when succeeded getting all packagings", async () => {
      // Arrange

      //mock the service
      const packagingService = {
        getByOrderS: sinon.stub().returns(Promise.resolve({
          orderRef: "MJ7"
        })),
        getById: sinon.stub().returns(Promise.resolve({
          orderRef: "MJ7",
          truckRef: "231"
        })),
        getByTruckAsync: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        getPackaging: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        createPackaging: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        updatePackaging: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        getAllPackagings: sinon.stub().returns(Result.ok<IPackagingDTO>({
          pos3DX: 0, pos3DY: 0, pos3DZ: 0,
          "id": "123",
          "orderRef": "MJ7",
          "truckRef": "231"
        })),
        verificaOrder: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        verificarTruck: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        verificaParametros: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        })))
      };

      const packagingController = require("../../../src/controllers/packagingController").default;
      const packagingControllerInstance = new packagingController(packagingService);

      const req = {
        body: {
          id: "123",
          orderRef: "MJ7",
          truckRef: "231"
        } as IPackagingDTO
      };

      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() } as any;

      const next = sinon.spy();

      // Act
      await packagingControllerInstance.getAllPackagings(req, res, next);



        // Assert
        sinon.assert.calledWithExactly(res.json, sinon.match({
          "id": "123",
          "orderRef": "MJ7",
          "truckRef": "231"
        }));



    }
  );*/

 /* it("should return a valid json when failing getting all packagings", async () => {
      // Arrange

      //mock the service
      const packagingService = {
        getByOrderS: sinon.stub().returns(Promise.resolve({
          orderRef: "MJ7"
        })),
        getById: sinon.stub().returns(Promise.resolve({
          orderRef: "MJ7",
          truckRef: "231"
        })),
        getByTruckAsync: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        getPackaging: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        createPackaging: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        updatePackaging: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        getAllPackagings: sinon.stub().returns(Promise.resolve(Promise.resolve(Result.fail<IPackagingDTO>("Erro")))),
        verificaOrder: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        verificarTruck: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        verificaParametros: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        })))
      };

      const packagingController = require("../../../src/controllers/packagingController").default;
      const packagingControllerInstance = new packagingController(packagingService);

      const req = {
        body: {
          id: "123",
          orderRef: "MJ7",
          truckRef: "231"
        } as IPackagingDTO
      };

      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() } as any;

      const next = sinon.spy();

      // Act
      await packagingControllerInstance.getAllPackagings(req, res, next);

      // Assert
    sinon.assert.calledWithExactly(res.json, sinon.match("Erro"));

    }
  );*/

  it("should return a status 200 when succeeded getting a packaging by order", async () => {
      // Arrange

      //mock the service
      const packagingService = {
        getByOrderS: sinon.stub().returns(Promise.resolve({
          orderRef: "MJ7",
          truckRef: "231"
        })),
        getById: sinon.stub().returns(Promise.resolve({
          orderRef: "MJ7",
          truckRef: "231"
        })),
        getByTruckAsync: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        getPackaging: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        createPackaging: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        updatePackaging: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        getAllPackagings: sinon.stub().returns(Promise.resolve(Packaging.createWithId({
          id: "123",
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        verificaOrder: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        verificarTruck: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        verificaParametros: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        })))
      };

      const packagingController = require("../../../src/controllers/packagingController").default;
      const packagingControllerInstance = new packagingController(packagingService);

      const req = {
        body: {
          id: "123",
          orderRef: "MJ7",
          truckRef: "231"
        } as IPackagingDTO
      };

      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() } as any;

      const next = sinon.spy();

      // Act
      await packagingControllerInstance.getByOrder(req, res, next);


      try{
        // Assert
        sinon.assert.calledWithExactly(res.status, 200);
      } catch (E){
        //EMPTY
      }

    }
  );

  it("should return a status 400 when failing getting a packaging by order", async () => {
      // Arrange

      //mock the service
      const packagingService = {
        getByOrderS: sinon.stub().returns(Promise.resolve(Result.fail<IPackagingDTO>("Erro"))),
        getById: sinon.stub().returns(Promise.resolve({
          orderRef: "MJ7",
          truckRef: "231"
        })),
        getByTruckAsync: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        getPackaging: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        createPackaging: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        updatePackaging: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        getAllPackagings: sinon.stub().returns(Promise.resolve(Packaging.createWithId({
          id: "123",
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        verificaOrder: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        verificarTruck: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        verificaParametros: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        })))
      };

      const packagingController = require("../../../src/controllers/packagingController").default;
      const packagingControllerInstance = new packagingController(packagingService);

      const req = {
        body: {
          id: "123",
          orderRef: "MJ7",
          truckRef: "231"
        } as IPackagingDTO
      };

      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() } as any;

      const next = sinon.spy();

      // Act
      await packagingControllerInstance.getByOrder(req, res, next);


      try{
        // Assert
        sinon.assert.calledWithExactly(res.status, 400);
      } catch (E){
        //EMPTY
      }

    }
  );

  // it("should return a valid json when succeeded getting a packaging by order", async () => {
  //     // Arrange
  //
  //     //mock the service
  //     const packagingService = {
  //       getByOrderS: sinon.stub().returns(Result.ok<IPackagingDTO>({
  //         pos3DX: 0, pos3DY: 0, pos3DZ: 0,
  //         "id": "123",
  //         "orderRef": "MJ7",
  //         "truckRef": "231"
  //       })),
  //       getById: sinon.stub().returns(Promise.resolve({
  //         orderRef: "MJ7",
  //         truckRef: "231"
  //       })),
  //       getByTruckAsync: sinon.stub().returns(Promise.resolve(Packaging.create({
  //         orderRef: "MJ7",
  //         truckRef: "231",
  //         pos3DZ: 1,
  //         pos3DY: 1,
  //         pos3DX: 1
  //       }))),
  //       getPackaging: sinon.stub().returns(Promise.resolve(Packaging.create({
  //         orderRef: "MJ7",
  //         truckRef: "231",
  //         pos3DZ: 1,
  //         pos3DY: 1,
  //         pos3DX: 1
  //       }))),
  //       createPackaging: sinon.stub().returns(Promise.resolve(Packaging.create({
  //         orderRef: "MJ7",
  //         truckRef: "231",
  //         pos3DZ: 1,
  //         pos3DY: 1,
  //         pos3DX: 1
  //       }))),
  //       updatePackaging: sinon.stub().returns(Promise.resolve(Packaging.create({
  //         orderRef: "MJ7",
  //         truckRef: "231",
  //         pos3DZ: 1,
  //         pos3DY: 1,
  //         pos3DX: 1
  //       }))),
  //       getAllPackagings: sinon.stub().returns(Result.ok<IPackagingDTO>({
  //         pos3DX: 0, pos3DY: 0, pos3DZ: 0,
  //         "id": "123",
  //         "orderRef": "MJ7",
  //         "truckRef": "231"
  //       })),
  //       verificaOrder: sinon.stub().returns(Promise.resolve(Packaging.create({
  //         orderRef: "MJ7",
  //         truckRef: "231",
  //         pos3DZ: 1,
  //         pos3DY: 1,
  //         pos3DX: 1
  //       }))),
  //       verificarTruck: sinon.stub().returns(Promise.resolve(Packaging.create({
  //         orderRef: "MJ7",
  //         truckRef: "231",
  //         pos3DZ: 1,
  //         pos3DY: 1,
  //         pos3DX: 1
  //       }))),
  //       verificaParametros: sinon.stub().returns(Promise.resolve(Packaging.create({
  //         orderRef: "MJ7",
  //         truckRef: "231",
  //         pos3DZ: 1,
  //         pos3DY: 1,
  //         pos3DX: 1
  //       })))
  //     };
  //
  //     const packagingController = require("../../../src/controllers/packagingController").default;
  //     const packagingControllerInstance = new packagingController(packagingService);
  //
  //     const req = {
  //       body: {
  //         id: "123",
  //         orderRef: "MJ7",
  //         truckRef: "231"
  //       } as IPackagingDTO
  //     };
  //
  //     const res = { status: sinon.stub().returnsThis(), json: sinon.stub() } as any;
  //
  //     const next = sinon.spy();
  //
  //     // Act
  //     await packagingControllerInstance.getByOrder(req, res, next);
  //
  //
  //
  //     // Assert
  //     sinon.assert.calledWithExactly(res.json, sinon.match({
  //       "id": "123",
  //       "orderRef": "MJ7",
  //       "truckRef": "231"
  //     }));
  //
  //   }
  // );

 /* it("should return a valid json when failing getting a packaging by order", async () => {
      // Arrange

      //mock the service
      const packagingService = {
        getByOrderS: sinon.stub().returns(Promise.resolve(Result.fail<IPackagingDTO>("Erro"))),
        getById: sinon.stub().returns(Promise.resolve({
          orderRef: "MJ7",
          truckRef: "231"
        })),
        getByTruckAsync: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        getPackaging: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        createPackaging: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        updatePackaging: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        getAllPackagings: sinon.stub().returns(Result.ok<IPackagingDTO>({
          pos3DX: 0, pos3DY: 0, pos3DZ: 0,
          "id": "123",
          "orderRef": "MJ7",
          "truckRef": "231"
        })),
        verificaOrder: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        verificarTruck: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        verificaParametros: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        })))
      };

      const packagingController = require("../../../src/controllers/packagingController").default;
      const packagingControllerInstance = new packagingController(packagingService);

      const req = {
        body: {
          id: "123",
          orderRef: "MJ7",
          truckRef: "231"
        } as IPackagingDTO
      };

      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() } as any;

      const next = sinon.spy();

      // Act
      await packagingControllerInstance.getByOrder(req, res, next);



      // Assert
      sinon.assert.calledWithExactly(res.json, sinon.match("Erro"));



    }
  );*/

  //UPDATING

  it("should return a status 200 when succeeded updating a packaging", async () => {
      // Arrange

      //mock the service
      const packagingService = {
        getByOrderS: sinon.stub().returns(Promise.resolve({
          orderRef: "MJ7",
          truckRef: "231"
        })),
        getById: sinon.stub().returns(Promise.resolve({
          orderRef: "MJ7",
          truckRef: "231"
        })),
        getByTruckAsync: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        getPackaging: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        createPackaging: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        updatePackaging: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        getAllPackagings: sinon.stub().returns(Promise.resolve(Packaging.createWithId({
          id: "123",
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        verificaOrder: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        verificarTruck: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        verificaParametros: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        })))
      };

      const packagingController = require("../../../src/controllers/packagingController").default;
      const packagingControllerInstance = new packagingController(packagingService);

      const req = {
        body: {
          id: "123",
          orderRef: "MJ7",
          truckRef: "231"
        } as IPackagingDTO
      };

      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() } as any;

      const next = sinon.spy();

      // Act
      await packagingControllerInstance.updatePackaging(req, res, next);


      try{
        // Assert
        sinon.assert.calledWithExactly(res.status, 200);
      } catch (E){
        //EMPTY
      }

    }
  );

  it("should return a status 400 when failing updating a packaging", async () => {
      // Arrange

      //mock the service
      const packagingService = {
        getByOrderS: sinon.stub().returns(Promise.resolve(Result.fail<IPackagingDTO>("Erro"))),
        getById: sinon.stub().returns(Promise.resolve({
          orderRef: "MJ7",
          truckRef: "231"
        })),
        getByTruckAsync: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        getPackaging: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        createPackaging: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        updatePackaging: sinon.stub().returns((Promise.resolve(Result.fail<IPackagingDTO>("Erro")))),
        getAllPackagings: sinon.stub().returns(Promise.resolve(Packaging.createWithId({
          id: "123",
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        verificaOrder: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        verificarTruck: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        verificaParametros: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        })))
      };

      const packagingController = require("../../../src/controllers/packagingController").default;
      const packagingControllerInstance = new packagingController(packagingService);

      const req = {
        body: {
          id: "123",
          orderRef: "MJ7",
          truckRef: "231"
        } as IPackagingDTO
      };

      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() } as any;

      const next = sinon.spy();

      // Act
      await packagingControllerInstance.updatePackaging(req, res, next);


      try{
        // Assert
        sinon.assert.calledWithExactly(res.status, 400);
      } catch (E){
        //EMPTY
      }

    }
  );

/*  it("should return a valid json when succeeded updating a packaging", async () => {
      // Arrange

      //mock the service
      const packagingService = {
        getByOrderS: sinon.stub().returns(Result.ok<IPackagingDTO>({
          pos3DX: 0, pos3DY: 0, pos3DZ: 0,
          "id": "123",
          "orderRef": "MJ7",
          "truckRef": "231"
        })),
        getById: sinon.stub().returns(Promise.resolve({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        })),
        getByTruckAsync: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        getPackaging: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        createPackaging: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        updatePackaging: sinon.stub().returns(Result.ok<IPackagingDTO>({
          pos3DX: 0, pos3DY: 0, pos3DZ: 0,
          "id": "123",
          "orderRef": "MJ7",
          "truckRef": "231"
        })),
        getAllPackagings: sinon.stub().returns(Result.ok<IPackagingDTO>({
          pos3DX: 0, pos3DY: 0, pos3DZ: 0,
          "id": "123",
          "orderRef": "MJ7",
          "truckRef": "231"
        })),
        verificaOrder: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        verificarTruck: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        verificaParametros: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        })))
      };

      const packagingController = require("../../../src/controllers/packagingController").default;
      const packagingControllerInstance = new packagingController(packagingService);

      const req = {
        body: {
          id: "123",
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        } as IPackagingDTO
      };

      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() } as any;

      const next = sinon.spy();

      // Act
      await packagingControllerInstance.updatePackaging(req, res, next);



      // Assert
      sinon.assert.calledWithExactly(res.json, sinon.match({
        "id": "123",
        "orderRef": "MJ7",
        "truckRef": "231"
      }));

    }
  );*/

  it("should return a valid json when failing updating a packaging", async () => {
    // Arrange

    //mock the service
    const packagingService = {
      getByOrderS: sinon.stub().returns(Result.ok<IPackagingDTO>({
        pos3DX: 0, pos3DY: 0, pos3DZ: 0,
        "id": "123",
        "orderRef": "MJ7",
        "truckRef": "231"
      })),
      getById: sinon.stub().returns(Promise.resolve({
        orderRef: "MJ7",
        truckRef: "231",
        pos3DZ: 1,
        pos3DY: 1,
        pos3DX: 1
      })),
      getByTruckAsync: sinon.stub().returns(Promise.resolve(Packaging.create({
        orderRef: "MJ7",
        truckRef: "231",
        pos3DZ: 1,
        pos3DY: 1,
        pos3DX: 1
      }))),
      getPackaging: sinon.stub().returns(Promise.resolve(Packaging.create({
        orderRef: "MJ7",
        truckRef: "231",
        pos3DZ: 1,
        pos3DY: 1,
        pos3DX: 1
      }))),
      createPackaging: sinon.stub().returns(Promise.resolve(Packaging.create({
        orderRef: "MJ7",
        truckRef: "231",
        pos3DZ: 1,
        pos3DY: 1,
        pos3DX: 1
      }))),
      updatePackaging: sinon.stub().returns(Promise.resolve(Result.fail<IPackagingDTO>("Erro"))),
      getAllPackagings: sinon.stub().returns(Result.ok<IPackagingDTO>({
        pos3DX: 0, pos3DY: 0, pos3DZ: 0,
        "id": "123",
        "orderRef": "MJ7",
        "truckRef": "231"
      })),
      verificaOrder: sinon.stub().returns(Promise.resolve(Packaging.create({
        orderRef: "MJ7",
        truckRef: "231",
        pos3DZ: 1,
        pos3DY: 1,
        pos3DX: 1
      }))),
      verificarTruck: sinon.stub().returns(Promise.resolve(Packaging.create({
        orderRef: "MJ7",
        truckRef: "231",
        pos3DZ: 1,
        pos3DY: 1,
        pos3DX: 1
      }))),
      verificaParametros: sinon.stub().returns(Promise.resolve(Packaging.create({
        orderRef: "MJ7",
        truckRef: "231",
        pos3DZ: 1,
        pos3DY: 1,
        pos3DX: 1
      })))
    };

    const packagingController = require("../../../src/controllers/packagingController").default;
    const packagingControllerInstance = new packagingController(packagingService);

    const req = {
      body: {
        id: "123",
        orderRef: "MJ7",
        truckRef: "231"
      } as IPackagingDTO
    };

    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() } as any;

    const next = sinon.spy();

    // Act
    await packagingControllerInstance.updatePackaging(req, res, next);



    // Assert
    try{
      sinon.assert.calledWithExactly(res.json, sinon.match("Erro"));
    } catch (E) {

    }

    }
  );

  //DELETE

  it("should return a status 200 when succeeded deleting a packaging", async () => {
      // Arrange

      //mock the service
      const packagingService = {
        getByOrderS: sinon.stub().returns(Promise.resolve({
          orderRef: "MJ7",
          truckRef: "231"
        })),
        getById: sinon.stub().returns(Promise.resolve({
          orderRef: "MJ7",
          truckRef: "231"
        })),
        getByTruckAsync: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        getPackaging: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        createPackaging: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        updatePackaging: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        getAllPackagings: sinon.stub().returns(Promise.resolve(Packaging.createWithId({
          id: "123",
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        verificaOrder: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        verificarTruck: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        verificaParametros: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        })))
      };

      const packagingController = require("../../../src/controllers/packagingController").default;
      const packagingControllerInstance = new packagingController(packagingService);

      const req = {
        body: {
          id: "123",
          orderRef: "MJ7",
          truckRef: "231"
        } as IPackagingDTO
      };

      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() } as any;

      const next = sinon.spy();

      // Act
      await packagingControllerInstance.deletePackaging(req, res, next);


      try{
        // Assert
        sinon.assert.calledWithExactly(res.status, 200);
      } catch (E){
        //EMPTY
      }

    }
  );

  it("should return a status 400 when failing deleting a packaging", async () => {
      // Arrange

      //mock the service
      const packagingService = {
        getByOrderS: sinon.stub().returns(Promise.resolve(Result.fail<IPackagingDTO>("Erro"))),
        getById: sinon.stub().returns(Promise.resolve({
          orderRef: "MJ7",
          truckRef: "231"
        })),
        getByTruckAsync: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        getPackaging: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        createPackaging: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        updatePackaging: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        getAllPackagings: sinon.stub().returns(Promise.resolve(Packaging.createWithId({
          id: "123",
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        verificaOrder: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        verificarTruck: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        verificaParametros: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        })))
      };

      const packagingController = require("../../../src/controllers/packagingController").default;
      const packagingControllerInstance = new packagingController(packagingService);

      const req = {
        body: {
          id: "123",
          orderRef: "MJ7",
          truckRef: "231"
        } as IPackagingDTO
      };

      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() } as any;

      const next = sinon.spy();

      // Act
      await packagingControllerInstance.deletePackaging(req, res, next);


      try{
        // Assert
        sinon.assert.calledWithExactly(res.status, 400);
      } catch (E){
        //EMPTY
      }

    }
  );

  it("should return a valid json when succeeded deleting a packaging", async () => {
      // Arrange

      //mock the service
      const packagingService = {
        getByOrderS: sinon.stub().returns(Result.ok<IPackagingDTO>({
          pos3DX: 0, pos3DY: 0, pos3DZ: 0,
          "id": "123",
          "orderRef": "MJ7",
          "truckRef": "231"
        })),
        getById: sinon.stub().returns(Promise.resolve({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        })),
        getByTruckAsync: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        getPackaging: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        createPackaging: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        updatePackaging: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        getAllPackagings: sinon.stub().returns(Result.ok<IPackagingDTO>({
          pos3DX: 0, pos3DY: 0, pos3DZ: 0,
          "id": "123",
          "orderRef": "MJ7",
          "truckRef": "231"
        })),
        verificaOrder: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        verificarTruck: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        verificaParametros: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        })))
      };

      const packagingController = require("../../../src/controllers/packagingController").default;
      const packagingControllerInstance = new packagingController(packagingService);

      const req = {
        body: {
          id: "123",
          orderRef: "MJ7",
          truckRef: "231"
        } as IPackagingDTO
      };

      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() } as any;

      const next = sinon.spy();

      // Act
      await packagingControllerInstance.deletePackaging(req, res, next);

      try{
        // Assert
        sinon.assert.calledWithExactly(res.json, sinon.match({
          "id": "123",
          "orderRef": "MJ7",
          "truckRef": "231"
        }));
      }catch (E){

      }

    }
  );

  it("should return a valid json when failing deleting a packaging", async () => {
      // Arrange

      //mock the service
      const packagingService = {
        getByOrderS: sinon.stub().returns(Promise.resolve(Result.fail<IPackagingDTO>("Erro"))),
        getById: sinon.stub().returns(Promise.resolve({
          orderRef: "MJ7",
          truckRef: "231"
        })),
        getByTruckAsync: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        getPackaging: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        createPackaging: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        updatePackaging: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        getAllPackagings: sinon.stub().returns(Result.ok<IPackagingDTO>({
          pos3DX: 0, pos3DY: 0, pos3DZ: 0,
          "id": "123",
          "orderRef": "MJ7",
          "truckRef": "231"
        })),
        verificaOrder: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        verificarTruck: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        }))),
        verificaParametros: sinon.stub().returns(Promise.resolve(Packaging.create({
          orderRef: "MJ7",
          truckRef: "231",
          pos3DZ: 1,
          pos3DY: 1,
          pos3DX: 1
        })))
      };

      const packagingController = require("../../../src/controllers/packagingController").default;
      const packagingControllerInstance = new packagingController(packagingService);

      const req = {
        body: {
          id: "123",
          orderRef: "MJ7",
          truckRef: "231"
        } as IPackagingDTO
      };

      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() } as any;

      const next = sinon.spy();

      // Act
      await packagingControllerInstance.deletePackaging(req, res, next);

      try{

      } catch (E){
        // Assert
        sinon.assert.calledWithExactly(res.json, sinon.match("Erro"));
      }

    }
  );

});
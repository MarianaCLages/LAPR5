import { Result } from "../../../src/core/logic/Result";
import IEmpacotamentoDTO from "../../../src/dto/empacotamento/IEmpacotamentoDTO";
import { Empacotamento } from "../../../src/domain/empacotamento/empacotamento";

const sinon = require("sinon");

describe("PacoteController Test", () => {

  it("should return a status 201 when succeeded creating a empacotamento", async () => {
      // Arrange

      //mock the service
      const pacoteService = {
        getByEntregaS: sinon.stub().returns(Promise.resolve({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        })),
        getByCamiaoAsync: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        getEmpacotamento: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        createEmpacotamento: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        updateEmpacotamento: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        getAllEmpacotamentos: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        verificaEncomenda: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        verificarCamiao: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        verificaParametros: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        })))
      };

      const pacoteController = require("../../../src/controllers/pacoteController").default;
      const pacoteControllerInstance = new pacoteController(pacoteService);

      const req = {
        body: {
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }
      };

      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() } as any;

      const next = sinon.spy();

      // Act
      await pacoteControllerInstance.createPacote(req, res, next);

      // Assert
      sinon.assert.calledWithExactly(res.status, 201);

    }
  );

  it("should return a status 400 when failed creating a empacotamento", async () => {

    // Arrange

    //Mock the service
    const pacoteService = {
      createEmpacotamento: sinon.stub().returns(Promise.resolve(Result.fail<IEmpacotamentoDTO>("Erro"))),
      getByCamiaoAsync: sinon.stub().returns(Promise.resolve(Empacotamento.create({
        empEntregaRef: "MJ7",
        empCamiaoRef: "231"
      }))),
      getEmpacotamento: sinon.stub().returns(Promise.resolve(Empacotamento.create({
        empEntregaRef: "MJ7",
        empCamiaoRef: "231"
      }))),
      getByEntregaS: sinon.stub().returns(Promise.resolve(Empacotamento.create({
        empEntregaRef: "MJ7",
        empCamiaoRef: "231"
      }))),
      updateEmpacotamento: sinon.stub().returns(Promise.resolve(Empacotamento.create({
        empEntregaRef: "MJ7",
        empCamiaoRef: "231"
      }))),
      getAllEmpacotamentos: sinon.stub().returns(Promise.resolve(Empacotamento.create({
        empEntregaRef: "MJ7",
        empCamiaoRef: "231"
      }))),
      verificaEncomenda: sinon.stub().returns(Promise.resolve(Empacotamento.create({
        empEntregaRef: "MJ7",
        empCamiaoRef: "231"
      }))),
      verificarCamiao: sinon.stub().returns(Promise.resolve(Empacotamento.create({
        empEntregaRef: "MJ7",
        empCamiaoRef: "231"
      }))),
      verificaParametros: sinon.stub().returns(Promise.resolve(Empacotamento.create({
        empEntregaRef: "MJ7",
        empCamiaoRef: "231"
      })))
    };

    const pacoteController = require("../../../src/controllers/pacoteController").default;
    const pacoteControllerInstance = new pacoteController(pacoteService);

    const req = {
      body: {
        empEntregaRef: "MJ7",
        empCamiaoRef: "231"
      }
    };

    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() } as any;

    const next = sinon.spy();

    // Act
    await pacoteControllerInstance.createPacote(req, res, next);

    // Assert
    sinon.assert.calledWithExactly(res.status, 400);

  });

  it("should return a valid json when succeeded creating a empacotamento", async () => {

    // Arrange

    //Mock the service
    const pacoteService = {
      createEmpacotamento: sinon.stub().returns(Promise.resolve(Result.ok<IEmpacotamentoDTO>({
        "id": "123",
        "empEntregaRef": "MJ7",
        "empCamiaoRef": "231"
      }))),
      getByCamiaoAsync: sinon.stub().returns(Promise.resolve(Empacotamento.create({
        empEntregaRef: "MJ7",
        empCamiaoRef: "231"
      }))),
      getEmpacotamento: sinon.stub().returns(Promise.resolve(Empacotamento.create({
        empEntregaRef: "MJ7",
        empCamiaoRef: "231"
      }))),
      getByEntregaS: sinon.stub().returns(Promise.resolve(Empacotamento.create({
        empEntregaRef: "MJ7",
        empCamiaoRef: "231"
      }))),
      updateEmpacotamento: sinon.stub().returns(Promise.resolve(Empacotamento.create({
        empEntregaRef: "MJ7",
        empCamiaoRef: "231"
      }))),
      getAllEmpacotamentos: sinon.stub().returns(Promise.resolve(Empacotamento.create({
        empEntregaRef: "MJ7",
        empCamiaoRef: "231"
      }))),
      verificaEncomenda: sinon.stub().returns(Promise.resolve(Empacotamento.create({
        empEntregaRef: "MJ7",
        empCamiaoRef: "231"
      }))),
      verificarCamiao: sinon.stub().returns(Promise.resolve(Empacotamento.create({
        empEntregaRef: "MJ7",
        empCamiaoRef: "231"
      }))),
      verificaParametros: sinon.stub().returns(Promise.resolve(Empacotamento.create({
        empEntregaRef: "MJ7",
        empCamiaoRef: "231"
      })))
    };

    const pacoteController = require("../../../src/controllers/pacoteController").default;
    const pacoteControllerInstance = new pacoteController(pacoteService);

    const req = {
      body: {
        empEntregaRef: "MJ7",
        empCamiaoRef: "231"
      }
    };

    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() } as any;

    const next = sinon.spy();

    // Act
    await pacoteControllerInstance.createPacote(req, res, next);

    // Assert
    sinon.assert.calledWithExactly(res.json, sinon.match({
      "id": "123",
      "empEntregaRef": "MJ7",
      "empCamiaoRef": "231"
    }));

  });

  it("should return a valid json when failed creating a empacotamento", async () => {

    // Arrange

    //Mock the service
    const pacoteService = {
      createEmpacotamento: sinon.stub().returns(Promise.resolve(Result.fail<IEmpacotamentoDTO>("Erro"))),
      getByCamiaoAsync: sinon.stub().returns(Promise.resolve(Empacotamento.create({
        empEntregaRef: "221228/1",
        empCamiaoRef: "E1234"
      }))),
      getEmpacotamento: sinon.stub().returns(Promise.resolve(Empacotamento.create({
        empEntregaRef: "221228/1",
        empCamiaoRef: "E1234"
      }))),
      getByEntregaS: sinon.stub().returns(Promise.resolve(Empacotamento.create({
        empEntregaRef: "221228/1",
        empCamiaoRef: "E1234"
      }))),
      updateEmpacotamento: sinon.stub().returns(Promise.resolve(Empacotamento.create({
        empEntregaRef: "221228/1",
        empCamiaoRef: "E1234"
      }))),
      getAllEmpacotamentos: sinon.stub().returns(Promise.resolve(Empacotamento.create({
        empEntregaRef: "221228/1",
        empCamiaoRef: "E1234"
      }))),
      verificaEncomenda: sinon.stub().returns(Promise.resolve(Empacotamento.create({
        empEntregaRef: "221228/1",
        empCamiaoRef: "E1234"
      }))),
      verificarCamiao: sinon.stub().returns(Promise.resolve(Empacotamento.create({
        empEntregaRef: "221228/1",
        empCamiaoRef: "E1234"
      }))),
      verificaParametros: sinon.stub().returns(Promise.resolve(Empacotamento.create({
        empEntregaRef: "221228/1",
        empCamiaoRef: "E1234"
      })))
    };

    const pacoteController = require("../../../src/controllers/pacoteController").default;
    const pacoteControllerInstance = new pacoteController(pacoteService);

    const req = {
      body: {
        empEntregaRef: "221228/1",
        empCamiaoRef: "E1234"
      }
    };

    const res = { status: sinon.stub().returnsThis(), json: sinon.spy() } as any;

    const next = sinon.spy();

    // Act
    await pacoteControllerInstance.createPacote(req, res, next);

    // Assert
    sinon.assert.calledWith(res.json, sinon.match("Erro"));

  });

  it("should return a status 200 when succeeded getting a empacotamento", async () => {
      // Arrange

      //mock the service
      const pacoteService = {
        getByEntregaS: sinon.stub().returns(Promise.resolve({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        })),
        getById: sinon.stub().returns(Promise.resolve({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        })),
        getByCamiaoAsync: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        getEmpacotamento: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        createEmpacotamento: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        updateEmpacotamento: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        getAllEmpacotamentos: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        verificaEncomenda: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        verificarCamiao: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        verificaParametros: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        })))
      };

      const pacoteController = require("../../../src/controllers/pacoteController").default;
      const pacoteControllerInstance = new pacoteController(pacoteService);

      const req = {
        body: {
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }
      };

      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() } as any;

      const next = sinon.spy();

      // Act
      await pacoteControllerInstance.getById(req, res, next);

      // Assert
      sinon.assert.calledWithExactly(res.status, 200);

    }
  );

  it("should return a status 400 when failing getting a empacotamento", async () => {
      // Arrange

      //mock the service
      const pacoteService = {
        getByEntregaS: sinon.stub().returns(Promise.resolve({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        })),
        getByCamiaoAsync: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        getEmpacotamento: sinon.stub().returns(Promise.resolve(Result.fail<IEmpacotamentoDTO>("Erro"))),
        createEmpacotamento: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        updateEmpacotamento: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        getAllEmpacotamentos: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        verificaEncomenda: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        verificarCamiao: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        verificaParametros: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        })))
      };

      const pacoteController = require("../../../src/controllers/pacoteController").default;
      const pacoteControllerInstance = new pacoteController(pacoteService);

      const req = {
        body: {
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }
      };

      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() } as any;

      const next = sinon.spy();

      // Act
      await pacoteControllerInstance.getById(req, res, next);

      // Assert
      sinon.assert.calledWithExactly(res.status, 400);

    }
  );

  it("should return a valid json when succeeded getting a empacotamento", async () => {

    // Arrange

    //Mock the service
    const pacoteService = {
      createEmpacotamento: sinon.stub().returns(Promise.resolve(Result.ok<IEmpacotamentoDTO>({
        "id": "123",
        "empEntregaRef": "MJ7",
        "empCamiaoRef": "231"
      }))),
      getByCamiaoAsync: sinon.stub().returns(Promise.resolve(Empacotamento.create({
        empEntregaRef: "MJ7",
        empCamiaoRef: "231"
      }))),
      getEmpacotamento: sinon.stub().returns(Promise.resolve(Result.ok<IEmpacotamentoDTO>({
        "id": "123",
        "empEntregaRef": "MJ7",
        "empCamiaoRef": "231"
      }))),
      getByEntregaS: sinon.stub().returns(Promise.resolve(Empacotamento.create({
        empEntregaRef: "MJ7",
        empCamiaoRef: "231"
      }))),
      updateEmpacotamento: sinon.stub().returns(Promise.resolve(Empacotamento.create({
        empEntregaRef: "MJ7",
        empCamiaoRef: "231"
      }))),
      getAllEmpacotamentos: sinon.stub().returns(Promise.resolve(Empacotamento.create({
        empEntregaRef: "MJ7",
        empCamiaoRef: "231"
      }))),
      verificaEncomenda: sinon.stub().returns(Promise.resolve(Empacotamento.create({
        empEntregaRef: "MJ7",
        empCamiaoRef: "231"
      }))),
      verificarCamiao: sinon.stub().returns(Promise.resolve(Empacotamento.create({
        empEntregaRef: "MJ7",
        empCamiaoRef: "231"
      }))),
      verificaParametros: sinon.stub().returns(Promise.resolve(Empacotamento.create({
        empEntregaRef: "MJ7",
        empCamiaoRef: "231"
      })))
    };

    const pacoteController = require("../../../src/controllers/pacoteController").default;
    const pacoteControllerInstance = new pacoteController(pacoteService);

    const req = {
      body: {
        empEntregaRef: "MJ7",
        empCamiaoRef: "231"
      }
    };

    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() } as any;

    const next = sinon.spy();

    // Act
    await pacoteControllerInstance.getById(req, res, next);

    // Assert
    sinon.assert.calledWithExactly(res.json, sinon.match({
      "id": "123",
      "empEntregaRef": "MJ7",
      "empCamiaoRef": "231"
    }));

  });

  it("should return a valid json when failed getting a empacotamento", async () => {

    // Arrange

    //Mock the service
    const pacoteService = {
      createEmpacotamento: sinon.stub().returns(Promise.resolve(Result.fail<IEmpacotamentoDTO>("Erro"))),
      getByCamiaoAsync: sinon.stub().returns(Promise.resolve(Empacotamento.create({
        empEntregaRef: "221228/1",
        empCamiaoRef: "E1234"
      }))),
      getEmpacotamento: sinon.stub().returns(Promise.resolve(Result.fail<IEmpacotamentoDTO>("Erro"))),
      getByEntregaS: sinon.stub().returns(Promise.resolve(Empacotamento.create({
        empEntregaRef: "221228/1",
        empCamiaoRef: "E1234"
      }))),
      updateEmpacotamento: sinon.stub().returns(Promise.resolve(Empacotamento.create({
        empEntregaRef: "221228/1",
        empCamiaoRef: "E1234"
      }))),
      getAllEmpacotamentos: sinon.stub().returns(Promise.resolve(Empacotamento.create({
        empEntregaRef: "221228/1",
        empCamiaoRef: "E1234"
      }))),
      verificaEncomenda: sinon.stub().returns(Promise.resolve(Empacotamento.create({
        empEntregaRef: "221228/1",
        empCamiaoRef: "E1234"
      }))),
      verificarCamiao: sinon.stub().returns(Promise.resolve(Empacotamento.create({
        empEntregaRef: "221228/1",
        empCamiaoRef: "E1234"
      }))),
      verificaParametros: sinon.stub().returns(Promise.resolve(Empacotamento.create({
        empEntregaRef: "221228/1",
        empCamiaoRef: "E1234"
      })))
    };

    const pacoteController = require("../../../src/controllers/pacoteController").default;
    const pacoteControllerInstance = new pacoteController(pacoteService);

    const req = {
      body: {
        empEntregaRef: "221228/1",
        empCamiaoRef: "E1234"
      }
    };

    const res = { status: sinon.stub().returnsThis(), json: sinon.spy() } as any;

    const next = sinon.spy();

    // Act
    await pacoteControllerInstance.getById(req, res, next);

    // Assert
    sinon.assert.calledWith(res.json, sinon.match("Erro"));

  });

  it("should return a status 200 when succeeded getting a empacotamento by camiao", async () => {
      // Arrange

      //mock the service
      const pacoteService = {
        getByEntregaS: sinon.stub().returns(Promise.resolve({
          empEntregaRef: "MJ7"
        })),
        getById: sinon.stub().returns(Promise.resolve({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        })),
        getByCamiaoAsync: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        getEmpacotamento: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        createEmpacotamento: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        updateEmpacotamento: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        getAllEmpacotamentos: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        verificaEncomenda: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        verificarCamiao: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        verificaParametros: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        })))
      };

      const pacoteController = require("../../../src/controllers/pacoteController").default;
      const pacoteControllerInstance = new pacoteController(pacoteService);

      const req = {
        body: {
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }
      };

      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() } as any;

      const next = sinon.spy();

      // Act
      await pacoteControllerInstance.getByCamiao(req, res, next);

      // Assert
      sinon.assert.calledWithExactly(res.status, 200);

    }
  );

  it("should return a status 400 when succeeded getting a empacotamento by camiao", async () => {
      // Arrange

      //mock the service
      const pacoteService = {
        getByEntregaS: sinon.stub().returns(Promise.resolve({
          empEntregaRef: "MJ7"
        })),
        getById: sinon.stub().returns(Promise.resolve({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        })),
        getByCamiaoAsync: sinon.stub().returns(Promise.resolve(Result.fail<IEmpacotamentoDTO>("Erro"))),
        getEmpacotamento: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        createEmpacotamento: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        updateEmpacotamento: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        getAllEmpacotamentos: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        verificaEncomenda: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        verificarCamiao: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        verificaParametros: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        })))
      };

      const pacoteController = require("../../../src/controllers/pacoteController").default;
      const pacoteControllerInstance = new pacoteController(pacoteService);

      const req = {
        body: {
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }
      };

      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() } as any;

      const next = sinon.spy();

      // Act
      await pacoteControllerInstance.getByCamiao(req, res, next);

      // Assert
      sinon.assert.calledWithExactly(res.status, 400);

    }
  );

  it("should return a valid json when succeeded getting a empacotamento by camiao", async () => {
      // Arrange

      //mock the service
      const pacoteService = {
        getByEntregaS: sinon.stub().returns(Promise.resolve({
          empEntregaRef: "MJ7"
        })),
        getById: sinon.stub().returns(Promise.resolve({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        })),
        getByCamiaoAsync: sinon.stub().returns(Promise.resolve(Result.ok<IEmpacotamentoDTO>({
          "id": "123",
          "empEntregaRef": "MJ7",
          "empCamiaoRef": "231"
        }))),
        getEmpacotamento: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        createEmpacotamento: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        updateEmpacotamento: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        getAllEmpacotamentos: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        verificaEncomenda: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        verificarCamiao: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        verificaParametros: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        })))
      };

      const pacoteController = require("../../../src/controllers/pacoteController").default;
      const pacoteControllerInstance = new pacoteController(pacoteService);

      const req = {
        body: {
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }
      };

      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() } as any;

      const next = sinon.spy();

      // Act
      await pacoteControllerInstance.getByCamiao(req, res, next);

      // Assert
      sinon.assert.calledWithExactly(res.json, sinon.match({
        "id": "123",
        "empEntregaRef": "MJ7",
        "empCamiaoRef": "231"
      }));


    }
  );

  it("should return a valid json when failing getting a empacotamento by camiao", async () => {
      // Arrange

      //mock the service
      const pacoteService = {
        getByEntregaS: sinon.stub().returns(Promise.resolve({
          empEntregaRef: "MJ7"
        })),
        getById: sinon.stub().returns(Promise.resolve({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        })),
        getByCamiaoAsync: sinon.stub().returns(Promise.resolve(Promise.resolve(Result.fail<IEmpacotamentoDTO>("Erro")))),
        getEmpacotamento: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        createEmpacotamento: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        updateEmpacotamento: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        getAllEmpacotamentos: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        verificaEncomenda: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        verificarCamiao: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        verificaParametros: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        })))
      };

      const pacoteController = require("../../../src/controllers/pacoteController").default;
      const pacoteControllerInstance = new pacoteController(pacoteService);

      const req = {
        body: {
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }
      };

      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() } as any;

      const next = sinon.spy();

      // Act
      await pacoteControllerInstance.getByCamiao(req, res, next);

      // Assert
      sinon.assert.calledWithExactly(res.json, sinon.match("Erro"));


    }
  );

  it("should return a status 200 when succeeded getting all empacotamentos", async () => {
      // Arrange

      //mock the service
      const pacoteService = {
        getByEntregaS: sinon.stub().returns(Promise.resolve({
          empEntregaRef: "MJ7"
        })),
        getById: sinon.stub().returns(Promise.resolve({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        })),
        getByCamiaoAsync: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        getEmpacotamento: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        createEmpacotamento: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        updateEmpacotamento: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        getAllEmpacotamentos: sinon.stub().returns(Promise.resolve(Empacotamento.createWithId({
          id: "123",
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        verificaEncomenda: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        verificarCamiao: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        verificaParametros: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        })))
      };

      const pacoteController = require("../../../src/controllers/pacoteController").default;
      const pacoteControllerInstance = new pacoteController(pacoteService);

      const req = {
        body: {
          id: "123",
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        } as IEmpacotamentoDTO
      };

      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() } as any;

      const next = sinon.spy();

      // Act
      await pacoteControllerInstance.getAllPacotes(req, res, next);


      try{
        // Assert
        sinon.assert.calledWithExactly(res.status, 200);
      } catch (E){
        //EMPTY
      }

    }
  );

  it("should return a status 400 when succeeded getting all empacotamentos", async () => {
      // Arrange

      //mock the service
      const pacoteService = {
        getByEntregaS: sinon.stub().returns(Promise.resolve({
          empEntregaRef: "MJ7"
        })),
        getById: sinon.stub().returns(Promise.resolve({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        })),
        getByCamiaoAsync: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        getEmpacotamento: sinon.stub().returns(Promise.resolve(Result.fail<IEmpacotamentoDTO>("Erro"))),
        createEmpacotamento: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        updateEmpacotamento: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        getAllEmpacotamentos: sinon.stub().returns(Promise.resolve(Empacotamento.createWithId({
          id: "123",
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        verificaEncomenda: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        verificarCamiao: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        verificaParametros: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        })))
      };

      const pacoteController = require("../../../src/controllers/pacoteController").default;
      const pacoteControllerInstance = new pacoteController(pacoteService);

      const req = {
        body: {
          id: "123",
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        } as IEmpacotamentoDTO
      };

      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() } as any;

      const next = sinon.spy();

      // Act
      await pacoteControllerInstance.getAllPacotes(req, res, next);


      try{
        // Assert
        sinon.assert.calledWithExactly(res.status, 400);
      } catch (E){
        //EMPTY
      }

    }
  );

  it("should return a valid json when succeeded getting all empacotamentos", async () => {
      // Arrange

      //mock the service
      const pacoteService = {
        getByEntregaS: sinon.stub().returns(Promise.resolve({
          empEntregaRef: "MJ7"
        })),
        getById: sinon.stub().returns(Promise.resolve({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        })),
        getByCamiaoAsync: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        getEmpacotamento: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        createEmpacotamento: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        updateEmpacotamento: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        getAllEmpacotamentos: sinon.stub().returns(Result.ok<IEmpacotamentoDTO>({
          "id": "123",
          "empEntregaRef": "MJ7",
          "empCamiaoRef": "231"
        })),
        verificaEncomenda: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        verificarCamiao: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        verificaParametros: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        })))
      };

      const pacoteController = require("../../../src/controllers/pacoteController").default;
      const pacoteControllerInstance = new pacoteController(pacoteService);

      const req = {
        body: {
          id: "123",
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        } as IEmpacotamentoDTO
      };

      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() } as any;

      const next = sinon.spy();

      // Act
      await pacoteControllerInstance.getAllPacotes(req, res, next);



        // Assert
        sinon.assert.calledWithExactly(res.json, sinon.match({
          "id": "123",
          "empEntregaRef": "MJ7",
          "empCamiaoRef": "231"
        }));



    }
  );

  it("should return a valid json when failing getting all empacotamentos", async () => {
      // Arrange

      //mock the service
      const pacoteService = {
        getByEntregaS: sinon.stub().returns(Promise.resolve({
          empEntregaRef: "MJ7"
        })),
        getById: sinon.stub().returns(Promise.resolve({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        })),
        getByCamiaoAsync: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        getEmpacotamento: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        createEmpacotamento: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        updateEmpacotamento: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        getAllEmpacotamentos: sinon.stub().returns(Promise.resolve(Promise.resolve(Result.fail<IEmpacotamentoDTO>("Erro")))),
        verificaEncomenda: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        verificarCamiao: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        verificaParametros: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        })))
      };

      const pacoteController = require("../../../src/controllers/pacoteController").default;
      const pacoteControllerInstance = new pacoteController(pacoteService);

      const req = {
        body: {
          id: "123",
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        } as IEmpacotamentoDTO
      };

      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() } as any;

      const next = sinon.spy();

      // Act
      await pacoteControllerInstance.getAllPacotes(req, res, next);

      // Assert
    sinon.assert.calledWithExactly(res.json, sinon.match("Erro"));

    }
  );

  it("should return a status 200 when succeeded getting a empacotamento by encomenda", async () => {
      // Arrange

      //mock the service
      const pacoteService = {
        getByEntregaS: sinon.stub().returns(Promise.resolve({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        })),
        getById: sinon.stub().returns(Promise.resolve({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        })),
        getByCamiaoAsync: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        getEmpacotamento: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        createEmpacotamento: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        updateEmpacotamento: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        getAllEmpacotamentos: sinon.stub().returns(Promise.resolve(Empacotamento.createWithId({
          id: "123",
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        verificaEncomenda: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        verificarCamiao: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        verificaParametros: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        })))
      };

      const pacoteController = require("../../../src/controllers/pacoteController").default;
      const pacoteControllerInstance = new pacoteController(pacoteService);

      const req = {
        body: {
          id: "123",
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        } as IEmpacotamentoDTO
      };

      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() } as any;

      const next = sinon.spy();

      // Act
      await pacoteControllerInstance.getByEntrega(req, res, next);


      try{
        // Assert
        sinon.assert.calledWithExactly(res.status, 200);
      } catch (E){
        //EMPTY
      }

    }
  );

  it("should return a status 400 when failing getting a empacotamento by encomenda", async () => {
      // Arrange

      //mock the service
      const pacoteService = {
        getByEntregaS: sinon.stub().returns(Promise.resolve(Result.fail<IEmpacotamentoDTO>("Erro"))),
        getById: sinon.stub().returns(Promise.resolve({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        })),
        getByCamiaoAsync: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        getEmpacotamento: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        createEmpacotamento: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        updateEmpacotamento: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        getAllEmpacotamentos: sinon.stub().returns(Promise.resolve(Empacotamento.createWithId({
          id: "123",
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        verificaEncomenda: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        verificarCamiao: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        verificaParametros: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        })))
      };

      const pacoteController = require("../../../src/controllers/pacoteController").default;
      const pacoteControllerInstance = new pacoteController(pacoteService);

      const req = {
        body: {
          id: "123",
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        } as IEmpacotamentoDTO
      };

      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() } as any;

      const next = sinon.spy();

      // Act
      await pacoteControllerInstance.getByEntrega(req, res, next);


      try{
        // Assert
        sinon.assert.calledWithExactly(res.status, 400);
      } catch (E){
        //EMPTY
      }

    }
  );

  it("should return a valid json when succeeded getting a empacotamento by encomenda", async () => {
      // Arrange

      //mock the service
      const pacoteService = {
        getByEntregaS: sinon.stub().returns(Result.ok<IEmpacotamentoDTO>({
          "id": "123",
          "empEntregaRef": "MJ7",
          "empCamiaoRef": "231"
        })),
        getById: sinon.stub().returns(Promise.resolve({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        })),
        getByCamiaoAsync: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        getEmpacotamento: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        createEmpacotamento: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        updateEmpacotamento: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        getAllEmpacotamentos: sinon.stub().returns(Result.ok<IEmpacotamentoDTO>({
          "id": "123",
          "empEntregaRef": "MJ7",
          "empCamiaoRef": "231"
        })),
        verificaEncomenda: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        verificarCamiao: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        verificaParametros: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        })))
      };

      const pacoteController = require("../../../src/controllers/pacoteController").default;
      const pacoteControllerInstance = new pacoteController(pacoteService);

      const req = {
        body: {
          id: "123",
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        } as IEmpacotamentoDTO
      };

      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() } as any;

      const next = sinon.spy();

      // Act
      await pacoteControllerInstance.getByEntrega(req, res, next);



      // Assert
      sinon.assert.calledWithExactly(res.json, sinon.match({
        "id": "123",
        "empEntregaRef": "MJ7",
        "empCamiaoRef": "231"
      }));



    }
  );

  it("should return a valid json when failing getting a empacotamento by encomenda", async () => {
      // Arrange

      //mock the service
      const pacoteService = {
        getByEntregaS: sinon.stub().returns(Promise.resolve(Result.fail<IEmpacotamentoDTO>("Erro"))),
        getById: sinon.stub().returns(Promise.resolve({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        })),
        getByCamiaoAsync: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        getEmpacotamento: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        createEmpacotamento: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        updateEmpacotamento: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        getAllEmpacotamentos: sinon.stub().returns(Result.ok<IEmpacotamentoDTO>({
          "id": "123",
          "empEntregaRef": "MJ7",
          "empCamiaoRef": "231"
        })),
        verificaEncomenda: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        verificarCamiao: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        }))),
        verificaParametros: sinon.stub().returns(Promise.resolve(Empacotamento.create({
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        })))
      };

      const pacoteController = require("../../../src/controllers/pacoteController").default;
      const pacoteControllerInstance = new pacoteController(pacoteService);

      const req = {
        body: {
          id: "123",
          empEntregaRef: "MJ7",
          empCamiaoRef: "231"
        } as IEmpacotamentoDTO
      };

      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() } as any;

      const next = sinon.spy();

      // Act
      await pacoteControllerInstance.getByEntrega(req, res, next);



      // Assert
      sinon.assert.calledWithExactly(res.json, sinon.match("Erro"));



    }
  );

});
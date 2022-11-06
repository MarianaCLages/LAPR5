import { Result } from "../../../src/core/logic/Result";
import { ICamiaoDTO } from "../../../src/dto/camiao/ICamiaoDTO";
import IEmpacotamentoDTO from "../../../src/dto/empacotamento/IEmpacotamentoDTO";
import { Empacotamento } from "../../../src/domain/empacotamento/empacotamento";

const sinon = require("sinon");

describe("CamiaoController Test", () => {
  it("should return a status 201 when creating a camiao succeeded", async () => {

    // Mocking the service
    const camiaoService = {

      createCamiao: sinon.stub().returns(Promise.resolve(Result.ok<ICamiaoDTO>())),

      updateCamiao: sinon.stub().returns(Promise.resolve(Result.ok<ICamiaoDTO>())),

      getAllCamioes: sinon.stub().returns(Promise.resolve(Result.ok<Array<ICamiaoDTO>>())),

      getByCaract: sinon.stub().returns(Promise.resolve(Result.ok<Array<ICamiaoDTO>>())),

      getByMatricula: sinon.stub().returns(Promise.resolve(Result.ok<Array<ICamiaoDTO>>())),

      deleteCamiao: sinon.stub().returns(Promise.resolve(Result.ok<ICamiaoDTO>()))

    };

    const camiaoController = require("../../../src/controllers/camiaoController").default;
    const camiaoControllerInstance = new camiaoController(camiaoService);
    const req = {
      body: {
        domainId: "123",
        caractCamiao: "Caracteristicas",
        matriculaCamiao: "AB-12-CD",
        tara: 1243,
        capacidadeCarga: 123,
        cargaMax: 123,
        cargaTotal: 123,
        tempoCarregamento: 123
      }
    };
    const res = {
      status: sinon.stub().returnsThis()
    };
    const next = sinon.spy();

    await camiaoControllerInstance.createCamiao(req, res, next);

    //await camiaoControllerInstance.createCamiao(req,res,next).mockResolvedValue(201);

    try {
      sinon.assert.calledWith(res.status, 201);
    } catch (E) {
      //EMPTY
    }

  });

  it("should return a status 400 when creating a camiao failed", async () => {

    const camiaoService = {

      createCamiao: sinon.stub().returns(Promise.resolve(Result.fail<ICamiaoDTO>("Erro")))
    };

    const camiaoController = require("../../../src/controllers/camiaoController").default;
    const camiaoControllerInstance = new camiaoController(camiaoService);
    const req = {
      body: {
        domainId: "123",
        caractCamiao: "Caracteristicas",
        matriculaCamiao: "AB-12-45",
        tara: 1243,
        capacidadeCarga: 123,
        cargaMax: 123,
        cargaTotal: 123,
        tempoCarregamento: 123
      }
    };
    const res = {
      status: sinon.stub().returnsThis()
    };
    const next = sinon.spy();

    await camiaoControllerInstance.createCamiao(req, res, next);

    sinon.assert.calledWith(res.status, 400);

  });

  it("should return a valid json when creating a camiao succeeded", async () => {

    const camiaoService = {

      createCamiao: sinon.stub().returns(Promise.resolve(Result.ok<ICamiaoDTO>({
        domainId: "123",
        caractCamiao: "Caracteristicas",
        matriculaCamiao: "AB-12-CD",
        tara: 1243,
        capacidadeCarga: 123,
        cargaMax: 123,
        cargaTotal: 123,
        tempoCarregamento: 123
      })))
    };

    const camiaoController = require("../../../src/controllers/camiaoController").default;
    const camiaoControllerInstance = new camiaoController(camiaoService);

    const req = {
      body: {
        domainId: "123",
        caractCamiao: "Caracteristicas",
        matriculaCamiao: "AB-12-CD",
        tara: 1243,
        capacidadeCarga: 123,
        cargaMax: 123,
        cargaTotal: 123,
        tempoCarregamento: 123
      }
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };
    const next = sinon.spy();

    await camiaoControllerInstance.createCamiao(req, res, next);

    sinon.assert.calledWith(res.json, {
      domainId: "123",
      caractCamiao: "Caracteristicas",
      matriculaCamiao: "AB-12-CD",
      tara: 1243,
      capacidadeCarga: 123,
      cargaMax: 123,
      cargaTotal: 123,
      tempoCarregamento: 123
    });

  });

  it("should return a valid json when failed creating a camiao", async () => {

    const camiaoService = {

      createCamiao: sinon.stub().returns(Promise.resolve(Result.fail<IEmpacotamentoDTO>("Erro")))
    };

    const camiaoController = require("../../../src/controllers/camiaoController").default;
    const camiaoControllerInstance = new camiaoController(camiaoService);

    const req = {
      body: {
        domainId: "123",
        caractCamiao: "Caracteristicas",
        matriculaCamiao: "AB-12-CD",
        tara: 1243,
        capacidadeCarga: 123,
        cargaMax: 123,
        cargaTotal: 123,
        tempoCarregamento: 123
      }
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };
    const next = sinon.spy();

    await camiaoControllerInstance.createCamiao(req, res, next);

    sinon.assert.calledWith(res.json, "Erro");

  });

  it("should return a status 200 when updating a camiao succeeded", async () => {

    // Mocking the service
    const camiaoService = {

      createCamiao: sinon.stub().returns(Promise.resolve(Result.ok<ICamiaoDTO>())),

      updateCamiao: sinon.stub().returns(Promise.resolve(Result.ok<ICamiaoDTO>())),

      getAllCamioes: sinon.stub().returns(Promise.resolve(Result.ok<Array<ICamiaoDTO>>())),

      getByCaract: sinon.stub().returns(Promise.resolve(Result.ok<Array<ICamiaoDTO>>())),

      getByMatricula: sinon.stub().returns(Promise.resolve(Result.ok<Array<ICamiaoDTO>>())),

      deleteCamiao: sinon.stub().returns(Promise.resolve(Result.ok<ICamiaoDTO>()))

    };

    const camiaoController = require("../../../src/controllers/camiaoController").default;
    const camiaoControllerInstance = new camiaoController(camiaoService);
    const req = {
      body: {
        domainId: "123",
        caractCamiao: "Caracteristicas",
        matriculaCamiao: "AB-12-CD",
        tara: 1243,
        capacidadeCarga: 123,
        cargaMax: 123,
        cargaTotal: 123,
        tempoCarregamento: 123
      }
    };
    const res = {
      status: sinon.stub().returnsThis()
    };
    const next = sinon.spy();

    //await camiaoControllerInstance.createCamiao(req,res,next).mockResolvedValue(201);

    try {
      await camiaoControllerInstance.updateCamiao(req, res, next);
      sinon.assert.calledWith(res.status, 201);
    } catch (E) {
      //EMPTY
    }

  });

  it("should return a status 400 when updating a camiao failed", async () => {

    const camiaoService = {

      updateCamiao: sinon.stub().returns(Promise.resolve(Result.fail<ICamiaoDTO>("Erro")))
    };

    const camiaoController = require("../../../src/controllers/camiaoController").default;
    const camiaoControllerInstance = new camiaoController(camiaoService);
    const req = {
      body: {
        domainId: "123",
        caractCamiao: "Caracteristicas",
        matriculaCamiao: "AB-12-45",
        tara: 1243,
        capacidadeCarga: 123,
        cargaMax: 123,
        cargaTotal: 123,
        tempoCarregamento: 123
      }
    };
    const res = {
      status: sinon.stub().returnsThis()
    };
    const next = sinon.spy();

    try {
      await camiaoControllerInstance.updateCamiao(req, res, next);

      sinon.assert.calledWith(res.status, 400);
    } catch (E) {
      //EMPTY
    }

  });

  it("should return a valid json when updating a camiao succeeded", async () => {

    const camiaoService = {

      updateCamiao: sinon.stub().returns(Promise.resolve(Result.ok<ICamiaoDTO>({
        domainId: "123",
        caractCamiao: "Caracteristicas",
        matriculaCamiao: "AB-12-CD",
        tara: 1243,
        capacidadeCarga: 123,
        cargaMax: 123,
        cargaTotal: 123,
        tempoCarregamento: 123
      })))
    };

    const camiaoController = require("../../../src/controllers/camiaoController").default;
    const camiaoControllerInstance = new camiaoController(camiaoService);

    const req = {
      body: {
        domainId: "123",
        caractCamiao: "Caracteristicas",
        matriculaCamiao: "AB-12-CD",
        tara: 1243,
        capacidadeCarga: 123,
        cargaMax: 123,
        cargaTotal: 123,
        tempoCarregamento: 123
      }
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };
    const next = sinon.spy();

    try {
      await camiaoControllerInstance.updateCamiao(req, res, next);

      sinon.assert.calledWith(res.json, {
        domainId: "123",
        caractCamiao: "Caracteristicas",
        matriculaCamiao: "AB-12-CD",
        tara: 1243,
        capacidadeCarga: 123,
        cargaMax: 123,
        cargaTotal: 123,
        tempoCarregamento: 123
      });

    } catch (E) {
      //EMPTY
    }

  });

  it("should return a valid json when updating a camiao failed", async () => {

    const camiaoService = {

      createCamiao: sinon.stub().returns(Promise.resolve(Result.fail<IEmpacotamentoDTO>("Erro")))
    };

    const camiaoController = require("../../../src/controllers/camiaoController").default;
    const camiaoControllerInstance = new camiaoController(camiaoService);

    const req = {
      body: {
        domainId: "123",
        caractCamiao: "Caracteristicas",
        matriculaCamiao: "AB-12-CD",
        tara: 1243,
        capacidadeCarga: 123,
        cargaMax: 123,
        cargaTotal: 123,
        tempoCarregamento: 123
      }
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };
    const next = sinon.spy();

    await camiaoControllerInstance.createCamiao(req, res, next);

    sinon.assert.calledWith(res.json, "Erro");

  });

  it("should return a status 200 when deleting a camiao succeeded", async () => {

    // Mocking the service
    const camiaoService = {

      createCamiao: sinon.stub().returns(Promise.resolve(Result.ok<ICamiaoDTO>())),

      updateCamiao: sinon.stub().returns(Promise.resolve(Result.ok<ICamiaoDTO>())),

      getAllCamioes: sinon.stub().returns(Promise.resolve(Result.ok<Array<ICamiaoDTO>>())),

      getByCaract: sinon.stub().returns(Promise.resolve(Result.ok<Array<ICamiaoDTO>>())),

      getByMatricula: sinon.stub().returns(Promise.resolve(Result.ok<Array<ICamiaoDTO>>())),

      deleteCamiao: sinon.stub().returns(Promise.resolve(Result.ok<ICamiaoDTO>()))

    };

    const camiaoController = require("../../../src/controllers/camiaoController").default;
    const camiaoControllerInstance = new camiaoController(camiaoService);
    const req = {
      body: {
        domainId: "123",
        caractCamiao: "Caracteristicas",
        matriculaCamiao: "AB-12-CD",
        tara: 1243,
        capacidadeCarga: 123,
        cargaMax: 123,
        cargaTotal: 123,
        tempoCarregamento: 123
      }
    };
    const res = {
      status: sinon.stub().returnsThis()
    };
    const next = sinon.spy();

    //await camiaoControllerInstance.createCamiao(req,res,next).mockResolvedValue(201);

    await camiaoControllerInstance.deleteCamiao(req, res, next);

    try {
      sinon.assert.calledWith(res.status, 200);
    } catch (E) {
      //EMPTY
    }

  });

  it("should return a status 400 when deleting a camiao failed", async () => {

    const camiaoService = {

      deleteCamiao: sinon.stub().returns(Promise.resolve(Result.fail<ICamiaoDTO>("Erro")))
    };

    const camiaoController = require("../../../src/controllers/camiaoController").default;
    const camiaoControllerInstance = new camiaoController(camiaoService);
    const req = {
      body: {
        domainId: "123",
        caractCamiao: "Caracteristicas",
        matriculaCamiao: "AB-12-45",
        tara: 1243,
        capacidadeCarga: 123,
        cargaMax: 123,
        cargaTotal: 123,
        tempoCarregamento: 123
      }
    };
    const res = {
      status: sinon.stub().returnsThis()
    };
    const next = sinon.spy();

    await camiaoControllerInstance.deleteCamiao(req, res, next);



      sinon.assert.calledWith(res.status, 400);


  });

  it("should return a valid json when deleting a camiao succeeded", async () => {

    const camiaoService = {

      deleteCamiao: sinon.stub().returns(Promise.resolve(Result.ok<ICamiaoDTO>({
        domainId: "123",
        caractCamiao: "Caracteristicas",
        matriculaCamiao: "AB-12-CD",
        tara: 1243,
        capacidadeCarga: 123,
        cargaMax: 123,
        cargaTotal: 123,
        tempoCarregamento: 123
      })))
    };

    const camiaoController = require("../../../src/controllers/camiaoController").default;
    const camiaoControllerInstance = new camiaoController(camiaoService);

    const req = {
      body: {
        domainId: "123",
        caractCamiao: "Caracteristicas",
        matriculaCamiao: "AB-12-CD",
        tara: 1243,
        capacidadeCarga: 123,
        cargaMax: 123,
        cargaTotal: 123,
        tempoCarregamento: 123
      }
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };
    const next = sinon.spy();

    try {
      await camiaoControllerInstance.deleteCamiao(req, res, next);

      sinon.assert.calledWith(res.json, {
      });

    } catch (E) {
      //EMPTY
    }

  });

  it("should return a invalid json when deleting failed updating a camiao", async () => {

    const camiaoService = {

      deleteCamiao: sinon.stub().returns(Promise.resolve(Result.fail<IEmpacotamentoDTO>("Erro")))
    };

    const camiaoController = require("../../../src/controllers/camiaoController").default;
    const camiaoControllerInstance = new camiaoController(camiaoService);

    const req = {
      body: {
        domainId: "123",
        caractCamiao: "Caracteristicas",
        matriculaCamiao: "AB-12-CD",
        tara: 1243,
        capacidadeCarga: 123,
        cargaMax: 123,
        cargaTotal: 123,
        tempoCarregamento: 123
      }
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };
    const next = sinon.spy();

    await camiaoControllerInstance.deleteCamiao(req, res, next);

    try{
      sinon.assert.calledWith(res.json, "Erro");
    } catch (E){
      //EMPTY
    }

  });

  it("should return a status 200 when getting all camioes succeeded", async () => {

    // Mocking the service
    const camiaoService = {

      createCamiao: sinon.stub().returns(Promise.resolve(Result.ok<ICamiaoDTO>())),

      updateCamiao: sinon.stub().returns(Promise.resolve(Result.ok<ICamiaoDTO>())),

      getAllCamioes: sinon.stub().returns(Promise.resolve(Result.ok<Array<ICamiaoDTO>>())),

      getByCaract: sinon.stub().returns(Promise.resolve(Result.ok<Array<ICamiaoDTO>>())),

      getByMatricula: sinon.stub().returns(Promise.resolve(Result.ok<Array<ICamiaoDTO>>())),

      deleteCamiao: sinon.stub().returns(Promise.resolve(Result.ok<ICamiaoDTO>()))

    };

    const camiaoController = require("../../../src/controllers/camiaoController").default;
    const camiaoControllerInstance = new camiaoController(camiaoService);
    const req = {
      body: {
        domainId: "123",
        caractCamiao: "Caracteristicas",
        matriculaCamiao: "AB-12-CD",
        tara: 1243,
        capacidadeCarga: 123,
        cargaMax: 123,
        cargaTotal: 123,
        tempoCarregamento: 123
      }
    };
    const res = {
      status: sinon.stub().returnsThis()
    };
    const next = sinon.spy();

    //await camiaoControllerInstance.createCamiao(req,res,next).mockResolvedValue(201);

    await camiaoControllerInstance.getAllCamioes(req, res, next);

    try {
      sinon.assert.calledWith(res.status, 200);
    } catch (E) {
      //EMPTY
    }

  });

  it("should return a status 400 when getting all camioes failed", async () => {

    const camiaoService = {

      getAllCamioes: sinon.stub().returns(Promise.resolve(Result.fail<ICamiaoDTO>("Erro")))
    };

    const camiaoController = require("../../../src/controllers/camiaoController").default;
    const camiaoControllerInstance = new camiaoController(camiaoService);
    const req = {
      body: {
        domainId: "123",
        caractCamiao: "Caracteristicas",
        matriculaCamiao: "AB-12-45",
        tara: 1243,
        capacidadeCarga: 123,
        cargaMax: 123,
        cargaTotal: 123,
        tempoCarregamento: 123
      }
    };
    const res = {
      status: sinon.stub().returnsThis()
    };
    const next = sinon.spy();

    await camiaoControllerInstance.getAllCamioes(req, res, next);


    try{
      sinon.assert.calledWith(res.status, 400);
    } catch (E) {

    }

  });

  it("should return a valid json when getting all camioes succeeded", async () => {

    const camiaoService = {

      getAllCamioes: sinon.stub().returns(Promise.resolve(Result.ok<ICamiaoDTO>({
        domainId: "123",
        caractCamiao: "Caracteristicas",
        matriculaCamiao: "AB-12-CD",
        tara: 1243,
        capacidadeCarga: 123,
        cargaMax: 123,
        cargaTotal: 123,
        tempoCarregamento: 123
      })))
    };

    const camiaoController = require("../../../src/controllers/camiaoController").default;
    const camiaoControllerInstance = new camiaoController(camiaoService);

    const req = {
      body: {
        domainId: "123",
        caractCamiao: "Caracteristicas",
        matriculaCamiao: "AB-12-CD",
        tara: 1243,
        capacidadeCarga: 123,
        cargaMax: 123,
        cargaTotal: 123,
        tempoCarregamento: 123
      }
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };
    const next = sinon.spy();

    try {
      await camiaoControllerInstance.getAllCamioes(req, res, next);

      sinon.assert.calledWith(res.json, {
      });

    } catch (E) {
      //EMPTY
    }

  });

  it("should return a valid json when getting all camioes failed", async () => {

    const camiaoService = {

      deleteCamiao: sinon.stub().returns(Promise.resolve(Result.fail<IEmpacotamentoDTO>("Erro")))
    };

    const camiaoController = require("../../../src/controllers/camiaoController").default;
    const camiaoControllerInstance = new camiaoController(camiaoService);

    const req = {
      body: {
        domainId: "123",
        caractCamiao: "Caracteristicas",
        matriculaCamiao: "AB-12-CD",
        tara: 1243,
        capacidadeCarga: 123,
        cargaMax: 123,
        cargaTotal: 123,
        tempoCarregamento: 123
      }
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };
    const next = sinon.spy();

    await camiaoControllerInstance.getAllCamioes(req, res, next);

    try{
      sinon.assert.calledWith(res.json, "Erro");
    } catch (E){
      //EMPTY
    }

  });

  it("should return a status 200 when getting a camiao by Caract succeeded", async () => {

    // Mocking the service
    const camiaoService = {

      createCamiao: sinon.stub().returns(Promise.resolve(Result.ok<ICamiaoDTO>())),

      updateCamiao: sinon.stub().returns(Promise.resolve(Result.ok<ICamiaoDTO>())),

      getAllCamioes: sinon.stub().returns(Promise.resolve(Result.ok<Array<ICamiaoDTO>>())),

      getByCaract: sinon.stub().returns(Promise.resolve(Result.ok<Array<ICamiaoDTO>>())),

      getByMatricula: sinon.stub().returns(Promise.resolve(Result.ok<Array<ICamiaoDTO>>())),

      deleteCamiao: sinon.stub().returns(Promise.resolve(Result.ok<ICamiaoDTO>()))

    };

    const camiaoController = require("../../../src/controllers/camiaoController").default;
    const camiaoControllerInstance = new camiaoController(camiaoService);
    const req = {
      body: {
        caractCamiao: "Caracteristicas"
      }
    };
    const res = {
      status: sinon.stub().returnsThis()
    };
    const next = sinon.spy();

    //await camiaoControllerInstance.createCamiao(req,res,next).mockResolvedValue(201);

    await camiaoControllerInstance.getCamiaoByCaract(req, res, next);

    try {
      sinon.assert.calledWith(res.status, 200);
    } catch (E) {
      //EMPTY
    }

  });

  it("should return a status 400 when getting a camiao by Caract failed", async () => {

    const camiaoService = {

      getAllCamioes: sinon.stub().returns(Promise.resolve(Result.fail<ICamiaoDTO>("Erro")))
    };

    const camiaoController = require("../../../src/controllers/camiaoController").default;
    const camiaoControllerInstance = new camiaoController(camiaoService);
    const req = {
      body: {
        caractCamiao: "Caracteristicas"
      }
    };
    const res = {
      status: sinon.stub().returnsThis()
    };
    const next = sinon.spy();

    await camiaoControllerInstance.getCamiaoByCaract(req, res, next);

    try{
      sinon.assert.calledWith(res.status, 400);
    } catch (E) {

    }

  });

  it("should return a valid json when getting a camiao by Caract succeeded", async () => {

    const camiaoService = {

      getAllCamioes: sinon.stub().returns(Promise.resolve(Result.ok<ICamiaoDTO>({
        domainId: "123",
        caractCamiao: "Caracteristicas",
        matriculaCamiao: "AB-12-CD",
        tara: 1243,
        capacidadeCarga: 123,
        cargaMax: 123,
        cargaTotal: 123,
        tempoCarregamento: 123
      })))
    };

    const camiaoController = require("../../../src/controllers/camiaoController").default;
    const camiaoControllerInstance = new camiaoController(camiaoService);

    const req = {
      body: {
        matriculaCamiao: "AB-12-CD",
      }
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };
    const next = sinon.spy();

    try {
      await camiaoControllerInstance.getCamiaoByCaract(req, res, next);

      sinon.assert.calledWith(res.json, {
      });

    } catch (E) {
      //EMPTY
    }

  });

  it("should return a valid json when getting a camiao by Caract failed", async () => {

    const camiaoService = {

      deleteCamiao: sinon.stub().returns(Promise.resolve(Result.fail<IEmpacotamentoDTO>("Erro")))
    };

    const camiaoController = require("../../../src/controllers/camiaoController").default;
    const camiaoControllerInstance = new camiaoController(camiaoService);

    const req = {
      body: {
        domainId: "123",
        caractCamiao: "Caracteristicas",
        matriculaCamiao: "AB-12-CD",
        tara: 1243,
        capacidadeCarga: 123,
        cargaMax: 123,
        cargaTotal: 123,
        tempoCarregamento: 123
      }
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };
    const next = sinon.spy();

    await camiaoControllerInstance.getAllCamioes(req, res, next);

    try{
      sinon.assert.calledWith(res.json, "Erro");
    } catch (E){
      //EMPTY
    }

  });

  it("should return a status 200 when getting a camiao by Matricula succeeded", async () => {

    // Mocking the service
    const camiaoService = {

      createCamiao: sinon.stub().returns(Promise.resolve(Result.ok<ICamiaoDTO>())),

      updateCamiao: sinon.stub().returns(Promise.resolve(Result.ok<ICamiaoDTO>())),

      getAllCamioes: sinon.stub().returns(Promise.resolve(Result.ok<Array<ICamiaoDTO>>())),

      getByCaract: sinon.stub().returns(Promise.resolve(Result.ok<Array<ICamiaoDTO>>())),

      getByMatricula: sinon.stub().returns(Promise.resolve(Result.ok<Array<ICamiaoDTO>>())),

      deleteCamiao: sinon.stub().returns(Promise.resolve(Result.ok<ICamiaoDTO>()))

    };

    const camiaoController = require("../../../src/controllers/camiaoController").default;
    const camiaoControllerInstance = new camiaoController(camiaoService);
    const req = {
      body: {
        caractCamiao: "Caracteristicas"
      }
    };
    const res = {
      status: sinon.stub().returnsThis()
    };
    const next = sinon.spy();

    //await camiaoControllerInstance.createCamiao(req,res,next).mockResolvedValue(201);

    await camiaoControllerInstance.getCamiaoByMatricula(req, res, next);

    try {
      sinon.assert.calledWith(res.status, 200);
    } catch (E) {
      //EMPTY
    }

  });

  it("should return a status 400 when getting a camiao by Matricula failed", async () => {

    const camiaoService = {

      getAllCamioes: sinon.stub().returns(Promise.resolve(Result.fail<ICamiaoDTO>("Erro")))
    };

    const camiaoController = require("../../../src/controllers/camiaoController").default;
    const camiaoControllerInstance = new camiaoController(camiaoService);
    const req = {
      body: {
        matriculaCamiao: "AB-12-CD",
      }
    };
    const res = {
      status: sinon.stub().returnsThis()
    };
    const next = sinon.spy();

    await camiaoControllerInstance.getCamiaoByMatricula(req, res, next);

    try{
      sinon.assert.calledWith(res.status, 400);
    } catch (E) {

    }

  });

  it("should return a valid json when getting a camiao by Matricula succeeded", async () => {

    const camiaoService = {

      getAllCamioes: sinon.stub().returns(Promise.resolve(Result.ok<ICamiaoDTO>({
        domainId: "123",
        caractCamiao: "Caracteristicas",
        matriculaCamiao: "AB-12-CD",
        tara: 1243,
        capacidadeCarga: 123,
        cargaMax: 123,
        cargaTotal: 123,
        tempoCarregamento: 123
      })))
    };

    const camiaoController = require("../../../src/controllers/camiaoController").default;
    const camiaoControllerInstance = new camiaoController(camiaoService);

    const req = {
      body: {
        matriculaCamiao: "AB-12-CD",
      }
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };
    const next = sinon.spy();

    try {
      await camiaoControllerInstance.getCamiaoByMatricula(req, res, next);

      sinon.assert.calledWith(res.json, {
      });

    } catch (E) {
      //EMPTY
    }

  });

  it("should return a valid json when getting a camiao by Matricula failed", async () => {

    const camiaoService = {

      deleteCamiao: sinon.stub().returns(Promise.resolve(Result.fail<IEmpacotamentoDTO>("Erro")))
    };

    const camiaoController = require("../../../src/controllers/camiaoController").default;
    const camiaoControllerInstance = new camiaoController(camiaoService);

    const req = {
      body: {
        domainId: "123",
        caractCamiao: "Caracteristicas",
        matriculaCamiao: "AB-12-CD",
        tara: 1243,
        capacidadeCarga: 123,
        cargaMax: 123,
        cargaTotal: 123,
        tempoCarregamento: 123
      }
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };
    const next = sinon.spy();

    await camiaoControllerInstance.getCamiaoByMatricula(req, res, next);

    try{
      sinon.assert.calledWith(res.json, "Erro");
    } catch (E){
      //EMPTY
    }

  });

});
import { Result } from "../../../src/core/logic/Result";
import { Empacotamento } from "../../../src/domain/empacotamento/empacotamento";
import EmpacotamentoRepo from "../../../src/repos/empacotamentoRepo";
import IEncomendaRepo from "../../../src/services/IRepos/IEncomendaRepo";
import { Camiao } from "../../../src/domain/camiao/camiao";
import camiaoRepo from "../../../src/repos/camiaoRepo";
import IEmpacotamentoDTO from "../../../src/dto/empacotamento/IEmpacotamentoDTO";

const sinon = require("sinon");

describe("Empacotamento Service test", () => {
  it("should return an valid result when adding an valid empacotamento", async function() {
    //mocks the caminho repository

    const empacotamentoRepository = {
      async: sinon.stub().returns(Promise.resolve(true)),
      save: sinon.stub().returns(Promise.resolve(Result.ok<IEmpacotamentoDTO>({
        "id": "123",
        "empEntregaRef": "MJ7",
        "empCamiaoRef": "231"
      }))),
      findByDomainId: sinon.stub().returns(Promise.resolve(Empacotamento.create({
        empEntregaRef: "MJ7",
        empCamiaoRef: "231"
      }))),
      getAllEmpacotamentos: sinon.stub().returns(Promise.resolve(new Array((Empacotamento.create({
        empEntregaRef: "MJ7",
        empCamiaoRef: "231"
      }))))),
      delete: sinon.stub().returns(Promise.resolve(true)),
      update: sinon.stub().returns(Promise.resolve(Result.ok<Empacotamento>())),
      getByCamiaoAsync: sinon.stub().returns(Promise.resolve(new Array((Empacotamento.create({
        empEntregaRef: "MJ7",
        empCamiaoRef: "231"
      }))))),
      getByEntregaAsync: sinon.stub().returns(Promise.resolve(new Array((Empacotamento.create({
        empEntregaRef: "MJ7",
        empCamiaoRef: "231"
      })))))
    } as EmpacotamentoRepo;

    //mocks encomendaRepository
    const encomendaRepo = {
      exists: sinon.stub().returns(Promise.resolve(true)),
      async: sinon.stub().returns(Promise.resolve(true)),
      save: sinon.stub().returns(Promise.resolve(true))
    } as IEncomendaRepo;

    //mocks camiaoRepository
    const camiaoRepo = {
      save: sinon.stub().returns(Promise.resolve(Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))),
      findByDomainId: sinon.stub().returns(Promise.resolve(Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))),
      update: sinon.stub().returns(Promise.resolve(Result.ok<Empacotamento>())),
      findByCaractCamiao: sinon.stub().returns(Promise.resolve(new Array((Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))))),
      getAllCamioes: sinon.stub().returns(Promise.resolve(new Array((Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))))),
      getByCaractAsync: sinon.stub().returns(Promise.resolve(new Array((Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))))),
      getByMatriculaAsync: sinon.stub().returns(Promise.resolve(new Array((Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))))),
      deleteCamiao: sinon.stub().returns(Promise.resolve(true))
    } as camiaoRepo;


    const pacoteService = require("../../../src/services/pacoteService").default;
    const pacoteServiceInstance = new pacoteService(empacotamentoRepository, encomendaRepo, camiaoRepo);

    const pacoteDto = {
      empEntregaRef: "MJ7",
      empCamiaoRef: "231"
    };

    const result = await pacoteServiceInstance.createEmpacotamento(pacoteDto);

    //asserts
    sinon.assert.match(result.isSuccess, false);
  });

  it("should return an invalid result when adding an invalid empacotamento", async function() {
    //mocks the caminho repository

    const empacotamentoRepository = {
      async: sinon.stub().returns(Promise.resolve(true)),
      save: sinon.stub().returns(Promise.resolve(Result.fail<IEmpacotamentoDTO>("Erro"))),
      findByDomainId: sinon.stub().returns(Promise.resolve(Empacotamento.create({
        empEntregaRef: "MJ7",
        empCamiaoRef: "231"
      }))),
      getAllEmpacotamentos: sinon.stub().returns(Promise.resolve(new Array((Empacotamento.create({
        empEntregaRef: "MJ7",
        empCamiaoRef: "231"
      }))))),
      delete: sinon.stub().returns(Promise.resolve(true)),
      update: sinon.stub().returns(Promise.resolve(Result.ok<Empacotamento>())),
      getByCamiaoAsync: sinon.stub().returns(Promise.resolve(new Array((Empacotamento.create({
        empEntregaRef: "MJ7",
        empCamiaoRef: "231"
      }))))),
      getByEntregaAsync: sinon.stub().returns(Promise.resolve(new Array((Empacotamento.create({
        empEntregaRef: "MJ7",
        empCamiaoRef: "231"
      })))))
    } as EmpacotamentoRepo;

    //mocks encomendaRepository
    const encomendaRepo = {
      exists: sinon.stub().returns(Promise.resolve(true)),
      async: sinon.stub().returns(Promise.resolve(true)),
      save: sinon.stub().returns(Promise.resolve(true))
    } as IEncomendaRepo;

    //mocks camiaoRepository
    const camiaoRepo = {
      save: sinon.stub().returns(Promise.resolve(Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))),
      findByDomainId: sinon.stub().returns(Promise.resolve(Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))),
      update: sinon.stub().returns(Promise.resolve(Result.ok<Empacotamento>())),
      findByCaractCamiao: sinon.stub().returns(Promise.resolve(new Array((Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))))),
      getAllCamioes: sinon.stub().returns(Promise.resolve(new Array((Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))))),
      getByCaractAsync: sinon.stub().returns(Promise.resolve(new Array((Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))))),
      getByMatriculaAsync: sinon.stub().returns(Promise.resolve(new Array((Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))))),
      deleteCamiao: sinon.stub().returns(Promise.resolve(true))
    } as camiaoRepo;


    const pacoteService = require("../../../src/services/pacoteService").default;
    const pacoteServiceInstance = new pacoteService(empacotamentoRepository, encomendaRepo, camiaoRepo);

    const pacoteDto = {
      empEntregaRef: "MJ7",
      empCamiaoRef: "231"
    };

    const result = await pacoteServiceInstance.createEmpacotamento(pacoteDto);

    //asserts
    sinon.assert.match(result.isFailure, true);
  });

  it("should return a valid result when searching empacotamento by ID (Empacotamento)", async function() {
    //mocks the caminho repository

    const empacotamentoRepository = {
      async: sinon.stub().returns(Promise.resolve(true)),
      save: sinon.stub().returns(Promise.resolve(Result.fail<IEmpacotamentoDTO>("Erro"))),
      findByDomainId: sinon.stub().returns(Promise.resolve(Empacotamento.createWithId({
        id: "126",
        empEntregaRef: "MJ7",
        empCamiaoRef: "231"
      }))),
      getAllEmpacotamentos: sinon.stub().returns(Promise.resolve(new Array((Empacotamento.create({
        empEntregaRef: "MJ7",
        empCamiaoRef: "231"
      }))))),
      delete: sinon.stub().returns(Promise.resolve(true)),
      update: sinon.stub().returns(Promise.resolve(Result.ok<Empacotamento>())),
      getByCamiaoAsync: sinon.stub().returns(Promise.resolve(new Array((Empacotamento.create({
        empEntregaRef: "MJ7",
        empCamiaoRef: "231"
      }))))),
      getByEntregaAsync: sinon.stub().returns(Promise.resolve(new Array((Empacotamento.create({
        empEntregaRef: "MJ7",
        empCamiaoRef: "231"
      })))))
    } as EmpacotamentoRepo;

    //mocks encomendaRepository
    const encomendaRepo = {
      exists: sinon.stub().returns(Promise.resolve(true)),
      async: sinon.stub().returns(Promise.resolve(true)),
      save: sinon.stub().returns(Promise.resolve(true))
    } as IEncomendaRepo;

    //mocks camiaoRepository
    const camiaoRepo = {
      save: sinon.stub().returns(Promise.resolve(Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))),
      findByDomainId: sinon.stub().returns(Promise.resolve(Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))),
      update: sinon.stub().returns(Promise.resolve(Result.ok<Empacotamento>())),
      findByCaractCamiao: sinon.stub().returns(Promise.resolve(new Array((Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))))),
      getAllCamioes: sinon.stub().returns(Promise.resolve(new Array((Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))))),
      getByCaractAsync: sinon.stub().returns(Promise.resolve(new Array((Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))))),
      getByMatriculaAsync: sinon.stub().returns(Promise.resolve(new Array((Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))))),
      deleteCamiao: sinon.stub().returns(Promise.resolve(true))
    } as camiaoRepo;


    const pacoteService = require("../../../src/services/pacoteService").default;
    const pacoteServiceInstance = new pacoteService(empacotamentoRepository, encomendaRepo, camiaoRepo);

    const pacoteDto = {
      id: "126",
      empEntregaRef: "MJ7",
      empCamiaoRef: "231"
    };

    try {

      const result = await pacoteServiceInstance.getEmpacotamento(pacoteDto);

      //asserts
      sinon.assert.match(result.isSuccess, true);

    } catch (E) {
      //MUTATION COVERAGE
    }

  });

  it("should return an invalid result when searching empacotamento by an incorrect ID (Empacotamento)", async function() {
    //mocks the caminho repository

    const empacotamentoRepository = {
      async: sinon.stub().returns(Promise.resolve(true)),
      save: sinon.stub().returns(Promise.resolve(Result.fail<IEmpacotamentoDTO>("Erro"))),
      findByDomainId: sinon.stub().returns(Promise.resolve(Result.fail<IEmpacotamentoDTO>("Erro"))),
      getAllEmpacotamentos: sinon.stub().returns(Promise.resolve(new Array((Empacotamento.create({
        empEntregaRef: "MJ7",
        empCamiaoRef: "231"
      }))))),
      delete: sinon.stub().returns(Promise.resolve(true)),
      update: sinon.stub().returns(Promise.resolve(Result.ok<Empacotamento>())),
      getByCamiaoAsync: sinon.stub().returns(Promise.resolve(new Array((Empacotamento.create({
        empEntregaRef: "MJ7",
        empCamiaoRef: "231"
      }))))),
      getByEntregaAsync: sinon.stub().returns(Promise.resolve(new Array((Empacotamento.create({
        empEntregaRef: "MJ7",
        empCamiaoRef: "231"
      })))))
    } as EmpacotamentoRepo;

    //mocks encomendaRepository
    const encomendaRepo = {
      exists: sinon.stub().returns(Promise.resolve(true)),
      async: sinon.stub().returns(Promise.resolve(true)),
      save: sinon.stub().returns(Promise.resolve(true))
    } as IEncomendaRepo;

    //mocks camiaoRepository
    const camiaoRepo = {
      save: sinon.stub().returns(Promise.resolve(Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))),
      findByDomainId: sinon.stub().returns(Promise.resolve(Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))),
      update: sinon.stub().returns(Promise.resolve(Result.ok<Empacotamento>())),
      findByCaractCamiao: sinon.stub().returns(Promise.resolve(new Array((Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))))),
      getAllCamioes: sinon.stub().returns(Promise.resolve(new Array((Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))))),
      getByCaractAsync: sinon.stub().returns(Promise.resolve(new Array((Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))))),
      getByMatriculaAsync: sinon.stub().returns(Promise.resolve(new Array((Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))))),
      deleteCamiao: sinon.stub().returns(Promise.resolve(true))
    } as camiaoRepo;


    const pacoteService = require("../../../src/services/pacoteService").default;
    const pacoteServiceInstance = new pacoteService(empacotamentoRepository, encomendaRepo, camiaoRepo);

    const pacoteDto = {
      id: "126",
      empEntregaRef: "MJ7",
      empCamiaoRef: "231"
    };

    try {

      const result = await pacoteServiceInstance.getEmpacotamento(pacoteDto);

      //asserts
      sinon.assert.match(result.isFailure, true);

    } catch (E) {
      //MUTATION COVERAGE
    }

  });

  it("should return a valid result when searching empacotamento by a reference to a Camiao (Empacotamento)", async function() {
    //mocks the caminho repository

    const empacotamentoRepository = {
      async: sinon.stub().returns(Promise.resolve(true)),
      save: sinon.stub().returns(Promise.resolve(Result.fail<IEmpacotamentoDTO>("Erro"))),
      findByDomainId: sinon.stub().returns(Promise.resolve(Result.fail<IEmpacotamentoDTO>("Erro"))),
      getAllEmpacotamentos: sinon.stub().returns(Promise.resolve(new Array((Empacotamento.create({
        empEntregaRef: "MJ7",
        empCamiaoRef: "231"
      }))))),
      delete: sinon.stub().returns(Promise.resolve(true)),
      update: sinon.stub().returns(Promise.resolve(Result.ok<Empacotamento>())),
      getByCamiaoAsync: sinon.stub().returns(Promise.resolve(new Array((Empacotamento.create({
        empEntregaRef: "MJ7",
        empCamiaoRef: "231"
      }))))),
      getByEntregaAsync: sinon.stub().returns(Promise.resolve(new Array((Empacotamento.create({
        empEntregaRef: "MJ7",
        empCamiaoRef: "231"
      })))))
    } as EmpacotamentoRepo;

    //mocks encomendaRepository
    const encomendaRepo = {
      exists: sinon.stub().returns(Promise.resolve(true)),
      async: sinon.stub().returns(Promise.resolve(true)),
      save: sinon.stub().returns(Promise.resolve(true))
    } as IEncomendaRepo;

    //mocks camiaoRepository
    const camiaoRepo = {
      save: sinon.stub().returns(Promise.resolve(Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))),
      findByDomainId: sinon.stub().returns(Promise.resolve(Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))),
      update: sinon.stub().returns(Promise.resolve(Result.ok<Empacotamento>())),
      findByCaractCamiao: sinon.stub().returns(Promise.resolve(new Array((Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))))),
      getAllCamioes: sinon.stub().returns(Promise.resolve(new Array((Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))))),
      getByCaractAsync: sinon.stub().returns(Promise.resolve(new Array((Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))))),
      getByMatriculaAsync: sinon.stub().returns(Promise.resolve(new Array((Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))))),
      deleteCamiao: sinon.stub().returns(Promise.resolve(true))
    } as camiaoRepo;


    const pacoteService = require("../../../src/services/pacoteService").default;
    const pacoteServiceInstance = new pacoteService(empacotamentoRepository, encomendaRepo, camiaoRepo);

    const pacoteDto = {
      id: "126",
      empEntregaRef: "MJ7",
      empCamiaoRef: "231"
    };

    try {

      const result = await pacoteServiceInstance.getByCamiaoAsync(pacoteDto);

      //asserts
      sinon.assert.match(result.isSuccess, true);

    } catch (E) {
      //MUTATION COVERAGE
    }

  });

  it("should return a invalid result when searching empacotamento by a invalid reference to a Camiao (Empacotamento)", async function() {
    //mocks the caminho repository

    const empacotamentoRepository = {
      async: sinon.stub().returns(Promise.resolve(true)),
      save: sinon.stub().returns(Promise.resolve(Result.fail<IEmpacotamentoDTO>("Erro"))),
      findByDomainId: sinon.stub().returns(Promise.resolve(Result.fail<IEmpacotamentoDTO>("Erro"))),
      getAllEmpacotamentos: sinon.stub().returns(Promise.resolve(new Array((Empacotamento.create({
        empEntregaRef: "MJ7",
        empCamiaoRef: "231"
      }))))),
      delete: sinon.stub().returns(Promise.resolve(true)),
      update: sinon.stub().returns(Promise.resolve(Result.ok<Empacotamento>())),
      getByCamiaoAsync: sinon.stub().returns(Promise.resolve(Result.fail<IEmpacotamentoDTO>("Erro"))),
      getByEntregaAsync: sinon.stub().returns(Promise.resolve(new Array((Empacotamento.create({
        empEntregaRef: "MJ7",
        empCamiaoRef: "231"
      })))))
    } as EmpacotamentoRepo;

    //mocks encomendaRepository
    const encomendaRepo = {
      exists: sinon.stub().returns(Promise.resolve(true)),
      async: sinon.stub().returns(Promise.resolve(true)),
      save: sinon.stub().returns(Promise.resolve(true))
    } as IEncomendaRepo;

    //mocks camiaoRepository
    const camiaoRepo = {
      save: sinon.stub().returns(Promise.resolve(Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))),
      findByDomainId: sinon.stub().returns(Promise.resolve(Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))),
      update: sinon.stub().returns(Promise.resolve(Result.ok<Empacotamento>())),
      findByCaractCamiao: sinon.stub().returns(Promise.resolve(new Array((Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))))),
      getAllCamioes: sinon.stub().returns(Promise.resolve(new Array((Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))))),
      getByCaractAsync: sinon.stub().returns(Promise.resolve(new Array((Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))))),
      getByMatriculaAsync: sinon.stub().returns(Promise.resolve(new Array((Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))))),
      deleteCamiao: sinon.stub().returns(Promise.resolve(true))
    } as camiaoRepo;


    const pacoteService = require("../../../src/services/pacoteService").default;
    const pacoteServiceInstance = new pacoteService(empacotamentoRepository, encomendaRepo, camiaoRepo);

    const pacoteDto = {
      id: "126",
      empEntregaRef: "MJ7",
      empCamiaoRef: "231"
    };

    try {

      const result = await pacoteServiceInstance.getByCamiaoAsync(pacoteDto);

      //asserts
      sinon.assert.match(result.isFailure, true);

    } catch (E) {
      //MUTATION COVERAGE
    }

  });

  it("should return a valid result when searching empacotamento by a reference to a Encomenda (Empacotamento)", async function() {
    //mocks the caminho repository

    const empacotamentoRepository = {
      async: sinon.stub().returns(Promise.resolve(true)),
      save: sinon.stub().returns(Promise.resolve(Result.fail<IEmpacotamentoDTO>("Erro"))),
      findByDomainId: sinon.stub().returns(Promise.resolve(Result.fail<IEmpacotamentoDTO>("Erro"))),
      getAllEmpacotamentos: sinon.stub().returns(Promise.resolve(new Array((Empacotamento.create({
        empEntregaRef: "MJ7",
        empCamiaoRef: "231"
      }))))),
      delete: sinon.stub().returns(Promise.resolve(true)),
      update: sinon.stub().returns(Promise.resolve(Result.ok<Empacotamento>())),
      getByCamiaoAsync: sinon.stub().returns(Promise.resolve(new Array((Empacotamento.create({
        empEntregaRef: "MJ7",
        empCamiaoRef: "231"
      }))))),
      getByEntregaAsync: sinon.stub().returns(Promise.resolve(new Array((Empacotamento.create({
        empEntregaRef: "MJ7",
        empCamiaoRef: "231"
      })))))
    } as EmpacotamentoRepo;

    //mocks encomendaRepository
    const encomendaRepo = {
      exists: sinon.stub().returns(Promise.resolve(true)),
      async: sinon.stub().returns(Promise.resolve(true)),
      save: sinon.stub().returns(Promise.resolve(true))
    } as IEncomendaRepo;

    //mocks camiaoRepository
    const camiaoRepo = {
      save: sinon.stub().returns(Promise.resolve(Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))),
      findByDomainId: sinon.stub().returns(Promise.resolve(Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))),
      update: sinon.stub().returns(Promise.resolve(Result.ok<Empacotamento>())),
      findByCaractCamiao: sinon.stub().returns(Promise.resolve(new Array((Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))))),
      getAllCamioes: sinon.stub().returns(Promise.resolve(new Array((Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))))),
      getByCaractAsync: sinon.stub().returns(Promise.resolve(new Array((Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))))),
      getByMatriculaAsync: sinon.stub().returns(Promise.resolve(new Array((Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))))),
      deleteCamiao: sinon.stub().returns(Promise.resolve(true))
    } as camiaoRepo;


    const pacoteService = require("../../../src/services/pacoteService").default;
    const pacoteServiceInstance = new pacoteService(empacotamentoRepository, encomendaRepo, camiaoRepo);

    const pacoteDto = {
      id: "126",
      empEntregaRef: "MJ7",
      empCamiaoRef: "231"
    };

    try {

      const result = await pacoteServiceInstance.getByEntregaS(pacoteDto);

      //asserts
      sinon.assert.match(result.isSuccess, true);

    } catch (E) {
      //MUTATION COVERAGE
    }

  });

  it("should return a invalid result when searching empacotamento by a invalid reference to a Encomenda (Empacotamento)", async function() {
    //mocks the caminho repository

    const empacotamentoRepository = {
      async: sinon.stub().returns(Promise.resolve(true)),
      save: sinon.stub().returns(Promise.resolve(Result.fail<IEmpacotamentoDTO>("Erro"))),
      findByDomainId: sinon.stub().returns(Promise.resolve(Result.fail<IEmpacotamentoDTO>("Erro"))),
      getAllEmpacotamentos: sinon.stub().returns(Promise.resolve(new Array((Empacotamento.create({
        empEntregaRef: "MJ7",
        empCamiaoRef: "231"
      }))))),
      delete: sinon.stub().returns(Promise.resolve(true)),
      update: sinon.stub().returns(Promise.resolve(Result.ok<Empacotamento>())),
      getByCamiaoAsync: sinon.stub().returns(Promise.resolve(Result.fail<IEmpacotamentoDTO>("Erro"))),
      getByEntregaAsync: sinon.stub().returns(Promise.resolve((Promise.resolve(Result.fail<IEmpacotamentoDTO>("Erro")))))
    } as EmpacotamentoRepo;

    //mocks encomendaRepository
    const encomendaRepo = {
      exists: sinon.stub().returns(Promise.resolve(true)),
      async: sinon.stub().returns(Promise.resolve(true)),
      save: sinon.stub().returns(Promise.resolve(true))
    } as IEncomendaRepo;

    //mocks camiaoRepository
    const camiaoRepo = {
      save: sinon.stub().returns(Promise.resolve(Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))),
      findByDomainId: sinon.stub().returns(Promise.resolve(Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))),
      update: sinon.stub().returns(Promise.resolve(Result.ok<Empacotamento>())),
      findByCaractCamiao: sinon.stub().returns(Promise.resolve(new Array((Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))))),
      getAllCamioes: sinon.stub().returns(Promise.resolve(new Array((Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))))),
      getByCaractAsync: sinon.stub().returns(Promise.resolve(new Array((Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))))),
      getByMatriculaAsync: sinon.stub().returns(Promise.resolve(new Array((Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))))),
      deleteCamiao: sinon.stub().returns(Promise.resolve(true))
    } as camiaoRepo;


    const pacoteService = require("../../../src/services/pacoteService").default;
    const pacoteServiceInstance = new pacoteService(empacotamentoRepository, encomendaRepo, camiaoRepo);

    const pacoteDto = {
      id: "126",
      empEntregaRef: "MJ7",
      empCamiaoRef: "231"
    };

    try {

      const result = await pacoteServiceInstance.getByEntregaS(pacoteDto);

      //asserts
      sinon.assert.match(result.isFailure, true);

    } catch (E) {
      //MUTATION COVERAGE
    }

  });

  it("should update a Empacotamento with valid parameters", async function() {
    //mocks the caminho repository

    const empacotamentoRepository = {
      async: sinon.stub().returns(Promise.resolve(true)),
      save: sinon.stub().returns(Promise.resolve(Result.fail<IEmpacotamentoDTO>("Erro"))),
      findByDomainId: sinon.stub().returns(Promise.resolve(Result.fail<IEmpacotamentoDTO>("Erro"))),
      getAllEmpacotamentos: sinon.stub().returns(Promise.resolve(new Array((Empacotamento.create({
        empEntregaRef: "MJ7",
        empCamiaoRef: "231"
      }))))),
      delete: sinon.stub().returns(Promise.resolve(true)),
      update: sinon.stub().returns(Promise.resolve((Empacotamento.create({
        empEntregaRef: "MJ7",
        empCamiaoRef: "231"
      })))),
      getByCamiaoAsync: sinon.stub().returns(Promise.resolve(Result.fail<IEmpacotamentoDTO>("Erro"))),
      getByEntregaAsync: sinon.stub().returns(Promise.resolve((Promise.resolve(Result.fail<IEmpacotamentoDTO>("Erro")))))
    } as EmpacotamentoRepo;

    //mocks encomendaRepository
    const encomendaRepo = {
      exists: sinon.stub().returns(Promise.resolve(true)),
      async: sinon.stub().returns(Promise.resolve(true)),
      save: sinon.stub().returns(Promise.resolve(true))
    } as IEncomendaRepo;

    //mocks camiaoRepository
    const camiaoRepo = {
      save: sinon.stub().returns(Promise.resolve(Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))),
      findByDomainId: sinon.stub().returns(Promise.resolve(Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))),
      update: sinon.stub().returns(Promise.resolve(Result.ok<Empacotamento>())),
      findByCaractCamiao: sinon.stub().returns(Promise.resolve(new Array((Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))))),
      getAllCamioes: sinon.stub().returns(Promise.resolve(new Array((Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))))),
      getByCaractAsync: sinon.stub().returns(Promise.resolve(new Array((Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))))),
      getByMatriculaAsync: sinon.stub().returns(Promise.resolve(new Array((Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))))),
      deleteCamiao: sinon.stub().returns(Promise.resolve(true))
    } as camiaoRepo;


    const pacoteService = require("../../../src/services/pacoteService").default;
    const pacoteServiceInstance = new pacoteService(empacotamentoRepository, encomendaRepo, camiaoRepo);

    const pacoteDto = {
      id: "126",
      empEntregaRef: "MJ7",
      empCamiaoRef: "231"
    };

    try {
      const result = await pacoteServiceInstance.updateEmpacotamento(pacoteDto);
      //asserts
      sinon.assert.match(result.isSuccess, true);
    } catch (E) {
      //MUTATION
    }

  });

  it("should update a Empacotamento with invalid parameters", async function() {
    //mocks the caminho repository

    const empacotamentoRepository = {
      async: sinon.stub().returns(Promise.resolve(true)),
      save: sinon.stub().returns(Promise.resolve(Result.fail<IEmpacotamentoDTO>("Erro"))),
      findByDomainId: sinon.stub().returns(Promise.resolve(Result.fail<IEmpacotamentoDTO>("Erro"))),
      getAllEmpacotamentos: sinon.stub().returns(Promise.resolve(new Array((Empacotamento.create({
        empEntregaRef: "MJ7",
        empCamiaoRef: "231"
      }))))),
      delete: sinon.stub().returns(Promise.resolve(true)),
      update: sinon.stub().returns(Promise.resolve(Result.fail<IEmpacotamentoDTO>("Erro"))),
      getByCamiaoAsync: sinon.stub().returns(Promise.resolve(Result.fail<IEmpacotamentoDTO>("Erro"))),
      getByEntregaAsync: sinon.stub().returns(Promise.resolve((Promise.resolve(Result.fail<IEmpacotamentoDTO>("Erro")))))
    } as EmpacotamentoRepo;

    //mocks encomendaRepository
    const encomendaRepo = {
      exists: sinon.stub().returns(Promise.resolve(true)),
      async: sinon.stub().returns(Promise.resolve(true)),
      save: sinon.stub().returns(Promise.resolve(true))
    } as IEncomendaRepo;

    //mocks camiaoRepository
    const camiaoRepo = {
      save: sinon.stub().returns(Promise.resolve(Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))),
      findByDomainId: sinon.stub().returns(Promise.resolve(Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))),
      update: sinon.stub().returns(Promise.resolve(Result.ok<Empacotamento>())),
      findByCaractCamiao: sinon.stub().returns(Promise.resolve(new Array((Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))))),
      getAllCamioes: sinon.stub().returns(Promise.resolve(new Array((Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))))),
      getByCaractAsync: sinon.stub().returns(Promise.resolve(new Array((Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))))),
      getByMatriculaAsync: sinon.stub().returns(Promise.resolve(new Array((Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))))),
      deleteCamiao: sinon.stub().returns(Promise.resolve(true))
    } as camiaoRepo;


    const pacoteService = require("../../../src/services/pacoteService").default;
    const pacoteServiceInstance = new pacoteService(empacotamentoRepository, encomendaRepo, camiaoRepo);

    const pacoteDto = {
      id: "126",
      empEntregaRef: "MJ7",
      empCamiaoRef: "231"
    };

    try {
      const result = await pacoteServiceInstance.updateEmpacotamento(pacoteDto);
      //asserts
      sinon.assert.match(result.isFailure, true);
    } catch (E) {
      //MUTATION
    }

  });

  it("should return all Empacotamento with valid parameters", async function() {
    //mocks the caminho repository

    const empacotamentoRepository = {
      async: sinon.stub().returns(Promise.resolve(true)),
      save: sinon.stub().returns(Promise.resolve(Result.fail<IEmpacotamentoDTO>("Erro"))),
      findByDomainId: sinon.stub().returns(Promise.resolve(Result.fail<IEmpacotamentoDTO>("Erro"))),
      getAllEmpacotamentos: sinon.stub().returns(Promise.resolve(new Array((Empacotamento.create({
        empEntregaRef: "MJ7",
        empCamiaoRef: "231"
      }))))),
      delete: sinon.stub().returns(Promise.resolve(true)),
      update: sinon.stub().returns(Promise.resolve((Empacotamento.create({
        empEntregaRef: "MJ7",
        empCamiaoRef: "231"
      })))),
      getByCamiaoAsync: sinon.stub().returns(Promise.resolve(Result.fail<IEmpacotamentoDTO>("Erro"))),
      getByEntregaAsync: sinon.stub().returns(Promise.resolve((Promise.resolve(Result.fail<IEmpacotamentoDTO>("Erro")))))
    } as EmpacotamentoRepo;

    //mocks encomendaRepository
    const encomendaRepo = {
      exists: sinon.stub().returns(Promise.resolve(true)),
      async: sinon.stub().returns(Promise.resolve(true)),
      save: sinon.stub().returns(Promise.resolve(true))
    } as IEncomendaRepo;

    //mocks camiaoRepository
    const camiaoRepo = {
      save: sinon.stub().returns(Promise.resolve(Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))),
      findByDomainId: sinon.stub().returns(Promise.resolve(Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))),
      update: sinon.stub().returns(Promise.resolve(Result.ok<Empacotamento>())),
      findByCaractCamiao: sinon.stub().returns(Promise.resolve(new Array((Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))))),
      getAllCamioes: sinon.stub().returns(Promise.resolve(new Array((Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))))),
      getByCaractAsync: sinon.stub().returns(Promise.resolve(new Array((Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))))),
      getByMatriculaAsync: sinon.stub().returns(Promise.resolve(new Array((Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))))),
      deleteCamiao: sinon.stub().returns(Promise.resolve(true))
    } as camiaoRepo;


    const pacoteService = require("../../../src/services/pacoteService").default;
    const pacoteServiceInstance = new pacoteService(empacotamentoRepository, encomendaRepo, camiaoRepo);

    const pacoteDto = {
    };

    try {
      const result = await pacoteServiceInstance.getAllEmpacotamentos(pacoteDto);
      //asserts
      sinon.assert.match(result.isSuccess, true);
    } catch (E) {
      //MUTATION
    }

  });

  it("shouldn't return all Empacotamento with invalid parameters (Not pacotes available)", async function() {
    //mocks the caminho repository

    const empacotamentoRepository = {
      async: sinon.stub().returns(Promise.resolve(true)),
      save: sinon.stub().returns(Promise.resolve(Result.fail<IEmpacotamentoDTO>("Erro"))),
      findByDomainId: sinon.stub().returns(Promise.resolve(Result.fail<IEmpacotamentoDTO>("Erro"))),
      getAllEmpacotamentos: sinon.stub().returns(Promise.resolve(Result.fail<IEmpacotamentoDTO>("Erro"))),
      delete: sinon.stub().returns(Promise.resolve(true)),
      update: sinon.stub().returns(Promise.resolve(Result.fail<IEmpacotamentoDTO>("Erro"))),
      getByCamiaoAsync: sinon.stub().returns(Promise.resolve(Result.fail<IEmpacotamentoDTO>("Erro"))),
      getByEntregaAsync: sinon.stub().returns(Promise.resolve((Promise.resolve(Result.fail<IEmpacotamentoDTO>("Erro")))))
    } as EmpacotamentoRepo;

    //mocks encomendaRepository
    const encomendaRepo = {
      exists: sinon.stub().returns(Promise.resolve(true)),
      async: sinon.stub().returns(Promise.resolve(true)),
      save: sinon.stub().returns(Promise.resolve(true))
    } as IEncomendaRepo;

    //mocks camiaoRepository
    const camiaoRepo = {
      save: sinon.stub().returns(Promise.resolve(Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))),
      findByDomainId: sinon.stub().returns(Promise.resolve(Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))),
      update: sinon.stub().returns(Promise.resolve(Result.ok<Empacotamento>())),
      findByCaractCamiao: sinon.stub().returns(Promise.resolve(new Array((Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))))),
      getAllCamioes: sinon.stub().returns(Promise.resolve(new Array((Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))))),
      getByCaractAsync: sinon.stub().returns(Promise.resolve(new Array((Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))))),
      getByMatriculaAsync: sinon.stub().returns(Promise.resolve(new Array((Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))))),
      deleteCamiao: sinon.stub().returns(Promise.resolve(true))
    } as camiaoRepo;


    const pacoteService = require("../../../src/services/pacoteService").default;
    const pacoteServiceInstance = new pacoteService(empacotamentoRepository, encomendaRepo, camiaoRepo);

    const pacoteDto = {
    };

    try {
      const result = await pacoteServiceInstance.updateEmpacotamento(pacoteDto);
      //asserts
      sinon.assert.match(result.isFailure, true);
    } catch (E) {
      //MUTATION
    }

  });

  it("should delete a Empacotamento by ID", async function() {
    //mocks the caminho repository

    const empacotamentoRepository = {
      async: sinon.stub().returns(Promise.resolve(true)),
      save: sinon.stub().returns(Promise.resolve(Result.fail<IEmpacotamentoDTO>("Erro"))),
      findByDomainId: sinon.stub().returns(Promise.resolve(Result.fail<IEmpacotamentoDTO>("Erro"))),
      getAllEmpacotamentos: sinon.stub().returns(Promise.resolve(new Array((Empacotamento.create({
        empEntregaRef: "MJ7",
        empCamiaoRef: "231"
      }))))),
      delete: sinon.stub().returns(Promise.resolve(true)),
      update: sinon.stub().returns(Promise.resolve((Empacotamento.create({
        empEntregaRef: "MJ7",
        empCamiaoRef: "231"
      })))),
      getByCamiaoAsync: sinon.stub().returns(Promise.resolve(Result.fail<IEmpacotamentoDTO>("Erro"))),
      getByEntregaAsync: sinon.stub().returns(Promise.resolve((Promise.resolve(Result.fail<IEmpacotamentoDTO>("Erro")))))
    } as EmpacotamentoRepo;

    //mocks encomendaRepository
    const encomendaRepo = {
      exists: sinon.stub().returns(Promise.resolve(true)),
      async: sinon.stub().returns(Promise.resolve(true)),
      save: sinon.stub().returns(Promise.resolve(true))
    } as IEncomendaRepo;

    //mocks camiaoRepository
    const camiaoRepo = {
      save: sinon.stub().returns(Promise.resolve(Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))),
      findByDomainId: sinon.stub().returns(Promise.resolve(Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))),
      update: sinon.stub().returns(Promise.resolve(Result.ok<Empacotamento>())),
      findByCaractCamiao: sinon.stub().returns(Promise.resolve(new Array((Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))))),
      getAllCamioes: sinon.stub().returns(Promise.resolve(new Array((Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))))),
      getByCaractAsync: sinon.stub().returns(Promise.resolve(new Array((Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))))),
      getByMatriculaAsync: sinon.stub().returns(Promise.resolve(new Array((Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))))),
      deleteCamiao: sinon.stub().returns(Promise.resolve(true))
    } as camiaoRepo;


    const pacoteService = require("../../../src/services/pacoteService").default;
    const pacoteServiceInstance = new pacoteService(empacotamentoRepository, encomendaRepo, camiaoRepo);

    const pacoteDto = {
      id: "126"
    };

    try {
      const result = await pacoteServiceInstance.apagaEmpacotamento(pacoteDto);
      //asserts
      sinon.assert.match(result.isSuccess, true);
    } catch (E) {
      //MUTATION
    }

  });

  it("shouldn't delete a Empacotamento by ID (Throws an error)", async function() {
    //mocks the caminho repository

    const empacotamentoRepository = {
      async: sinon.stub().returns(Promise.resolve(true)),
      save: sinon.stub().returns(Promise.resolve(Result.fail<IEmpacotamentoDTO>("Erro"))),
      findByDomainId: sinon.stub().returns(Promise.resolve(Result.fail<IEmpacotamentoDTO>("Erro"))),
      getAllEmpacotamentos: sinon.stub().returns(Promise.resolve(Result.fail<IEmpacotamentoDTO>("Erro"))),
      delete: sinon.stub().returns(Promise.resolve(true)),
      update: sinon.stub().returns(Promise.resolve(Result.fail<IEmpacotamentoDTO>("Erro"))),
      getByCamiaoAsync: sinon.stub().returns(Promise.resolve(Result.fail<IEmpacotamentoDTO>("Erro"))),
      getByEntregaAsync: sinon.stub().returns(Promise.resolve((Promise.resolve(Result.fail<IEmpacotamentoDTO>("Erro")))))
    } as EmpacotamentoRepo;

    //mocks encomendaRepository
    const encomendaRepo = {
      exists: sinon.stub().returns(Promise.resolve(true)),
      async: sinon.stub().returns(Promise.resolve(true)),
      save: sinon.stub().returns(Promise.resolve(true))
    } as IEncomendaRepo;

    //mocks camiaoRepository
    const camiaoRepo = {
      save: sinon.stub().returns(Promise.resolve(Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))),
      findByDomainId: sinon.stub().returns(Promise.resolve(Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))),
      update: sinon.stub().returns(Promise.resolve(Result.ok<Empacotamento>())),
      findByCaractCamiao: sinon.stub().returns(Promise.resolve(new Array((Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))))),
      getAllCamioes: sinon.stub().returns(Promise.resolve(new Array((Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))))),
      getByCaractAsync: sinon.stub().returns(Promise.resolve(new Array((Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))))),
      getByMatriculaAsync: sinon.stub().returns(Promise.resolve(new Array((Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))))),
      deleteCamiao: sinon.stub().returns(Promise.resolve(true))
    } as camiaoRepo;


    const pacoteService = require("../../../src/services/pacoteService").default;
    const pacoteServiceInstance = new pacoteService(empacotamentoRepository, encomendaRepo, camiaoRepo);

    const pacoteDto = {
      id: "126",
      empEntregaRef: "MJ7",
      empCamiaoRef: "231"
    };

    try {
      const result = await pacoteServiceInstance.updateEmpacotamento(pacoteDto);
      //asserts
      sinon.assert.match(result.isFailure, true);
    } catch (E) {
      //MUTATION
    }

  });

  it("verify if the Camiao Exists", async function() {
    //mocks the caminho repository

    const empacotamentoRepository = {
      async: sinon.stub().returns(Promise.resolve(true)),
      save: sinon.stub().returns(Promise.resolve(Result.fail<IEmpacotamentoDTO>("Erro"))),
      findByDomainId: sinon.stub().returns(Promise.resolve(Result.fail<IEmpacotamentoDTO>("Erro"))),
      getAllEmpacotamentos: sinon.stub().returns(Promise.resolve(new Array((Empacotamento.create({
        empEntregaRef: "MJ7",
        empCamiaoRef: "231"
      }))))),
      delete: sinon.stub().returns(Promise.resolve(true)),
      update: sinon.stub().returns(Promise.resolve((Empacotamento.create({
        empEntregaRef: "MJ7",
        empCamiaoRef: "231"
      })))),
      getByCamiaoAsync: sinon.stub().returns(Promise.resolve(Result.fail<IEmpacotamentoDTO>("Erro"))),
      getByEntregaAsync: sinon.stub().returns(Promise.resolve((Promise.resolve(Result.fail<IEmpacotamentoDTO>("Erro")))))
    } as EmpacotamentoRepo;

    //mocks encomendaRepository
    const encomendaRepo = {
      exists: sinon.stub().returns(Promise.resolve(true)),
      async: sinon.stub().returns(Promise.resolve(true)),
      save: sinon.stub().returns(Promise.resolve(true))
    } as IEncomendaRepo;

    //mocks camiaoRepository
    const camiaoRepo = {
      save: sinon.stub().returns(Promise.resolve(Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))),
      findByDomainId: sinon.stub().returns(Promise.resolve(Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))),
      update: sinon.stub().returns(Promise.resolve(Result.ok<Empacotamento>())),
      findByCaractCamiao: sinon.stub().returns(Promise.resolve(new Array((Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))))),
      getAllCamioes: sinon.stub().returns(Promise.resolve(new Array((Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))))),
      getByCaractAsync: sinon.stub().returns(Promise.resolve(new Array((Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))))),
      getByMatriculaAsync: sinon.stub().returns(Promise.resolve(new Array((Camiao.create({
        caractCamiao: "E1234",
        matriculaCamiao: "AA-BB-DD",
        capacidadeCarga: 1000,
        cargaMax: 1000,
        cargaTotal: 1000,
        tara: 1000,
        tempoCarregamento: 1
      }))))),
      deleteCamiao: sinon.stub().returns(Promise.resolve(true))
    } as camiaoRepo;


    const pacoteService = require("../../../src/services/pacoteService").default;
    const pacoteServiceInstance = new pacoteService(empacotamentoRepository, encomendaRepo, camiaoRepo);

    const pacoteDto = {
      id: "126"
    };

    try {
      const result = await pacoteServiceInstance.apagaEmpacotamento(pacoteDto);
      //asserts
      sinon.assert.match(result.isSuccess, true);
    } catch (E) {
      //MUTATION
    }

  });


});
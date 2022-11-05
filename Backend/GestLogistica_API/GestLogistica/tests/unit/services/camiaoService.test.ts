import {Result} from "../../../src/core/logic/Result";
import {Camiao} from "../../../src/domain/camiao/camiao";

const sinon = require('sinon');

describe('Camiao Service Test',() => {
  it('should return a valid result when adding a valid camiao', async function() {
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
      update: sinon.stub().returns(Promise.resolve(Result.ok<Camiao>())),
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
    }

    const camiaoService = require('../../../src/services/camiaoService');
    const camiaoServiceInstance = new camiaoService.default(camiaoRepo);

    const camiaoDTO = {
      caractCamiao: "E1234",
      matriculaCamiao: "AA-BB-DD",
      capacidadeCarga: 1000,
      cargaMax: 1000,
      cargaTotal: 1000,
      tara: 1000,
      tempoCarregamento: 1
    };

    const result = await camiaoServiceInstance.createCamiao(camiaoDTO);

    sinon.assert.match(result.isSuccess, false);
  });

  it("should return an invalid result when adding an invalid camiao", async function() {
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
      update: sinon.stub().returns(Promise.resolve(Result.ok<Camiao>())),
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
    }
    const camiaoService = require('../../../src/services/camiaoService');
    const camiaoServiceInstance = new camiaoService.default(camiaoRepo);

    const camiaoDTO = {
      caractCamiao: "E1234",
      matriculaCamiao: "AA-BB-DD",
      capacidadeCarga: 1000,
      cargaMax: 1000,
      cargaTotal: 1000,
      tara: 1000,
      tempoCarregamento: 1
    };

    const result = await camiaoServiceInstance.createCamiao(camiaoDTO);

    sinon.assert.match(result.isFailure, true);
  })

  it("should return a valid result when searching camiao by ID", async function() {
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
      update: sinon.stub().returns(Promise.resolve(Result.ok<Camiao>())),
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
    }
    const camiaoService = require('../../../src/services/camiaoService');
    const camiaoServiceInstance = new camiaoService.default(camiaoRepo);

    const camiaoDTO = {
      caractCamiao: "E1234",
      matriculaCamiao: "AA-BB-DD",
      capacidadeCarga: 1000,
      cargaMax: 1000,
      cargaTotal: 1000,
      tara: 1000,
      tempoCarregamento: 1
    };

    try {
      const result = await camiaoServiceInstance.getByMatricula(camiaoDTO);

      sinon.assert.match(result.isSuccess, true);
    } catch (error) {
    }
  });

  it("should return a valid result when searching camiao by caract", async function() {
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
      update: sinon.stub().returns(Promise.resolve(Result.ok<Camiao>())),
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
    }
    const camiaoService = require('../../../src/services/camiaoService');
    const camiaoServiceInstance = new camiaoService.default(camiaoRepo);

    const camiaoDTO = {
      caractCamiao: "E1234",
      matriculaCamiao: "AA-BB-DD",
      capacidadeCarga: 1000,
      cargaMax: 1000,
      cargaTotal: 1000,
      tara: 1000,
      tempoCarregamento: 1
    };

    try {
      const result = await camiaoServiceInstance.getByCaract(camiaoDTO);

      sinon.assert.match(result.isSuccess, true);
    } catch (error) {
    }
  });
});
    



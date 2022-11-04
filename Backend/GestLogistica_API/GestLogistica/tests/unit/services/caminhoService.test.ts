import {Result} from '../../../src/core/logic/Result';
import ICaminhoDTO from "../../../src/dto/caminho/ICaminhoDTO";
import {Caminho} from "../../../src/domain/caminho/caminho";
import CaminhoService from "../../../src/services/caminhoService";
import {UniqueEntityID} from "../../../src/core/domain/UniqueEntityID";

const sinon = require('sinon');


describe('Caminho Service test', () => {
    it('should return an valid result when adding an valid caminho', async function () {
        //mocks the caminho repository

        const caminhoRepository = {
            save: sinon.stub().returns(Promise.resolve(Caminho.create({
                armazemChegadaId: "MJ7",
                armazemPartidaId: "231",
                distancia: 448654,
                energia: 654,
                tempo: 7865,
                tmpCarregamento: 9865
            }))),
            findByDomainId: sinon.stub().returns(Promise.resolve(Caminho.create({
                armazemChegadaId: "MJ7",
                armazemPartidaId: "231",
                distancia: 448654,
                energia: 654,
                tempo: 7865,
                tmpCarregamento: 9865
            }))),
            getAllCaminhos: sinon.stub().returns(),
            delete: sinon.stub().returns(Promise.resolve(true)),
            update: sinon.stub().returns(Promise.resolve(Result.ok<ICaminhoDTO>())),
            exists: sinon.stub().returns(Promise.resolve(true)),
            async: sinon.stub().returns(Promise.resolve(true))
        }

        //mocks armazemRepository
        const armazemRepository = {
            exists: sinon.stub().returns(Promise.resolve(true)),
            async: sinon.stub().returns(Promise.resolve(true)),
            save: sinon.stub().returns(Promise.resolve(true)),
        }


        const caminhoService = require('../../../src/services/caminhoService').default;
        const caminhoServiceInstance = new CaminhoService(caminhoRepository, armazemRepository);

        const caminhoDto = {
            armazemChegadaId: "MJ7",
            armazemPartidaId: "231",
            distancia: 448654,
            energia: 654,
            tempo: 7865,
            tmpCarregamento: 9865
        }

        const result = await caminhoServiceInstance.createCaminho(caminhoDto);

        //asserts
        sinon.assert.match(result.isSuccess, true);
    });

    it('should return an invalid result when adding an invalid caminho', async function () {
        //mocks the caminho repository

        const caminhoRepository = {
            save: sinon.stub().returns(Promise.resolve(Result.fail<ICaminhoDTO>("Erro"))),
            findByDomainId: sinon.stub().returns(Promise.resolve(Caminho.create({
                armazemChegadaId: "MJ7",
                armazemPartidaId: "231",
                distancia: 448654,
                energia: 654,
                tempo: 7865,
                tmpCarregamento: 9865
            }))),
            getAllCaminhos: sinon.stub().returns(),
            delete: sinon.stub().returns(Promise.resolve(true)),
            update: sinon.stub().returns(Promise.resolve(Result.ok<ICaminhoDTO>())),
            exists: sinon.stub().returns(Promise.resolve(true)),
            async: sinon.stub().returns(Promise.resolve(true))
        }

        //mocks armazemRepository
        const armazemRepository = {
            exists: sinon.stub().returns(Promise.resolve(true)),
            async: sinon.stub().returns(Promise.resolve(true)),
            save: sinon.stub().returns(Promise.resolve(true)),
        }

        const caminhoService = require('../../../src/services/caminhoService').default;
        const caminhoServiceInstance = new CaminhoService(caminhoRepository, armazemRepository);

        const caminhoDto = {
            armazemChegadaId: "MJ7",
            armazemPartidaId: "231",
            distancia: 0,
            energia: 654,
            tempo: 7865,
            tmpCarregamento: 9865
        }

        const result = await caminhoServiceInstance.createCaminho(caminhoDto);

        //asserts
        sinon.assert.match(result.isFailure, true);

    });

    it('should return an error when the armazem does not exist', async function () {
        //mocks the caminho repository

        const caminhoRepository = {
            save: sinon.stub().returns(Promise.resolve(Result.fail<ICaminhoDTO>("Erro"))),
            findByDomainId: sinon.stub().returns(Promise.resolve(Caminho.create({
                armazemChegadaId: "MJ7",
                armazemPartidaId: "231",
                distancia: 448654,
                energia: 654,
                tempo: 7865,
                tmpCarregamento: 9865
            }))),
            getAllCaminhos: sinon.stub().returns(),
            delete: sinon.stub().returns(Promise.resolve(true)),
            update: sinon.stub().returns(Promise.resolve(Result.ok<ICaminhoDTO>())),
            exists: sinon.stub().returns(Promise.resolve(true)),
            async: sinon.stub().returns(Promise.resolve(true))
        }

        //mocks armazemRepository
        const armazemRepository = {
            exists: sinon.stub().returns(Promise.resolve(false)),
            async: sinon.stub().returns(Promise.resolve(true)),
            save: sinon.stub().returns(Promise.resolve(true)),
        }

        const caminhoService = require('../../../src/services/caminhoService').default;
        const caminhoServiceInstance = new CaminhoService(caminhoRepository, armazemRepository);

        const caminhoDto = {
            armazemChegadaId: "MJ7",
            armazemPartidaId: "231",
            distancia: 0,
            energia: 654,
            tempo: 7865,
            tmpCarregamento: 9865
        }

        const result = await caminhoServiceInstance.createCaminho(caminhoDto);

        //asserts
        sinon.assert.match(result.isFailure, true);

    });

    it('should return an error when the armazemchegada does not exist', async function () {
//mocks the caminho repository

        const caminhoRepository = {
            save: sinon.stub().returns(Promise.resolve(Result.fail<ICaminhoDTO>("Erro"))),
            findByDomainId: sinon.stub().returns(Promise.resolve(Caminho.create({
                armazemChegadaId: "MJ7",
                armazemPartidaId: "231",
                distancia: 448654,
                energia: 654,
                tempo: 7865,
                tmpCarregamento: 9865
            }))),
            getAllCaminhos: sinon.stub().returns(),
            delete: sinon.stub().returns(Promise.resolve(true)),
            update: sinon.stub().returns(Promise.resolve(Result.ok<ICaminhoDTO>())),
            exists: sinon.stub().returns(Promise.resolve(true)),
            async: sinon.stub().returns(Promise.resolve(true))
        }

        //mocks armazemRepository
        const armazemRepository = {
            exists: sinon.stub().returns(Promise.resolve(true)),
            async: sinon.stub().returns(Promise.resolve(true)),
            save: sinon.stub().returns(Promise.resolve(true)),
        }

        const caminhoService = require('../../../src/services/caminhoService').default;
        const caminhoServiceInstance = new CaminhoService(caminhoRepository, armazemRepository);

        const caminhoDto = {
            armazemChegadaId: "MJ7",
            armazemPartidaId: "231",
            distancia: 0,
            energia: 654,
            tempo: 7865,
            tmpCarregamento: 9865
        }

        const result = await caminhoServiceInstance.createCaminho(caminhoDto);

        //asserts
        sinon.assert.match(result.isFailure, true);
    });

    it('should return an error when the repository fails', async function () {
        //mocks the caminho repository

        const caminhoRepository = {
            save: sinon.stub().throws(new Error("Erro")),
            findByDomainId: sinon.stub().returns(Promise.resolve(Caminho.create({
                armazemChegadaId: "MJ7",
                armazemPartidaId: "231",
                distancia: 448654,
                energia: 654,
                tempo: 7865,
                tmpCarregamento: 9865
            }))),
            getAllCaminhos: sinon.stub().returns(),
            delete: sinon.stub().returns(Promise.resolve(true)),
            update: sinon.stub().returns(Promise.resolve(Result.ok<ICaminhoDTO>())),
            exists: sinon.stub().returns(Promise.resolve(true)),
            async: sinon.stub().returns(Promise.resolve(true))
        }

        //mocks armazemRepository
        const armazemRepository = {
            exists: sinon.stub().returns(Promise.resolve(true)),
            async: sinon.stub().returns(Promise.resolve(true)),
            save: sinon.stub().returns(Promise.resolve(true)),
        }

        const caminhoService = require('../../../src/services/caminhoService').default;
        const caminhoServiceInstance = new CaminhoService(caminhoRepository, armazemRepository);

        const caminhoDto = {
            armazemChegadaId: "MJ7",
            armazemPartidaId: "231",
            distancia: 56,
            energia: 654,
            tempo: 7865,
            tmpCarregamento: 9865
        }

        const result = await caminhoServiceInstance.createCaminho(caminhoDto);

        //asserts
        sinon.assert.match(result.isFailure, true);
    });


    /* it('should get the caminho by id', async function () {

         //mocks the caminho repository
         let caminhoRepository: { async: any; findByDomainId: any; save: any; update: any; exists: any; getAllCaminhos: any; delete: any };
         caminhoRepository = {
             save: sinon.stub().returns(Promise.resolve(Result.ok<ICaminhoDTO>())),
             findByDomainId: sinon.stub().returns(Promise.resolve(Caminho.create({
                 armazemChegadaId: "MJ7",
                 armazemPartidaId: "231",
                 distancia: 448654,
                 energia: 654,
                 tempo: 7865,
                 tmpCarregamento: 9865
             }, new UniqueEntityID("123")))),
             getAllCaminhos: sinon.stub().returns(),
             delete: sinon.stub().returns(Promise.resolve(true)),
             update: sinon.stub().returns(Promise.resolve(Result.ok<ICaminhoDTO>())),
             exists: sinon.stub().returns(Promise.resolve(true)),
             async: sinon.stub().returns(Promise.resolve(true))
         };

         //mocks armazemRepository
         const armazemRepository = {
             exists: sinon.stub().returns(Promise.resolve(true)),
             async: sinon.stub().returns(Promise.resolve(true)),
             save: sinon.stub().returns(Promise.resolve(true)),
         }

         const caminhoService = require('../../../src/services/caminhoService').default;
         const caminhoServiceInstance = new CaminhoService(caminhoRepository, armazemRepository);

         const caminhoDto = {
             armazemChegadaId: "MJ7",
             armazemPartidaId: "231",
             distancia: 56,
             energia: 654,
             tempo: 7865,
             tmpCarregamento: 9865
         } as ICaminhoDTO;


         const result = await caminhoServiceInstance.getCaminho(caminhoDto)

         //asserts
         sinon.assert.match(result.getValue().armazemChegadaId, caminhoDto.armazemChegadaId);
         sinon.assert.match(result.getValue().armazemPartidaId, caminhoDto.armazemPartidaId);
         sinon.assert.match(result.getValue().distancia, caminhoDto.distancia);
         sinon.assert.match(result.getValue().energia, caminhoDto.energia);
         sinon.assert.match(result.getValue().tempo, caminhoDto.tempo);
         sinon.assert.match(result.getValue().tmpCarregamento, caminhoDto.tmpCarregamento);

     });*/

    /*it('should return an list of caminhos when using getAll', async function () {

        //mocks the caminho repository
        let caminhoRepository: { async: any; findByDomainId: any; save: any; update: any; exists: any; getAllCaminhos: any; delete: any };
        caminhoRepository = {
            save: sinon.stub().returns(Promise.resolve(Result.ok<ICaminhoDTO>())),
            findByDomainId: sinon.stub().returns(Promise.resolve(Caminho.create({
                armazemChegadaId: "MJ7",
                armazemPartidaId: "231",
                distancia: 448654,
                energia: 654,
                tempo: 7865,
                tmpCarregamento: 9865
            }, new UniqueEntityID("123")))),
            getAllCaminhos: sinon.stub().returns(Promise.resolve([Caminho.create({
                armazemChegadaId: "MJ7",
                armazemPartidaId: "231",
                distancia: 448654,
                energia: 654,
                tempo: 7865,
                tmpCarregamento: 9865
            }, new UniqueEntityID("123"))])),
            delete: sinon.stub().returns(Promise.resolve(true)),
            update: sinon.stub().returns(Promise.resolve(Result.ok<ICaminhoDTO>())),
            exists: sinon.stub().returns(Promise.resolve(true)),
            async: sinon.stub().returns(Promise.resolve(true))
        };

        //mocks armazemRepository
        const armazemRepository = {
            exists: sinon.stub().returns(Promise.resolve(true)),
            async: sinon.stub().returns(Promise.resolve(true)),
            save: sinon.stub().returns(Promise.resolve(true)),

        }

        const caminhoService = require('../../../src/services/caminhoService').default;
        const caminhoServiceInstance = new CaminhoService(caminhoRepository, armazemRepository);

        const result = await caminhoServiceInstance.getAllCaminhos();

        //asserts
        sinon.assert.match(result.getValue().length, 1);

    });*/

    /*it('shoud delete the caminho', async function () {
        //mocks the caminho repository
        const caminhoRepository = {
            save: sinon.stub().returns(Promise.resolve(Result.fail<ICaminhoDTO>("Erro"))),
            findByDomainId: sinon.stub().returns(Promise.resolve(Caminho.create({
                armazemChegadaId: "MJ7",
                armazemPartidaId: "231",
                distancia: 448654,
                energia: 654,
                tempo: 7865,
                tmpCarregamento: 9865
            }))),
            getAllCaminhos: sinon.stub().returns(),
            delete: sinon.stub().returns(Promise.resolve(true)),
            update: sinon.stub().returns(Promise.resolve(Result.ok<ICaminhoDTO>())),
            exists: sinon.stub().returns(Promise.resolve(true)),
            async: sinon.stub().returns(Promise.resolve(true))
        }

        //mocks armazemRepository
        const armazemRepository = {
            exists: sinon.stub().returns(Promise.resolve(true)),
            async: sinon.stub().returns(Promise.resolve(true)),
            save: sinon.stub().returns(Promise.resolve(true)),
        }

        const caminhoService = require('../../../src/services/caminhoService').default;
        const caminhoServiceInstance = new CaminhoService(caminhoRepository, armazemRepository);

        const result = await caminhoServiceInstance.apagaCaminho({id: "123"});

        //asserts
        sinon.assert.match(result.getValue(), true);

    });*/


});
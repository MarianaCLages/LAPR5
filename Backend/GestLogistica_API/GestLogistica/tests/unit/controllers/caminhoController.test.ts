import ICaminhoDTO from "../../../src/dto/caminho/ICaminhoDTO";
import {Result} from "../../../src/core/logic/Result";

const sinon = require('sinon');

describe('CaminhoController Test', () => {
    it('should return a status 201 when succeeded', async () => {
            // Arrange

            //mock the service
            const caminhoService = {

                createCaminho: sinon.stub().returns(Promise.resolve(Result.ok<ICaminhoDTO>()))
            };

            const caminhoController = require('../../../src/controllers/caminhoController').default;
            const caminhoControllerInstance = new caminhoController(caminhoService);
            const req = {
                body: {
                    "armazemChegadaId": "MJ7",
                    "armazemPartidaId": "231",
                    "distancia": 448654,
                    "energia": 654,
                    "tempo": 7865,
                    "tmpCarregamento": 9865
                }
            }
            const res = {
                status: sinon.stub().returnsThis()
            }
            const next = sinon.spy();

            // Act
            await caminhoControllerInstance.createCaminho(req, res, next);

            // Assert
            sinon.assert.calledWith(res.status, 201);

        }
    );

    it('should return a status 400 when failed', async () => {
        // Arrange

        //mock the service
        const caminhoService = {

            createCaminho: sinon.stub().returns(Promise.resolve(Result.fail<ICaminhoDTO>("Erro")))
        };

        const caminhoController = require('../../../src/controllers/caminhoController').default;
        const caminhoControllerInstance = new caminhoController(caminhoService);
        const req = {
            body: {
                "armazemChegadaId": "MJ7",
                "armazemPartidaId": "231",
                "distancia": 448654,
                "energia": 654,
                "tempo": 7865,
                "tmpCarregamento": 9865
            }
        }
        const res = {
            status: sinon.stub().returnsThis()
        }
        const next = sinon.spy();

        // Act
        await caminhoControllerInstance.createCaminho(req, res, next);

        // Assert
        sinon.assert.calledWith(res.status, 400);

    });

    it('should return an valid json when succeeded', async () => {
            // Arrange

            //mock the service
            const caminhoService = {

                createCaminho: sinon.stub().returns(Promise.resolve(Result.ok<ICaminhoDTO>({
                    "id": "123",
                    "armazemChegadaId": "MJ7",
                    "armazemPartidaId": "231",
                    "distancia": 448654,
                    "energia": 654,
                    "tempo": 7865,
                    "tmpCarregamento": 9865
                })))
            };

            const caminhoController = require('../../../src/controllers/caminhoController').default;
            const caminhoControllerInstance = new caminhoController(caminhoService);
            const req = {
                body: {
                    "armazemChegadaId": "MJ7",
                    "armazemPartidaId": "231",
                    "distancia": 448654,
                    "energia": 654,
                    "tempo": 7865,
                    "tmpCarregamento": 9865
                }
            }
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.spy()
            }
            const next = sinon.spy();

            // Act
            await caminhoControllerInstance.createCaminho(req, res, next);

            // Assert
            sinon.assert.calledWith(res.json, sinon.match({
                "id": "123",
                "armazemChegadaId": "MJ7",
                "armazemPartidaId": "231",
                "distancia": 448654,
                "energia": 654,
                "tempo": 7865,
                "tmpCarregamento": 9865
            }));

        }
    );

});


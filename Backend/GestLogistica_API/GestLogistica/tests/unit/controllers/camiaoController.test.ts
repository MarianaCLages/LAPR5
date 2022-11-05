
import { Result } from '../../../src/core/logic/Result';
import { ICamiaoDTO } from "../../../src/dto/camiao/ICamiaoDTO";

const sinon = require('sinon');

describe('CamiaoController Test', () => {
    /*
    it('should return a status 201 when succeeded', async () => {

        // Mocking the service
        const camiaoService = {

            createCamiao: sinon.stub().returns(Promise.resolve(Result.ok<ICamiaoDTO>())),

            updateCamiao: sinon.stub().returns(Promise.resolve(Result.ok<ICamiaoDTO>())),

            getAllCamioes: sinon.stub().returns(Promise.resolve(Result.ok<Array<ICamiaoDTO>>())),

            getByCaract: sinon.stub().returns(Promise.resolve(Result.ok<Array<ICamiaoDTO>>())),

            getByMatricula: sinon.stub().returns(Promise.resolve(Result.ok<Array<ICamiaoDTO>>())),

            deleteCamiao: sinon.stub().returns(Promise.resolve(Result.ok<ICamiaoDTO>()))
            
        };

        const camiaoController = require('../../../src/controllers/camiaoController').default;
        const camiaoControllerInstance = new camiaoController(camiaoService);
        const req = {
            body: {
                domainId: '123',
                caractCamiao: 'Caracteristicas',
                matriculaCamiao: 'AB-12-CD',
                tara: 1243,
                capacidadeCarga: 123,
                cargaMax: 123,
                cargaTotal: 123,
                tempoCarregamento: 123
            }
        }
        const res = {
            status: sinon.stub().returnsThis()
        }
        const next = sinon.spy();

        await camiaoControllerInstance.createCamiao(req, res, next);

        sinon.assert.calledWith(res.status, 201);

    });
*/
    it('should return a status 400 when failed', async () => {

        const camiaoService = {

            createCamiao: sinon.stub().returns(Promise.resolve(Result.fail<ICamiaoDTO>("Erro")))
        };

        const camiaoController = require('../../../src/controllers/camiaoController').default;
        const camiaoControllerInstance = new camiaoController(camiaoService);
        const req = {
            body: {
                domainId: '123',
                caractCamiao: 'Caracteristicas',
                matriculaCamiao: 'AB-12-45',
                tara: 1243,
                capacidadeCarga: 123,
                cargaMax: 123,
                cargaTotal: 123,
                tempoCarregamento: 123
            }
        }
        const res = {
            status: sinon.stub().returnsThis()
        }
        const next = sinon.spy();

        await camiaoControllerInstance.createCamiao(req, res, next);

        sinon.assert.calledWith(res.status, 400);

    });

    it('should return a valid json when succeeded', async () => {

        const camiaoService = {

            createCamiao: sinon.stub().returns(Promise.resolve(Result.ok<ICamiaoDTO>({
                domainId: '123',
                caractCamiao: 'Caracteristicas',
                matriculaCamiao: 'AB-12-CD',
                tara: 1243,
                capacidadeCarga: 123,
                cargaMax: 123,
                cargaTotal: 123,
                tempoCarregamento: 123
            })))
        };

        const camiaoController = require('../../../src/controllers/camiaoController').default;
        const camiaoControllerInstance = new camiaoController(camiaoService);

        const req = {
            body: {
                domainId: '123',
                caractCamiao: 'Caracteristicas',
                matriculaCamiao: 'AB-12-CD',
                tara: 1243,
                capacidadeCarga: 123,
                cargaMax: 123,
                cargaTotal: 123,
                tempoCarregamento: 123
            }
        }
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.spy()
        }
        const next = sinon.spy();

        await camiaoControllerInstance.createCamiao(req, res, next);

        sinon.assert.calledWith(res.json, {
            domainId: '123',
            caractCamiao: 'Caracteristicas',
            matriculaCamiao: 'AB-12-CD',
            tara: 1243,
            capacidadeCarga: 123,
            cargaMax: 123,
            cargaTotal: 123,
            tempoCarregamento: 123
        });

    }
    );
});


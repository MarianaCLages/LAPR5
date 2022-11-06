import { expect } from 'chai';
import { Camiao } from "../../../../src/domain/camiao/camiao";

describe('Camiao', () => {
    it('should create a new Camiao', () => {
        const camiaoDTO = {
            domainId: 'domainId',
            caractCamiao: 'caractCamiao',
            matriculaCamiao: 'AA-56-BB',
            tara: 1,
            capacidadeCarga: 1,
            cargaMax: 1,
            cargaTotal: 1,
            tempoCarregamento: 1
        };

        const camiao = Camiao.create(camiaoDTO);

        expect(camiao.isSuccess).to.be.true;
    });

    it('should not create a new Camiao with invalid caractCamiao', () => {
        const camiaoDTO = {
            domainId: 'domainId',
            caractCamiao: '',
            matriculaCamiao: 'matriculaCamiao',
            tara: 1,
            capacidadeCarga: 1,
            cargaMax: 1,
            cargaTotal: 1,
            tempoCarregamento: 1
        };

        const camiao = Camiao.create(camiaoDTO);

        expect(camiao.isSuccess).to.be.false;
    });

    it('should not create a new Camiao with invalid matriculaCamiao', () => {
        const camiaoDTO = {
            domainId: 'domainId',
            caractCamiao: 'caractCamiao',
            matriculaCamiao: '19-19-19',
            tara: 1,
            capacidadeCarga: 1,
            cargaMax: 1,
            cargaTotal: 1,
            tempoCarregamento: 1
        };

        const camiao = Camiao.create(camiaoDTO);

        expect(camiao.isSuccess).to.be.false;
    });

});
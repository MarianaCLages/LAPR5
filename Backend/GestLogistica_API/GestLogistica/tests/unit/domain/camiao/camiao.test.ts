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

    it('should not create a new Camiao with invalid tara', () => {
        const camiaoDTO = {
            domainId: 'domainId',
            caractCamiao: 'caractCamiao',
            matriculaCamiao: 'AA-56-BB',
            tara: -1,
            capacidadeCarga: 1,
            cargaMax: 1,
            cargaTotal: 1,
            tempoCarregamento: 1
        };

        const camiao = Camiao.create(camiaoDTO);

        expect(camiao.isSuccess).to.be.false;
    });

    it('should not create a new Camiao with invalid capacidadeCarga', () => {
        const camiaoDTO = {
            domainId: 'domainId',
            caractCamiao: 'caractCamiao',
            matriculaCamiao: 'AA-56-BB',
            tara: 1,
            capacidadeCarga: -1,
            cargaMax: 1,
            cargaTotal: 1,
            tempoCarregamento: 1
        };

        const camiao = Camiao.create(camiaoDTO);

        expect(camiao.isSuccess).to.be.false;
    });

    it('should not create a new Camiao with invalid cargaMax', () => {
        const camiaoDTO = {
            domainId: 'domainId',
            caractCamiao: 'caractCamiao',
            matriculaCamiao: 'AA-56-BB',
            tara: 1,
            capacidadeCarga: 1,
            cargaMax: -1,
            cargaTotal: 1,
            tempoCarregamento: 1
        };

        const camiao = Camiao.create(camiaoDTO);

        expect(camiao.isSuccess).to.be.false;
    });

    it('should not create a new Camiao with invalid cargaTotal', () => {
        const camiaoDTO = {
            domainId: 'domainId',
            caractCamiao: 'caractCamiao',
            matriculaCamiao: 'AA-56-BB',
            tara: 1,
            capacidadeCarga: 1,
            cargaMax: 1,
            cargaTotal: -1,
            tempoCarregamento: 1
        };

        const camiao = Camiao.create(camiaoDTO);

        expect(camiao.isSuccess).to.be.false;
    });

    it('should not create a new Camiao with invalid tempoCarregamento', () => {
        const camiaoDTO = {
            domainId: 'domainId',
            caractCamiao: 'caractCamiao',
            matriculaCamiao: 'AA-56-BB',
            tara: 1,
            capacidadeCarga: 1,
            cargaMax: 1,
            cargaTotal: 1,
            tempoCarregamento: -1
        };

        const camiao = Camiao.create(camiaoDTO);

        expect(camiao.isSuccess).to.be.false;
    });

    it('should get tara from Camiao', () => {
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
        expect(camiao.getValue().tara.props.value).to.be.equal(1);
    });

    it('should get capacidadeCarga from Camiao', () => {
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
        expect(camiao.getValue().capacidadeCarga.props.value).to.be.equal(1);
    });

    it('should get cargaMax from Camiao', () => {
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
        expect(camiao.getValue().cargaMax.props.value).to.be.equal(1);
    });

    it('should get cargaTotal from Camiao', () => {
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
        expect(camiao.getValue().cargaTotal.props.value).to.be.equal(1);
    });

    it('should get tempoCarregamento from Camiao', () => {
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
        expect(camiao.getValue().tempoCarregamento.props.value).to.be.equal(1);
    });

    

});
import {Caminho} from "../../../../src/domain/caminho/caminho";
import {expect} from 'chai';
import {UniqueEntityID} from "../../../../src/core/domain/UniqueEntityID";
import {CaminhoArmazemPartidaId} from "../../../../src/domain/caminho/caminhoArmazemPartidaId";
import {CaminhoArmazemChegadaId} from "../../../../src/domain/caminho/caminhoArmazemChegadaId";
import {CaminhoEnergia} from "../../../../src/domain/caminho/caminhoEnergia";
import {CaminhoDistancia} from "../../../../src/domain/caminho/caminhoDistancia";
import {CaminhoTempo} from "../../../../src/domain/caminho/caminhoTempo";
import {CaminhoTmpCarregamento} from "../../../../src/domain/caminho/caminhoTmpCarregamento";
import ICaminhoDTO from "../../../../src/dto/caminho/ICaminhoDTO";

describe('Caminho Teste', () => {
    it('should create a valid caminho ', () => {
        // Arrange
        const caminhoDTO = {
            armazemPartidaId: "541",
            armazemChegadaId: "672",
            energia: 1,
            distancia: 1,
            tempo: 1,
            tmpCarregamento: 1,
        };

        // Act
        const caminho = Caminho.create(caminhoDTO);

        // Assert
        expect(caminho.isSuccess).to.be.true;
    });

    it('should not create a caminho with invalid armazemPartidaId', () => {
        // Arrange
        const caminhoDTO = {
            armazemPartidaId: "51",
            armazemChegadaId: "672",
            energia: 1,
            distancia: 1,
            tempo: 1,
            tmpCarregamento: 1,
        };

        // Act
        const caminho = Caminho.create(caminhoDTO);

        // Assert
        expect(caminho.isSuccess).to.be.false;
    });

    it('should not create a caminho with invalid armazemChegadaId', () => {
        // Arrange
        const caminhoDTO = {
            armazemPartidaId: "541",
            armazemChegadaId: "62",
            energia: 1,
            distancia: 1,
            tempo: 1,
            tmpCarregamento: 1,
        };

        // Act
        const caminho = Caminho.create(caminhoDTO);

        // Assert
        expect(caminho.isSuccess).to.be.false;
    });

    it('should not create a caminho with invalid energia', () => {
        // Arrange
        const caminhoDTO = {
            armazemPartidaId: "541",
            armazemChegadaId: "672",
            energia: 0,
            distancia: 1,
            tempo: 1,
            tmpCarregamento: 1,
        };

        // Act
        const caminho = Caminho.create(caminhoDTO);

        // Assert
        expect(caminho.isSuccess).to.be.false;
    });

    it('should not create a caminho with invalid distancia', () => {
        // Arrange
        const caminhoDTO = {
            armazemPartidaId: "541",
            armazemChegadaId: "672",
            energia: 1,
            distancia: 0,
            tempo: 1,
            tmpCarregamento: 1,
        };

        // Act
        const caminho = Caminho.create(caminhoDTO);

        // Assert
        expect(caminho.isSuccess).to.be.false;
    });

    it('should not create a caminho with invalid tempo', () => {
        // Arrange
        const caminhoDTO = {
            armazemPartidaId: "541",
            armazemChegadaId: "672",
            energia: 1,
            distancia: 1,
            tempo: 0,
            tmpCarregamento: 1,
        };

        // Act
        const caminho = Caminho.create(caminhoDTO);

        // Assert
        expect(caminho.isSuccess).to.be.false;
    });

    it('should not create a caminho with invalid tmpCarregamento', () => {

        // Arrange
        const caminhoDTO = {
            armazemPartidaId: "541",
            armazemChegadaId: "672",
            energia: 1,
            distancia: 1,
            tempo: 1,
            tmpCarregamento: 0,
        };

        // Act
        const caminho = Caminho.create(caminhoDTO);

        // Assert
        expect(caminho.isSuccess).to.be.false;
    });

    it('should not create a caminho with invalid armazemPartidaId and armazemChegadaId', () => {
        // Arrange
        const caminhoDTO = {
            armazemPartidaId: "51",
            armazemChegadaId: "62",
            energia: 1,
            distancia: 1,
            tempo: 1,
            tmpCarregamento: 1,
        };

        // Act
        const caminho = Caminho.create(caminhoDTO);

        // Assert
        expect(caminho.isSuccess).to.be.false;
    });

    it('should not create a caminho with negative values', () => {
        // Arrange
        const caminhoDTO = {
            armazemPartidaId: "541",
            armazemChegadaId: "672",
            energia: -1,
            distancia: -1,
            tempo: -1,
            tmpCarregamento: -1,
        };

        // Act
        const caminho = Caminho.create(caminhoDTO);

        // Assert
        expect(caminho.isSuccess).to.be.false;
    });

    it('should not create a caminho with armazemPartidaId and armazemChegadaId equal', () => {
        // Arrange
        const caminhoDTO = {
            armazemPartidaId: "541",
            armazemChegadaId: "541",
            energia: 1,
            distancia: 1,
            tempo: 1,
            tmpCarregamento: 1,
        };

        // Act
        const caminho = Caminho.create(caminhoDTO);

        // Assert
        expect(caminho.isSuccess).to.be.false;
    });
//teste the gets
    it('should get the armazemPartidaId', () => {
        // Arrange
        const caminhoDTO = {
            armazemPartidaId: "541",
            armazemChegadaId: "672",
            energia: 1,
            distancia: 1,
            tempo: 1,
            tmpCarregamento: 1,
        };

        // Act
        const caminho = Caminho.create(caminhoDTO);

        // Assert
        expect(caminho.getValue().caminhoArmazemPartidaId.toString()).to.be.equal("541");
    });

    it('should get the armazemChegadaId', () => {
        // Arrange
        const caminhoDTO = {
            armazemPartidaId: "541",
            armazemChegadaId: "672",
            energia: 1,
            distancia: 1,
            tempo: 1,
            tmpCarregamento: 1,
        };

        // Act
        const caminho = Caminho.create(caminhoDTO);

        // Assert
        expect(caminho.getValue().caminhoChegadaId.toString()).to.be.equal("672");
    });

    it('should get the energia', () => {
        // Arrange
        const caminhoDTO = {
            armazemPartidaId: "541",
            armazemChegadaId: "672",
            energia: 1,
            distancia: 1,
            tempo: 1,
            tmpCarregamento: 1,
        };

        // Act
        const caminho = Caminho.create(caminhoDTO);

        // Assert
        expect(caminho.getValue().caminhoEnergia.toString()).to.be.equal(1);
    });

    it('should get the distancia', () => {
        // Arrange
        const caminhoDTO = {
            armazemPartidaId: "541",
            armazemChegadaId: "672",
            energia: 1,
            distancia: 1,
            tempo: 1,
            tmpCarregamento: 1,
        };

        // Act
        const caminho = Caminho.create(caminhoDTO);

        // Assert
        expect(caminho.getValue().caminhoDistancia.toString()).to.be.equal(1);
    });

    it('should get the tempo', () => {
        // Arrange
        const caminhoDTO = {
            armazemPartidaId: "541",
            armazemChegadaId: "672",
            energia: 1,
            distancia: 1,
            tempo: 1,
            tmpCarregamento: 1,
        };

        // Act
        const caminho = Caminho.create(caminhoDTO);

        // Assert
        expect(caminho.getValue().caminhoTempo.toString()).to.be.equal("1");
    });

    it('should get the tmpCarregamento', () => {
        // Arrange
        const caminhoDTO = {
            armazemPartidaId: "541",
            armazemChegadaId: "672",
            energia: 1,
            distancia: 1,
            tempo: 1,
            tmpCarregamento: 1,
        };

        // Act
        const caminho = Caminho.create(caminhoDTO);

        // Assert
        expect(caminho.getValue().caminhoTmpCarregamento.toString()).to.be.equal(1);
    });


    it('should get the caminhoId', () => {

        //Act
        const caminhoDTO = {
            armazemPartidaId: "541",
            armazemChegadaId: "672",
            energia: 1,
            distancia: 1,
            tempo: 1,
            tmpCarregamento: 1,
        };
        const caminho = Caminho.create(caminhoDTO, new UniqueEntityID("123"));

        //Assert
        expect(caminho.getValue().caminhoId.toString()).to.be.equal("123");
    });


    //teste the sets
    it('should set the armazemPartidaId', () => {

        // Arrange
        const caminhoDTO = {
            armazemPartidaId: "541",
            armazemChegadaId: "672",
            energia: 1,
            distancia: 1,
            tempo: 1,
            tmpCarregamento: 1,
        };

        // Act
        const caminho = Caminho.create(caminhoDTO);
        caminho.getValue().caminhoArmazemPartidaId = new CaminhoArmazemPartidaId({value: "123"});

        // Assert
        expect(caminho.getValue().caminhoArmazemPartidaId.toString()).to.be.equal("123");
    });

    it('should set the armazemChegadaId', () => {

        // Arrange
        const caminhoDTO = {
            armazemPartidaId: "541",
            armazemChegadaId: "672",
            energia: 1,
            distancia: 1,
            tempo: 1,
            tmpCarregamento: 1,
        };

        // Act
        const caminho = Caminho.create(caminhoDTO);
        caminho.getValue().caminhoChegadaId = new CaminhoArmazemChegadaId({value: "123"});

        // Assert
        expect(caminho.getValue().caminhoChegadaId.toString()).to.be.equal("123");
    });

    it('should set the energia', () => {

        // Arrange
        const caminhoDTO = {
            armazemPartidaId: "541",
            armazemChegadaId: "672",
            energia: 1,
            distancia: 1,
            tempo: 1,
            tmpCarregamento: 1,
        };

        // Act
        const caminho = Caminho.create(caminhoDTO);
        caminho.getValue().caminhoEnergia = new CaminhoEnergia({value: 123});

        // Assert
        expect(caminho.getValue().caminhoEnergia.toString()).to.be.equal(123);
    });

    it('should set the distancia', () => {

        // Arrange
        const caminhoDTO = {
            armazemPartidaId: "541",
            armazemChegadaId: "672",
            energia: 1,
            distancia: 1,
            tempo: 1,
            tmpCarregamento: 1,
        };

        // Act
        const caminho = Caminho.create(caminhoDTO);
        caminho.getValue().caminhoDistancia = new CaminhoDistancia({value: 123});

        // Assert
        expect(caminho.getValue().caminhoDistancia.toString()).to.be.equal(123);
    });

    it('should set the tempo', () => {

        // Arrange
        const caminhoDTO = {
            armazemPartidaId: "541",
            armazemChegadaId: "672",
            energia: 1,
            distancia: 1,
            tempo: 1,
            tmpCarregamento: 1,
        };

        // Act
        const caminho = Caminho.create(caminhoDTO);
        caminho.getValue().caminhoTempo = new CaminhoTempo({value: 123});

        // Assert
        expect(caminho.getValue().caminhoTempo.toString()).to.be.equal("123");
    });

    it('should set the tmpCarregamento', () => {

        // Arrange
        const caminhoDTO = {
            armazemPartidaId: "541",
            armazemChegadaId: "672",
            energia: 1,
            distancia: 1,
            tempo: 1,
            tmpCarregamento: 1,
        };

        // Act
        const caminho = Caminho.create(caminhoDTO);
        caminho.getValue().caminhoTmpCarregamento = new CaminhoTmpCarregamento({value: 123});

        // Assert
        expect(caminho.getValue().caminhoTmpCarregamento.toString()).to.be.equal(123);
    });

    it('can create a caminho using createWithId', () => {
        // Arrange
        //create a caminhoDTO with the values
        const caminhoDTO = {
            armazemPartidaId: "541",
            armazemChegadaId: "672",
            energia: 1,
            distancia: 1,
            tempo: 1,
            tmpCarregamento: 1,
        } as ICaminhoDTO;
        const caminhoId = new UniqueEntityID("123");

        // Act
        const caminho = Caminho.createWithId(caminhoDTO);

        // Assert
        expect(caminho.isSuccess).to.be.true;
    });

    it('can create a caminho using createWithId and invalid DTO', () => {
        // Arrange
        //create a caminhoDTO with the values
        const caminhoDTO = {
            armazemPartidaId: "541",
            armazemChegadaId: "62",
            energia: 1,
            distancia: 1,
            tempo: 1,
            tmpCarregamento: 1,
        } as ICaminhoDTO;
        const caminhoId = new UniqueEntityID("123");

        // Act
        const caminho = Caminho.createWithId(caminhoDTO);

        // Assert
        expect(caminho.isSuccess).to.be.false;
    });
});
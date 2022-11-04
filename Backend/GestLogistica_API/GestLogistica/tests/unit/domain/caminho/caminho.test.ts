import {Caminho} from "../../../../src/domain/caminho/caminho";
import {expect} from 'chai';

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
});
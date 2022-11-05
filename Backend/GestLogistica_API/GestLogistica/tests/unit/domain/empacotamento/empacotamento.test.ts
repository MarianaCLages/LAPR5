import {expect} from 'chai';
import { Empacotamento } from "../../../../src/domain/empacotamento/empacotamento";
import { EmpPos3DZ } from "../../../../src/domain/empacotamento/empPos3DZ";
import { EmpPos3DX } from "../../../../src/domain/empacotamento/empPos3DX";
import { EmpPos3DY } from "../../../../src/domain/empacotamento/empPos3DY";
import { EmpEntregaRef } from "../../../../src/domain/empacotamento/empEntregaRef";
import { EmpCamiaoRef } from "../../../../src/domain/empacotamento/empCamiaoRef";

describe('Empacotamento Test', () => {

  //ENTITY CREATES AND VALUE OBJECTS

  it('should create a valid empacotamento ', () => {
    // Arrange
    const caminhoDTO = {
      empEntregaRef: "541",
      empCamiaoRef: "672",
    };

    // Act
    const pacote = Empacotamento.create(caminhoDTO);

    // Assert
    expect(pacote.isSuccess).to.be.true;
  })

  it('should create an invalid empacotamento (entregaReference is the same as the Camião) ', () => {
    // Arrange
    const caminhoDTO = {
      empEntregaRef: "541",
      empCamiaoRef: "541",
    };

    // Act
    const pacote = Empacotamento.create(caminhoDTO);

    // Assert
    expect(pacote.isSuccess).to.be.false;
  });

  it('should create an invalid empacotamento (empty string encomenda reference) ', () => {
    // Arrange
    const caminhoDTO = {
      empEntregaRef: "",
      empCamiaoRef: "541",
    };

    // Act
    const pacote = Empacotamento.create(caminhoDTO);

    // Assert
    expect(pacote.isSuccess).to.be.false;
  });

  it('should create an invalid empacotamento (empty string camiao reference) ', () => {
    // Arrange
    const caminhoDTO = {
      empEntregaRef: "AAA",
      empCamiaoRef: "",
    };

    // Act
    const pacote = Empacotamento.create(caminhoDTO);

    // Assert
    expect(pacote.isSuccess).to.be.false;
  });

  it('should create an invalid empacotamento (invalid Z Position reference, upper limit) ', () => {
    // Arrange

    // Act
    const pacote = EmpPos3DZ.create(10);

    // Assert
    expect(pacote.isSuccess).to.be.false;
  });

  it('should create an invalid empacotamento (invalid Z Position reference, bottom limit) ', () => {
    // Arrange

    // Act
    const pacote = EmpPos3DZ.create(-1);

    // Assert
    expect(pacote.isSuccess).to.be.false;
  });

  it('should create an invalid empacotamento (invalid X Position reference, upper limit) ', () => {
    // Arrange

    // Act
    const pacote = EmpPos3DX.create(13);

    // Assert
    expect(pacote.isSuccess).to.be.false;
  });

  it('should create an invalid empacotamento (invalid X Position reference, bottom limit) ', () => {
    // Arrange

    // Act
    const pacote = EmpPos3DZ.create(-1);

    // Assert
    expect(pacote.isSuccess).to.be.false;
  });

  it('should create an invalid empacotamento (invalid X Position reference, upper limit) ', () => {
    // Arrange

    // Act
    const pacote = EmpPos3DX.create(13);

    // Assert
    expect(pacote.isSuccess).to.be.false;
  });

  it('should create an invalid empacotamento (invalid X Position reference, bottom limit) ', () => {
    // Arrange

    // Act
    const pacote = EmpPos3DZ.create(-1);

    // Assert
    expect(pacote.isSuccess).to.be.false;
  });

  it('should create an invalid empacotamento (invalid Y Position reference, upper limit) ', () => {
    // Arrange

    // Act
    const pacote = EmpPos3DY.create(22);

    // Assert
    expect(pacote.isSuccess).to.be.false;
  });

  it('should create an invalid empacotamento (invalid Y Position reference, bottom limit) ', () => {
    // Arrange

    // Act
    const pacote = EmpPos3DZ.create(-1);

    // Assert
    expect(pacote.isSuccess).to.be.false;
  });

  //GETTER TESTS

  it('should get the empEntregaRef ', () => {
    // Arrange
    const caminhoDTO = {
      empEntregaRef: "672",
      empCamiaoRef: "541",
    };

    // Act
    const pacote = Empacotamento.create(caminhoDTO);

    // Assert
    expect(pacote.getValue().empEntregaRef.toString()).to.be.equal("672");
  });

  it('should get the empCamiaoRef ', () => {
    // Arrange
    const caminhoDTO = {
      empEntregaRef: "655",
      empCamiaoRef: "672",
    };

    // Act
    const pacote = Empacotamento.create(caminhoDTO);

    // Assert
    expect(pacote.getValue().empCamiaoRef.toString()).to.be.equal("672");
  });

  it('should get the empPosZ ', () => {
    // Arrange
    const value = 5;

    // Act
    const pos3DZResult = EmpPos3DZ.create(value);

    // Assert
    expect(pos3DZResult.getValue().value).to.be.equal(5);
  });

  it('should get the empPosX ', () => {
    // Arrange
    const value = 5;

    // Act
    const pos3DYResult = EmpPos3DY.create(value);

    // Assert
    expect(pos3DYResult.getValue().value).to.be.equal(5);
  });

  it('should get the empPosY ', () => {
    // Arrange
    const value = 5;

    // Act
    const pos3DXResult = EmpPos3DX.create(value);

    // Assert
    expect(pos3DXResult.getValue().value).to.be.equal(5);
  });

  //TEST THE SETS

  it('should set the empEntregaRef', () => {

    // Arrange
    const caminhoDTO = {
      empEntregaRef: "655",
      empCamiaoRef: "672",
    };

    // Act
    const pacote = Empacotamento.create(caminhoDTO);
    pacote.getValue().empEntregaRef = new EmpEntregaRef({value: "123"});

    // Assert
    expect(pacote.getValue().empEntregaRef.toString()).to.be.equal("123");
  });


  it('should set the empCamiaoRef', () => {

    // Arrange
    const caminhoDTO = {
      empEntregaRef: "655",
      empCamiaoRef: "672",
    };

    // Act
    const pacote = Empacotamento.create(caminhoDTO);
    pacote.getValue().empCamiaoRef = new EmpCamiaoRef({value: "123"});

    // Assert
    expect(pacote.getValue().empCamiaoRef.toString()).to.be.equal("123");
  });



})
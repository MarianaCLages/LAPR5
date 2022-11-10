import {expect} from 'chai';
import { Packaging } from "../../../../src/domain/packaging/packaging";
import { Pos3DZ } from "../../../../src/domain/packaging/pos3DZ";
import { Pos3DX } from "../../../../src/domain/packaging/pos3DX";
import { Pos3DY } from "../../../../src/domain/packaging/pos3DY";
import { OrderRef } from "../../../../src/domain/packaging/orderRef";
import { TruckRef } from "../../../../src/domain/packaging/truckRef";

describe('Packaging Test', () => {

  //ENTITY CREATES AND VALUE OBJECTS

  it('should create a valid packaging ', () => {
    // Arrange
    const pathDTO = {
      orderRef: "541",
      truckRef: "672",
    };

    // Act
    const packaging = Packaging.create(pathDTO);

    // Assert
    expect(packaging.isSuccess).to.be.true;
  })

  it('should create an invalid packaging (orderReference is the same as the Camião) ', () => {
    // Arrange
    const pathDTO = {
      orderRef: "541",
      truckRef: "541",
    };

    // Act
    const packaging = Packaging.create(pathDTO);

    // Assert
    expect(packaging.isSuccess).to.be.false;
  });

  it('should create an invalid packaging (empty string order reference) ', () => {
    // Arrange
    const pathDTO = {
      orderRef: "",
      truckRef: "541",
    };

    // Act
    const packaging = Packaging.create(pathDTO);

    // Assert
    expect(packaging.isSuccess).to.be.false;
  });

  it('should create an invalid packaging (empty string truck reference) ', () => {
    // Arrange
    const pathDTO = {
      orderRef: "AAA",
      truckRef: "",
    };

    // Act
    const packaging = Packaging.create(pathDTO);

    // Assert
    expect(packaging.isSuccess).to.be.false;
  });

  it('should create an invalid packaging (invalid Z Position reference, upper limit) ', () => {
    // Arrange

    // Act
    const packaging = Pos3DZ.create(10);

    // Assert
    expect(packaging.isSuccess).to.be.false;
  });

  it('should create an invalid packaging (invalid Z Position reference, bottom limit) ', () => {
    // Arrange

    // Act
    const packaging = Pos3DZ.create(-1);

    // Assert
    expect(packaging.isSuccess).to.be.false;
  });

  it('should create an invalid packaging (invalid X Position reference, upper limit) ', () => {
    // Arrange

    // Act
    const packaging = Pos3DX.create(13);

    // Assert
    expect(packaging.isSuccess).to.be.false;
  });

  it('should create an invalid packaging (invalid X Position reference, bottom limit) ', () => {
    // Arrange

    // Act
    const packaging = Pos3DZ.create(-1);

    // Assert
    expect(packaging.isSuccess).to.be.false;
  });

  it('should create an invalid packaging (invalid X Position reference, upper limit) ', () => {
    // Arrange

    // Act
    const packaging = Pos3DX.create(13);

    // Assert
    expect(packaging.isSuccess).to.be.false;
  });

  it('should create an invalid packaging (invalid X Position reference, bottom limit) ', () => {
    // Arrange

    // Act
    const packaging = Pos3DZ.create(-1);

    // Assert
    expect(packaging.isSuccess).to.be.false;
  });

  it('should create an invalid packaging (invalid Y Position reference, upper limit) ', () => {
    // Arrange

    // Act
    const packaging = Pos3DY.create(22);

    // Assert
    expect(packaging.isSuccess).to.be.false;
  });

  it('should create an invalid packaging (invalid Y Position reference, bottom limit) ', () => {
    // Arrange

    // Act
    const packaging = Pos3DZ.create(-1);

    // Assert
    expect(packaging.isSuccess).to.be.false;
  });

  //GETTER TESTS

  it('should get the orderRef ', () => {
    // Arrange
    const pathDTO = {
      orderRef: "672",
      truckRef: "541",
    };

    // Act
    const packaging = Packaging.create(pathDTO);

    // Assert
    expect(packaging.getValue().orderRef.toString()).to.be.equal("672");
  });

  it('should get the truckRef ', () => {
    // Arrange
    const pathDTO = {
      orderRef: "655",
      truckRef: "672",
    };

    // Act
    const packaging = Packaging.create(pathDTO);

    // Assert
    expect(packaging.getValue().truckRef.toString()).to.be.equal("672");
  });

  it('should get the empPosZ ', () => {
    // Arrange
    const value = 5;

    // Act
    const pos3DZResult = Pos3DZ.create(value);

    // Assert
    expect(pos3DZResult.getValue().value).to.be.equal(5);
  });

  it('should get the empPosX ', () => {
    // Arrange
    const value = 5;

    // Act
    const pos3DYResult = Pos3DY.create(value);

    // Assert
    expect(pos3DYResult.getValue().value).to.be.equal(5);
  });

  it('should get the empPosY ', () => {
    // Arrange
    const value = 5;

    // Act
    const pos3DXResult = Pos3DX.create(value);

    // Assert
    expect(pos3DXResult.getValue().value).to.be.equal(5);
  });

  //TEST THE SETS

  it('should set the orderRef', () => {

    // Arrange
    const pathDTO = {
      orderRef: "655",
      truckRef: "672",
    };

    // Act
    const packaging = Packaging.create(pathDTO);
    packaging.getValue().orderRef = new OrderRef({value: "123"});

    // Assert
    expect(packaging.getValue().orderRef.toString()).to.be.equal("123");
  });

  it('should set the truckRef', () => {

    // Arrange
    const pathDTO = {
      orderRef: "655",
      truckRef: "672",
    };

    // Act
    const packaging = Packaging.create(pathDTO);
    packaging.getValue().truckRef = new TruckRef({value: "123"});

    // Assert
    expect(packaging.getValue().truckRef.toString()).to.be.equal("123");
  });

})
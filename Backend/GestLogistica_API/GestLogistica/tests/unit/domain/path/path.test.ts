import {Path} from "../../../../src/domain/path/path";
import {expect} from 'chai';
import {UniqueEntityID} from "../../../../src/core/domain/UniqueEntityID";
import {PathBeginningWarehouseId} from "../../../../src/domain/path/pathBeginningWarehouseId";
import {PathEndingWarehouseId} from "../../../../src/domain/path/pathEndingWarehouseId";
import {PathEnergy} from "../../../../src/domain/path/pathEnergy";
import {PathDistance} from "../../../../src/domain/path/pathDistance";
import {PathTime} from "../../../../src/domain/path/pathTime";
import {PathChargingTime} from "../../../../src/domain/path/pathChargingTime";
import IPathDTO from "../../../../src/dto/path/IPathDTO";

describe('Path Test', () => {
    it('should create a valid path ', () => {
        // Arrange
        const pathDTO = {
            beginningWarehouseId: "541",
            endingWarehouseId: "672",
            energy: 1,
            distance: 1,
            time: 1,
            chargingTime: 1,
        };

        // Act
        const path = Path.create(pathDTO);

        // Assert
        expect(path.isSuccess).to.be.true;
    });

    it('should not create a path with invalid beginningWarehouseId', () => {
        // Arrange
        const pathDTO = {
            beginningWarehouseId: "51",
            endingWarehouseId: "672",
            energy: 1,
            distance: 1,
            time: 1,
            chargingTime: 1,
        };

        // Act
        const path = Path.create(pathDTO);

        // Assert
        expect(path.isSuccess).to.be.false;
    });

    it('should not create a path with invalid endingWarehouseId', () => {
        // Arrange
        const pathDTO = {
            beginningWarehouseId: "541",
            endingWarehouseId: "62",
            energy: 1,
            distance: 1,
            time: 1,
            chargingTime: 1,
        };

        // Act
        const path = Path.create(pathDTO);

        // Assert
        expect(path.isSuccess).to.be.false;
    });

    it('should not create a path with invalid energy', () => {
        // Arrange
        const pathDTO = {
            beginningWarehouseId: "541",
            endingWarehouseId: "672",
            energy: 0,
            distance: 1,
            time: 1,
            chargingTime: 1,
        };

        // Act
        const path = Path.create(pathDTO);

        // Assert
        expect(path.isSuccess).to.be.false;
    });

    it('should not create a path with invalid distance', () => {
        // Arrange
        const pathDTO = {
            beginningWarehouseId: "541",
            endingWarehouseId: "672",
            energy: 1,
            distance: 0,
            time: 1,
            chargingTime: 1,
        };

        // Act
        const path = Path.create(pathDTO);

        // Assert
        expect(path.isSuccess).to.be.false;
    });

    it('should not create a path with invalid time', () => {
        // Arrange
        const pathDTO = {
            beginningWarehouseId: "541",
            endingWarehouseId: "672",
            energy: 1,
            distance: 1,
            time: 0,
            chargingTime: 1,
        };

        // Act
        const path = Path.create(pathDTO);

        // Assert
        expect(path.isSuccess).to.be.false;
    });

    it('should not create a path with invalid chargingTime', () => {

        // Arrange
        const pathDTO = {
            beginningWarehouseId: "541",
            endingWarehouseId: "672",
            energy: 1,
            distance: 1,
            time: 1,
            chargingTime: 0,
        };

        // Act
        const path = Path.create(pathDTO);

        // Assert
        expect(path.isSuccess).to.be.false;
    });

    it('should not create a path with invalid beginningWarehouseId and endingWarehouseId', () => {
        // Arrange
        const pathDTO = {
            beginningWarehouseId: "51",
            endingWarehouseId: "62",
            energy: 1,
            distance: 1,
            time: 1,
            chargingTime: 1,
        };

        // Act
        const path = Path.create(pathDTO);

        // Assert
        expect(path.isSuccess).to.be.false;
    });

    it('should not create a path with negative values', () => {
        // Arrange
        const pathDTO = {
            beginningWarehouseId: "541",
            endingWarehouseId: "672",
            energy: -1,
            distance: -1,
            time: -1,
            chargingTime: -1,
        };

        // Act
        const path = Path.create(pathDTO);

        // Assert
        expect(path.isSuccess).to.be.false;
    });

    it('should not create a path with beginningWarehouseId and endingWarehouseId equal', () => {
        // Arrange
        const pathDTO = {
            beginningWarehouseId: "541",
            endingWarehouseId: "541",
            energy: 1,
            distance: 1,
            time: 1,
            chargingTime: 1,
        };

        // Act
        const path = Path.create(pathDTO);

        // Assert
        expect(path.isSuccess).to.be.false;
    });
//teste the gets
    it('should get the beginningWarehouseId', () => {
        // Arrange
        const pathDTO = {
            beginningWarehouseId: "541",
            endingWarehouseId: "672",
            energy: 1,
            distance: 1,
            time: 1,
            chargingTime: 1,
        };

        // Act
        const path = Path.create(pathDTO);

        // Assert
        expect(path.getValue().pathBeginningWarehouseId.toString()).to.be.equal("541");
    });

    it('should get the endingWarehouseId', () => {
        // Arrange
        const pathDTO = {
            beginningWarehouseId: "541",
            endingWarehouseId: "672",
            energy: 1,
            distance: 1,
            time: 1,
            chargingTime: 1,
        };

        // Act
        const path = Path.create(pathDTO);

        // Assert
        expect(path.getValue().pathEndingId.toString()).to.be.equal("672");
    });

    it('should get the energy', () => {
        // Arrange
        const pathDTO = {
            beginningWarehouseId: "541",
            endingWarehouseId: "672",
            energy: 1,
            distance: 1,
            time: 1,
            chargingTime: 1,
        };

        // Act
        const path = Path.create(pathDTO);

        // Assert
        expect(path.getValue().pathEnergy.toString()).to.be.equal(1);
    });

    it('should get the distance', () => {
        // Arrange
        const pathDTO = {
            beginningWarehouseId: "541",
            endingWarehouseId: "672",
            energy: 1,
            distance: 1,
            time: 1,
            chargingTime: 1,
        };

        // Act
        const path = Path.create(pathDTO);

        // Assert
        expect(path.getValue().pathDistance.toString()).to.be.equal(1);
    });

    it('should get the time', () => {
        // Arrange
        const pathDTO = {
            beginningWarehouseId: "541",
            endingWarehouseId: "672",
            energy: 1,
            distance: 1,
            time: 1,
            chargingTime: 1,
        };

        // Act
        const path = Path.create(pathDTO);

        // Assert
        expect(path.getValue().pathTime.toString()).to.be.equal("1");
    });

    it('should get the chargingTime', () => {
        // Arrange
        const pathDTO = {
            beginningWarehouseId: "541",
            endingWarehouseId: "672",
            energy: 1,
            distance: 1,
            time: 1,
            chargingTime: 1,
        };

        // Act
        const path = Path.create(pathDTO);

        // Assert
        expect(path.getValue().pathChargingTime.toString()).to.be.equal(1);
    });


    it('should get the pathId', () => {

        //Act
        const pathDTO = {
            beginningWarehouseId: "541",
            endingWarehouseId: "672",
            energy: 1,
            distance: 1,
            time: 1,
            chargingTime: 1,
        };
        const path = Path.create(pathDTO, new UniqueEntityID("123"));

        //Assert
        expect(path.getValue().pathId.toString()).to.be.equal("123");
    });


    //teste the sets
    it('should set the beginningWarehouseId', () => {

        // Arrange
        const pathDTO = {
            beginningWarehouseId: "541",
            endingWarehouseId: "672",
            energy: 1,
            distance: 1,
            time: 1,
            chargingTime: 1,
        };

        // Act
        const path = Path.create(pathDTO);
        path.getValue().pathBeginningWarehouseId = new PathBeginningWarehouseId({value: "123"});

        // Assert
        expect(path.getValue().pathBeginningWarehouseId.toString()).to.be.equal("123");
    });

    it('should set the endingWarehouseId', () => {

        // Arrange
        const pathDTO = {
            beginningWarehouseId: "541",
            endingWarehouseId: "672",
            energy: 1,
            distance: 1,
            time: 1,
            chargingTime: 1,
        };

        // Act
        const path = Path.create(pathDTO);
        path.getValue().pathEndingId = new PathEndingWarehouseId({value: "123"});

        // Assert
        expect(path.getValue().pathEndingId.toString()).to.be.equal("123");
    });

    it('should set the energy', () => {

        // Arrange
        const pathDTO = {
            beginningWarehouseId: "541",
            endingWarehouseId: "672",
            energy: 1,
            distance: 1,
            time: 1,
            chargingTime: 1,
        };

        // Act
        const path = Path.create(pathDTO);
        path.getValue().pathEnergy = new PathEnergy({value: 123});

        // Assert
        expect(path.getValue().pathEnergy.toString()).to.be.equal(123);
    });

    it('should set the distance', () => {

        // Arrange
        const pathDTO = {
            beginningWarehouseId: "541",
            endingWarehouseId: "672",
            energy: 1,
            distance: 1,
            time: 1,
            chargingTime: 1,
        };

        // Act
        const path = Path.create(pathDTO);
        path.getValue().pathDistance = new PathDistance({value: 123});

        // Assert
        expect(path.getValue().pathDistance.toString()).to.be.equal(123);
    });

    it('should set the time', () => {

        // Arrange
        const pathDTO = {
            beginningWarehouseId: "541",
            endingWarehouseId: "672",
            energy: 1,
            distance: 1,
            time: 1,
            chargingTime: 1,
        };

        // Act
        const path = Path.create(pathDTO);
        path.getValue().pathTime = new PathTime({value: 123});

        // Assert
        expect(path.getValue().pathTime.toString()).to.be.equal("123");
    });

    it('should set the chargingTime', () => {

        // Arrange
        const pathDTO = {
            beginningWarehouseId: "541",
            endingWarehouseId: "672",
            energy: 1,
            distance: 1,
            time: 1,
            chargingTime: 1,
        };

        // Act
        const path = Path.create(pathDTO);
        path.getValue().pathChargingTime = new PathChargingTime({value: 123});

        // Assert
        expect(path.getValue().pathChargingTime.toString()).to.be.equal(123);
    });

    it('can create a path using createWithId', () => {
        // Arrange
        //create a pathDTO with the values
        const pathDTO = {
            beginningWarehouseId: "541",
            endingWarehouseId: "672",
            energy: 1,
            distance: 1,
            time: 1,
            chargingTime: 1,
        } as IPathDTO;
        const pathId = new UniqueEntityID("123");

        // Act
        const path = Path.createWithId(pathDTO);

        // Assert
        expect(path.isSuccess).to.be.true;
    });

    it('can create a path using createWithId and invalid DTO', () => {
        // Arrange
        //create a pathDTO with the values
        const pathDTO = {
            beginningWarehouseId: "541",
            endingWarehouseId: "62",
            energy: 1,
            distance: 1,
            time: 1,
            chargingTime: 1,
        } as IPathDTO;
        const pathId = new UniqueEntityID("123");

        // Act
        const path = Path.createWithId(pathDTO);

        // Assert
        expect(path.isSuccess).to.be.false;
    });
});
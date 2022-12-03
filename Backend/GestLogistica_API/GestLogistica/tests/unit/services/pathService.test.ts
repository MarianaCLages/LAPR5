import {Result} from '../../../src/core/logic/Result';
import IPathDTO from "../../../src/dto/path/IPathDTO";
import {Path} from "../../../src/domain/path/path";
import PathService from "../../../src/services/pathService";

const sinon = require('sinon');


describe('Path Service test', () => {
    it('should return an valid result when adding an valid path', async function () {
            //mocks the path repository

            const pathRepository = {
                save: sinon.stub().returns(Promise.resolve(Path.create({
                    endingWarehouseId: "MJ7",
                    beginningWarehouseId: "231",
                    distance: 448654,
                    energy: 654,
                    time: 7865,
                    chargingTime: 9865
                }))),
                findByDomainId: sinon.stub().returns(Promise.resolve(Path.create({
                    endingWarehouseId: "MJ7",
                    beginningWarehouseId: "231",
                    distance: 448654,
                    energy: 654,
                    time: 7865,
                    chargingTime: 9865
                }))),
                getAllPaths: sinon.stub().returns(),
                delete: sinon.stub().returns(Promise.resolve(true)),
                update: sinon.stub().returns(Promise.resolve(Result.ok<IPathDTO>())),
                exists: sinon.stub().returns(Promise.resolve(true)),
                async: sinon.stub().returns(Promise.resolve(true)),
                getByBeginningWarehouseId: sinon.stub().returns(Promise.resolve(Path.create({
                    endingWarehouseId: "MJ7",
                    beginningWarehouseId: "231",
                    distance: 448654,
                    energy: 654,
                    time: 7865,
                    chargingTime: 9865
                }).getValue())),
                getByEndingWarehouseId: sinon.stub().returns(Promise.resolve(Path.create({
                    endingWarehouseId: "MJ7",
                    beginningWarehouseId: "231",
                    distance: 448654,
                    energy: 654,
                    time: 7865,
                    chargingTime: 9865
                }).getValue())),
                getByBeginningAndEndingWarehouseId: sinon.stub().returns(Promise.resolve(true))
            }

            //mocks warehouseRepository
            const warehouseRepository = {
                exists: sinon.stub().returns(Promise.resolve(true)),
                async: sinon.stub().returns(Promise.resolve(true)),
                save: sinon.stub().returns(Promise.resolve(true)),
            }


            const pathService = require('../../../src/services/pathService').default;
            const pathServiceInstance = new PathService(pathRepository, warehouseRepository);

            const pathDto = {
                endingWarehouseId: "MJ7",
                beginningWarehouseId: "231",
                distance: 448654,
                energy: 654,
                time: 7865,
                chargingTime: 9865
            }

            const result = await pathServiceInstance.createPath(pathDto);

            //asserts
            sinon.assert.match(result.isSuccess, true);
        }
    )
    ;

    it('should return an invalid result when adding an invalid path', async function () {
        //mocks the path repository

        const pathRepository = {
            save: sinon.stub().returns(Promise.resolve(Result.fail<IPathDTO>("Erro"))),
            findByDomainId: sinon.stub().returns(Promise.resolve(Path.create({
                endingWarehouseId: "MJ7",
                beginningWarehouseId: "231",
                distance: 448654,
                energy: 654,
                time: 7865,
                chargingTime: 9865
            }))),
            getAllPaths: sinon.stub().returns(),
            delete: sinon.stub().returns(Promise.resolve(true)),
            update: sinon.stub().returns(Promise.resolve(Result.ok<IPathDTO>())),
            exists: sinon.stub().returns(Promise.resolve(true)),
            async: sinon.stub().returns(Promise.resolve(true)),
            getByBeginningWarehouseId: sinon.stub().returns(Promise.resolve(Path.create({
                endingWarehouseId: "MJ7",
                beginningWarehouseId: "231",
                distance: 448654,
                energy: 654,
                time: 7865,
                chargingTime: 9865
            }).getValue())),
            getByEndingWarehouseId: sinon.stub().returns(Promise.resolve(Path.create({
                endingWarehouseId: "MJ7",
                beginningWarehouseId: "231",
                distance: 448654,
                energy: 654,
                time: 7865,
                chargingTime: 9865
            }).getValue())),
            getByBeginningAndEndingWarehouseId: sinon.stub().returns(Promise.resolve(true))
        }

        //mocks warehouseRepository
        const warehouseRepository = {
            exists: sinon.stub().returns(Promise.resolve(true)),
            async: sinon.stub().returns(Promise.resolve(true)),
            save: sinon.stub().returns(Promise.resolve(true)),
        }

        const pathService = require('../../../src/services/pathService').default;
        const pathServiceInstance = new PathService(pathRepository, warehouseRepository);

        const pathDto = {
            endingWarehouseId: "MJ7",
            beginningWarehouseId: "231",
            distance: 0,
            energy: 654,
            time: 7865,
            chargingTime: 9865
        }

        const result = await pathServiceInstance.createPath(pathDto);

        //asserts
        sinon.assert.match(result.isFailure, true);

    });

    it('should return an error when the warehouse does not exist', async function () {
        //mocks the path repository

        const pathRepository = {
            save: sinon.stub().returns(Promise.resolve(Result.fail<IPathDTO>("Erro"))),
            findByDomainId: sinon.stub().returns(Promise.resolve(Path.create({
                endingWarehouseId: "MJ7",
                beginningWarehouseId: "231",
                distance: 448654,
                energy: 654,
                time: 7865,
                chargingTime: 9865
            }))),
            getAllPaths: sinon.stub().returns(),
            delete: sinon.stub().returns(Promise.resolve(true)),
            update: sinon.stub().returns(Promise.resolve(Result.ok<IPathDTO>())),
            exists: sinon.stub().returns(Promise.resolve(true)),
            async: sinon.stub().returns(Promise.resolve(true)),
            getByBeginningWarehouseId: sinon.stub().returns(Promise.resolve(Path.create({
                endingWarehouseId: "MJ7",
                beginningWarehouseId: "231",
                distance: 448654,
                energy: 654,
                time: 7865,
                chargingTime: 9865
            }).getValue())),
            getByEndingWarehouseId: sinon.stub().returns(Promise.resolve(Path.create({
                endingWarehouseId: "MJ7",
                beginningWarehouseId: "231",
                distance: 448654,
                energy: 654,
                time: 7865,
                chargingTime: 9865
            }).getValue())),
            getByBeginningAndEndingWarehouseId: sinon.stub().returns(Promise.resolve(true))
        }

        //mocks warehouseRepository
        const warehouseRepository = {
            exists: sinon.stub().returns(Promise.resolve(false)),
            async: sinon.stub().returns(Promise.resolve(true)),
            save: sinon.stub().returns(Promise.resolve(true)),
        }

        const pathService = require('../../../src/services/pathService').default;
        const pathServiceInstance = new PathService(pathRepository, warehouseRepository);

        const pathDto = {
            endingWarehouseId: "MJ7",
            beginningWarehouseId: "231",
            distance: 0,
            energy: 654,
            time: 7865,
            chargingTime: 9865
        }

        const result = await pathServiceInstance.createPath(pathDto);

        //asserts
        sinon.assert.match(result.isFailure, true);

    });

    it('should return an error when the warehouseending does not exist', async function () {
//mocks the path repository

        const pathRepository = {
            save: sinon.stub().returns(Promise.resolve(Result.fail<IPathDTO>("Erro"))),
            findByDomainId: sinon.stub().returns(Promise.resolve(Path.create({
                endingWarehouseId: "MJ7",
                beginningWarehouseId: "231",
                distance: 448654,
                energy: 654,
                time: 7865,
                chargingTime: 9865
            }))),
            getAllPaths: sinon.stub().returns(),
            delete: sinon.stub().returns(Promise.resolve(true)),
            update: sinon.stub().returns(Promise.resolve(Result.ok<IPathDTO>())),
            exists: sinon.stub().returns(Promise.resolve(true)),
            async: sinon.stub().returns(Promise.resolve(true)),
            getByBeginningWarehouseId: sinon.stub().returns(Promise.resolve(Path.create({
                endingWarehouseId: "MJ7",
                beginningWarehouseId: "231",
                distance: 448654,
                energy: 654,
                time: 7865,
                chargingTime: 9865
            }).getValue())),
            getByEndingWarehouseId: sinon.stub().returns(Promise.resolve(Path.create({
                endingWarehouseId: "MJ7",
                beginningWarehouseId: "231",
                distance: 448654,
                energy: 654,
                time: 7865,
                chargingTime: 9865
            }).getValue())),
            getByBeginningAndEndingWarehouseId: sinon.stub().returns(Promise.resolve(true))
        }

        //mocks warehouseRepository
        const warehouseRepository = {
            exists: sinon.stub().returns(Promise.resolve(true)),
            async: sinon.stub().returns(Promise.resolve(true)),
            save: sinon.stub().returns(Promise.resolve(true)),
        }

        const pathService = require('../../../src/services/pathService').default;
        const pathServiceInstance = new PathService(pathRepository, warehouseRepository);

        const pathDto = {
            endingWarehouseId: "MJ7",
            beginningWarehouseId: "231",
            distance: 0,
            energy: 654,
            time: 7865,
            chargingTime: 9865
        }

        const result = await pathServiceInstance.createPath(pathDto);

        //asserts
        sinon.assert.match(result.isFailure, true);
    });

    it('should return an error when the repository fails', async function () {
        //mocks the path repository

        const pathRepository = {
            save: sinon.stub().throws(new Error("Erro")),
            findByDomainId: sinon.stub().returns(Promise.resolve(Path.create({
                endingWarehouseId: "MJ7",
                beginningWarehouseId: "231",
                distance: 448654,
                energy: 654,
                time: 7865,
                chargingTime: 9865
            }))),
            getAllPaths: sinon.stub().returns(),
            delete: sinon.stub().returns(Promise.resolve(true)),
            update: sinon.stub().returns(Promise.resolve(Result.ok<IPathDTO>())),
            exists: sinon.stub().returns(Promise.resolve(true)),
            async: sinon.stub().returns(Promise.resolve(true)),
            getByBeginningWarehouseId: sinon.stub().returns(Promise.resolve(Path.create({
                endingWarehouseId: "MJ7",
                beginningWarehouseId: "231",
                distance: 448654,
                energy: 654,
                time: 7865,
                chargingTime: 9865
            }).getValue())),
            getByEndingWarehouseId: sinon.stub().returns(Promise.resolve(Path.create({
                endingWarehouseId: "MJ7",
                beginningWarehouseId: "231",
                distance: 448654,
                energy: 654,
                time: 7865,
                chargingTime: 9865
            }).getValue())),
            getByBeginningAndEndingWarehouseId: sinon.stub().returns(Promise.resolve(true))
        }

        //mocks warehouseRepository
        const warehouseRepository = {
            exists: sinon.stub().returns(Promise.resolve(true)),
            async: sinon.stub().returns(Promise.resolve(true)),
            save: sinon.stub().returns(Promise.resolve(true)),
        }

        const pathService = require('../../../src/services/pathService').default;
        const pathServiceInstance = new PathService(pathRepository, warehouseRepository);

        const pathDto = {
            endingWarehouseId: "MJ7",
            beginningWarehouseId: "231",
            distance: 56,
            energy: 654,
            time: 7865,
            chargingTime: 9865
        }

        const result = await pathServiceInstance.createPath(pathDto);

        //asserts
        sinon.assert.match(result.isFailure, true);
    });


    /* it('should get the path by id', async function () {

         //mocks the path repository
         let pathRepository: { async: any; findByDomainId: any; save: any; update: any; exists: any; getAllPaths: any; delete: any };
         pathRepository = {
             save: sinon.stub().returns(Promise.resolve(Result.ok<IPathDTO>())),
             findByDomainId: sinon.stub().returns(Promise.resolve(Path.create({
                 endingWarehouseId: "MJ7",
                 beginningWarehouseId: "231",
                 distance: 448654,
                 energy: 654,
                 time: 7865,
                 chargingTime: 9865
             }, new UniqueEntityID("123")))),
             getAllPaths: sinon.stub().returns(),
             delete: sinon.stub().returns(Promise.resolve(true)),
             update: sinon.stub().returns(Promise.resolve(Result.ok<IPathDTO>())),
             exists: sinon.stub().returns(Promise.resolve(true)),
             async: sinon.stub().returns(Promise.resolve(true))
         };

         //mocks warehouseRepository
         const warehouseRepository = {
             exists: sinon.stub().returns(Promise.resolve(true)),
             async: sinon.stub().returns(Promise.resolve(true)),
             save: sinon.stub().returns(Promise.resolve(true)),
         }

         const pathService = require('../../../src/services/pathService').default;
         const pathServiceInstance = new PathService(pathRepository, warehouseRepository);

         const pathDto = {
             endingWarehouseId: "MJ7",
             beginningWarehouseId: "231",
             distance: 56,
             energy: 654,
             time: 7865,
             chargingTime: 9865
         } as IPathDTO;


         const result = await pathServiceInstance.getPath(pathDto)

         //asserts
         sinon.assert.match(result.getValue().endingWarehouseId, pathDto.endingWarehouseId);
         sinon.assert.match(result.getValue().beginningWarehouseId, pathDto.beginningWarehouseId);
         sinon.assert.match(result.getValue().distance, pathDto.distance);
         sinon.assert.match(result.getValue().energy, pathDto.energy);
         sinon.assert.match(result.getValue().time, pathDto.time);
         sinon.assert.match(result.getValue().chargingTime, pathDto.chargingTime);

     });*/

    /*it('should return an list of paths when using getAll', async function () {

        //mocks the path repository
        let pathRepository: { async: any; findByDomainId: any; save: any; update: any; exists: any; getAllPaths: any; delete: any };
        pathRepository = {
            save: sinon.stub().returns(Promise.resolve(Result.ok<IPathDTO>())),
            findByDomainId: sinon.stub().returns(Promise.resolve(Path.create({
                endingWarehouseId: "MJ7",
                beginningWarehouseId: "231",
                distance: 448654,
                energy: 654,
                time: 7865,
                chargingTime: 9865
            }, new UniqueEntityID("123")))),
            getAllPaths: sinon.stub().returns(Promise.resolve([Path.create({
                endingWarehouseId: "MJ7",
                beginningWarehouseId: "231",
                distance: 448654,
                energy: 654,
                time: 7865,
                chargingTime: 9865
            }, new UniqueEntityID("123"))])),
            delete: sinon.stub().returns(Promise.resolve(true)),
            update: sinon.stub().returns(Promise.resolve(Result.ok<IPathDTO>())),
            exists: sinon.stub().returns(Promise.resolve(true)),
            async: sinon.stub().returns(Promise.resolve(true))
        };

        //mocks warehouseRepository
        const warehouseRepository = {
            exists: sinon.stub().returns(Promise.resolve(true)),
            async: sinon.stub().returns(Promise.resolve(true)),
            save: sinon.stub().returns(Promise.resolve(true)),

        }

        const pathService = require('../../../src/services/pathService').default;
        const pathServiceInstance = new PathService(pathRepository, warehouseRepository);

        const result = await pathServiceInstance.getAllPaths();

        //asserts
        sinon.assert.match(result.getValue().length, 1);

    });*/

    /*it('shoud delete the path', async function () {
        //mocks the path repository
        const pathRepository = {
            save: sinon.stub().returns(Promise.resolve(Result.fail<IPathDTO>("Erro"))),
            findByDomainId: sinon.stub().returns(Promise.resolve(Path.create({
                endingWarehouseId: "MJ7",
                beginningWarehouseId: "231",
                distance: 448654,
                energy: 654,
                time: 7865,
                chargingTime: 9865
            }))),
            getAllPaths: sinon.stub().returns(),
            delete: sinon.stub().returns(Promise.resolve(true)),
            update: sinon.stub().returns(Promise.resolve(Result.ok<IPathDTO>())),
            exists: sinon.stub().returns(Promise.resolve(true)),
            async: sinon.stub().returns(Promise.resolve(true))
        }

        //mocks warehouseRepository
        const warehouseRepository = {
            exists: sinon.stub().returns(Promise.resolve(true)),
            async: sinon.stub().returns(Promise.resolve(true)),
            save: sinon.stub().returns(Promise.resolve(true)),
        }

        const pathService = require('../../../src/services/pathService').default;
        const pathServiceInstance = new PathService(pathRepository, warehouseRepository);

        const result = await pathServiceInstance.deletePath({id: "123"});

        //asserts
        sinon.assert.match(result.getValue(), true);

    });*/


})
;
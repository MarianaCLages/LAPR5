import {Inject, Service} from "typedi";
import config from "../../config";
import {Path} from "../domain/path/path";
import IPathRepo from "../services/IRepos/IPathRepo";
import IPathService from "./IServices/IPathService";
import {Result} from "../core/logic/Result";
import IPathDTO from "../dto/path/IPathDTO";
import {PathMap} from "../mappers/PathMap";
import ICreatePathDTO from "../dto/path/ICreatePathDTO";
import IWarehouseRepo from "../services/IRepos/IWarehouseRepo";
import {PathEnergy} from "../domain/path/pathEnergy";
import {PathTime} from "../domain/path/pathTime";
import {PathChargingTime} from "../domain/path/pathChargingTime";
import {PathBeginningWarehouseId} from "../domain/path/pathBeginningWarehouseId";
import {PathEndingWarehouseId} from "../domain/path/pathEndingWarehouseId";
import {PathDistance} from "../domain/path/pathDistance";
import IPathIdDto from "../dto/path/IPathIdDto";
import IPathBeginningWarehouseId from "../dto/path/IPathBeginningWarehouseIdDTO";
import IPathEndingWarehouseId from "../dto/path/IPathEndingWarehouseIdDTO";


@Service()
export default class PathService implements IPathService {
    constructor(
        @Inject(config.repos.path.name) private pathRepo: IPathRepo,
        @Inject(config.repos.warehouse.name) private warehouseRepo: IWarehouseRepo
    ) {
    }

    public async getByBeginningAndEndingWarehouseId(beginningWarehouseId: string, endingWarehouseId: string): Promise<Result<IPathDTO[]>> {

        const paths = await this.pathRepo.getByBeginningAndEndingWarehouseId(beginningWarehouseId, endingWarehouseId);

        if (paths == null) {
            return Result.fail("Paths not found!");
        } else {
            const pathsDTO = paths.getValue().map(
                (path) => {
                    return PathMap.toDTO(path);
                }
            );
            return Result.ok<IPathDTO[]>(pathsDTO);
        }


    }

    public async getPath(pathDTO: IPathDTO): Promise<Result<IPathDTO>> {
        try {
            const path = await this.pathRepo.findByDomainId(pathDTO.id);

            if (path === null) {
                return Result.fail<IPathDTO>("Path not found!");
            } else {
                const pathDTOResult = PathMap.toDTO(path);
                return Result.ok<IPathDTO>(pathDTOResult);
            }
        } catch (e) {
            throw e;
        }
    }

    public async createPath(pathDTO: ICreatePathDTO): Promise<Result<IPathDTO>> {
        try {

            //check if warehouse exists
            const warehouseEnding = pathDTO.endingWarehouseId;
            const warehouseBeginning = pathDTO.beginningWarehouseId;

            const warehouseEndingResult = await this.warehouseRepo.exists(warehouseEnding);
            const warehouseBeginningResult = await this.warehouseRepo.exists(warehouseBeginning);

            if (warehouseEndingResult === false) {
                return Result.fail<IPathDTO>("Ending warehouse not found!");
            }

            if (warehouseBeginningResult === false) {
                return Result.fail<IPathDTO>("Beginning warehouse not found!");
            }
            const pathOrError = Path.create(pathDTO);


            if (pathOrError.isFailure) {
                return Result.fail<IPathDTO>(pathOrError.errorValue());
            }

            const pathResult = pathOrError.getValue();

            await this.pathRepo.save(pathResult);


            const pathDTOResult = PathMap.toDTO(pathResult);
            return Result.ok<IPathDTO>(pathDTOResult);

        } catch (e) {
            console.debug(e.message);
            return Result.fail<IPathDTO>(e.message);
        }

    }

    public async updatePath(pathDTO: IPathDTO): Promise<Result<IPathDTO>> {

        const warehouseEnding = pathDTO.endingWarehouseId;
        const warehouseBeginning = pathDTO.beginningWarehouseId;

        const warehouseEndingResult = await this.warehouseRepo.exists(warehouseEnding);
        const warehouseBeginningResult = await this.warehouseRepo.exists(warehouseBeginning);

        if (warehouseEndingResult === false) {
            return Result.fail<IPathDTO>("Ending warehouse not found!");
        }

        if (warehouseBeginningResult === false) {
            return Result.fail<IPathDTO>("Beginning warehouse not found!");
        }

        const path = await this.pathRepo.findByDomainId(pathDTO.id);

        if (path === null) return Result.fail<IPathDTO>("Path not found!");

        path.pathEnergy = PathEnergy.create(pathDTO.energy).getValue();
        path.pathTime = PathTime.create(pathDTO.time).getValue();
        path.pathChargingTime = PathChargingTime.create(pathDTO.chargingTime).getValue();
        path.pathDistance = PathDistance.create(pathDTO.distance).getValue();
        path.pathEndingId = PathEndingWarehouseId.create(pathDTO.endingWarehouseId).getValue();
        path.pathBeginningWarehouseId = PathBeginningWarehouseId.create(pathDTO.beginningWarehouseId).getValue();

        const pathUpdatedOrError = await this.pathRepo.update(path);
        const pathDTOResult = PathMap.toDTO(pathUpdatedOrError.getValue());

        pathDTOResult.id = pathDTO.id;

        return Result.ok<IPathDTO>(pathDTOResult);
    }

    public async getAllPaths(): Promise<Result<Array<IPathDTO>>> {
        const paths = await this.pathRepo.getAllPaths();

        const pathsDTO = paths.getValue().map(path => PathMap.toDTO(path));
        return Result.ok(pathsDTO);
    }

    public async getByBeginningWarehouseId(beginningWarehouseId: IPathBeginningWarehouseId): Promise<Result<Array<IPathDTO>>> {
        try {
            const paths = await this.pathRepo.getByBeginningWarehouseId(beginningWarehouseId.beginningWarehouseId)

            if (paths === null) {
                return Result.fail("Paths not found!");
            } else {
                const pathsDTO = paths.getValue().map(path => PathMap.toDTO(path));
                return Result.ok(pathsDTO);
            }
        } catch (e) {
            throw e;
        }
    }

    public async getByEndingWarehouseId(endingWarehouseId: IPathEndingWarehouseId): Promise<Result<Array<IPathDTO>>> {
        try {
            const paths = await this.pathRepo.getByEndingWarehouseId(endingWarehouseId.endingWarehouseId)

            if (paths === null) {
                return Result.fail("Paths not found!");
            } else {
                const pathsDTO = paths.getValue().map(path => PathMap.toDTO(path));
                return Result.ok(pathsDTO);
            }
        } catch (e) {
            throw e;
        }
    }

    public async deletePath(pathId: IPathIdDto): Promise<Result<IPathDTO>> {
        try {
            const path = await this.pathRepo.findByDomainId(pathId.id);
            if (path === null) {
                return Result.fail<IPathDTO>("Path not found! Specified ID does not exist");
            } else {
                await this.pathRepo.delete(path.id);

                const pathDTOResult = PathMap.toDTO(path) as IPathDTO;
                return Result.ok<IPathDTO>(pathDTOResult);
            }
        } catch (e) {
            throw e;
        }
    }

}

import {Inject, Service} from 'typedi';

import {Path} from "../domain/path/path";
import {PathId} from "../domain/path/pathId";

import {Document, FilterQuery, Model, models} from 'mongoose';
import {IPathPersistence} from '../dataschema/IPathPersistence';
import {PathMap} from '../mappers/PathMap';
import IPathRepo from '../services/IRepos/IPathRepo';
import {Result} from "../core/logic/Result";
import {PathBeginningWarehouseId} from '../domain/path/pathBeginningWarehouseId';
import IPathEndingWarehouseId from "../dto/path/IPathEndingWarehouseIdDTO";

@Service()
export default class PathRepo implements IPathRepo {
    async;
    private models: any;

    constructor(
        @Inject('pathSchema') private pathSchema: Model<IPathPersistence & Document>,
    ) {
    }

    public async exists(path: Path): Promise<boolean> {

        const idX = path.id instanceof PathId ? (path.id).toValue() : path.id;

        const query = {domainId: idX};
        const roleDocument = await this.pathSchema.findOne(query as FilterQuery<IPathPersistence & Document>);

        return !!roleDocument === true;
    }

    public async save(path: Path): Promise<Path> {

        await models.Path.create(PathMap.toPersistence(path));

        return path;

    }

    public async findByDomainId(pathId: PathId | string): Promise<Path> {
        const query = {id: pathId};
        const roleRecord = await this.pathSchema.findOne(query as FilterQuery<IPathPersistence & Document>);

        if (roleRecord != null) {
            return PathMap.toDomain(roleRecord);
        } else {
            return null;
        }
    }


    public async getAllPaths(): Promise<Result<Array<Path>>> {
        var lista = new Array<Path>;
        (await this.pathSchema.find({})).forEach(
            path =>
                lista.push(PathMap.toDomain(path))
        )

        if (lista != null) {
            return Result.ok(lista);
        } else {
            return null;
        }
    }

    public async getByBeginningWarehouseId(beginningWarehouseId: PathBeginningWarehouseId | string): Promise<Result<Array<Path>>> {
        const query = {beginningWarehouseId: beginningWarehouseId};

        var lista = new Array<Path>;
        (await this.pathSchema.find(query)).forEach(
            path =>
                lista.push(PathMap.toDomain(path))
        )

        if (lista != null) {
            return Result.ok(lista);
        } else {
            return null;
        }
    }

    public async getByEndingWarehouseId(endingWarehouseId: IPathEndingWarehouseId | string): Promise<Result<Array<Path>>> {
        const query = {endingWarehouseId: endingWarehouseId};

        const lista = new Array<Path>;
        (await this.pathSchema.find(query)).forEach(
            path =>
                lista.push(PathMap.toDomain(path))
        )

        if (lista != null) {
            return Result.ok(lista);
        } else {
            return null;
        }
    }


    public async delete(pathId: PathId) {
        const query = {idPath: pathId};
        this.pathSchema.deleteMany(query as FilterQuery<IPathPersistence & Document>);
        return true;
    }

    public async update(path: Path): Promise<Result<Path>> {

        const query = {id: path.id.toString()};

        const pathDocument = await this.pathSchema.findOne(query);

        try {
            if (pathDocument === null) {
                const rawUser: any = PathMap.toPersistence(path);

                const pathCreated = await this.pathSchema.create(rawUser);

                return Result.ok(PathMap.toDomain(pathCreated));
            } else {
                pathDocument.chargingTime = path.pathChargingTime.value;
                pathDocument.energy = path.pathEnergy.value;
                pathDocument.distance = path.pathDistance.value;
                pathDocument.beginningWarehouseId = path.pathBeginningWarehouseId.value;
                pathDocument.endingWarehouseId = path.pathEndingId.value;
                pathDocument.time = path.pathTime.value;

                await pathDocument.save();

                return Result.ok(path);

            }
        } catch (err) {

            throw err;
        }
    }

    async getByBeginningAndEndingWarehouseId(beginningWarehouseId: string, endingWarehouseId: string): Promise<Result<Array<Path>>> {
        const query = {beginningWarehouseId: beginningWarehouseId, endingWarehouseId: endingWarehouseId};

        const lista = new Array<Path>;
        (await this.pathSchema.find(query)).forEach(
            path =>
                lista.push(PathMap.toDomain(path))
        )

        if (lista != null) {
            return Result.ok(lista);
        } else {
            return null;
        }

    }
}

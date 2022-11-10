import {Mapper} from "../core/infra/Mapper";

import {Document, Model} from "mongoose";
import {IPathPersistence} from "../dataschema/IPathPersistence";

import IPathDTO from "../dto/path/IPathDTO";
import {Path} from "../domain/path/path";

export class PathMap extends Mapper<Path> {
    public static toDTO(path: Path): IPathDTO {


        return {
            id: path.id.toString(),
            endingWarehouseId: path.pathEndingId.toString().toString(),
            beginningWarehouseId: path.pathBeginningWarehouseId.toString().toString(),
            energy: path.pathEnergy.value,
            time: path.pathTime.value,
            distance: path.pathDistance.value,
            chargingTime: path.pathChargingTime.value,
        };
    }

    public static toDomain(
        path: any | Model<IPathPersistence & Document>
    ): Path {
        const roleOrError = Path.createWithId(path);

        roleOrError.isFailure ? console.log(roleOrError.error) : "";

        return roleOrError.isSuccess ? roleOrError.getValue() : null;
    }

    public static toPersistence(path: Path): any {

        return {
            id: path.id,
            endingWarehouseId: path.pathEndingId,
            beginningWarehouseId: path.pathBeginningWarehouseId,
            energy: path.pathEnergy,
            time: path.pathTime,
            distance: path.pathDistance,
            chargingTime: path.pathChargingTime,
        };
    }
}

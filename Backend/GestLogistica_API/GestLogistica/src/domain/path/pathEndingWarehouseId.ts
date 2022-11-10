import {ValueObject} from "../../core/domain/ValueObject";
import {Result} from "../../core/logic/Result";
import config from "../../../config";

interface pathEndingWarehouseId {
    value: string;
}

export class PathEndingWarehouseId extends ValueObject<pathEndingWarehouseId> {
    public constructor(props: pathEndingWarehouseId) {
        super(props);
    }

    get value(): string {
        return this.props.value;
    }

    public static create(pathEndingWarehouseId: string): Result<PathEndingWarehouseId> {
        const numberOfCharacters = config.armazenIDNumberOfCharacters;
        if (!pathEndingWarehouseId || pathEndingWarehouseId.length !== numberOfCharacters) {
            return Result.fail<PathEndingWarehouseId>('pathEndingWarehouseId must be a string with ' + numberOfCharacters + ' characters');
        }
        return Result.ok<PathEndingWarehouseId>(new PathEndingWarehouseId({value: pathEndingWarehouseId}))
    }

    public toString(): string {
        return this.props.value;
    }
}
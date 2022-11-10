import {ValueObject} from "../../core/domain/ValueObject";
import {Result} from "../../core/logic/Result";
import config from "../../../config";

interface pathBeginningWarehouseId {
    value: string;
}

export class PathBeginningWarehouseId extends ValueObject<pathBeginningWarehouseId> {
    public constructor(props: pathBeginningWarehouseId) {
        super(props);
    }

    get value(): string {
        return this.props.value;
    }

    public static create(pathBeginningWarehouseId: string): Result<PathBeginningWarehouseId> {
        const numberOfCharacters = config.armazenIDNumberOfCharacters;
        if (!pathBeginningWarehouseId || pathBeginningWarehouseId.length !== numberOfCharacters) {
            return Result.fail<PathBeginningWarehouseId>('pathBeginningWarehouseId must be a string with ' + numberOfCharacters + ' characters');
        }
        return Result.ok<PathBeginningWarehouseId>(new PathBeginningWarehouseId({value: pathBeginningWarehouseId}))
    }

    public toString(): String {
        return this.props.value;
    }
}
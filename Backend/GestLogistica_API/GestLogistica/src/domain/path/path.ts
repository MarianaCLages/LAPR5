import {AggregateRoot} from "../../core/domain/AggregateRoot";
import {PathBeginningWarehouseId} from "./pathBeginningWarehouseId";
import { PathEndingWarehouseId } from "./pathEndingWarehouseId";
import {PathDistance} from "./pathDistance";
import {PathEnergy} from "./pathEnergy";
import {PathId} from "./pathId";
import {PathTime} from "./pathTime";
import {PathChargingTime} from "./pathChargingTime";
import {Guard} from "../../core/logic/Guard";
import {Result} from "../../core/logic/Result";
import {UniqueEntityID} from "../../core/domain/UniqueEntityID";
import ICreatePathDTO from "../../dto/path/ICreatePathDTO";
import IPathDTO from "../../dto/path/IPathDTO";


interface PathProps {
    endingWarehouseId: PathEndingWarehouseId;
    beginningWarehouseId: PathBeginningWarehouseId;
    distance: PathDistance;
    energy: PathEnergy;
    time: PathTime;
    chargingTime: PathChargingTime;
}

export class Path extends AggregateRoot<PathProps> {
    private constructor(props: PathProps, id?: UniqueEntityID) {
        super(props, id);
    }

    get id(): UniqueEntityID {
        return this._id;
    }

    get pathId(): PathId {
        return new PathId(this.id.toValue());
    }

    get pathBeginningWarehouseId(): PathBeginningWarehouseId {
        return this.props.beginningWarehouseId;
    }

    set pathBeginningWarehouseId(value: PathBeginningWarehouseId) {
        this.props.beginningWarehouseId = value;
    }

    get pathEndingId(): PathEndingWarehouseId {
        return this.props.endingWarehouseId;
    }

    set pathEndingId(value: PathEndingWarehouseId) {
        this.props.endingWarehouseId = value;
    }

    get pathDistance(): PathDistance {
        return this.props.distance;
    }

    set pathDistance(value: PathDistance) {
        this.props.distance = value;
    }

    get pathEnergy(): PathEnergy {
        return this.props.energy;
    }

    set pathEnergy(value: PathEnergy) {
        this.props.energy = value;
    }

    get pathTime(): PathTime {
        return this.props.time;
    }

    set pathTime(value: PathTime) {
        this.props.time = value;
    }

    get pathChargingTime(): PathChargingTime {
        return this.props.chargingTime;
    }

    set pathChargingTime(value: PathChargingTime) {
        this.props.chargingTime = value;
    }

    public static create(pathDTO: ICreatePathDTO, id?: UniqueEntityID): Result<Path> {
        const guardedProps = [
            {argument: pathDTO.beginningWarehouseId, argumentName: "beginningWarehouseId",},
            {argument: pathDTO.endingWarehouseId, argumentName: "endingWarehouseId",},
            {argument: pathDTO.energy, argumentName: "energy"},
            {argument: pathDTO.distance, argumentName: "distance"},
            {argument: pathDTO.time, argumentName: "time"},
            {argument: pathDTO.chargingTime, argumentName: "chargingTime"},
        ];

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);
        //path chega e partida não podem ser iguais
        if (pathDTO.beginningWarehouseId === pathDTO.endingWarehouseId) {
            return Result.fail<Path>("Beginning and ending path cannot be the same");
        }

        if (!guardResult.succeeded) {
            return Result.fail<Path>(guardResult.message);
        } else {
            const beginningWarehouseIdOrError = PathBeginningWarehouseId.create(pathDTO.beginningWarehouseId);
            const endingWarehouseIdOrError = PathEndingWarehouseId.create(pathDTO.endingWarehouseId);
            const energyOrError = PathEnergy.create(pathDTO.energy);
            const distanceOrError = PathDistance.create(pathDTO.distance);
            const timeOrError = PathTime.create(pathDTO.time);
            const chargingTimeOrError = PathChargingTime.create(pathDTO.chargingTime);

            const result = Result.combine([
                beginningWarehouseIdOrError,
                endingWarehouseIdOrError,
                energyOrError,
                distanceOrError,
                timeOrError,
                chargingTimeOrError,
            ]);

            if (!result.isSuccess) {
                return Result.fail<Path>(result.errorValue());
            } else {
                const pathProps: PathProps = {
                    beginningWarehouseId: beginningWarehouseIdOrError.getValue(),
                    endingWarehouseId: endingWarehouseIdOrError.getValue(),
                    energy: energyOrError.getValue(),
                    distance: distanceOrError.getValue(),
                    time: timeOrError.getValue(),
                    chargingTime: chargingTimeOrError.getValue(),
                };

                return Result.ok<Path>(new Path(pathProps, id));
            }
        }
    }

    public static createWithId(pathDTO: IPathDTO): Result<Path> {
        const guardedProps = [
            {argument: pathDTO.beginningWarehouseId, argumentName: "beginningWarehouseId",},
            {argument: pathDTO.endingWarehouseId, argumentName: "endingWarehouseId",},
            {argument: pathDTO.energy, argumentName: "energy"},
            {argument: pathDTO.distance, argumentName: "distance"},
            {argument: pathDTO.time, argumentName: "time"},
            {argument: pathDTO.chargingTime, argumentName: "chargingTime"},
        ];

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

        if (!guardResult.succeeded) {
            return Result.fail<Path>(guardResult.message);
        } else {
            try {
                const _endingWarehouseId = PathEndingWarehouseId.create(pathDTO.endingWarehouseId);
                const _beginningWarehouseId = PathBeginningWarehouseId.create(pathDTO.beginningWarehouseId);
                const _distance = PathDistance.create(pathDTO.distance);
                const _energy = PathEnergy.create(pathDTO.energy);
                const _time = PathTime.create(pathDTO.time);
                const _chargingTime = PathChargingTime.create(pathDTO.chargingTime);
                if (_endingWarehouseId.isFailure || _beginningWarehouseId.isFailure || _distance.isFailure || _energy.isFailure || _time.isFailure || _chargingTime.isFailure) {
                    //adds to the message the errors of each value object if they exist
                    let message = "It wasn't possible to create the path: \n";
                    if (_endingWarehouseId.isFailure) {
                        message += _endingWarehouseId.errorValue() + "\n";
                    }
                    if (_beginningWarehouseId.isFailure) {
                        message += _beginningWarehouseId.errorValue() + "\n";
                    }
                    if (_distance.isFailure) {
                        message += _distance.errorValue() + "\n";
                    }
                    if (_energy.isFailure) {
                        message += _energy.errorValue() + "\n";
                    }
                    if (_time.isFailure) {
                        message += _time.errorValue() + "\n";
                    }
                    if (_chargingTime.isFailure) {
                        message += _chargingTime.errorValue() + "\n";
                    }
                    return Result.fail<Path>(message);
                }
                const path = new Path({
                    endingWarehouseId: _endingWarehouseId.getValue(),
                    beginningWarehouseId: _beginningWarehouseId.getValue(),
                    distance: _distance.getValue(),
                    energy: _energy.getValue(),
                    time: _time.getValue(),
                    chargingTime: _chargingTime.getValue(),
                }, new UniqueEntityID(pathDTO.id));
                return Result.ok<Path>(path);
            } catch (err) {
                console.debug(err);
                return Result.fail<Path>(err.toString());
            }
        }
    }
}

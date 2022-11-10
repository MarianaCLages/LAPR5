import {AggregateRoot} from "../../core/domain/AggregateRoot";
import {UniqueEntityID} from "../../core/domain/UniqueEntityID";
import {Result} from "../../core/logic/Result";
import {Tare} from "./tare";
import {MaxLoadAutonomy} from "./maxLoadAutonomy";
import {ChargingTime} from "./chargingTime"
import {Guard} from "../../core/logic/Guard";
import {ICreateTruckDTO} from "../../dto/truck/ICreateTruckDTO";
import {TotalBatCharge} from "./totalBatCharge";
import {CaractTruck} from "./caractTruck";
import {TruckPlate} from "./truckPlate";
import {WeightCapacity} from "./weightCapacity";

interface TruckProps {
    caractTruck: CaractTruck;
    truckPlate: TruckPlate;
    tare: Tare;
    weightCapacity: WeightCapacity;
    totalBatCharge: TotalBatCharge;
    cargaMax: MaxLoadAutonomy;
    chargingTime: ChargingTime;
}

export class Truck extends AggregateRoot<TruckProps> {

    private constructor(props: TruckProps, id?: UniqueEntityID) {
        super(props, id);
    }

    get id(): UniqueEntityID {
        return this._id;
    }

    get caractTruck(): CaractTruck {
        return this.props.caractTruck;
    }

    get truckPlate(): TruckPlate {
        return this.props.truckPlate;
    }

    set truckPlate(value: TruckPlate) {
        this.props.truckPlate = value;
    }

    get tare(): Tare {
        return this.props.tare;
    }

    set tare(value: Tare) {
        this.props.tare = value;
    }

    get weightCapacity(): WeightCapacity {
        return this.props.weightCapacity;
    }

    set weightCapacity(value: WeightCapacity) {
        this.props.weightCapacity = value;
    }

    get cargaMax(): MaxLoadAutonomy {
        return this.props.cargaMax;
    }

    set cargaMax(value: MaxLoadAutonomy) {
        this.props.cargaMax = value;
    }

    get totalBatCharge(): TotalBatCharge {
        return this.props.totalBatCharge;
    }

    set totalBatCharge(value: TotalBatCharge) {
        this.props.totalBatCharge = value;
    }

    get chargingTime(): ChargingTime {
        return this.props.chargingTime;
    }

    set chargingTime(value: ChargingTime) {
        this.props.chargingTime = value;
    }

    public static create(truckDTO: ICreateTruckDTO, id?: UniqueEntityID): Result<Truck> {

        const guardedProps = [
            {argument: truckDTO.caractTruck, argumentName: 'caractTruck'},
            {argument: truckDTO.truckPlate, argumentName: 'truckPlate'},
            {argument: truckDTO.tare, argumentName: "tare"},
            {argument: truckDTO.weightCapacity, argumentName: "weightCapacity"},
            {argument: truckDTO.cargaMax, argumentName: "cargaMax"},
            {argument: truckDTO.totalBatCharge, argumentName: "totalBatCharge"},
            {argument: truckDTO.chargingTime, argumentName: "chargingTime"}

        ];

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

        if (!guardResult.succeeded || !RegExp('^[A-Z]{2}-[0-9]{2}-[A-Z]{2}$').test(truckDTO.truckPlate)) {
            return Result.fail<Truck>("Invalid Truck");
        } else {
            const caractTruckOrError = CaractTruck.create(truckDTO.caractTruck);
            const truckPlateOrError = TruckPlate.create(truckDTO.truckPlate);
            const tareOrError = Tare.create(truckDTO.tare);
            const weightCapacityOrError = WeightCapacity.create(truckDTO.weightCapacity);
            const cargaMaxOrError = MaxLoadAutonomy.create(truckDTO.cargaMax);
            const totalBatChargeOrError = TotalBatCharge.create(truckDTO.totalBatCharge);
            const chargingTimeOrError = ChargingTime.create(truckDTO.chargingTime);

            const result = Result.combine([
                caractTruckOrError,
                truckPlateOrError,
                tareOrError,
                weightCapacityOrError,
                cargaMaxOrError,
                totalBatChargeOrError,
                chargingTimeOrError
            ]);

            if (!result.isSuccess) {
                return Result.fail<Truck>(result.errorValue());
            } else {

                const truck = new Truck({
                    caractTruck: caractTruckOrError.getValue(),
                    truckPlate: truckPlateOrError.getValue(),
                    tare: tareOrError.getValue(),
                    weightCapacity: weightCapacityOrError.getValue(),
                    cargaMax: cargaMaxOrError.getValue(),
                    totalBatCharge: totalBatChargeOrError.getValue(),
                    chargingTime: chargingTimeOrError.getValue()
                }, id);

                return Result.ok<Truck>(truck);
            }
        }
    }

}
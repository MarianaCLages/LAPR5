import { Document, FilterQuery, Model } from 'mongoose';
import { Service, Inject } from 'typedi';
import { Result } from '../core/logic/Result';
import { ITruckPersistence } from '../dataschema/ITruckPersistence';
import { Truck } from '../domain/truck/truck';
import { CaractTruck } from '../domain/truck/caractTruck';
import { TruckMap } from '../mappers/TruckMap';
import ITruckRepo from '../services/IRepos/ITruckRepo';
import {TruckPlate} from "../domain/truck/truckPlate";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

@Service()
export default class truckRepo implements ITruckRepo {
    private models: any;
    constructor(
        @Inject('truckSchema') private truckSchema: Model<ITruckPersistence & Document>,
    ) { }

    private createBaseQuery(): any {
        return {
            where: {},
        }
    }

    public async exists(truck: Truck): Promise<boolean> {
        const idX = truck.caractTruck instanceof CaractTruck ? (<CaractTruck>truck.caractTruck).value : truck.caractTruck;
        const query = { domainId: idX };
        const truckDocument = await this.truckSchema.findOne(query as FilterQuery<ITruckPersistence & Document>);

        return !!truckDocument === true;
    }

    public async findByDomainId(id: string): Promise<Truck> {

        const query = { domainId: id };
        const roleRecord = await this.truckSchema.findOne(query as FilterQuery<ITruckPersistence & Document>);

        if (roleRecord != null) {
            return TruckMap.toDomain(roleRecord);
        } else
            return null;
    }


    public async findByCaractTruck(caractCam: CaractTruck | string): Promise<Truck> {

        const query = { caractTruck: caractCam };
        const roleRecord = await this.truckSchema.findOne(query as FilterQuery<ITruckPersistence & Document>);

        if (roleRecord != null) {
            return TruckMap.toDomain(roleRecord);
        } else
            return null;
    }


    public async save(truck: Truck): Promise<Truck> {
        const query = { domainId: truck.id.toString() };
        const truckDocument = await this.truckSchema.findOne(query);
        try {
            if (truckDocument === null) {
                const rawTruck: any = TruckMap.toPersistence(truck);
                const truckCreated = await this.truckSchema.create(rawTruck);
                return TruckMap.toDomain(truckCreated);
            } else {
                truckDocument.id = truck.id.toString();
            }
        } catch (err) {
            console.debug(err.message + " " + err.stack);
            throw new Error("Error creating truck, check the repeated data");
        }
    }

    public async update(truck: Truck): Promise<Result<Truck>> {


        const query = { caractTruck: truck.caractTruck.value };
        const truckDocument = await this.truckSchema.findOne(query as FilterQuery<ITruckPersistence & Document>);

        try {
            if (truckDocument == null) {
                const rawUser = TruckMap.toPersistence(truck);

                const truckCreated = await this.truckSchema.create(rawUser);

                return Result.ok(TruckMap.toDomain(truckCreated));
            }
            else {
                truckDocument.truckPlate = truck.truckPlate.value;
                truckDocument.weightCapacity = truck.weightCapacity.value;
                truckDocument.totalBatCharge = truck.totalBatCharge.value;
                truckDocument.maxLoadAutonomy = truck.cargaMax.value;
                truckDocument.tare = truck.tare.value;
                truckDocument.chargingTime = truck.chargingTime.value;
                truckDocument.activeTruck = truck.activeTruck.value;

                await truckDocument.save();

                return Result.ok(truck);

            }
        } catch (err) {
            throw err;
        }
    }

    public async getAllTrucks() : Promise<Result<Array<Truck>>> {
        var lista = new Array<Truck>;

        (await this.truckSchema.find({})).forEach(
            cam => lista.push(TruckMap.toDomain(cam))
        );

        if (lista != null) {
            return Result.ok(lista);
        } else {
            return null;
        }
    }

    public async getByCaractAsync(caract: CaractTruck | string): Promise<Result<Array<Truck>>> {
        const query = { caractTruck : caract};

        var lista = new Array<Truck>;

        (await this.truckSchema.find(query)).forEach(
            cam => lista.push(TruckMap.toDomain(cam))
        );

        if (lista != null) {
            return Result.ok(lista);
        } else {
            return null;
        }
    }

    public async getByPlateAsync(plate: TruckPlate | string): Promise<Result<Array<Truck>>> {
        const query = { truckPlate : plate};

        var lista = new Array<Truck>;

        (await this.truckSchema.find(query)).forEach(
            cam => lista.push(TruckMap.toDomain(cam))
        );

        if (lista != null) {
            return Result.ok(lista);
        } else {
            return null;
        }
    }

    public async deleteTruck(domain: UniqueEntityID | string){
        const query = { domainId: domain };
        await this.truckSchema.deleteMany(query as FilterQuery<ITruckPersistence & Document>);

        return true;
    }
}
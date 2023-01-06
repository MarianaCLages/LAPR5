import { Document, FilterQuery, Model } from 'mongoose';
import { Inject, Service } from 'typedi';
import { ITruckPersistence } from '../dataschema/ITruckPersistence';
import { TripMap } from '../mappers/TripMap';
import ITripRepo from '../services/IRepos/ITripRepo';
import {Trip} from "../domain/trip/trip";
import {ITripPersistence} from "../dataschema/ITripPersistence";
import {TripTruck} from "../domain/trip/tripTruck";
import { Result } from '../core/logic/Result';

@Service()
export default class TripRepo implements ITripRepo{
    private models: any;
    constructor(
        @Inject('tripSchema') private tripSchema: Model<ITripPersistence & Document>,
    ) { }

    public async  findByTruck(truck: TripTruck | string): Promise<Trip> {
        const query = { tripTruck: truck};
        const roleRecorded = await this.tripSchema.findOne(query as FilterQuery<ITripPersistence & Document>);

        if(roleRecorded != null){
            return TripMap.toDomain(roleRecorded);
        }else
            return null;
    }
    getAllWarehouses(warehouses: string) {
        throw new Error('Method not implemented.');
    }
    exists(t: Trip): Promise<boolean> {
        throw new Error('Method not implemented.');
    }

    public async save(trip: Trip): Promise<Trip> {
        const query = { id: trip.id.toString() };
        const truckDocument = await this.tripSchema.findOne(query);
        try {
            if (truckDocument === null) {
                const rawTruck: any = TripMap.toPersistence(trip);
                const truckCreated = await this.tripSchema.create(rawTruck);
                return TripMap.toDomain(truckCreated);
            } else {
                truckDocument.id = trip.id.toString();
            }
        } catch (err) {
            console.debug(err.message + " " + err.stack);
            throw new Error("Error creating trip, check the repeated data");
        }
    }

    public async getAllTrips(): Promise<Result<Array<Trip>>> {

        var lista = new Array<Trip>;

        (await this.tripSchema.find({})).forEach(
            cam => { 
                cam.tripIdentifier = cam.tripTruck + cam.tripDay; 
                console.log("\n" + cam);
                lista.push(TripMap.toDomain(cam)) 
            }
        );

        console.log(lista);

        if (lista != null) {
            return Result.ok(lista);
        } else {
            return null;
        }
    }

}
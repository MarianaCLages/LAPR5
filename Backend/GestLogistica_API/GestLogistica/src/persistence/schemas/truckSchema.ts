import {ITruckPersistence} from "../../dataschema/ITruckPersistence";
import mongoose from 'mongoose';

const TruckSchema = new mongoose.Schema(
    {
        domainId: {type: String, required: true, unique: true},
        caractTruck: {type: String, required: true, unique: true},
        truckPlate: {type: String, required: true, unique: true},
        tare: Number,
        weightCapacity: Number,
        cargaMax: Number,
        totalBatCharge: Number,
        chargingTime: Number,
        activeTruck: {type: Boolean, required: true}

    },
);

export default mongoose.model<ITruckPersistence & mongoose.Document>('Truck', TruckSchema);

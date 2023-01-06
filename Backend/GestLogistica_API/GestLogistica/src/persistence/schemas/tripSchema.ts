import {ITripPersistence} from '../../dataschema/ITripPersistence';
import mongoose from 'mongoose';

const TripSchema = new mongoose.Schema({
    id: {type: String, required: true, index: true},
    tripTruck: {type: String, required: true, index: true},
    tripDay: {type: String, required: true, index: true},
    tripWarehouses:[{type: String, required: true, index: true}],
    tripOrders: [{type: String, required: true, index: true}],
});

export default mongoose.model<ITripPersistence & mongoose.Document>('Trip', TripSchema);

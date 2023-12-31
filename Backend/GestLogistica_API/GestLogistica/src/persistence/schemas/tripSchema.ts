import {ITripPersistence} from '../../dataschema/ITripPersistence';
import mongoose from 'mongoose';

const TripSchema = new mongoose.Schema({
    id: {type: String, required: true, index: true},
    tripIdentifier: {type: String, required: true, index: true},
    tripTruck: {type: String, required: true, index: true},
    tripDay: {type: String, required: true, index: true},
    tripWarehouses:[{type: String, required: true, index: true}],
    tripOrders: {
        type: mongoose.Schema.Types.Array,
        ref: 'tripOrders'
    }
});

const OrdersSchema = new mongoose.Schema({
    warehouse: {type: String,required: true,index: true},
    orders: [{type: String,required: true,index: true}]
})



const Child = mongoose.model('tripOrders', OrdersSchema);
export default mongoose.model<ITripPersistence & mongoose.Document>('Trip', TripSchema);

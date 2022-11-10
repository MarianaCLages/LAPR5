import {IPathPersistence} from '../../dataschema/IPathPersistence';
import mongoose from 'mongoose';

const PathSchema = new mongoose.Schema({
    id: {type: String, required: true, index: true},
    beginningWarehouseId: {type: String, required: true, index: true},
    endingWarehouseId: {type: String, required: true, index: true},
    distance: {type: Number, required: true, index: true},
    energy: {type: Number, required: true, index: true},
    chargingTime: {type: Number, required: true, index: true},
    time: {type: Number, required: true, index: true},
});

export default mongoose.model<IPathPersistence & mongoose.Document>('Path', PathSchema);

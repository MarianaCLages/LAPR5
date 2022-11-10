import {IPathPersistence} from '../../dataschema/IPathPersistence';
import mongoose from 'mongoose';

const PackagingSchema = new mongoose.Schema({
  id: {type: String, required: true, index: true},
  orderRef: {type: String, required: true, index: true},
  truckRef: {type: String, required: true, index: true},
});

export default mongoose.model<IPathPersistence & mongoose.Document>('Packaging', PackagingSchema);

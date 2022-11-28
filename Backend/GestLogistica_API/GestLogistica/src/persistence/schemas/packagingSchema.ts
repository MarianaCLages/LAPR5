import mongoose from 'mongoose';
import { IPackagingPersistance } from "../../dataschema/IPackagingPersistance";

const PackagingSchema = new mongoose.Schema({
  id: {type: String, required: true, index: true},
  orderRef: {type: String, required: true, index: true},
  truckRef: {type: String, required: true, index: true},
  pos3DX: {type: Number, required: true, index: true},
  pos3DY: {type: Number, required: true, index: true},
  pos3DZ: {type: Number, required: true, index: true},
});

export default mongoose.model<IPackagingPersistance & mongoose.Document>('Packaging', PackagingSchema);

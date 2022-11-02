import {ICaminhoPersistence} from '../../dataschema/ICaminhoPersistence';
import mongoose from 'mongoose';

const EmpacotamentoSchema = new mongoose.Schema({
  id: {type: String, required: true, index: true},
  empEntregaRef: {type: String, required: true, index: true},
  empCamiaoRef: {type: String, required: true, index: true},
});

export default mongoose.model<ICaminhoPersistence & mongoose.Document>('Empacotamento', EmpacotamentoSchema);

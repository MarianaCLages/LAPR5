import {ICaminhoPersistence} from '../../dataschema/ICaminhoPersistence';
import mongoose from 'mongoose';

const CaminhoSchema = new mongoose.Schema({
    id: {type: String, required: true, index: true},
    armazemPartidaId: {type: String, required: true, index: true},
    armazemChegadaId: {type: String, required: true, index: true},
    distancia: {type: Number, required: true, index: true},
    energia: {type: Number, required: true, index: true},
    tmpCarregamento: {type: Number, required: true, index: true},
    tempo: {type: Number, required: true, index: true},
});

export default mongoose.model<ICaminhoPersistence & mongoose.Document>('Caminho', CaminhoSchema);

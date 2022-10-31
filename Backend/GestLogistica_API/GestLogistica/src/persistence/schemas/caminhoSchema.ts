import {ICaminhoPersistence} from '../../dataschema/ICaminhoPersistence';
import mongoose from 'mongoose';

const CaminhoSchema = new mongoose.Schema({
    id: {type: String, required: true},
    armazemPartidaId: {type: String, required: true},
    armazemChegadaId: {type: String, required: true},
    distancia: {type: Number, required: true},
    energia: {type: Number, required: true},
    tmpCarregamento: {type: Number, required: true},
    tempo: {type: Number, required: true},
});

export default mongoose.model<ICaminhoPersistence & mongoose.Document>('Caminho', CaminhoSchema);

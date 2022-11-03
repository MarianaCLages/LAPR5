import {ICamiaoPersistence} from "../../dataschema/ICamiaoPersistence";
import mongoose from 'mongoose';

const CamiaoSchema = new mongoose.Schema(
    {
        domainId: {type: String, required: true},
        caractCamiao: String,
        matriculaCamiao: String,
        tara: Number,
        capacidadeCarga: Number,
        cargaMax: Number,
        cargaTotal: Number,
        tempoCarregamento: Number

    },
);

export default mongoose.model<ICamiaoPersistence & mongoose.Document>('Camiao', CamiaoSchema);

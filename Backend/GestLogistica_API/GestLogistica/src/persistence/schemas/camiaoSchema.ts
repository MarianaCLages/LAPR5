import {ICamiaoPersistence} from "../../dataschema/ICamiaoPersistence";
import mongoose from 'mongoose';

const CamiaoSchema = new mongoose.Schema(
    {
        domainId: {type: String, required: true},
        caractCamiao: String,
        matriculaCamiao: String,
        tara: String,
        capacidadeCarga: String,
        cargaMax: String,
        cargaTotal: String,
        tempoCarregamento: String

    },
);

export default mongoose.model<ICamiaoPersistence & mongoose.Document>('Camiao', CamiaoSchema);

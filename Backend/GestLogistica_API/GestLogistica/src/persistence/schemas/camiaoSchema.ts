import { ICamiaoPersistence } from "../../dataschema/ICamiaoPersistence";
import mongoose from 'mongoose';

const CamiaoSchema = new mongoose.Schema(
    {
        domainId: {
            type: String,
            unique: true
        },

        caractCamiao: {
            type: String,
            required: true
        },

        matriculaCamiao: {
            type: String,
            required: true
        },

        tara: {
            type: String,
            required: [true, 'Por favor selecione a tara do camião']
        },

        capacidadeCarga: {
            type: String,
            required: [true, 'Por favor selecione a capacidade de carga do camião']
        },

        cargaMaxima: {
            type: String,
            required: [true, 'Por favor selecione a carga máxima do camião']
        },

        cargaTotal: {
            type: String,
            required: [true, 'Por favor selecione a carga total do camião']
        },

        tempoCarregamento: {
            type: String,
            required: [true, 'Por favor selecione o tempo de carregamento do camião']
        },
    },
        {
            timestamps: true
        }
);

export default mongoose.model<ICamiaoPersistence & mongoose.Document>('Camiao', CamiaoSchema);

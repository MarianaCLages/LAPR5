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
            required: true,
            index: true
        },

        matriculaCamiao: {
            type: String,
            required: true,
            index: true
        },

        tara: {
            type: String,
            required: [true, 'Por favor selecione a tara do camião'],
            index: true
        },

        capacidadeCarga: {
            type: String,
            required: [true, 'Por favor selecione a capacidade de carga do camião'],
            index: true
        },

        cargaMaxima: {
            type: String,
            required: [true, 'Por favor selecione a carga máxima do camião'],
            index: true
        },

        cargaTotal: {
            type: String,
            required: [true, 'Por favor selecione a carga total do camião'],
            index: true
        },

        tempoCarregamento: {
            type: String,
            required: [true, 'Por favor selecione o tempo de carregamento do camião'],
            index: true
        },
    },
        {
            timestamps: true
        }
);

export default mongoose.model<ICamiaoPersistence & mongoose.Document>('Camiao', CamiaoSchema);

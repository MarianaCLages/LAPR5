import { ICaminhoPersistence } from '../../dataschema/ICaminhoPersistence';
import mongoose from 'mongoose';

const CaminhoSchema = new mongoose.Schema(
  {
    domainId: {
      type: String,
      unique: true
    },

    armazemPartidaId: {
      type: String,
      required: [true, 'Por favor selecione o id do armazém de partida'],
      index: true,
    },

    armazemChegadaId: {
      type: String,
      required: [true, 'Por favor selecione o id do armazém de chegada'],
      index: true,
    },

    energia: {
      type: String,
    },

    distancia: {
      type: Number,
    },

    tempo: {
      type: String,
    },

    tmpCarregamento: {
      type: String,
    },
  },
  {
    timestamps: true
  }
);

export default mongoose.model<ICaminhoPersistence & mongoose.Document>('Caminho', CaminhoSchema);

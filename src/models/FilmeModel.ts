import mongoose, { Schema, model } from 'mongoose';

const FilmeSchema = new Schema(
  {
    tituloDofilme: { type: String, require: true },
    anoDeLancamento: { type: Number, require: true },
    duracao: { type: Number, require: true },
    classificacaoDeIdade: { type: String, require: true },
    generos: { type: String, require: true },
    disponível: { type: String, require: true },
    sinopse: { type: String, require: true },
    fotos: { type: mongoose.Types.ObjectId, ref: 'Foto' },
  },
  {
    timestamps: true,
  },
);

export default model('Filme', FilmeSchema);

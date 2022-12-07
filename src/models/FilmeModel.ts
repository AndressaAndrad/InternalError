import mongoose, { Schema, model } from 'mongoose';

const FilmeSchema = new Schema({
  tituloDofilme: { type: String, require: true },
  anoDeLancamento: { type: Number, require: true },
  duracao: { type: Number, require: true },
  classificacaoDeIdade: { type: String, require: true },
  generos: { type: String, require: true },
  disponível: { type: String, require: true },
  sinopse: { type: String, require: true },
  fotos: { type: mongoose.Types.ObjectId, ref: 'Fotos' },
  createdAt: { type: Date, required: true, default: new Date() },
  updatedAt: { type: Date },
});

export default model('Filmes', FilmeSchema);

import { Schema, model } from 'mongoose';

const FotoSchema = new Schema(
  {
    name: String,
    key: String,
    url: String,
  },
  {
    timestamps: true,
  },
);

export default model('Foto', FotoSchema);

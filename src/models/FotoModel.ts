import { Schema, model } from 'mongoose';

const FotoSchema = new Schema(
  {
    filename: String,
    originalname: String,
    url: String,
  },
  {
    timestamps: true,
  },
);

export default model('Foto', FotoSchema);

import { Schema, model } from 'mongoose';

const FotoSchema = new Schema({
  filename: { type: String, default: '' },
  originalname: { type: String, default: '' },
  path: { type: String, default: '' },
  createdAt: { type: Date, required: true, default: new Date() },
  updatedAt: { type: Date },
});

export default model('Fotos', FotoSchema);

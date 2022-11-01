import { diskStorage } from 'multer';
import { extname, resolve } from 'path';

const aleatorio = () => Math.floor(Math.random() * 10000 + 10000);

export default {
  storage: diskStorage({
    destination: (req, file, cb) => {
      cb(null, resolve(__dirname, '..', '..', 'uploads'));
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${aleatorio()}${extname(file.originalname)}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    const formato = ['image/png', 'image/jpeg'];
    if (!formato.includes(file.mimetype)) {
      return cb(new Error('Arquivo precisa ser PNG ou JPEG'));
    }
    return cb(null, true);
  },
};

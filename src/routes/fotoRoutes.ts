import { Router } from 'express';
import multer from 'multer';

import FotoController from '../controllers/FotoController';
import multerConfig from '../config/multerConfig';

const upload = multer(multerConfig);
const router = Router();

router.post('/fotos/:filmeId', upload.single('foto'), FotoController.create);

export default router;

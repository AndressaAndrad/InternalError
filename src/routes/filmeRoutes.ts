import { Router } from 'express';
import multer from 'multer';

import FilmeController from '../controllers/FilmeController';
import multerConfig from '../config/multerConfig';

const upload = multer(multerConfig);

const routes = Router();

routes.get('/filmes', FilmeController.index);
routes.get('/filmes/foto/:_id', FilmeController.showImageByFilmId);
routes.get('/filmes/:_id', FilmeController.getFilmById);
routes.post('/filmes', upload.single('foto'), FilmeController.create);
routes.delete('/filmes/:_id', FilmeController.delete);

export default routes;

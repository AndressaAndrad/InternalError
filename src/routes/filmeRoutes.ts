import { Router } from 'express';

import FilmeController from '../controllers/FilmeController';

const routes = Router();

routes.get('/filmes', FilmeController.index);
routes.get('/filmes/:_id', FilmeController.show);
routes.post('/filmes', FilmeController.create);
routes.delete('/filmes/:_id', FilmeController.delete);

export default routes;

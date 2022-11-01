import express from 'express';
import mongoose from 'mongoose';

import filme from './routes/filmeRoutes';
import foto from './routes/fotoRoutes';

class App {
  public express: express.Application;

  public constructor() {
    this.express = express();

    this.middlewares();
    this.database();
    this.routes();
  }

  private middlewares(): void {
    this.express.use(express.json());
  }

  private database(): void {
    mongoose.connect(
      'mongodb+srv://Andressa:Anfa0318@cursojs01.mpt3sok.mongodb.net/FILMES?retryWrites=true&w=majority',
    );
  }

  private routes(): void {
    this.express.use(filme);
    this.express.use(foto);
  }
}

export default new App().express;

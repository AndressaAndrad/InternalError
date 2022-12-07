import { Request, Response } from 'express';
import path from 'path';

import Filme from '../models/FilmeModel';
import FotoModel from '../models/FotoModel';

class FilmeController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const file = req.file;

      console.log(file);
      const itemUpdated = await FotoModel.create({
        filename: file?.filename,
        path: file?.path,
        originalname: file?.originalname,
      });
      console.log('Deu certo');
      const filmeMapped = {
        ...req.body,
        fotos: itemUpdated._id,
      };

      const filme = await Filme.create(filmeMapped);
      return res.json(filme);
    } catch (error) {
      return res.status(500);
    }
  }

  async index(req: Request, res: Response): Promise<Response> {
    try {
      const filmes = await Filme.find();

      return res.json(filmes);
    } catch (error) {
      return res.status(500);
    }
  }

  async showImageByFilmId(req: Request, res: Response): Promise<Response> {
    try {
      const foto = await Filme.findById(req.params._id).populate('fotos');

      if (!foto) return res.status(404);

      const pathFile = foto.fotos.path;

      return res.download(path.join(pathFile), 'foto', (error) => {
        if (error) return res.status(404);
      });
    } catch (error) {
      return res.status(500);
    }
  }

  async getFilmById(req: Request, res: Response): Promise<Response> {
    try {
      const filme = await Filme.findById(req.params._id).populate('fotos');

      return res.status(200).json(filme);
    } catch (error) {
      return res.status(500);
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const foto = await Filme.findByIdAndDelete(req.params._id);
    return res.json({ foto, apagado: true });
  }
}

export default new FilmeController();

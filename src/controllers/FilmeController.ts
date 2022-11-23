import { Request, Response } from 'express';

import Filme from '../models/FilmeModel';
import FotoModel from '../models/FotoModel';

class FilmeController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const file = req.file;

      const itemUpdated = await FotoModel.create(file);
      const filmeMapped = {
        ...req.body,
        fotos: itemUpdated._id,
      };

      const filme = await Filme.create(filmeMapped);

      return res.json(filme);
    } catch (error) {
      return res.status(400);
    }
  }

  async index(req: Request, res: Response): Promise<Response> {
    try {
      const filmes = await Filme.find();

      return res.json(filmes);
    } catch (error) {
      return res.status(400);
    }
  }

  async show(req: Request, res: Response): Promise<Response> {
    try {
      const foto = await Filme.findById(req.params._id);
      return res.json(foto);
    } catch (error) {
      return res.status(400);
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const foto = await Filme.findByIdAndDelete(req.params._id);
    return res.json({ foto, apagado: true });
  }
}

export default new FilmeController();

import { Request, Response } from 'express';
import path from 'path';

import Filme from '../models/FilmeModel';
import FotoModel from '../models/FotoModel';

class FilmeController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const file = req.file;

      const itemUpdated = await FotoModel.create({
        filename: file?.filename,
        path: file?.path,
        originalname: file?.originalname,
      });

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
    try {
      const filme = await Filme.findById(req.params._id);

      if (filme.fotos) {
        await FotoModel.findByIdAndDelete({ _id: filme.fotos });
      }

      await Filme.findByIdAndDelete(filme?._id);
      return res.status(200).send('Filme deletado com sucesso.');
    } catch (error) {
      return res.status(500);
    }
  }

  async findAllFilms(req: Request, res: Response): Promise<Response> {
    try {
      const { page, limit } = req.query;
      const pageFilter = Number(page || '1');
      const limitFilter = Number(limit || '10');
      const skipFilter = (pageFilter - 1) * limitFilter;

      let films = [];
      let countFilms = 0;

      films = await Filme.find({})
        .populate('fotos')
        .limit(limitFilter)
        .skip(skipFilter);

      countFilms = await Filme.countDocuments({});

      return res.status(200).json({
        films,
        totalPages: Math.ceil(countFilms / limitFilter),
        currentPage: pageFilter,
        limitFilter,
        totalItens: countFilms,
      });
    } catch (error) {
      return res.status(500);
    }
  }
}

export default new FilmeController();

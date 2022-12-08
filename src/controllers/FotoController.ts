import { Request, Response } from 'express';
import FilmeModel from '../models/FilmeModel';

class FotoController {
  async create(req: Request, res: Response) {
    const filmeId = req.params.filmeId;
    const fileName = req.file?.filename;

    const itemUpdated = await FilmeModel.updateOne(
      { _id: filmeId },
      { foto: fileName },
    );

    return res.json(itemUpdated);
  }
}

export default new FotoController();

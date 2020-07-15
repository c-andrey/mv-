import { Request, Response } from 'express';
import { PaginateResult } from 'mongoose';
import { Event as EventSchema, IEvent } from '../Models/EventSchema';

export default {
  async index(req: Request, res: Response): Promise<any> {
    try {
      const page: number = req.query.page ? Number(req.query.page) : 1;
      const events: PaginateResult<IEvent> = await EventSchema.paginate(
        {},
        { page, limit: 5, sort: 'createdAt' }
      );

      if (!events) {
        throw new Error('Não existem eventos cadastrados');
      }

      res.json(events);
    } catch (err) {
      res.status(204).send(err);
    }
  },

  async show(req: Request, res: Response): Promise<any> {
    try {
      const event: IEvent | null = await Promise.resolve(
        EventSchema.findById(req.params.id)
      );

      if (!event) {
        throw new Error('Não existe evento com este nome');
      }

      return res.json(event);
    } catch (err) {
      return res.json(err);
    }
  },

  async store(req: Request, res: Response): Promise<any> {
    try {
      const event: IEvent = await EventSchema.create(req.body);

      res.status(201).json(event);
    } catch (err) {
      res.status(404).send(`Não foi possível criar o evento, erro: ${err}`);
    }
  },

  async update(req: Request, res: Response): Promise<any> {
    try {
      const event: IEvent | null = await Promise.resolve(
        EventSchema.findOneAndUpdate(req.params.id as IEvent['_id'], req.body, {
          new: true,
        })
      );

      if (!event) {
        res.status(204);
        throw new Error('Este evento não existe');
      }

      return res.json(event);
    } catch (err) {
      return res.send(err);
    }
  },

  async destroy(req: Request, res: Response): Promise<any> {
    try {
      await Promise.resolve(
        EventSchema.findOneAndDelete(req.params.id as IEvent['_id'])
      );

      return res.send('Deletado com sucesso');
    } catch (err) {
      return res.json(err);
    }
  },
};

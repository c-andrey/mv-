import { Request, Response, Router } from 'express';
import EventController from './Controllers/EventController';

const routes = Router();

routes.get('/', (_req: Request, res: Response): any => {
  res.status(200).send('Teste');
});
routes.get('/events', EventController.index);
routes.get('/events/:id', EventController.show);
routes.post('/events', EventController.store);
routes.put('/events/:id', EventController.update);
routes.delete('/events/:id', EventController.destroy);

export default routes;

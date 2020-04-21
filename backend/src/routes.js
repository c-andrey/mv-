import express from 'express';
import EventController from './Controllers/EventController';

const routes = express.Router();

routes.get('/events', EventController.index);
routes.get('/events/:id', EventController.show);
routes.post('/events', EventController.store);
routes.put('/events/:id', EventController.update);
routes.delete('/events/:id', EventController.destroy);

export default routes;

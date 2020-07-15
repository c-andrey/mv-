import cors from 'cors';
import express from 'express';
import http from 'http';
import { MongooseHelper } from './Database/MongooseHelper';
import routes from './routes';

const app = express();
const server = http.createServer(app);

const PORT = 3001;
const MONGO_URI = 'mongodb://localhost:27017/qualorole';

const mongooseHelper = new MongooseHelper(MONGO_URI);
mongooseHelper
  .start()
  .then(() => {
    console.log('connected to mongodb');
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(PORT);
server.on('error', (err) => {
  console.error(err);
});
server.on('listening', async () => {
  console.info(`Listening on port ${PORT}`);
});

export default app;

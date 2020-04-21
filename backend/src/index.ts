import cors from 'cors';
import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import routes from './routes.js';

const app = express();
const server = http.createServer(app);

const PORT = 3001;
const MONGO_URI = 'mongodb://localhost:27017/qualorole';

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .catch((err) => {
    console.error(err);
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

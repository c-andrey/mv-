import mongoose from 'mongoose';
import supertest from 'supertest';
import { MongooseHelper } from '../../Database/MongooseHelper';
import app from '../../index';
import { Event as EventSchema } from '../../Models/EventSchema';

describe('Event API', () => {
  beforeAll(async () => {
    const url = `mongodb://127.0.0.1/qualorole_test`;
    const mongooseHelper = new MongooseHelper(url);

    await mongooseHelper.start();
  });

  afterEach(async () => {
    await mongoose.connection.dropCollection('Event');
  });

  it('/GET ', async (done) => {
    const response = await supertest(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Teste');
    done();
  });

  it('POST /', async (done) => {
    await supertest(app).post('/events').send({
      title: 'Festa de Arromba',
      date: '15-12-2020',
      address: 'Rua General Osório',
    });

    EventSchema.findOne({ title: 'Festa de Arromba' });
    done();
  });
});

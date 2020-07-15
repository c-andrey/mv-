import mongoose from 'mongoose';

export class MongooseHelper {
  private db: typeof mongoose | undefined;
  public options: mongoose.ConnectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  };
  constructor(public uri: string) {}

  async start(): Promise<void> {
    try {
      this.db = await mongoose.connect(this.uri, this.options);
    } catch (error) {
      console.error(error);
    }
  }

  async disconnect(): Promise<void> {
    try {
      if (!this.db) {
        console.error('there is no connection');
        return;
      }

      await this.db.connection.close(() => {
        console.log('disconnected from mongodb');
      });
    } catch (error) {
      console.error(error);
    }
  }

  getInstance(): typeof mongoose | undefined {
    return this.db;
  }
}

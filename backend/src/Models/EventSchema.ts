import { Document, model, Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

export interface IEvent extends Document {
  title: string;
  description: string;
  date: Date;
  address: string;
  img?: any;
  createdAt: Date;
}

const EventSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  address: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

EventSchema.plugin(mongoosePaginate);
export const Event = model<IEvent>('Event', EventSchema);

import mongoose, { HydratedDocument } from 'mongoose';
import { State } from './state.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CitySchema = HydratedDocument<City>;

@Schema()
export class City {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: State.name })
  state: State;

  @Prop({ required: true })
  name: string;
}

export const CitySchema = SchemaFactory.createForClass(City);

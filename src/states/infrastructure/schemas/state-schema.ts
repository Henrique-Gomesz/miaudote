import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type StateDocument = HydratedDocument<State>;

@Schema()
export class State {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  acronym: string;

  @Prop({ required: true, type: [String] })
  cities: string[];
}

export const StateSchema = SchemaFactory.createForClass(State);

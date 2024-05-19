import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type StateDocument = HydratedDocument<State>;

@Schema()
export class State {
  @Prop({ required: true })
  name: string;
}

export const StateSchema = SchemaFactory.createForClass(State);

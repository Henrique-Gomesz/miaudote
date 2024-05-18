import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class State {
  @Prop({ required: true })
  name: string;
}

export const StateSchema = SchemaFactory.createForClass(State);

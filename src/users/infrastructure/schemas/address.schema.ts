import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';

export type AddressDocument = HydratedDocument<Address>;

@Schema()
export class Address {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  user: User;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  street: string;

  @Prop({ required: true })
  postalCode: string;

  @Prop({ required: true })
  number: string;

  @Prop({ required: true })
  complement: string;

  @Prop({ required: true })
  neighborhood: string;
}

export const AddressSchema = SchemaFactory.createForClass(Address);

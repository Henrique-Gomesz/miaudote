import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Address, AddressSchema } from './address.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  document: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: false })
  about?: string;

  @Prop({ required: false })
  image?: string;

  @Prop({ type: Date, required: true })
  birthday: Date;

  @Prop({ type: [AddressSchema], default: [] })
  addresses: Types.Array<Address>;
}

export const UserSchema = SchemaFactory.createForClass(User);

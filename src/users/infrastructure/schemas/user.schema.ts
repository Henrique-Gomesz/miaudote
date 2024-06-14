import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Address, AddressSchema } from './address.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, unique: true, type: String })
  document: string;

  @Prop({ required: true, type: String })
  password: string;

  @Prop({ required: true, unique: true, type: String })
  email: string;

  @Prop({ required: true, type: String })
  phone: string;

  @Prop({ required: false, type: String })
  about?: string;

  @Prop({ required: false, type: String })
  image?: string;

  @Prop({ type: Date, required: true })
  birthday: Date;

  @Prop({ type: [AddressSchema], default: [] })
  addresses: Types.Array<Address>;
}

export const UserSchema = SchemaFactory.createForClass(User);

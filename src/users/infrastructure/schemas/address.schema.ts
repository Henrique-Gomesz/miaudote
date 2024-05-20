import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AddressDocument = HydratedDocument<Address>;

@Schema()
export class Address {
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

  @Prop({ required: true })
  main: boolean;
}

export const AddressSchema = SchemaFactory.createForClass(Address);

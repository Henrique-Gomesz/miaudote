import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AddressDocument = HydratedDocument<Address>;

@Schema()
export class Address {
  @Prop({ required: true, type: String })
  city: string;

  @Prop({ required: true, type: String })
  state: string;

  @Prop({ required: true, type: String })
  street: string;

  @Prop({ required: true, type: String })
  postalCode: string;

  @Prop({ required: true, type: String })
  number: string;

  @Prop({ required: true, type: String })
  complement: string;

  @Prop({ required: true, type: String })
  neighborhood: string;

  @Prop({ required: true, type: Boolean })
  main: boolean;
}

export const AddressSchema = SchemaFactory.createForClass(Address);

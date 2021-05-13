import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WeightMeasurementDocument = WeightMeasurement & Document;

@Schema()
export class WeightMeasurement {
  @Prop({ required: true })
  item: string;

  @Prop({ required: true })
  weightInGrams: number;
}

export const WeightMeasurementSchema = SchemaFactory.createForClass(
  WeightMeasurement,
);

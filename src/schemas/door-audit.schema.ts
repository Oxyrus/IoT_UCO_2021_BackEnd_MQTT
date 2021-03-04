import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DoorAuditDocument = DoorAudit & Document;

@Schema()
export class DoorAudit {
  @Prop({ required: true })
  device: string;

  @Prop({ required: true })
  isOpen: boolean;
}

export const DoorAuditSchema = SchemaFactory.createForClass(DoorAudit);

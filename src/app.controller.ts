import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DoorAudit, DoorAuditDocument } from './schemas/door-audit.schema';

@Controller()
export class AppController {
  constructor(
    @Inject('TRIGGER_OPEN_DOOR_SERVICE') private triggerOpenDoorClient: ClientProxy,
    @InjectModel(DoorAudit.name) private auditModel: Model<DoorAuditDocument>) {}

  /**
   * Receives messages published on 'doorstatus' and saves them
   * as logs in the door audits collection.
   * @param data Payload coming in the message
   * @param context RabbitMQ Context containing metadata
   */
  @MessagePattern('doorstatus')
  public async handleTimeRequest(@Payload() data: any, @Ctx() context: RmqContext) {
    const audit = new this.auditModel(data);
    await audit.save();
  }

  /**
   * Receives messages published on 'opendoor' and publishes
   * a message on the 'triggeropendoor' queue to open the door
   */
  @MessagePattern('opendoor')
  public async handle() {
    this.triggerOpenDoorClient.emit<any>('triggeropendoor', {
      'message': 'open the door'
    });
  }
}

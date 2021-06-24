import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DoorAudit, DoorAuditDocument } from './schemas/door-audit.schema';
import {
  WeightMeasurement,
  WeightMeasurementDocument,
} from './schemas/weight-measurement.schema';

@Controller()
export class AppController {
  constructor(
    @Inject('TRIGGER_OPEN_DOOR_SERVICE')
    private triggerOpenDoorClient: ClientProxy,
    @InjectModel(DoorAudit.name) private auditModel: Model<DoorAuditDocument>,
    @InjectModel(WeightMeasurement.name)
    private weightMeasurementModel: Model<WeightMeasurementDocument>,
  ) {}

  /**
   * Receives messages published on 'doorstatus' and saves them
   * as logs in the door audits collection.
   * @param status Payload coming in the message
   */
  @MessagePattern('doorstatus')
  public async handleTimeRequest(@Payload() status: string) {
    const data = {
      device: 'door',
      isOpen: status.toLowerCase() === 'abierto' ? true : false,
    };
    const audit = new this.auditModel(data);
    await audit.save();
  }

  /**
   * Add new handler to save the weight measurement
   * from the devices
   * @param data
   */
  @MessagePattern('weightmeasurement')
  public async handleWeightMeasurement(
    @Payload() data: { item: string; weight: number; datetime: string },
  ) {
    const measurement = new this.weightMeasurementModel({
      item: data.item,
      weightInGrams: data.weight,
      datetime: data.datetime,
    });

    await measurement.save();
  }

  /**
   * Receives messages published on 'opendoor' and publishes
   * a message on the 'triggeropendoor' queue to open the door
   */
  @MessagePattern('opendoor')
  public async handleOpenDoor() {
    this.triggerOpenDoorClient.emit<any>('triggeropendoor', '1');
  }

  /**
   * Receives messages published on 'closedoor' and publishes
   * a message on the 'triggeropendoor' queue to open the door
   */
  @MessagePattern('closedoor')
  public async handleCloseDoor() {
    this.triggerOpenDoorClient.emit<any>('triggeropendoor', '0');
  }

  /**
   * Receives messages published on 'openbox1' and publishes
   * a message on the 'triggeropenbox1' queue to open the box
   */
  @MessagePattern('openbox1')
  public async handleOpenBox1() {
    this.triggerOpenDoorClient.emit<any>('triggeropenbox1', '1');
  }

  /**
   * Receives messages published on 'openbox1' and publishes
   * a message on the 'triggeropenbox1' queue to close the box
   */
  @MessagePattern('closebox1')
  public async handleCloseBox1() {
    this.triggerOpenDoorClient.emit<any>('triggeropenbox1', '0');
  }

  /**
   * Receives messages published on 'openbox2' and publishes
   * a message on the 'triggeropenbox2' queue to open the box
   */
  @MessagePattern('openbox2')
  public async handleOpenBox2() {
    this.triggerOpenDoorClient.emit<any>('triggeropenbox2', '1');
  }

  /**
   * Receives messages published on 'openbox2' and publishes
   * a message on the 'triggeropenbox2' queue to close the box
   */
  @MessagePattern('closebox2')
  public async handleCloseBox2() {
    this.triggerOpenDoorClient.emit<any>('triggeropenbox2', '0');
  }
}

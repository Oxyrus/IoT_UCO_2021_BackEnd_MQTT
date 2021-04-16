import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { mongoDbConfig, mqttConfig } from './config';
import { DoorAudit, DoorAuditSchema } from './schemas/door-audit.schema';

@Module({
  imports: [
    /**
     * Configures the MongoDb connection
     */
    MongooseModule.forRoot(mongoDbConfig.connectionString),
    /**
     * Configures the different Mongoose schemas
     */
    MongooseModule.forFeature([{ name: DoorAudit.name, schema: DoorAuditSchema }]),
    /**
     * Registers a client to send messages to the
     * trigger open door queue
     */
    ClientsModule.register([
      {
        name: 'TRIGGER_OPEN_DOOR_SERVICE',
        transport: Transport.MQTT,
        options: {
          username: mqttConfig.username,
          password: mqttConfig.password,
          url: mqttConfig.url,
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

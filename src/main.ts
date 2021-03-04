import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { doorStatusBroker, openDoorBroker } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * Registers the door status queue
   */
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: doorStatusBroker.urls,
      queue: doorStatusBroker.queue,
    },
  });

  /**
   * Registers the open door queue
   */
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: openDoorBroker.urls,
      queue: openDoorBroker.queue,
    },
  })

  await app.startAllMicroservicesAsync();
  console.log('Microservices up and running');
}
bootstrap();

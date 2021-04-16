import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { mqttConfig } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * Registers the door status queue
   */
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.MQTT,
    options: {
      username: mqttConfig.username,
      password: mqttConfig.password,
      url: mqttConfig.url,
    },
  });

  await app.startAllMicroservicesAsync();
  console.log('Microservices up and running');
}
bootstrap();

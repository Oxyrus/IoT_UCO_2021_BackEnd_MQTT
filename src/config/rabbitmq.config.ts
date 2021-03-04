interface RabbitMQConfig {
  urls: string[];
  queue: string;
}

export const doorStatusBroker: RabbitMQConfig = {
  urls: ['amqp://guest:guest@localhost:5672/mercurio'],
  queue: 'doorstatus',
};

export const openDoorBroker: RabbitMQConfig = {
  urls: ['amqp://guest:guest@localhost:5672/neptuno'],
  queue: 'opendoor',
};

export const triggerOpenDoorBroker: RabbitMQConfig = {
  urls: ['amqp://guest:guest@localhost:5672/mercurio'],
  queue: 'triggeropendoor',
};

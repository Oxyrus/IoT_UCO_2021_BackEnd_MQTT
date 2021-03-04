interface MongoDbConfig {
  connectionString: string;
}

export const mongoDbConfig: MongoDbConfig = {
  connectionString: 'mongodb://localhost:27017/broker',
};

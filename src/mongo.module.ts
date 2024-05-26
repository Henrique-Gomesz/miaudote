import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Env } from './env.types';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        const username = configService.get(Env.MONGO_USERNAME);
        const password = configService.get(Env.MONGO_PASSWORD);
        const database = configService.get(Env.MONGO_DATABASE);
        const host = configService.get(Env.MONGO_HOST);

        return {
          uri: `mongodb+srv://${username}:${password}@${host}`,
          dbName: database,
        };
      },
      inject: [ConfigService],
    }),
  ],
  exports: [MongooseModule],
})
export class MongoModule {}

import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Env } from './env.types';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        const url = configService.get(Env.MONGO_URL) as string;
        const dbName = configService.get(Env.DB_NAME) as string;
        return {
          uri: url,
          dbName,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class MongoModule {}

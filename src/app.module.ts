import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongoModule } from './mongo.module';
import { StatesModule } from './states/states.module';

@Module({
  imports: [MongoModule, UsersModule, StatesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongoModule } from './mongo.module';
import { StatesModule } from './states/states.module';
import { CommonModule } from './common/common-module';
import { AuthModule } from './auth/auth-module';

@Module({
  imports: [CommonModule, MongoModule, AuthModule, StatesModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

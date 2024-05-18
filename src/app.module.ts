import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://admin:adminPass@miaudote.rtjemoz.mongodb.net/?retryWrites=true&w=majority&appName=miaudote')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

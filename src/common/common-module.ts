import { Global, Module } from '@nestjs/common';
import { PasswordService } from './domain/services/credential-service';
import { BcryptPasswordService } from './infrastructure/services/bcrypt-password-service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

const BcryptProvider = {
  provide: PasswordService,
  useClass: BcryptPasswordService,
};

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGO_USERNAME: Joi.string().required(),
        MONGO_PASSWORD: Joi.string().required(),
        MONGO_DATABASE: Joi.string().required(),
        MONGO_HOST: Joi.string().required(),
      }),
    }),
  ],
  providers: [BcryptProvider],
  exports: [BcryptProvider],
})
export class CommonModule {}

import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Env } from 'src/env.types';
import { LoginCommand } from './domain/commands/login-command';
import { AuthService } from './domain/service/auth-service';
import { LoginController } from './infrastructure/controllers/login-controller';
import { JwtAuthService } from './infrastructure/services/jwt-auth-service';

const AuthServiceProvider = {
  provide: AuthService,
  useClass: JwtAuthService,
};

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        signOptions: {
          algorithm: 'HS256',
          expiresIn: '1hr',
          issuer: 'miaudote-service',
          audience: 'mobile-users',
        },
        secret: configService.getOrThrow(Env.JWT_SECRET),
      }),
    }),
  ],
  controllers: [LoginController],
  providers: [LoginCommand, AuthServiceProvider],
  exports: [AuthServiceProvider],
})
export class AuthModule {}

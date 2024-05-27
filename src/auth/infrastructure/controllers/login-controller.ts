import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';

import { ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { LoginCommand } from 'src/auth/domain/commands/login-command';
import { LoginDto } from '../dtos/login-dto';

@Controller()
export class LoginController {
  public constructor(private readonly loginCommand: LoginCommand) {}
  @Post('/login')
  @ApiResponse({
    status: 200,
    description:
      'token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  })
  @ApiResponse({
    status: 401,
    description: 'UNAUTHORIZED',
  })
  public async login(@Res() response: Response, @Body() credentials: LoginDto) {
    this.loginCommand.onSuccess = this.onSuccess(response);
    this.loginCommand.onError = this.onError(response);

    await this.loginCommand.execute(LoginDto.toDomain(credentials));
  }

  public onSuccess(res: Response): LoginCommand['onSuccess'] {
    return (token) => {
      res.status(HttpStatus.OK).send({ token });
    };
  }

  public onError(res: Response): LoginCommand['onError'] {
    return () => {
      res.status(HttpStatus.UNAUTHORIZED).send();
    };
  }
}

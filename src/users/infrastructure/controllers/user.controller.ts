import {
  BadRequestException,
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { CreateUserCommand } from 'src/users/domain/commands/create-user-command';
import { CreateUserDto } from './dtos/create-user-dto';
import { userErrors } from './user-errors';
import { ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';

@Controller('/users')
export class CreateUserController {
  constructor(private readonly createUserCommand: CreateUserCommand) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'successfully saved user',
  })
  @ApiResponse({
    status: 400,
    description: 'something went wrong',
  })
  async createUser(
    @Res() response: Response,
    @Body() user: CreateUserDto,
  ): Promise<void> {
    this.createUserCommand.onError = this.onError(response);
    this.createUserCommand.onSuccess = this.onSuccess(response);

    await this.createUserCommand.execute(CreateUserDto.toDomain(user));
  }

  private onSuccess(res: Response): CreateUserCommand['onSuccess'] {
    return () => {
      return res.status(HttpStatus.CREATED).send();
    };
  }

  private onError(res: Response): CreateUserCommand['onError'] {
    return () => {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send(userErrors.createUserError);
    };
  }
}

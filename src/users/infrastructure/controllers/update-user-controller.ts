import { Body, Controller, HttpStatus, Put, Res } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { UpdateUserCommand } from 'src/users/domain/commands/update-user-command';
import { UpdateUserDTO } from './dtos/update-user-dto';
import { userErrors } from './user-errors';

@Controller('/user')
export class UpdateUserController {
  constructor(private readonly updateUserCommand: UpdateUserCommand) {}

  @Put()
  @ApiResponse({
    status: 200,
    description: 'successfully updated user',
  })
  @ApiResponse({
    status: 400,
    description: 'something went wrong',
  })
  async updateUser(@Res() response: Response, @Body() updateUser: UpdateUserDTO): Promise<void> {
    this.updateUserCommand.onSuccess = this.onSuccess(response);
    this.updateUserCommand.onError = this.onError(response);

    var id = '6652ba09139a5bd6e64750c6';

    this.updateUserCommand.execute(UpdateUserDTO.toDomain(updateUser), id);
  }

  private onSuccess(res: Response): UpdateUserCommand['onSuccess'] {
    return () => {
      return res.status(HttpStatus.OK).send(res);
    };
  }

  private onError(res: Response): UpdateUserCommand['onError'] {
    return () => {
      return res.status(HttpStatus.BAD_REQUEST).send(userErrors.updateUserError);
    };
  }
}

import { Body, Controller, HttpStatus, Put, Res, UseGuards } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthorizationGuard } from 'src/auth/infrastructure/guard/authorization-guard';
import { UserPayloadDecorator } from 'src/decorators/user-payload-decorator';
import { UpdateUserCommand } from 'src/users/domain/commands/update-user-command';
import { UpdateUserDTO } from './dtos/update-user-dto';
import { userErrors } from './user-errors';
import { UserPayload } from 'src/auth/domain/entities/AuthenticatedUser';
import { UpdateUserResponse } from './response/update-user-response';

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
  @UseGuards(AuthorizationGuard)
  async updateUser(
    @Res() response: Response,
    @Body() updateUser: UpdateUserDTO,
    @UserPayloadDecorator() userPayload: UserPayload,
  ): Promise<any> {
    this.updateUserCommand.onSuccess = this.onSuccess(response);
    this.updateUserCommand.onError = this.onError(response);

    this.updateUserCommand.execute(UpdateUserDTO.toDomain(updateUser), userPayload.id);
  }

  private onSuccess(res: Response): UpdateUserCommand['onSuccess'] {
    return (user) => {
      return res.status(HttpStatus.OK).send(UpdateUserResponse.toResponse(user));
    };
  }

  private onError(res: Response): UpdateUserCommand['onError'] {
    return () => {
      return res.status(HttpStatus.BAD_REQUEST).send(userErrors.updateUserError);
    };
  }
}

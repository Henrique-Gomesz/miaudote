import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { ListStatesCommand } from 'src/states/domain/commands/list-states-command';

@Controller()
export class ListStatesController {
  public constructor(private readonly listStatesCommand: ListStatesCommand) {}

  @Get('/states')
  async listStates(@Res() response: Response) {
    this.listStatesCommand.onSuccess = this.onSuccess(response);
    this.listStatesCommand.onError = this.onError(response);

    await this.listStatesCommand.execute();
  }

  public onSuccess(response: Response): ListStatesCommand['onSuccess'] {
    return (states) => {
      response.status(HttpStatus.OK).send({ states });
    };
  }

  public onError(response: Response): ListStatesCommand['onError'] {
    return () => {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    };
  }
}

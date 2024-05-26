import { Injectable } from '@nestjs/common';
import { noop } from 'lodash';

@Injectable()
export class LoginCommand {
  public constructor() {}

  public onSuccess: (token: string) => void = noop;
  public onError: () => void = noop;

  public async execute(): Promise<void> {}
}

import { Option } from 'fp-ts/lib/Option';

export class UpdateUser {
  public constructor(
    public name: Option<string>,
    public birthday: Option<string>,
    public about: Option<string>,
    public image: Option<string>,
  ) {}
}

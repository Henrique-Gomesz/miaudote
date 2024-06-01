import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString, MaxLength, Validate } from 'class-validator';
import { BirthdayValidation } from '../validations/birthday-validation';
import { UpdateUser } from 'src/users/domain/entities/user-update';
import { none, Option, some } from 'fp-ts/lib/Option';

export class UpdateUserDTO {
  @ApiProperty()
  @IsString()
  @IsOptional()
  @MaxLength(120)
  name?: string;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  @Validate(BirthdayValidation)
  birthday?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  image?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  about?: string;

  public static toDomain(updateUser: UpdateUserDTO): UpdateUser {
    const updatedUser = new UpdateUser(
      updateUser.name ? some(updateUser.name) : none,
      updateUser.birthday ? some(updateUser.birthday) : none,
      updateUser.about ? some(updateUser.about) : none,
      updateUser.image ? some(updateUser.image) : none,
    );

    return updatedUser;
  }
}

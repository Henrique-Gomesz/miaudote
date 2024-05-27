import {
  IsDateString,
  IsEmail,
  IsPhoneNumber,
  IsString,
  MaxLength,
  Validate,
  ValidateNested,
} from 'class-validator';
import { Document } from 'src/common/domain/entities/document';
import { User } from 'src/users/domain/entities/user';
import { DocumentValidation } from '../validations/document-validation';
import { ApiProperty } from '@nestjs/swagger';
import { CreateUserAddressDto } from './create-user-address-dto';
import { Type } from 'class-transformer';
import { CredentialValidation } from '../validations/credential-validation';
import { BirthdayValidation } from '../validations/birthday-validation';
import { none } from 'fp-ts/lib/Option';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @MaxLength(120)
  name: string;

  @ApiProperty()
  @Validate(DocumentValidation)
  document: string;

  @ApiProperty()
  @IsString()
  @Validate(CredentialValidation)
  password: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @IsPhoneNumber('BR')
  phone: string;

  @ApiProperty()
  @IsDateString()
  @Validate(BirthdayValidation)
  birthday: string;

  @ApiProperty({ type: CreateUserAddressDto })
  @ValidateNested()
  @Type(() => CreateUserAddressDto)
  address: CreateUserAddressDto;

  public static toDomain(createUserDto: CreateUserDto): User {
    const user = new User(
      createUserDto.name,
      new Document(createUserDto.document),
      createUserDto.password,
      createUserDto.email,
      createUserDto.phone,
      new Date(createUserDto.birthday),
      [CreateUserAddressDto.toDomain(createUserDto.address)],
      none,
      none,
      none,
    );

    return user;
  }
}

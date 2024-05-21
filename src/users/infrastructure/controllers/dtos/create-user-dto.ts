import {
  IsDateString,
  IsEmail,
  IsString,
  MaxLength,
  Validate,
  ValidateNested,
} from 'class-validator';
import { Document } from 'src/common/entities/document';
import { User } from 'src/users/domain/entities/user';
import { DocumentValidation } from '../validations/document-validation';
import { ApiProperty } from '@nestjs/swagger';
import { CreateUserAddressDto } from './create-user-address-dto';
import { Type } from 'class-transformer';
import { CredentialValidation } from '../validations/credential-validation';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @MaxLength(80)
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
  phone: string;

  @ApiProperty()
  @IsString()
  @MaxLength(520)
  about: string;

  @ApiProperty()
  @IsString()
  image: string;

  @ApiProperty()
  @IsDateString()
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
      createUserDto.about,
      createUserDto.image,
      new Date(createUserDto.birthday),
      [CreateUserAddressDto.toDomain(createUserDto.address)],
    );

    return user;
  }
}

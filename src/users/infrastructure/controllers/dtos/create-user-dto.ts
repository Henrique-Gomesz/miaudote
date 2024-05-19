import {
  IsDateString,
  IsEmail,
  IsString,
  MaxLength,
  Validate,
} from 'class-validator';
import { Document } from 'src/common/entities/document';
import { User } from 'src/users/domain/entities/user';
import { DocumentValidation } from '../validations/document-validation';
import { ApiProperty } from '@nestjs/swagger';

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
    );

    return user;
  }
}

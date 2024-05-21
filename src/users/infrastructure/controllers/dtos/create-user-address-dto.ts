import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';
import { Address } from 'src/users/domain/entities/address';

export class CreateUserAddressDto {
  @ApiProperty()
  @IsString()
  @MaxLength(80)
  city: string;

  @ApiProperty()
  @IsString()
  @MaxLength(80)
  state: string;

  @ApiProperty()
  @IsString()
  @MaxLength(80)
  street: string;

  @ApiProperty()
  @IsString()
  @MaxLength(8)
  postalCode: string;

  @ApiProperty()
  @IsString()
  @MaxLength(80)
  number: string;

  @ApiProperty()
  @IsString()
  @MaxLength(80)
  complement: string;

  @ApiProperty()
  @IsString()
  @MaxLength(80)
  neighborhood: string;

  public static toDomain(createUserAddressDto: CreateUserAddressDto): Address {
    const address = new Address(
      createUserAddressDto.city,
      createUserAddressDto.state,
      createUserAddressDto.street,
      createUserAddressDto.postalCode,
      createUserAddressDto.number,
      createUserAddressDto.complement,
      createUserAddressDto.neighborhood,
      true,
    );

    return address;
  }
}

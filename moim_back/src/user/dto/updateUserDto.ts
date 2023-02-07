import {
  IsByteLength,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class UpdateUserDto {
  @IsNumber()
  userId: number;

  @IsString()
  @IsByteLength(2, 35)
  @IsOptional()
  userName: string;

  @IsString()
  @IsByteLength(2, 35)
  @IsOptional()
  userNickName: string;

  @IsUrl()
  @IsByteLength(10, 100)
  @IsOptional()
  userProfilePhoto: string;

  @IsNumber()
  @IsOptional()
  userLevel: number;

  @IsString()
  @IsByteLength(0, 200)
  @IsOptional()
  userTitle: string;
}

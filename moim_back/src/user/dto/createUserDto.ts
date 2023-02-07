import { IsByteLength, IsNumber, IsString, IsUrl } from 'class-validator';

export class CreateUserDto {
  @IsNumber()
  userId: number;

  @IsString()
  @IsByteLength(2, 35)
  userName: string;

  @IsString()
  @IsByteLength(2, 35)
  userNickName: string;

  @IsUrl()
  @IsByteLength(10, 100)
  userProfilePhoto: string;

  @IsNumber()
  userLevel: number;

  @IsString()
  @IsByteLength(0, 200)
  userTitle: string;
}

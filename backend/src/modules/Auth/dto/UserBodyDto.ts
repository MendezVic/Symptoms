import { IsNotEmpty, IsIn } from 'class-validator';

export class LoginBodyDto {
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  password: string;
}

export class SignUpBodyDto extends LoginBodyDto {
  id?: number;
  @IsNotEmpty()
  fullName: string;
  @IsNotEmpty()
  @IsIn(['male', 'female'])
  gender: string;
  @IsNotEmpty()
  dateOfBirth: string;
}

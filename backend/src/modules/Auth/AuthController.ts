import {
  BadRequestError,
  Body,
  JsonController,
  Post,
  Req,
  Res,
  UnauthorizedError,
} from 'routing-controllers';
import { Request, Response } from 'express';
import { LoginBodyDto, SignUpBodyDto } from './dto/UserBodyDto';
import AuthService from './AuthService';
import ApiMedicService from '../ApiMedic/ApiMedicService';

@JsonController('/auth')
export class AuthController {
  private apiMedicService: ApiMedicService;
  private authService: AuthService;
  constructor() {
    this.apiMedicService = new ApiMedicService();
    this.authService = new AuthService();
  }
  @Post('/login')
  async login(
    @Req() request: Request,
    @Res() response: Response,
    @Body({ validate: true }) body: LoginBodyDto
  ) {
    const { email } = body;
    const user = await this.authService.findByEmail(email);

    if (!user) throw new BadRequestError('User Dont Exist');

    const isValid = await user.isValidPassword(body.password);

    if (!isValid) throw new UnauthorizedError('Invalid Password');
    await this.apiMedicService.saveNewToken();
    return {
      message: 'Login Succesful',
      token: this.authService.genToken(user),
    };
  }
  @Post('/signup')
  async signup(
    @Req() request: Request,
    @Res() response: Response,
    @Body() body: SignUpBodyDto
  ) {
    const { email } = body;
    const userExist = await this.authService.findByEmail(email);
    if (userExist) throw new BadRequestError('User already exist');

    const user = await this.authService.create(body);
    await this.apiMedicService.saveNewToken();
    return {
      message: 'User created',
      token: this.authService.genToken(user),
    };
  }
}

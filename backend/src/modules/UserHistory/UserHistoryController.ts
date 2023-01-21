import {
  Authorized,
  CurrentUser,
  Get,
  JsonController,
  Param,
  Post,
} from 'routing-controllers';

import { SignUpBodyDto } from '../Auth/dto/UserBodyDto';
import UserHistoryService from './UserHistoryService';

@JsonController('/userhistory')
export class ApiMedicController {
  private userHistoryService: UserHistoryService;

  constructor() {
    this.userHistoryService = new UserHistoryService();
  }
  @Authorized()
  @Get('/')
  async getUserHistory(@CurrentUser() user: SignUpBodyDto) {
    return this.userHistoryService.findByUserId(user.id);
  }
  @Authorized()
  @Post('/confirm/:id')
  async confirmDiagnosis(@Param('id') id: number) {
    return this.userHistoryService.confirmDiagnosis(id);
  }
}

import {
  Authorized,
  CurrentUser,
  Get,
  HttpError,
  JsonController,
  QueryParam,
} from 'routing-controllers';
import ApiMedicService from './ApiMedicService';
import { SignUpBodyDto } from '../Auth/dto/UserBodyDto';

@JsonController('/apimedic')
export class ApiMedicController {
  private apiMedicService: ApiMedicService;
  constructor() {
    this.apiMedicService = new ApiMedicService();
  }
  @Authorized()
  @Get('/symptoms')
  async getSymptoms(
    @QueryParam('symptoms', { isArray: true })
    symptoms
  ) {
    try {
      return await this.apiMedicService.getSymptoms(symptoms);
    } catch (e) {
      if (e.name === 'AxiosError') {
        throw new HttpError(e.response.status, e.response.data);
      }
    }
  }
  @Authorized()
  @Get('/diagnosis')
  async getDiagnosis(
    @QueryParam('symptoms', { isArray: true, required: true })
    symptoms,
    @CurrentUser() user: SignUpBodyDto
  ) {
    try {
      return await this.apiMedicService.getDiagnosis(symptoms, user);
    } catch (e) {
      if (e.name === 'AxiosError') {
        throw new HttpError(e.response.status, e.response.data);
      }
    }
  }
}

import axios, { AxiosInstance } from 'axios';
import ApiMedicApi from '../../config/config';
import crypto from 'crypto';
import myCache from '../../utils/node-cache';
import { SymptomDto } from './dto/ApiMedicDto';
import { SignUpBodyDto } from '../Auth/dto/UserBodyDto';
import UserHistoryService from '../UserHistory/UserHistoryService';
import { UserHistoryDto } from '../UserHistory/dto/UserHistoryDto';

const APIMEDIC_TOKEN = 'APIMEDIC_TOKEN';

class ApiMedicService {
  private restClientAuth: AxiosInstance;
  private restClientHealth: AxiosInstance;
  private userHistoryService: UserHistoryService;
  private async getToken() {
    const token = myCache.get(APIMEDIC_TOKEN);
    if (token === undefined) {
      await this.saveNewToken();
      return await this.getToken();
    }
    return token;
  }
  public async saveNewToken() {
    const { data } = await this.restClientAuth.post('/login');
    myCache.set(APIMEDIC_TOKEN, data.Token, data.ValidThrough);
  }
  constructor() {
    const secretHash = crypto
      .createHmac('md5', ApiMedicApi.password)
      .update(ApiMedicApi.authUrl + '/login')
      .digest('base64');
    this.restClientAuth = axios.create({
      baseURL: ApiMedicApi.authUrl,
      headers: {
        Authorization: `Bearer ${ApiMedicApi.username}:${secretHash}`,
      },
    });

    const restClientHealth = axios.create({
      baseURL: ApiMedicApi.healthUrl,
      params: { language: 'en-gb', token: myCache.get(APIMEDIC_TOKEN) },
    });
    restClientHealth.interceptors.response.use(
      response => response,
      async error => {
        const {
          config,
          response: { data },
        } = error;
        const originalRequest = config;

        if (data === 'Invalid token' || data === 'Missing or invalid token') {
          originalRequest.params['token'] = await this.getToken();
          return axios(originalRequest);
        }
      }
    );
    this.restClientHealth = restClientHealth;
    this.userHistoryService = new UserHistoryService();
  }

  async getSymptoms(symptoms = []): Promise<SymptomDto[]> {
    const { data } = await this.restClientHealth.get(
      '/symptoms',
      symptoms.length > 0 && {
        params: {
          symptoms: `[${[...symptoms]}]`,
        },
      }
    );
    return data;
  }
  async getSymptomsName(symptoms = []): Promise<string> {
    const { data } = await this.restClientHealth.get(
      '/symptoms',
      symptoms.length > 0 && {
        params: {
          symptoms: `[${[...symptoms]}]`,
        },
      }
    );
    return data.map(({ Name }) => Name).join(',');
  }
  async getDiagnosis(
    symptoms: number[],
    user: SignUpBodyDto
  ): Promise<UserHistoryDto[]> {
    console.log(symptoms, user.gender, user.dateOfBirth);
    const symptomsName = await this.getSymptomsName(symptoms);
    const { data } = await this.restClientHealth.get(`/diagnosis`, {
      params: {
        symptoms: `[${[...symptoms]}]`,
        gender: user.gender,
        year_of_birth: user.dateOfBirth.slice(0, 4),
      },
    });

    return await this.userHistoryService.saveDiagnosis(
      user.id,
      symptomsName,
      data
    );
  }
}
export default ApiMedicService;

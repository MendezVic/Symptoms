import { DiagnosisDto } from '../../ApiMedic/dto/ApiMedicDto';

export class UserHistoryDto {
  confirmed: number;
  id: number;
  user_id: number;
  symptoms: string;
  diagnosis: DiagnosisDto;
}

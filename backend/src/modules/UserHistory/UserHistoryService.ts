import { UserHistory } from './entities/UserHistoryEntity';
import { DiagnosisDto } from '../ApiMedic/dto/ApiMedicDto';
import { UserHistoryDto } from './dto/UserHistoryDto';

class UserHistoryService {
  async findByUserId(id): Promise<UserHistoryDto[]> {
    return await UserHistory.findAll({
      where: { user_id: id },
      raw: true,
    });
  }
  async confirmDiagnosis(id): Promise<UserHistoryDto> {
    const userDiagnosis = await UserHistory.findOne({ where: { id } });
    userDiagnosis.confirmed = 1;
    await userDiagnosis.save();

    return userDiagnosis;
  }
  async saveDiagnosis(
    user_id: number,
    symptomsName: string,
    diagnoses: DiagnosisDto
  ): Promise<UserHistoryDto[]> {
    const saved = [];
    for (const i in diagnoses) {
      const newDiagnosis = await UserHistory.create({
        user_id,
        symptoms: symptomsName,
        diagnosis: diagnoses[i],
      });
      saved.push(newDiagnosis.get({ plain: true }));
    }

    return saved;
  }
}

export default UserHistoryService;

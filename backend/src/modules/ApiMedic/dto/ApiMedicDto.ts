export class SymptomDto {
  id: number;
  Name: string;
}
export class IssueDto {
  ID: number;
  Name: string;
  ProfName: string;
  Icd: string;
  IcdName: string;
  Accuracy: number;
}
export class SpecialisationDto {
  ID: number;
  Name: string;
  SpecialistID: number;
}
export class DiagnosisDto {
  Issue: IssueDto;
  Specialisaiton: SpecialisationDto;
}

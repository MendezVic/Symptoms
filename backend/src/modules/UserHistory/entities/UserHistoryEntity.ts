import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { DiagnosisDto } from '../../ApiMedic/dto/ApiMedicDto';
import { Users } from '../../Auth/entities/usersEntity';

@Table({ underscored: true, tableName: 'users_history' })
export class UserHistory extends Model {
  @AllowNull(false)
  @AutoIncrement
  @PrimaryKey
  @Column({ type: DataType.BIGINT.UNSIGNED })
  id: number;

  @AllowNull(false)
  @ForeignKey(() => Users)
  @Column({ type: DataType.BIGINT.UNSIGNED })
  user_id: number;

  @BelongsTo(() => Users)
  user: Users;

  @AllowNull(false)
  @Column({ type: DataType.STRING })
  symptoms: string;

  @AllowNull(false)
  @Column({ type: DataType.JSON })
  diagnosis: DiagnosisDto;

  @AllowNull(false)
  @Column({ type: DataType.TINYINT, defaultValue: 0 })
  confirmed: number;

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;
}

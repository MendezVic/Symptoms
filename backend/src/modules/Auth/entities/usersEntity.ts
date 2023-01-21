import {
  AllowNull,
  AutoIncrement,
  Column,
  CreatedAt,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import bcryptjs from 'bcryptjs';
import { UserHistory } from '../../UserHistory/entities/UserHistoryEntity';

@Table({ underscored: true })
export class Users extends Model {
  @AllowNull(false)
  @AutoIncrement
  @PrimaryKey
  @Column({ type: DataType.BIGINT.UNSIGNED })
  id: number;

  @AllowNull(false)
  @Column({ type: DataType.STRING })
  fullName: string;

  @AllowNull(false)
  @Column({ type: DataType.STRING })
  gender: string;

  @AllowNull(false)
  @Column({ type: DataType.DATE })
  dateOfBirth: string;

  @AllowNull(false)
  @Column({ type: DataType.STRING })
  email: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  password: string;

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;

  @HasMany(() => UserHistory)
  user_history: UserHistory[];

  async isValidPassword(password: string) {
    return await bcryptjs.compare(password, this.password);
  }
}

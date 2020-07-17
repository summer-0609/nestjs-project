import {
  Column,
  Model,
  Table,
  Unique,
  IsEmail,
  PrimaryKey,
  DataType,
  IsUUID,
  Default,
} from 'sequelize-typescript';
import { hashSync, genSaltSync } from 'bcryptjs';

@Table({
  freezeTableName: true,
  tableName: 'users',
})
export class Users extends Model<Users> {
  @PrimaryKey
  @IsUUID(4)
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
  })
  id: string;

  @Unique
  @IsEmail
  @Column({
    comment: '邮箱',
  })
  email: string;

  @Column({
    comment: '用户名',
  })
  username: string;

  @Column
  get password(): string {
    return this.getDataValue('password');
  }
  set password(value: string) {
    this.setDataValue('password', hashSync(value, genSaltSync(10)));
  }

  @Column
  phone: string;
}

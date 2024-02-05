import { Column, DataType, Default, Model, Table } from 'sequelize-typescript';
import { RolesEnum } from '../enums/user.role';

@Table({ tableName: 'users' })
export default class User extends Model<User> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: true })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email: string;

  @Column({ type: DataType.STRING, allowNull: true })
  password: string;

  @Default(RolesEnum.USER)
  @Column({
    type: DataType.ENUM(...Object.values(RolesEnum)),
  })
  role: RolesEnum;
}

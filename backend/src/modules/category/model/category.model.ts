import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'categories' })
export default class CategoryModel extends Model<CategoryModel> {
  @Column({
    type: DataType.STRING,
    unique: true,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;
}

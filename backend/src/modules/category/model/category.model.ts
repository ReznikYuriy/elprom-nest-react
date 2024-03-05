import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import ProductModel from 'src/modules/product/model/product.model';

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

  @HasMany(() => ProductModel)
  products: ProductModel[];
}

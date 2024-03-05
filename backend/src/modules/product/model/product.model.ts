import {
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import CategoryModel from 'src/modules/category/model/category.model';
import DiscountInterface from '../interface/discount.interface';

@Table({ tableName: 'products' })
export default class ProductModel extends Model<ProductModel> {
  @Column({
    type: DataType.STRING,
    unique: true,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
  })
  product_id_1C: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  tags: string;

  @ForeignKey(() => CategoryModel)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  category_id: string;

  @Default([])
  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: false,
  })
  images: string[];

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: true,
  })
  price: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  quantity: number;

  @Column({
    type: DataType.ARRAY(DataType.JSONB),
    allowNull: true,
  })
  discounts: DiscountInterface[];

  @BelongsTo(() => CategoryModel)
  category: CategoryModel;
}
/* [ProductKey.DISCOUNT_QUANTITY_1]: number;
    [ProductKey.DISCOUNT_1]: number;
    [ProductKey.DISCOUNT_QUANTITY_2]: number;
    [ProductKey.DISCOUNT_2]: number;
    */

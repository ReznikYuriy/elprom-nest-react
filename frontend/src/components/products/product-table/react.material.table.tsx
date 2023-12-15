import React, { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import { IProduct } from '../../../common/interfaces';
import { useParams } from 'react-router-dom';
//import { useSelector } from 'react-redux';
//import { RootState } from '../../../store/types';
import { productsToTableData } from './helpers/helper';


const MatTable: React.FC<{ products: IProduct[] }> = ({ products }) => {

  /* const categories = useSelector(
    (state: RootState) => (state.categoryReducer.categories),
  ); */
  const { id } = useParams<{ id: string }>();
  const data = useMemo(() => productsToTableData(products, id), [products, id]);

  const columns = useMemo<MRT_ColumnDef<Partial<IProduct>>[]>(

    () => [

      {

        accessorKey: 'name',

        header: 'Наименование',

        size: 150,

      },

      {

        accessorKey: 'quantity',

        header: 'Доступно к заказу, шт',

        size: 150,

      },

      {

        accessorKey: 'price', //normal accessorKey

        header: 'Цена, грн',

        size: 200,

      },


    ],

    [],

  );

  const table = useMaterialReactTable({ columns, data, });

  //const activeCategoryName = id ? (getCurrentCategoryById(categories, id))?.name || 'Все товары' : 'Все товары';

  return <>
    <MaterialReactTable table={table} />
  </>;
};

export default MatTable;

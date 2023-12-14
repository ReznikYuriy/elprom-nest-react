import React, { useMemo } from 'react';

import {

  MaterialReactTable,

  useMaterialReactTable,

  type MRT_ColumnDef,

} from 'material-react-table';
import { IProduct } from '../../../common/interfaces';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/types';
import { getCurrentCategoryById } from '../../../common/helpers/get.current.category';
import { Helmet } from 'react-helmet';
import { productsToTableData } from './helpers/helper';


const MatTable: React.FC<{ products: IProduct[] }> = ({ products }) => {


  const categories = useSelector(
    (state: RootState) => (state.categoryReducer.categories),
  );

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


  const table = useMaterialReactTable({

    columns,

    data,
  });

  /* let activeCategoryName = null;
  if (!id) activeCategoryName = 'Все товары';

  if (!activeCategoryName) {
    const currentCategory: ICategory | undefined = getCurrentCategoryById(categories, id || '');
    if (currentCategory === undefined) return <BackdropComponent />;
    if (currentCategory!.name !== undefined) activeCategoryName = currentCategory!.name;
  } */
  const activeCategoryName = id ? (getCurrentCategoryById(categories, id))?.name || 'Все товары' : 'Все товары';

  return <>
    {/* <Helmet>
      <title>{activeCategoryName} Electroprom</title>
      <meta name="description" content={`${activeCategoryName} Electroprom`} />
      <meta name="keywords" content={`${activeCategoryName}, купить ${activeCategoryName}, ${activeCategoryName} Украина, ${activeCategoryName} el-prom`} />
    </Helmet> */}
    <MaterialReactTable table={table} />;
  </>;
};

export default MatTable;

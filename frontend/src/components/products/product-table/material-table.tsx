import React from 'react';
import MaterialTable from 'material-react-table';
import { ICategory, IProduct } from '../../../common/interfaces';
import { Link, useParams } from 'react-router-dom';
import { productsToTableData } from './helpers/helper';
import { useSelector } from 'react-redux';
import { localization } from './helpers/localization';
import { IconButton, Tooltip } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { Helmet } from 'react-helmet';
import BackdropComponent from '../../backdrop-component/backdrop-component';
import { getCurrentCategoryById } from '../../../common/helpers/get.current.category';
import { RootState } from '../../../store/types';
import { RouteEnum } from '../../../common/enums/route.enum';
import { useMemo } from 'react';
import {
  MRT_Table, //import alternative sub-component if we do not want toolbars
  type MRT_ColumnDef,
  useMaterialReactTable,
} from 'material-react-table';

const MatTable: React.FC<{ products: IProduct[] }> = ({ products }) => {
  const { categories } = useSelector(
    ({ categories }: RootState) => ({
      categories: categories.categories,
    }),
  );
  const { id } = useParams<{ id: string }>();

  let activeCategoryName = null;
  if (!id) activeCategoryName = 'Все товары';

  if (!activeCategoryName) {
    const currentCategory: ICategory | undefined = getCurrentCategoryById(categories, id || '');
    if (currentCategory === undefined) return <BackdropComponent />;
    if (currentCategory!.name !== undefined) activeCategoryName = currentCategory!.name;
  }

  /* const tableData = productsToTableData(products, id);

  const columns = useMemo<MRT_ColumnDef<IProduct>[]>();


  const table = useMaterialReactTable({

    columns,

    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)

    enableColumnActions: false,

    enableColumnFilters: false,

    enablePagination: false,

    enableSorting: false,

    mrtTheme: (theme) => ({

      baseBackgroundColor: theme.palette.background.default, //change default background color

    }),

    muiTableBodyRowProps: { hover: false },

    muiTableProps: {

      sx: {

        border: '1px solid rgba(81, 81, 81, .5)',

      },

    },

    muiTableHeadCellProps: {

      sx: {

        border: '1px solid rgba(81, 81, 81, .5)',

        fontStyle: 'italic',

        fontWeight: 'normal',

      },

    },

    muiTableBodyCellProps: {

      sx: {

        border: '1px solid rgba(81, 81, 81, .5)',

      },

    },

  }); */

  return <>
    <Helmet>
      <title>{activeCategoryName} Electroprom</title>
      <meta name="description" content={`${activeCategoryName} Electroprom`} />
      <meta name="keywords" content={`${activeCategoryName}, купить ${activeCategoryName}, ${activeCategoryName} Украина, ${activeCategoryName} el-prom`} />
    </Helmet>
    {/* <MaterialTable
      title={activeCategoryName}
      localization={localization}
      columns={[
        {
          field: 'imagePath',
          render: function renderAvatar(rowData: Partial<IProduct>) {
            return <img src={`/images/${rowData.imagepath}`} style={{ width: 50, borderRadius: '15%' }} alt={rowData.id} />;
          },
          cellStyle: {
            textAlign: 'center',
          },
        },
        { title: 'Наименование', field: 'name', defaultSort: 'asc' },
        { title: 'Доступно к заказу, шт', field: 'quantity', type: 'numeric' },
        {
          title: 'Цена, грн', field: 'price', type: 'numeric',
          cellStyle: {
            width: 10,
            minWidth: 10,
          },
          headerStyle: {
            width: 10,
            minWidth: 10,
          },
        },
        {
          render: function DetailsLink(rowData: Partial<IProduct>) {
            return (
              <Tooltip title="Подробно о товаре">
                <IconButton
                  color="inherit"
                  component={Link}
                  to={RouteEnum.PRODUCT_DETAILS + rowData.id}
                  size="large"><InfoIcon /></IconButton>
              </Tooltip>
            );
          },
          cellStyle: {
            width: 10,
            minWidth: 10,
            textAlign: 'center',
          },
          headerStyle: {
            width: 10,
            minWidth: 10,
          },
        },
        
      ]}
      data={tableData}
    /> */}
    {/* <MRT_Table table={table} /> */}
  </>;
};

export { MatTable };


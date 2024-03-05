import React from 'react';
import { useParams } from 'react-router-dom';
import { productsToTableData } from './helpers/formatProductsToTableData';
import { RootState } from '../../store/types';
import { useDispatch, useSelector } from 'react-redux';
import { ProductsActionCreator } from '../../store/slices';
import { DataStatus } from '../../store/enum';
import BackdropComponent from '../backdrop-component/backdrop-component';
import { Stack } from '@mui/system';
import { Button, Card, CardActionArea, CardMedia, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { RouteEnum } from '../../common/enums';
import { metaAdder } from '../../common/helpers/meta.adder';

const MatTable: React.FC = () => {

  const products = useSelector(
    (state: RootState) => (state.productReducer.products),
  );
  const dataStatusProd = useSelector(
    (state: RootState) => (state.productReducer.dataStatus),
  );
  const activeCategory = useSelector(
    (state: RootState) => (state.productReducer.activeCategory),
  );
  const searchInputText = useSelector(
    (state: RootState) => (state.productReducer.searchInputText),
  );
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  React.useEffect(() => {
    document.title = `${activeCategory.name} Electroprom`;
    metaAdder(`name="description"`, `${activeCategory.name} Electroprom`);
    metaAdder(`name="keywords"`, `${activeCategory.name}, купить ${activeCategory.name}, ${activeCategory.name} Украина, ${activeCategory.name} el-prom`);

    dispatch<any>(ProductsActionCreator.getProductsAsync(id!));
    if (!activeCategory) {
      dispatch<any>(ProductsActionCreator.setActiveCategoryAsync(id!));
    }
  }, [dispatch, activeCategory, id]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const data = productsToTableData(products);

  if (dataStatusProd === DataStatus.PENDING || !products) {
    return <BackdropComponent />;
  }
  return (
    <Stack sx={{ m: '2rem 0' }}>

      <Typography variant="h5">{searchInputText ? "Результаты поиска:" : activeCategory.name}</Typography>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="center"></TableCell>
                <TableCell align="center">Наименование</TableCell>
                <TableCell align="right">Доступно к заказу&nbsp;(шт)</TableCell>
                <TableCell align="right">Цена&nbsp;(грн)</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  const defaultImg = (row?.images && row?.images[0]) ? `/images/${row?.images[0]}` : '/images/1x1.gif';
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      <TableCell>
                        <Card sx={{ maxWidth: 50, borderRadius: '15%' }}>
                          <CardActionArea component={RouterLink} to={RouteEnum.PRODUCT_DETAILS + row?.id} >
                            <CardMedia
                              component="img"
                              image={defaultImg}
                              alt={row?.name}
                            />
                          </CardActionArea>
                        </Card>
                      </TableCell>
                      <TableCell align='left' >
                        <Button sx={{ color: "#4b4c4c" }} component={RouterLink} to={RouteEnum.PRODUCT_DETAILS + row?.id}>
                          {row?.name}
                        </Button>
                      </TableCell>
                      <TableCell align='right'>
                        {row?.quantity}
                      </TableCell>
                      <TableCell align='right'>
                        {row?.price}
                      </TableCell>

                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 50]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Stack>
  );

};

export default MatTable;

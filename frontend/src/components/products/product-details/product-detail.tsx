import React from 'react';
import { Card, CardHeader, CardContent, IconButton, SvgIcon, Stack, Box, CardActions, CardMedia, CardActionArea, Divider, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import BackdropComponent from '../../backdrop-component/backdrop-component';
import { RootState } from '../../../store/types';
import { metaAdder } from '../../../common/helpers/meta.adder';
import { ProductsActionCreator } from '../../../store/slices';
import { IProduct } from '../../../common/interfaces';
import NotFound from '../../not-found/not-found';
interface IProps {
  product: IProduct;
}

const PhotoCard: React.FC<IProps> = ({ product }) => {
  return (
    <Card sx={{ maxWidth: 500 }}>
      <CardMedia
        component="img"
        height="500"
        image='/images/1x1.gif'
        alt="Paella dish"
      />
      <Stack
        direction={'row'}
        //spacing={4}
        justifyContent='space-around'
        padding={3}
      >
        <ActionAreaCard />
        <ActionAreaCard />
        <ActionAreaCard />
        <ActionAreaCard />
      </Stack>
    </Card>);
}
const ActionAreaCard = () => {
  return (
    <Card sx={{ maxWidth: 50 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="50"
          image="/images/1x1.gif"
          alt="green iguana"
        />

      </CardActionArea>
    </Card>
  );
}
const DescriptionCard: React.FC<IProps> = ({ product }) => {
  const navigate = useNavigate();
  return (
    <Box sx={{ minWidth: 300 }}>
      <Card variant="outlined">
        <CardHeader
          sx={{
            backgroundColor: '#4b4c4c',
            color: '#FF9100',
            fontVariant: 'h4'
          }}
          title={product?.name}
        />
        <CardContent sx={{ color:  '#4b4c4c' }}>
          <Typography variant='h6' gutterBottom>
            Доступно к заказу, шт:
          </Typography>
          <Typography variant="h5" component="div" align={'right'}>
            {product?.quantity}
          </Typography>
          <Divider />
          <Typography variant='h6' gutterBottom>
            Цена, грн:
          </Typography>
          <Typography variant="h4" component="div" align={'right'}>
            {product?.price}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" sx={{ color: "#4b4c4c" }} onClick={() => navigate(-1)}>
            Назад к списку
          </Button>

        </CardActions>
      </Card>
    </Box>
  );
}
const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const current_product = useSelector(
    (state: RootState) => (state.productReducer.current_product),
  );
  const dispatch = useDispatch();

  React.useEffect(() => {
    document.title = `${current_product?.name} Electroprom`;
    metaAdder(`name="description"`, `${current_product?.name} Electroprom`);
    metaAdder(`name="keywords"`, `${current_product?.name}, купить ${current_product?.name}, ${current_product?.name} Украина, ${current_product?.name} el-prom`);

    dispatch<any>(ProductsActionCreator.getCurrentProductAsync(id!));
  }, [dispatch, id, current_product?.name]);

  if (!current_product) return <NotFound />;

  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={{ xs: 1, sm: 2, md: 4 }}
      minWidth={300}
      maxWidth={900}
    >
      <PhotoCard product={current_product} />
      <DescriptionCard product={current_product} />
    </Stack>
  );
};

export default ProductDetail;

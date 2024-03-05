import React, { useState } from 'react';
import { Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import BackdropComponent from '../../backdrop-component/backdrop-component';
import { metaAdder } from '../../../common/helpers/meta.adder';
import { IProduct } from '../../../common/interfaces';
import NotFound from '../../not-found/not-found';
import { getProductById } from '../../../api/product.api';
import PhotoCard from './photo.card';
import DescriptionCard from './description.card';


const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [current_product, setCurrent_product] = useState<IProduct | null>(null);
  const [product_status, setProduct_status] = useState<string>('empty')

  React.useEffect(() => {
    const fetchCurrentProduct = async () => {
      const current_product = await getProductById(id!);
      setCurrent_product(current_product);
      if (current_product) { setProduct_status('ok') } else (setProduct_status('not_found'))
    }
    fetchCurrentProduct();

  }, [id]);

  React.useEffect(() => {
    if (current_product) {
      document.title = `${current_product?.name} Electroprom`;
      metaAdder(`name="description"`, `${current_product?.name} Electroprom`);
      metaAdder(`name="keywords"`, `${current_product?.name}, купить ${current_product?.name}, ${current_product?.name} Украина, ${current_product?.name} el-prom`);
    }
  }, [current_product]);


  if (!current_product) {
    if (product_status === 'empty') { return <BackdropComponent />; }
    else { return <NotFound />; }
  }

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

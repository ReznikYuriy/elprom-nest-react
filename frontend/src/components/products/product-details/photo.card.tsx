import React, { useState } from 'react';
import { Card, Stack, CardMedia } from '@mui/material';
import { IProduct } from '../../../common/interfaces';
import ActionAreaCard from './action.area.card';

interface IProps {
    product: IProduct;
}

const PhotoCard: React.FC<IProps> = ({ product }) => {
    const [bigImgUrl, setBigImgUrl] = useState<string>(`/images/${product?.images[0]}` || '/images/1x1.gif');

    const updateBigPhoto = (value: string) => { setBigImgUrl(`/images/${value}`); }

    return (
        <Card sx={{ maxWidth: 500 }}>
            <CardMedia
                component="img"
                height="500"
                image={bigImgUrl}
                alt="Product photo"
            />
            <Stack
                direction={'row'}
                justifyContent='space-around'
                padding={3}
            >
                {product?.images?.map((img, index) => <ActionAreaCard key={index} imageUrl={img} updateBigPhoto={updateBigPhoto} />)}
            </Stack>
        </Card>);
}
export default PhotoCard;
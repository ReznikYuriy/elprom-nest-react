import React from 'react';
import { Card, CardActionArea, CardMedia } from "@mui/material";
type IProps = {
    imageUrl: string;
    updateBigPhoto: any;
}
const ActionAreaCard: React.FC<IProps> = ({ imageUrl, updateBigPhoto }) => {
    return (
        <Card sx={{ maxWidth: 50 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="50"
                    image={`/images/${imageUrl}` || '/images/1x1.gif'}
                    alt='product_photo'
                    onClick={() => updateBigPhoto(imageUrl)}
                />

            </CardActionArea>
        </Card>
    );
}
export default ActionAreaCard;
import React from 'react';
import { Box } from "@mui/system";
import { IProduct } from "../../../common/interfaces";
import { Button, Card, CardActions, CardContent, CardHeader, Divider, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface IProps {
    product: IProduct;
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
                <CardContent sx={{ color: '#4b4c4c' }}>
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
                    <Button size="small" sx={{ color: "#4b4c4c", borderColor:'#FF9100' }} onClick={() => navigate(-1)} variant="outlined">
                        Назад к списку
                    </Button>

                </CardActions>
            </Card>
        </Box>
    );
}
export default DescriptionCard;
import React from 'react';
import { styled } from '@mui/material/styles';
import { Card, CardHeader, CardContent, IconButton, SvgIcon } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getCurrentProductById } from './helpers/helper';
import BackdropComponent from '../backdrop-component/backdrop-component';
import { Helmet } from 'react-helmet';
import { getCurrentCategoryById } from '../../common/helpers/get.current.category';
import { RootState } from '../../store/types';

const PREFIX = 'ProductDetail';

const classes = {
  root: `${PREFIX}-root`,
  header: `${PREFIX}-header`,
  content: `${PREFIX}-content`,
  contentItem: `${PREFIX}-contentItem`,
  textContent: `${PREFIX}-textContent`,
  footer: `${PREFIX}-footer`,
  backButton: `${PREFIX}-backButton`
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')((
  {
    theme
  }
) => ({
  [`& .${classes.root}`]: {
    display: 'flex',
    minWidth: 300,
    maxWidth: 900,
    backgroundColor: '#d0d0d0',
    flexDirection: 'column', //change to row for horizontal layout
    /* '& .MuiCardHeader-root': {

    }, */
    /* '& .MuiCardHeader-title': {
      //could also be placed inside header class
      backgroundColor: '#FCFCFC',
    },
    '& .MuiCardHeader-subheader	': {
      backgroundImage: 'linear-gradient(to bottom right, #090977, #00d4ff);',
    },
    '& .MuiCardContent-root': {
      backgroundImage: 'linear-gradient(to bottom right, #00d4ff, #00ff1d);',
    }, */
  },

  [`& .${classes.header}`]: {
    backgroundColor: '#4b4c4c',
    color: '#FF9100',
    fontVariant: 'h4',
  },

  [`& .${classes.content}`]: {
    display: 'flex',
    flexWrap: 'wrap',
  },

  [`& .${classes.contentItem}`]: {
    flex: 'calc(50% - 4px)',
    '@media (max-width: 900px)': {
      flex: '100%',
    },
  },

  [`& .${classes.textContent}`]: {
    textAlign: 'left',
  },

  [`& .${classes.footer}`]: {
    fontSize: 14,
    // backgroundImage: "linear-gradient(to bottom right, #8c9d9b, #bdcdbf);"
  },

  [`& .${classes.backButton}`]: {
    fontSize: 40,
    color: '#4b4c4c',
    marginLeft: 5,
  }
}));

const ProductDetail: React.FC = () => {


  const { products } = useSelector(
    ({ products }: RootState) => ({
      products: products.products,
    }),
  );
  const { categories } = useSelector(
    ({ categories }: RootState) => ({
      categories: categories.categories,
    }),
  );
  const { id } = useParams<{ id: string }>();

  const selectedProduct = getCurrentProductById(products, id||'');
  const selectedCategory = getCurrentCategoryById(categories, selectedProduct!.categoryid);
  const navigate = useNavigate();

  if (!selectedProduct || !selectedCategory) return <BackdropComponent />;

  return (
    <Root>
      <Helmet>
        <title>{selectedProduct.name} Electroprom</title>
        <meta name="description" content={`Страница товара ${selectedProduct.name} Electroprom`} />
        <meta name="keywords" content={`${selectedProduct.name}, купить ${selectedProduct.name}, ${selectedProduct.name} цена, ${selectedProduct.name} Украина, ${selectedCategory.name} Украина,`} />
      </Helmet>
      <Card className={classes.root}>
        <CardHeader
          className={classes.header}
          component={'span'}
          title={selectedProduct.name}
          titleTypographyProps={{ variant: 'h4' }}
        />
        <CardContent className={classes.content}>
          <div className={`${classes.contentItem} ${classes.textContent}`}>
            <Typography variant="h6">
              Наличие на складе: <strong>{selectedProduct.quantity}</strong> шт
            </Typography>
            <Typography variant="h6">
              Цена розничная: <strong>{selectedProduct.price}</strong> грн
            </Typography>
            {selectedProduct.discountquantity1 > 0 &&
              <Typography variant="subtitle1">
                Цена при покупке от <strong>{selectedProduct.discountquantity1}</strong> штук: <strong>{selectedProduct.price * selectedProduct.discount1 / 100}</strong> грн
              </Typography>}
            {selectedProduct.discountquantity2 > 0 &&
              <Typography variant="subtitle1">
                Цена при покупке от <strong>{selectedProduct.discountquantity2}</strong> штук: <strong>{selectedProduct.price * selectedProduct.discount2 / 100}</strong> грн
              </Typography>}
          </div>
          <div className={classes.contentItem}>
            <img src={`/images/${selectedProduct.imagepath}`} style={{ borderRadius: '5%' }} alt="image" />
          </div>
        </CardContent>
        <div className={classes.footer}>
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={() => navigate(-1)}
            size="large">
            <SvgIcon className={classes.backButton}>
              <path d="M20 9v6h-8v4.84L4.16 12L12 4.16V9h8z" />
            </SvgIcon>
          </IconButton>
        </div>
      </Card>
    </Root>
  );
};

export default ProductDetail;

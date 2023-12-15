import React from 'react';
import { styled } from '@mui/material/styles';
import { AppBar, BottomNavigation, BottomNavigationAction, CssBaseline, Hidden, Tooltip } from '@mui/material';
import { Toolbar, Button } from '@mui/material';
import { Link as RouterLink, BrowserRouter, Route, Routes } from 'react-router-dom';
import { DataStatus } from '../../store/enum';
import Purchases from '../pages/purchases';
import Delivery from '../pages/delivery';
import Contacts from '../pages/contacts';
import MainPage from '../pages/main-page';
import MatTable from './product-table/react.material.table';
import ProductDetail from './product-details/product-detail';
import HomeIcon from '@mui/icons-material/Home';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import GetAppIcon from '@mui/icons-material/GetApp';
import PhoneIcon from '@mui/icons-material/Phone';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { ProductsActionCreator } from '../../store/slices/products/products.slice';
import Sidebar from './sidebar';
import BackdropComponent from '../backdrop-component/backdrop-component';
import NotFound from '../not-found/not-found';
import { RootState } from '../../store/types';
import { RouteEnum } from '../../common/enums/route.enum';
import { metaAdder } from '../../common/helpers/meta.adder';

const classes = {
  stickToBottom: 'stickToBottom',
  appBar: 'appBar',
  menuButton: 'menuButton',
  toolbarIcon: 'toolbarIcon',
  toolbar: 'toolbar',
  drawerPaper: 'drawerPaper',
  content: 'content'
};
const drawerWidth = 240;

const Root = styled('div')((
  {
    theme
  }
) => ({

  display: 'flex',

  [`& .${classes.stickToBottom}`]: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
  },

  [`& .${classes.appBar}`]: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    backgroundColor: '#4b4c4c',
    color: '#FF9100',
    position: 'fixed'
  },
  [`& .${classes.menuButton}`]: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },

  [`& .${classes.toolbarIcon}`]: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },

  // necessary for content to be below app bar
  [`& .${classes.toolbar}`]: theme.mixins.toolbar,

  [`& .${classes.drawerPaper}`]: {
    width: drawerWidth,
  },

  [`& .${classes.content}`]: {
    flexGrow: 1,
    padding: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  }
}));



const Products: React.FC = () => {

  const products = useSelector(
    (state: RootState) => (state.productReducer.products),
  );
  const dataStatusProd = useSelector(
    (state: RootState) => (state.productReducer.dataStatus),
  );
  const dispatch = useDispatch();

  React.useEffect(() => {
    document.title = "Electroprom - компоненты силовой электроники";
    metaAdder(`name="description"`, "Продажа силовых полупроводниковых приборов, охладителей, импортных и отечественных радиокомпонентов по Украине");
    metaAdder(`name="keywords"`, "Electroprom, Электропром Украина, Электропром, Электропром Запорожье, Электропром сайт, Эл-пром, El-prom, Electroprom Украина");
    console.log('PRODUCTS USE EFFECT');
    dispatch<any>(ProductsActionCreator.getProductsAsync());
  }, [dispatch]);

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


  if (dataStatusProd === DataStatus.PENDING || !products) {
    return <BackdropComponent />;
  }

  return (

    <Root>
      <BrowserRouter>
        <CssBaseline />
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
              size="large">
              <MenuIcon />
            </IconButton>
            <Hidden mdDown implementation="css">
              <IconButton color="inherit" component={RouterLink} to={RouteEnum.ROOT} size="large">
                <Tooltip title="Главная страница" enterDelay={500} leaveDelay={200}>
                  <HomeIcon />
                </Tooltip>
              </IconButton>
              <Button color="inherit" component={RouterLink} to={RouteEnum.DELIVERY}>ОПЛАТА И ДОСТАВКА</Button>
              <Button color="inherit" component={RouterLink} to={RouteEnum.PURCHASES}>ЗАКУПАЕМ</Button>
              <Button color="inherit" component={RouterLink} to={RouteEnum.CONTACTS}>КОНТАКТЫ</Button>
              <IconButton color="inherit" href="/price.zip" download size="large">
                <Tooltip title="Скачать прайс" enterDelay={500} leaveDelay={200}>
                  <GetAppIcon />
                </Tooltip>
              </IconButton>
            </Hidden>
          </Toolbar>
        </AppBar>
        <Hidden smUp implementation="css">
          <BottomNavigation className={classes.stickToBottom} showLabels>
            <BottomNavigationAction label="Home" icon={<HomeIcon />} component={RouterLink} to={RouteEnum.ROOT} />
            <BottomNavigationAction label="Доставка" icon={<LocalShippingIcon />} component={RouterLink} to={RouteEnum.DELIVERY} />
            <BottomNavigationAction label="Закупаем" icon={<AttachMoneyIcon />} component={RouterLink} to={RouteEnum.PURCHASES} />
            <BottomNavigationAction label="Контакты" icon={<PhoneIcon />} component={RouterLink} to={RouteEnum.CONTACTS} />
          </BottomNavigation>
        </Hidden>
        <Sidebar isOpen={mobileOpen} onCloseSidebar={() => handleDrawerToggle()} />

        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Routes>
            <Route path={RouteEnum.ROOT} element={<MainPage />} />
            <Route path={RouteEnum.CATEGORIES} element={<MatTable products={products} />} />
            <Route path={RouteEnum.CATEGORIES_$ID} element={<MatTable products={products} />} />
            <Route path={RouteEnum.PRODUCT_DETAILS_$ID} element={<ProductDetail />} />
            <Route path={RouteEnum.PURCHASES} element={<Purchases />} />
            <Route path={RouteEnum.DELIVERY} element={<Delivery />} />
            <Route path={RouteEnum.CONTACTS} element={<Contacts />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </BrowserRouter>
    </Root >
  );
};
export default Products;

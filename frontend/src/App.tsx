import React from 'react';
import { styled } from '@mui/material/styles';
import { BottomNavigation, BottomNavigationAction, CssBaseline, Hidden } from '@mui/material';
import { Link as RouterLink, BrowserRouter, Route, Routes } from 'react-router-dom';
import Purchases from './components/purchases';
import Delivery from './components/delivery';
import Contacts from './components/contacts';
import MainPage from './components/main-page';
import MatTable from './components/products/react.material.table';
import ProductDetail from './components/products/product-detail';
import HomeIcon from '@mui/icons-material/Home';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PhoneIcon from '@mui/icons-material/Phone';
import Sidebar from './components/products/sidebar';
import NotFound from './components/not-found/not-found';
import { RouteEnum } from './common/enums/route.enum';
import AppBarComponent from './components/products/appbar';

const classes = {
  stickToBottom: 'stickToBottom',
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



const App: React.FC = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


  return (

    <Root>
      <BrowserRouter>
        <CssBaseline />
        <AppBarComponent onCloseSidebar={() => handleDrawerToggle()}/>

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
            <Route path={RouteEnum.CATEGORIES} element={<MatTable />} />
            <Route path={RouteEnum.CATEGORIES_$ID} element={<MatTable />} />
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
export default App;
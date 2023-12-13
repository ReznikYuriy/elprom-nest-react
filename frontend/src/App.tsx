import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import NotFound from './components/not-found/not-found';
import Products from './components/products/products';
import { Helmet } from 'react-helmet';
import { RouteEnum } from './common/enums/route.enum';
import Delivery from './components/pages/delivery';
import { MatTable } from './components/products/product-table/material-table';
import ProductDetail from './components/products/product-details/product-detail';
import Purchases from './components/pages/purchases';
import Contacts from './components/pages/contacts';
import MainPage from './components/pages/main-page';

function App() {
  return (
    <>
      <Helmet>
        <title>Electroprom - компоненты силовой электроники</title>
        <meta name="description" content="Продажа силовых полупроводниковых приборов, охладителей, импортных и отечественных радиокомпонентов по Украине" />
        <meta name="keywords" content="Electroprom, Электропром Украина, Электропром, Электропром Запорожье, Электропром сайт, Эл-пром, El-prom, Electroprom Украина" />
      </Helmet>

      <Routes>
        <Route path={RouteEnum.ROOT} element={<Products />} />
        {/* <Route path={RouteEnum.CATEGORIES} element={<MatTable products={products} />} />
        <Route path={RouteEnum.CATEGORIES_$ID} element={<MatTable products={products} />} /> */}
        <Route path={RouteEnum.PRODUCT_DETAILS_$ID} element={<ProductDetail />} />
        <Route path={RouteEnum.PURCHASES} element={<Purchases />} />
        <Route path={RouteEnum.DELIVERY} element={<Delivery />} />
        <Route path={RouteEnum.CONTACTS} element={<Contacts />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

    </>
  );
};

export default App;
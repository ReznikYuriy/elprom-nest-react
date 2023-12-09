import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import NotFound from './components/not-found/not-found';
import Products from './components/products/products';
import { Helmet } from 'react-helmet';
import { RouteEnum } from './common/enums/route.enum';

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
        <Route path="*" element={<NotFound />} />
      </Routes>

    </>
  );
};

export default App;
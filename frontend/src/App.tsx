import * as React from 'react';
import Products from './components/products/products';
import { Helmet } from 'react-helmet';

function App() {
  return (
    <>
      <Helmet>
        <title>Electroprom - компоненты силовой электроники</title>
        <meta name="description" content="Продажа силовых полупроводниковых приборов, охладителей, импортных и отечественных радиокомпонентов по Украине" />
        <meta name="keywords" content="Electroprom, Электропром Украина, Электропром, Электропром Запорожье, Электропром сайт, Эл-пром, El-prom, Electroprom Украина" />
      </Helmet>

      <Products/>

    </>
  );
};

export default App;
import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Alert } from '@mui/material';
import { Helmet } from 'react-helmet';

const PREFIX = 'Delivery';

const classes = {
  root: `${PREFIX}-root`,
  ul: `${PREFIX}-ul`,
  alert: `${PREFIX}-alert`
};

const Root = styled('div')({
  [`&.${classes.root}`]: {
  },
  [`& .${classes.ul}`]: {
    fontSize: 16,
  },
  [`& .${classes.alert}`]: {
    fontSize: 16,
  },
});

const Delivery: React.FC = () => {

  return (
    <Root className={classes.root}>
      <Helmet>
        <title>Оплата и доставка Electroprom</title>
        <meta name="description" content="Electroprom - оплата и доставка продукции транспортными компаниями Новая Почта, Укрпочта, Деливери по всей территории Украины" />
        <meta name="keywords" content="Electroprom, Электропром Украина, Электропром, Электропром Запорожье, Эл-пром, El-prom, Electroprom Украина, оплата, доставка, пересылка" />
      </Helmet>
      <h1>Оплата и Доставка</h1>

      <Alert severity="info" className={classes.alert}>
        Оплатить заказ можно следующими способами:
        <ul>
          <li>
            наличными (для жителей Запорожья при условии самовывоза)
          </li>
          <li>
            предоплата на карту Приватбанка или Монобанка
          </li>
          <li>
            наложенный платеж <strong>(наложенным платежом отправляем только после получения предоплаты в размере стоимости пересылки в обе стороны - от 100грн).</strong>
          </li>
        </ul>
        Ваши заказы будут отправлены на следующий день после согласования заказа и получения оплаты. Заказы до 300 грн отправляюся в течении 3х рабочих дней.
          Посылки отправляем следующими транспортными службами:
      </Alert>
      <ul className={classes.ul}>
        <li><a href="https://novaposhta.ua/"><strong>Новая Почта</strong></a></li>
        <li><a href="https://www.delivery-auto.com/"><strong>Деливери</strong></a></li>
        <li><a href="https://www.ukrposhta.ua/ua"><strong>Укрпочта</strong></a></li>
      </ul>
      <Alert severity="success" className={classes.alert}>
        Для уменьшения стоимости доставки мы стараемся использовать свои упаковочные материалы.
      </Alert>
    </Root>
  );
};

export default Delivery;

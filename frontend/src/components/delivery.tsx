import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Alert } from '@mui/material';
import { metaAdder } from '../common/helpers/meta.adder';

const classes = {
  root: `root`,
  ul: `ul`,
  alert: `alert`
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
  React.useEffect(() => {
    document.title = 'Оплата и доставка Electroprom';
    metaAdder(`name="description"`, 'Electroprom - оплата и доставка продукции транспортными компаниями Новая Почта, Укрпочта, Деливери по всей территории Украины');
    metaAdder(`name="keywords"`, 'Electroprom, Электропром Украина, Электропром, Электропром Запорожье, Эл-пром, El-prom, Electroprom Украина, оплата, доставка, пересылка');
  }, []);
  return (
    <Root className={classes.root}>
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
        <li><a href="https://www.ukrposhta.ua/ua"><strong>Укрпочта</strong></a></li>
      </ul>
      <Alert severity="success" className={classes.alert}>
        Для уменьшения стоимости доставки мы стараемся использовать свои упаковочные материалы.
      </Alert>
    </Root>
  );
};

export default Delivery;

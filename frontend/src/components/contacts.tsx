import * as React from 'react';
import { styled } from '@mui/material/styles';
import viberIcon from '../assets/images/viber-icon.svg';
import { Alert } from '@mui/material';
import { metaAdder } from '../common/helpers/meta.adder';

const classes = {
  root: 'root',
  alert: 'alert'
};

const Root = styled('div')({
  [`&.${classes.root}`]: {
    '& p': {
      fontSize: 16,
    },
  },
  [`& .${classes.alert}`]: {
    fontSize: 16,
    fontWeight: 700,
  },
});

const Contacts: React.FC = () => {

  React.useEffect(() => {
    document.title = 'Контакты Electroprom';
    metaAdder(`name="description"`, 'Electroprom - контактная информация: телефон, почта, адрес, как проехать');
    metaAdder(`name="keywords"`, 'Electroprom контакты, Электропром Украина, Электропром контакты, Электропром Запорожье, Электропром сайт, Эл-пром, El-prom, Electroprom Украина');
  }, []);

  return (
    <Root className={classes.root}>
      <h1>Контакты</h1>
      <h3>ЧП «Электропром»</h3>
      <p>Украина, Запорожье<br /><img src={viberIcon} width="12px" alt="viber-icon" /><a href="tel:+380677201352">+38(067)720-13-52</a><br /><a href="tel:+380667911850">+38(066)791-18-50</a><strong> Юрий</strong></p>
      <p><a href="tel:+380677087295">+38(067)708-72-95</a><br /><img src={viberIcon} width="12px" alt="viber-icon" /><a href="tel:+380667911851">+38(066)791-18-51</a> <strong>Сергей</strong></p>
      <p><a href="tel:+380667911852">+38(066)791-18-52</a> <strong>Григорий Григорьевич</strong></p>
      <p>Время работы: пн-сб 09:00-18:00<br />
        Email: <a href="mailto:reznik333@gmail.com"><strong>reznik333@gmail.com</strong></a><br /></p>
      <Alert severity="warning" className={classes.alert}>
        Посылки отправлять на 9 отделение «Новой Почты», пр. Металлургов, 17. Резник Юрий <a href="tel:+380677201352">+380677201352</a>
      </Alert>
    </Root>
  );
};

export default Contacts;

import React, { FC } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import MainImg from '../assets/images/main.jpg';
import { metaAdder } from '../common/helpers/meta.adder';

const classes = {
  root: 'root',
  media: 'media'
};

const StyledCard = styled(Card)((
  {
    theme
  }
) => ({
  [`&.${classes.root}`]: {
    [theme.breakpoints.up('xs')]: {
      width: 320,
    },
    [theme.breakpoints.up('sm')]: {
      width: 600,
    },
    [theme.breakpoints.up('md')]: {
      width: 960,
    },
  },

  [`& .${classes.media}`]: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  }
}));

const MainPage: FC = () => {
  React.useEffect(() => {
    document.title = 'Electroprom - компоненты силовой электроники';
    metaAdder(`name="description"`, 'Продажа силовых полупроводниковых приборов, охладителей, импортных и отечественных радиокомпонентов по Украине');
    metaAdder(`name="keywords"`, 'Electroprom, Электропром Украина, Электропром, Электропром Запорожье, Электропром сайт, Эл-пром, El-prom, Electroprom Украина');
  }, []);
  return (
    <StyledCard className={classes.root}>
      <CardMedia
        className={classes.media}
        image={MainImg}
        title="Electroprom - силовые п/п приборы, охладители, радиокомпоненты. Украина"
      />
      {/* <CardContent>
        <Typography variant="h6" color="textSecondary" component="p">
          Мы рады приветствовать Вас на нашем портале!
          Дата обновления прайс-листа с остатками на складе 01.12.2023.
        </Typography>
      </CardContent> */}
    </StyledCard>
  );
};

export default MainPage;

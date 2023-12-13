import React from 'react';
import { styled } from '@mui/material/styles';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const PREFIX = 'BackdropComponent';

const classes = {
  backdrop: `${PREFIX}-backdrop`
};

const Root = styled('div')((
  {
    theme
  }
) => ({
  [`& .${classes.backdrop}`]: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  }
}));

const BackdropComponent: React.FC = () => {


  return (
    <Root>
      <Backdrop className={classes.backdrop} open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Root>
  );
};

export default BackdropComponent;

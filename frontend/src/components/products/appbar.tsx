import React from 'react';
import { styled } from '@mui/material/styles';
import { AppBar, Hidden, Tooltip } from '@mui/material';
import { Toolbar, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import GetAppIcon from '@mui/icons-material/GetApp';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { RouteEnum } from '../../common/enums/route.enum';
import SearchComponent from './search.component';

const classes = {
    appBar: 'appBar',
    menuButton: 'menuButton',
    toolbarIcon: 'toolbarIcon',
    toolbar: 'toolbar',
};
const drawerWidth = 240;

const Root = styled('div')((
    {
        theme
    }
) => ({
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
    [`& .${classes.appBar}`]: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
        backgroundColor: '#4b4c4c',
        color: '#FF9100',
        position: 'fixed'
    },

}));


interface IProps {
    onCloseSidebar: () => void;
}

const AppBarComponent: React.FC<IProps> = ({ onCloseSidebar }) => {
    return (
        <Root>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={onCloseSidebar}
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
                    <SearchComponent/>
                </Toolbar>
            </AppBar>
        </Root>
    );
};
export default AppBarComponent;
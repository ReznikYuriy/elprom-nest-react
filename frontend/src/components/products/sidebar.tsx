import React from 'react';
import { styled } from '@mui/material/styles';
import { List, ListItem, ListItemText, Divider, Drawer, Hidden } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CategoriesActionCreator } from '../../store/slices';
import Logo from '../../assets/images/logo.png';
import BackdropComponent from '../backdrop-component/backdrop-component';
import { RouteEnum } from '../../common/enums/route.enum';
import { DataStatus } from '../../store/enum/data-status.enum';
import { RootState } from '../../store/types';

const PREFIX = 'Sidebar';

const classes = {
  root: `${PREFIX}-root`,
  drawer: `${PREFIX}-drawer`,
  toolbarIcon: `${PREFIX}-toolbarIcon`,
  toolbar: `${PREFIX}-toolbar`,
  drawerPaper: `${PREFIX}-drawerPaper`
};

const Root = styled('div')((
  {
    theme
  }
) => ({
  [`& .${classes.root}`]: {
    display: 'flex',
  },

  [`& .${classes.drawer}`]: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
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

  [`& .${classes.drawerPaper}`]: {
    width: drawerWidth,
  }
}));

interface IProps {
  isOpen: boolean;
  onCloseSidebar: () => void;
}
const drawerWidth = 240;

const Sidebar: React.FC<IProps> = ({ isOpen, onCloseSidebar }) => {


  const { categories, dataStatusCat } = useSelector(
    ({ categories }: RootState) => ({
      categories: categories.categories,
      dataStatusCat: categories.dataStatus,
    }),
  );

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch<any>(CategoriesActionCreator.getCategoriesAsync());
  }, [dispatch]);

  const onSidebarClick = (listItem: string): void => {
    dispatch(CategoriesActionCreator.setActiveCategoryName(listItem));
  };
  console.log('SIDEBAR');

  const drawer = (
    <Root>
      <div className={classes.toolbar}><img src={Logo} width="230px" alt="Electroprom logo" title="Electroprom" loading="lazy" /></div>
      <Divider />
      <List>

        <ListItem button key="AllCategories" component={RouterLink} to={RouteEnum.CATEGORIES}
          onClick={() => onSidebarClick('Все товары')}>
          <ListItemText primary="Все товары" />
        </ListItem>
        {categories.map(cat => (
          <ListItem button key={cat.name} component={RouterLink} to={RouteEnum.CATEGORIES + cat.id}
            onClick={() => onSidebarClick(cat.name)}>
            <ListItemText primary={cat.name} />
          </ListItem>
        ))}
      </List>
    </Root>
  );

  if (dataStatusCat === DataStatus.PENDING || !categories) {
    return <BackdropComponent />;
  }
  return (<div>SIDEBAR</div>)
  return (
    <div className={classes.root}>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            open={isOpen}
            onClose={onCloseSidebar}
            anchor="left"
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden mdDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
};
export default Sidebar;

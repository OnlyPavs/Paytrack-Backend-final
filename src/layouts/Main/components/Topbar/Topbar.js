import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Hidden, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import InputIcon from '@material-ui/icons/Input';
import { Typography } from '@material-ui/core';

import { logoutUser } from '../../../../services/authServices';
import Logo from '../../../../images/logo/logo.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: 'none',
    background: 'rgb(95,38,145);',
  background: 'linear-gradient(90deg, rgba(95,38,145,1) 13%, rgba(255,0,108,1) 100%);'
  },
  flexGrow: {
    flexGrow: 1,
  },
  img: {
    width: 45,
    height: 35,
    fill: 'white',
  },
  logo: {
    marginLeft: theme.spacing(1),
    fontWeight: 500,
    fontSize: '20px',
  },
  signOutButton: {
    marginLeft: theme.spacing(1),
  },
  signOutLabel: {
    marginRight: theme.spacing(1),
  },
}));

const Topbar = (props) => {
  const { className, onSidebarOpen, ...rest } = props;
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  let signLabel = user.isDemoUser ? 'Sign In or Register' : 'Sign Out';

  const classes = useStyles();

  return (
    <AppBar {...rest} className={clsx(classes.root, className)}>
      <Toolbar>
        <RouterLink to="/dashboard">
          <img className={classes.img} alt="Logo" src={Logo} />
        </RouterLink>
        <Typography className={classes.logo} color="inherit">
          PayTrack
        </Typography>
        <div className={classes.flexGrow} />
        <Hidden smDown>
          <IconButton className={classes.signOutButton} color="inherit" onClick={() => dispatch(logoutUser())}>
            <Typography className={classes.signOutLabel} color="inherit" variant="body2">
              {signLabel}
            </Typography>
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden mdUp>
          <IconButton color="inherit" onClick={onSidebarOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func,
};

export default Topbar;

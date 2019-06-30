import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  siteName:{
    color: '#E7352F',
    paddingLeft: theme.spacing.unit
  },
  navBar:{
    backgroundColor: '#282628'
  },
  navBarLogo:{
    width: '3%',
    height: 'auto',

  },
  toolBar:{
    paddingLeft: theme.spacing(8),
  },
  navLink:{
    cursor: 'pointer',
    display: 'contents'
  }
}));

export default function SimpleAppBar(props) {
  const classes = useStyles();

  function handleHomeRedirect() {
    props.history.push('/')
  }

  return (
    <div className={classes.root}>
      <AppBar position="fixed" color="default" className={classes.navBar}>
        <Toolbar className={classes.toolBar}>
          <div className={classes.navLink} onClick={() => handleHomeRedirect()}>
          <img src={process.env.PUBLIC_URL + '/images/internet.png'} className={classes.navBarLogo} alt='web-logo'/>
          <Typography variant="h6" color="inherit" className={classes.siteName}>
            News
          </Typography>
        </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

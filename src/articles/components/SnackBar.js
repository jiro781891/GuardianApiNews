import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { makeStyles } from '@material-ui/core/styles';

const variantIcon = {
  info: InfoIcon,
};

const useStyles1 = makeStyles(theme => ({
  info: {
    backgroundColor: theme.palette.primary.main,
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));

function MySnackbarContentWrapper(props) {
  const classes = useStyles1();
  const { className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton key="close" aria-label="Close" color="inherit" onClick={onClose}>
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

MySnackbarContentWrapper.propTypes = {
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['info']).isRequired,
};

// export default function CustomizedSnackbars() {

class CustomizedSnackbars extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      opened: false
    }

    this.handleOpen = () => {
      this.setState({
        opened: true
      })
    }

    this.handleClose = () => {
      this.setState({
        opened: false
      })
    }

    this.handleClick = () => {
      this.props.scrollTop()
      this.handleClose()
    }

  }


  render() {


  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={this.state.opened}
        autoHideDuration={400000}
        onClose={this.handleClose}
        onClick={this.handleClick}
      >
        <MySnackbarContentWrapper
          variant="info"
          // className={classes.margin}
          onClose={this.handleClose}
          message="There are some new news!"
        />
      </Snackbar>

    </div>
  );
}}
export default CustomizedSnackbars;

import React, { useEffect, useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import PropTypes from 'prop-types';
import { useTheme } from '@material-ui/core/styles';
import useStyles from './modal-jss.js';
function ResponsiveDialog({ isOpen, children, maxWidth, fullWidth, title, toggleModal, hideDetailModal }) {

  const theme = useTheme();
  const classes = useStyles();
  const [fullScreen, setFullScreen] = useState(false);
  const fullScreenCheck = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if(fullScreenCheck){
      setFullScreen(fullScreenCheck)
    }
  }, [fullScreenCheck]);

  useEffect(() => {
    if(fullWidth){
      setFullScreen(fullWidth)
    }
  }, [fullWidth]);

  const hideModal = () => {
    if (hideDetailModal) {
      hideDetailModal();
    } else {
      toggleModal(false);
    }
  };
  
  return (
    <div>
      <Dialog
        fullWidth={fullScreen}
        maxWidth={maxWidth || 'md'}
        onClose={() => toggleModal(false)}
        open={isOpen}
      >
        <IconButton 
          className={classes.closeButton} 
          onClick={hideModal}
        >
          <CloseIcon />
        </IconButton>
        <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
        <DialogContent>
          {children}
        </DialogContent>
      </Dialog>
    </div>
  );
}

ResponsiveDialog.propTypes = {
  children: PropTypes.node,
  fullScreen: PropTypes.bool,
  fullWidth: PropTypes.bool,
  hideDetailModal: PropTypes.func,
  isOpen: PropTypes.bool,
  maxWidth: PropTypes.string,
  title: PropTypes.string,
  toggleModal: PropTypes.func,
};

ResponsiveDialog.defaultProps = {
  fullWidth: false,
}

export default ResponsiveDialog;

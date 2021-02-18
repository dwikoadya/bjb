/* eslint-disable react/prop-types */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const AlertMessage = ({ message, open, triggerSetError, ...props }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Collapse in={open}>
        <Alert
          {...props}
          action={(
            <IconButton
              aria-label="close"
              color="inherit"
              onClick={() => {
                triggerSetError(false);
              }}
              size="small"
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          )}
        >
          <Typography variant="h5">{message}</Typography>
        </Alert>
      </Collapse>
    </div>
  );
};

export default AlertMessage;

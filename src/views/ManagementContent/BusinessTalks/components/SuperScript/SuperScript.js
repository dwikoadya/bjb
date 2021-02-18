import React from 'react';
import { withStyles } from '@material-ui/styles';
import {  
  Typography,
} from '@material-ui/core';
import palette from 'theme/palette';

const SuperScriptText = withStyles(() => ({
  root: {
    color: palette.error.main,
    verticalAlign: 'super',
  }
}))(Typography);

const SuperScript = () => {
  return(
    <SuperScriptText
      component="h3"
      variant="subtitle1"
    >
      *
    </SuperScriptText>
  )
}

export default SuperScript;
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {  
  TextField,
  Typography
} from '@material-ui/core';
import PropTypes from 'prop-types';
import palette from 'theme/palette';

const ErrorText = withStyles(() => ({
  root: {
    color: palette.error.main,
    marginBottom: 10,
    marginLeft: 10,
    marginTop: -10,
  }
}))(Typography);

const CustomTimePicker = withStyles((theme) => ({
  root: {
    '& .MuiInput-underline:before': {
      border: 'none'
    },
    '& .MuiInput-underline:after': {
      border: 'none'
    },
    width: '100%',
    border: '1px solid #C4C4C4',
    borderRadius: 50,
    padding: theme.spacing(0.5,2),
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(0.5)
  }
}))(TextField);

const TimePicker = ({
  defaultValue,
  errorMessage,
  errors,
  name,
  register,
  validation,
}) => {
  return(
    <>
      <Typography
        component="p"
        variant="body1"
      >
        Waktu
      </Typography>
      <CustomTimePicker
        defaultValue={defaultValue}
        inputRef={register(validation)}
        name={name}
        type="time"
      />
      {
        errors &&
          <ErrorText
            component="p"
            variant="caption"
          >
            {errorMessage}
          </ErrorText>
      }
    </>
  )
}

TimePicker.propTypes = {
  defaultValue: PropTypes.string,
  errorMessage: PropTypes.string,
  errors: PropTypes.object,
  name: PropTypes.string,
  register: PropTypes.func,
  validation: PropTypes.object
}

export default TimePicker;
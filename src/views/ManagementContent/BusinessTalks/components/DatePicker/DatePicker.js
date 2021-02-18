import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {  
  Typography
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import { KeyboardDatePicker } from '@material-ui/pickers';
import palette from 'theme/palette';

const ErrorText = withStyles(() => ({
  root: {
    color: palette.error.main,
    marginBottom: 10,
    marginLeft: 10,
    marginTop: -10,
  }
}))(Typography);

const CustomDatePicker = withStyles((theme) => ({
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
}))(KeyboardDatePicker);

{/* <KeyboardDatePicker
        autoOk
        inputVariant="outlined"
        label="With keyboard"
        format="MM/dd/yyyy"
        value={selectedDate}
        
        InputAdornmentProps={{ position: "start" }}
        onChange={date => handleDateChange(date)}
      /> */}
const DatePicker = ({
  control,
  defaultValue,
  disablePast,
  errorMessage,
  errors,
  name,
  validation,
}) => {
  return(
    <>
      <Typography
        component="p"
        variant="body1"
      >
        Tanggal
      </Typography>
      <Controller
        control={control}
        defaultValue={defaultValue}
        name={name}
        render={({ onChange, value }) => (
          <CustomDatePicker
            autoOk
            disablePast={disablePast}
            format="DD - MM - YYYY"
            onChange={onChange}
            value={value}
            variant="inline"
          />
        )}
        rules={validation}
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

DatePicker.propTypes = {
  control: PropTypes.object,
  defaultValue: PropTypes.string,
  disablePast: PropTypes.bool,
  errorMessage: PropTypes.string,
  errors: PropTypes.object,
  name: PropTypes.string,
  validation: PropTypes.object,
}

export default DatePicker;
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/styles';
import {  
  Typography,
  Box,
  Input,
} from '@material-ui/core';
import palette from 'theme/palette';

const ErrorText = withStyles(() => ({
  root: {
    color: palette.error.main,
    marginBottom: 10,
    marginLeft: 10,
    marginTop: -10,
  }
}))(Typography);

const useStyles = makeStyles((theme) => ({
  box: {
    padding: theme.spacing(0.5,2),
    [theme.breakpoints.down('md')]: {
      left:50
    }
  }
}));

const RoundedInput = ({
  label,
  defaultValue,
  errorMessage,
  errorMessageMax,
  errors,
  multiline,
  name,
  register,
  type,
}) => {
  const classes = useStyles();
  return(
    <>
      <Typography
        component="p"
        variant="body1"
      >
        {label}
      </Typography>
      <Box
        border={1}
        borderColor="#C4C4C4"
        borderRadius={20}
        className={classes.box}
        marginBottom={2}
      >
        <Input
          defaultValue={defaultValue}
          disableUnderline
          fullWidth
          inputRef={register}
          multiline={Boolean(multiline)}
          name={name}
          rows={multiline}
          type={type}
        />
      </Box>
      {
        errors &&
          <ErrorText
            component="p"
            variant="caption"
          >
            {errorMessage}
          </ErrorText>
      }
      {
        errorMessageMax &&
          <ErrorText
            component="p"
            variant="caption"
          >
            {errorMessageMax}
          </ErrorText>
      }
    </>
  )
};

RoundedInput.propTypes = {
  defaultValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  errorMessage: PropTypes.string,
  errorMessageMax: PropTypes.string,
  errors: PropTypes.object,
  label : PropTypes.string,
  multiline: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  name: PropTypes.string,
  register: PropTypes.func,
  rows: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  type: PropTypes.string,
};

RoundedInput.defaultProps = {
  defaultValue: '',
  type: 'text',
  multiline: 0,
  rows: 0
}

export default RoundedInput;
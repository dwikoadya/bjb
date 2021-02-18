import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/styles';
import { Controller } from 'react-hook-form';
import {  
  Typography,
  Select,
  MenuItem
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
  select:{
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(0.6),
    height: 40,
    borderRadius: 50,
    '&.MuiInputBase-root': {
      fontSize: 14
    }
  },
}));

const RoundedSelect = ({
  name,
  label,
  defaultValue,
  errorMessage,
  errors,
  options,
  control,
  validation,
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
      <Controller
        control={control}
        defaultValue={defaultValue || '1'}
        name={name}
        render={({ onChange, value }) => (
          <Select
            className={classes.select}
            onChange={onChange}
            value={value}
            variant="outlined"
          >
            {
              options.map((item, index) => (
                <MenuItem 
                  key={index} 
                  value={item.id}
                >
                  {item.name}
                </MenuItem>
              ))
            }
          </Select>
        )}
        rules={validation}
      />
      {
        errors?.branch_office_id &&
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

RoundedSelect.propTypes = {
  control: PropTypes.object,
  defaultValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  errorMessage: PropTypes.string,
  errors: PropTypes.object,
  label : PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.array,
  validation: PropTypes.object,
};

export default RoundedSelect;
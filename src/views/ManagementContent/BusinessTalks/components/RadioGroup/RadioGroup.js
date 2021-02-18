import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import palette from 'theme/palette';

const CustomFormControl = withStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2)
  }
}))(FormControl);

const ErrorText = withStyles(() => ({
  root: {
    color: palette.error.main,
    marginBottom: 10,
    marginLeft: 10,
    marginTop: -10,
  }
}))(Typography);

const RadioGroupInput = ({
  control,
  errorMessage,
  errors,
  options,
  label,
  name,
  validation,
  value,
}) => {
  return (
    <>
      <CustomFormControl
        component="fieldset"
      >
        <FormLabel 
          color="secondary"
          component="legend"
        >
          {label}
        </FormLabel>
        <Controller
          control={control}
          defaultValue={value}
          name={name}
          render={({ onChange, value }) => (
            <RadioGroup 
              name={name} 
              onChange={onChange}
              row 
              value={value}
            >
              {
                options.map((item, index) => (
                  <FormControlLabel 
                    control={<Radio color="secondary" />} 
                    key={index}
                    label={item.label}
                    value={item.value}
                  />
                ))
              }
            </RadioGroup>
          )}
          rules={validation}
        />
      </CustomFormControl>
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
  );
}

RadioGroupInput.propTypes = {
  control: PropTypes.object,
  errorMessage: PropTypes.string,
  errors: PropTypes.object,
  label: PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.array,
  validation: PropTypes.object,
  value: PropTypes.string,
}

RadioGroupInput.defaultProps = {
  options: [],
}

export default RadioGroupInput;
import React, { useState } from 'react';
import { TextField } from 'formik-material-ui';
import { FormControl } from '@material-ui/core';

const TextFieldPassword = (props) => {

  const { form } = props;
  const [values, setValues] = useState({
    confirmation_password: '',
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    form.setFieldValue(prop, event.target.value ? event.target.value : '');
  };

  return (
    <FormControl fullWidth>
      <TextField
        onChange={handleChange('confirmation_password')}
        type={values.showPassword ? 'text' : 'password'}
        value={values.password}
        {...props}
      />
    </FormControl>
  );
};

export default TextFieldPassword;

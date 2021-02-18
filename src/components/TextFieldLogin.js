import React from 'react';
import { TextField } from 'formik-material-ui';
import { FormControl } from '@material-ui/core';

const TextFieldLogin = (props) => {

  return (
    <FormControl fullWidth>
      <TextField
        type="email"
        {...props}
      />
    </FormControl>
  );
};

export default TextFieldLogin;

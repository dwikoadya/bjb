import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import { Button, makeStyles, CircularProgress, InputAdornment, Typography } from '@material-ui/core';
import { TextFieldLogin } from 'components';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '90%',
    [theme.breakpoints.only('xs')]: {
      width: '95%'
    }
  },
  input: {
    width:'346.5px',
    [theme.breakpoints.only('xs')]: {
      width:'204.25px'
    }
  },
  container: {
    display: 'flex',
    alignSelf: 'center',
    flexDirection: 'column',
    alignItems: 'center'
  },
  buttonContainer: {
    marginTop: 5,
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
  },
  
}));

const ForgotForm = ({ initialValues, onSubmit }) => {
  const classes = useStyles();
  const [check, setCheck] = useState(false);

  const validateEmail = (value) => {
    let error;
    
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(value)){
      error = 'Format email salah !';
      setTimeout(function(){ setCheck(false) }, 500);
    }

    if (!value) {
      error = 'Email tidak boleh kosong !';
    }

    if (re.test(value)){
      setTimeout(function(){ setCheck(true) }, 500);
    }

    return error;
    
  };

  return (
    <Formik
      component={({ submitForm, isSubmitting, errors, touched }) => (
        <Form
          autoComplete="off"
          className={classes.container}
        >
          <Typography
            component="h4"
            style={{marginBottom:'30px',marginTop:'15px'}}
            variant="h4"
          >
            Lupa Kata Sandi?
          </Typography>
          <Typography
            component="h6"
            style={{color:'#323A3F',fontWeight:'400',textAlign:'center',width:'90%',marginBottom:'15px'}}
            variant="h6"
          >
            Mohon masukkan alamat email Anda. Kami akan mengirimkan tautan untuk mengatur ulang kata sandi Anda.
          </Typography>
          <div className={classes.form}>
            <Field
              autoComplete="off"
              component={TextFieldLogin}
              fullWidth
              helperText={touched.email && errors.email}
              InputProps={{
                endAdornment: check ? (
                  <InputAdornment position="start">
                    <img src={'/icon/check.png'} />
                  </InputAdornment>
                ) : (
                  <div />
                ),
              }}
              margin="normal"
              name="email"
              placeholder="Email"
              validate={validateEmail}
              variant="outlined"
            />
            <div className={classes.buttonContainer}>
              <Button
                color="primary"
                disabled={isSubmitting}
                fullWidth
                onClick={submitForm}
                style={{ color: '#165581', marginTop: 20 }}
                type="submit"
                variant="contained"
              >
                {
                  isSubmitting ? 
                    <CircularProgress
                      color="secondary"
                      size={24}
                    /> : 'Kirim'
                }
              </Button>
              <input
                style={{ display: 'none' }}
                type="submit"
              />
            </div>
          </div>
        </Form>
      )}
      initialValues={initialValues}
      onSubmit={async (value) => {
        await onSubmit(value);
      }}
    />
  );
};

ForgotForm.propTypes = ({
  initialValues: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired
});

export default ForgotForm;

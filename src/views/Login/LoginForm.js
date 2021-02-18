import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import { Button, makeStyles, CircularProgress, Link} from '@material-ui/core';
import { TextFieldLogin,TextFieldPassword } from 'components';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '90%',
    [theme.breakpoints.only('xs')]: {
      width: '95%'
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
  buttonContainer2: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(2),
    alignSelf: 'center',
  },
  rememberMe: {
    alignSelf: 'center',
    flex: 1,
  },
}));

const LoginForm = ({ initialValues, onSubmit }) => {
  const classes = useStyles();

  const validateEmail = (value) => {
    let error;
    
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(value)){
      error = 'Format email salah !';
    }

    if (!value) {
      error = 'Email tidak boleh kosong !';
    }

    return error;
    
  };

  const validatePassword = (value) => {
    let error;

    if (!value) {
      error = 'Kata Sandi tidak boleh kosong !';
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
          <div className={classes.form}>
            <Field
              autoComplete="off"
              component={TextFieldLogin}
              fullWidth
              helperText={touched.email && errors.email}
              margin="normal"
              name="email"
              placeholder="Email"
              validate={validateEmail}
              variant="outlined"
            />
            <Field
              autoComplete="off"
              component={TextFieldPassword}
              fullWidth
              helperText={touched.password && errors.password}
              margin="normal"
              name="password"
              placeholder="Kata Sandi"
              validate={validatePassword}
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
                    /> : 'Masuk'
                }
              </Button>
              <div className={classes.buttonContainer2}>
                <div className={classes.rememberMe} />
                <Link
                  color="secondary"
                  href="/auth/forgot-password"
                >
                  Lupa kata sandi ?
                </Link>
              </div>
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

LoginForm.propTypes = ({
  initialValues: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired
});

export default LoginForm;

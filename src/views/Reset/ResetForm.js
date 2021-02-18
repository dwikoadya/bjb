import React  from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import { Button, makeStyles, CircularProgress, Typography } from '@material-ui/core';
import { TextFieldPassword,TextFieldConfirmationPassword } from 'components';

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

const ResetForm = ({ initialValues, onSubmit }) => {
  const classes = useStyles();
  
  const validatePassword = (value) => {
    let error;
    if (!value) {
      error = 'Kata Sandi tidak boleh kosong !';
    }

    return error;
  };

  const validateConfirmationPassword = (value) => {
    let error;
    if (!value) {
      error = 'Konfirmasi Kata Sandi tidak boleh kosong !';
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
            style={{marginBottom:'30px',marginTop:'15px'}}
            variant="h3"
          >
              Ubah Kata Sandi
          </Typography>
          <Typography
            style={{color:'#323A3F',fontWeight:'400',textAlign:'center',width:'90%',marginBottom:'15px'}}
            variant="h8"
          >
              Buat kata sandi baru minimal 8 karakter yang terdiri dari kombinasi huruf, angka, dan simbol
          </Typography>
          <div className={classes.form}>
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
            <Field
              autoComplete="off"
              component={TextFieldConfirmationPassword}
              fullWidth
              helperText={touched.confirmation_password && errors.confirmation_password}
              margin="normal"
              name="confirmation_password"
              placeholder="Konfirmasi Kata Sandi"
              validate={validateConfirmationPassword}
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

ResetForm.propTypes = ({
  initialValues: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired
});

export default ResetForm;

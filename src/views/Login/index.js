/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import useStyles from './login-jss.js';
import LoginForm from './LoginForm';
import baseUrl from '../../services/baseUrl';
import env from '../../config/env';
import { AlertMessage } from 'components';

const Login = () => {
  const classes = useStyles();
  const initialValues = { 
    email: '',
    password: '',
    scope: 'admin',
    grant_type: 'password',
    client_id: `${env.client_id}`,
    client_secret: `${env.client_secret}`
  };
  const [error, setError] = useState({ message: '', type: 'error' });
  const [isError, setIsError] = useState(false);
  const handleSubmit = async (value) => {
    try {
      const { status, data } = await baseUrl.post(`${env.baseUrl}/oauth/token`, value);
      if (status === 200) {
        localStorage.setItem('token', data.access_token);
        window.location = '/dashboard';
      }
    } catch (err) {
      setIsError(true);
      setError({ message: 'Email atau Kata Sandi salah !', type: 'error' });
    }
  };
  const triggerSetError = (value) => {
    setIsError(value);
  };
  return (
    <div className={classes.mainContainer}>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <img
            alt="logo"
            className={classes.img}
            src={'/icon/logo.png'}
          />
          <AlertMessage
            message={error.message}
            open={isError}
            severity={error.type}
            triggerSetError={triggerSetError}
          />
          <Typography
            component="h1"
            style={{marginBottom:'15px',marginTop:'15px'}}
            variant="h3"
          >
            Masuk ke Dashboard
          </Typography>
          <LoginForm
            initialValues={initialValues}
            onSubmit={handleSubmit}
          />
        </CardContent>
      </Card>
    </div>
  );
};
export default Login;

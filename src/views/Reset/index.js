/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import useStyles from './reset-jss.js';
import ResetForm from './ResetForm';
import Updated from './Updated';
import baseUrl from '../../services/baseUrl';
import env from '../../config/env';
import { AlertMessage } from 'components';

const Login = () => {
  const classes = useStyles();
  const initialValues = { password: '', confirmation_password: '', grant_type: 'password' };
  const [isSuccess, setIsSuccess] = useState(true);
  const [error, setError] = useState({ message: '', type: 'error' });
  const [isError, setIsError] = useState(false);
  const handleSubmit = async (value) => {
    if(value.password !== value.confirmation_password){
      setIsError(true);
      setError({ message: 'konfirmasi kata sandi tidak sama ! ', type: 'error' });
    }else{
      try {
        const { status, data } = await baseUrl.post(`${env.baseUrl}/oauth/token?scope=read write`, value);
        if (status === 200) {
          const { access_token, refresh_token, user, user: { user_office } } = data;
          localStorage.setItem('token', access_token);
          localStorage.setItem('refresh_token', refresh_token);
          localStorage.setItem('name', user.first_name + ' ' + user.last_name);
          localStorage.setItem('id', user._id.$oid);
          localStorage.setItem('position', user.position);
          localStorage.setItem('user_role', JSON.stringify(user.user_role.role_modules));
          localStorage.setItem('role_name', user.user_role.role_description);
          localStorage.setItem('office_id', user_office.officeable_id.$oid);
          localStorage.setItem('office_type', user_office.officeable_type);
          window.location = '/app/home/dashboard';
          setIsSuccess(false);
        }
      } catch (err) {
        const { response: { status, data: { message, status_code } } } = err;
        const errMsg = (message === 'user locked') ? 'Maaf akun anda diblokir sementara selama 30 '
        + 'menit karena 3x salah memasukkan kata sandi. Silahkan coba lagi setelah 30 menit' : message;
        setIsError(true);
        setError({ message: errMsg, type: 'error' });
      }
    }
  }
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
          { 
            isSuccess ?
              <ResetForm
                initialValues={initialValues}
                onSubmit={handleSubmit}
              />
              : 
              <Updated />
          }
        </CardContent>
      </Card>
    </div>
  );
};
export default Login;

/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import useStyles from './forgot-jss';
import SentEmail from './SentEmail';
import { CardContent, Link } from '@material-ui/core';
import ForgotForm from './ForgotForm';
import baseUrl from '../../services/baseUrl';
import env from '../../config/env';
import { AlertMessage } from 'components';

const Forgot = () => {
  const classes = useStyles();
  const initialValues = { email: '', password: '', grant_type: 'password' };
  const [error, setError] = useState({ message: '', type: 'error' });
  const [isError, setIsError] = useState(false);
  const [email, setEmail] = useState(true);
  const [isSent, setIsSent] = useState(true);
  const handleSubmit = async (value) => {
    try {
      setEmail(value.email)
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
        setIsSent(false);
      }
    } catch (err) {
      const { response: { status, data: { message, status_code } } } = err;
      const errMsg = (message === 'user locked') ? 'Maaf akun anda diblokir sementara selama 30 '
      + 'menit karena 3x salah memasukkan kata sandi. Silahkan coba lagi setelah 30 menit' : message;
      setIsError(true);
      setError({ message: errMsg, type: 'error' });
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
          { 
            isSent ?
              <ForgotForm
                initialValues={initialValues}
                onSubmit={handleSubmit}
              />
              : 
              <SentEmail initialValues={email} />
          }

          <div className={classes.buttonContainer2}>
            <div className={classes.rememberMe} />
            Punya akun? 
            <Link
              color="secondary"
              href="/"
              style={{marginLeft:'5px'}}
            >
              Masuk
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default Forgot;

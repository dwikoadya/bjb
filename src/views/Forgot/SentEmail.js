import React  from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import useStyles from './forgot-jss.js';

const SentEmail = ({ initialValues }) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <img
        alt="logo"
        className={classes.img2}
        src={'/icon/sent-mail.png'}
      />
      <Typography
        component="h4"
        style={{marginBottom:'30px',marginTop:'15px'}}
        variant="h4"
      >
        Email Terkirim
      </Typography>
      <Typography
        component="h6"
        style={{color:'#323A3F',fontWeight:'400',textAlign:'center',width:'90%',marginBottom:'15px'}}
        variant="h6"
      >
        Kami telah mengirimkan tautan ke alamat email {initialValues} untuk mengatur ulang kata sandi Anda.
      </Typography>
    </div>
  );
};

SentEmail.propTypes = ({
  initialValues: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired
});

export default SentEmail;

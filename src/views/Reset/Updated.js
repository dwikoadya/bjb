import React  from 'react';
import PropTypes from 'prop-types';
import { Typography, Link } from '@material-ui/core';
import useStyles from './reset-jss';

const Updated = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <img
        alt="logo"
        className={classes.img2}
        src={'/icon/updated-email.png'}
      />
      <Typography
        component="h1"
        style={{marginBottom:'30px',marginTop:'15px'}}
        variant="h5"
      >
                Kata Sandi Berhasil Diubah!
      </Typography>
      <Typography
        component="h8"
        style={{color:'#323A3F',fontWeight:'400',textAlign:'center',width:'90%',marginBottom:'15px'}}
        variant="h8"
      >
                Silahkan masuk kembali dengan menggunakan kata sandi baru Anda
      </Typography>
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
    </div>
  );
};

Updated.propTypes = ({
  initialValues: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired
});

export default Updated;

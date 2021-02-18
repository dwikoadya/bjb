import React, { Fragment, Suspense, useEffect } from 'react';
import { renderRoutes } from 'react-router-config';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { LinearProgress } from '@material-ui/core';
import useRouter from 'utils/useRouter';

const useStyles = makeStyles(() => ({
  content: {
    height: '100%',
  }
}));

const Auth = props => {
  const { route } = props;

  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      router.history.push('/dashboard');
      return;
    }
  }, [router]);

  const classes = useStyles();

  return (
    <Fragment>
      <main className={classes.content}>
        <Suspense fallback={<LinearProgress />}>
          {renderRoutes(route.routes)}
        </Suspense>
      </main>
    </Fragment>
  );
};

Auth.propTypes = {
  route: PropTypes.object
};

export default Auth;

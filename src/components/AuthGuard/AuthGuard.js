import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';

import useRouter from 'utils/useRouter';

// Example of user roles: ['GUEST', 'USER', 'ADMIN'];

const AuthGuard = props => {
  const { children } = props;

  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      router.history.push('/auth/login');
      return;
    }

  }, [router]);

  return <Fragment>{children}</Fragment>;
};

AuthGuard.propTypes = {
  children: PropTypes.node,
  roles: PropTypes.array.isRequired
};

AuthGuard.defaultProps = {
  roles: []
};

export default AuthGuard;

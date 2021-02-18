import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

function Breadcrumb({ route }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Breadcrumbs 
        aria-label="breadcrumb"
        separator={<NavigateNextIcon fontSize="small" />}
      >
        {
          route.map(([label, path], index) => (
            <Link 
              key={index}
              to={path} 
            >
              <Typography 
                color="textPrimary"
                component="h2"
                variant="subtitle1"
              >{label}</Typography>
            </Link>
          ))
        }
      </Breadcrumbs>
    </div>
  );
}

Breadcrumb.propTypes = {
  route: PropTypes.array
};

export default Breadcrumb;
import React from 'react';
import { 
  Typography,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const CustomText = withStyles(() => ({
  root: {
    margin: '10px 0 30px 0',
    textOoverflow: 'ellipsis'
  },
}))(Typography);

const FieldDisplay = ({ data, label }) => {
  return(
    <>
      <Typography
        component="p"
        variant="body1"
      >
        {label}
      </Typography>
      <CustomText
        color={'textPrimary'}
        component="p"
        variant="body1"
      >
        {data}
      </CustomText>
    </>
  )
}

FieldDisplay.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.node,
  ]),
  label: PropTypes.string,
};

export default FieldDisplay;
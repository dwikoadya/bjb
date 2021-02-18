import React, { Fragment, useRef, useState, memo } from 'react';
import PropTypes from 'prop-types';
import {
  ListItemText,
  Tooltip,
  IconButton,
  Menu,
  MenuItem
} from '@material-ui/core';
import MoreIcon from '@material-ui/icons/MoreVert';
import { withStyles } from '@material-ui/core/styles';

const StyledMenuItem = withStyles(() => ({
  root: {
    width: '108px',
  },
}))(MenuItem);

const MoreButton = props => {
  const { id, getValue } = props;
  const moreRef = useRef(null);
  const [openMenu, setOpenMenu] = useState(false);

  const handleMenuOpen = () => {
    setOpenMenu(true);
  };

  const handleMenuClose = () => {
    setOpenMenu(false);
  };

  return (
    <Fragment>
      <Tooltip title="More options">
        <IconButton
          onClick={handleMenuOpen}
          ref={moreRef}
          size="small"
        >
          <MoreIcon />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={moreRef.current}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        classes={{ root :{width: '250px'} }}
        onClose={handleMenuClose}
        open={openMenu}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <StyledMenuItem>
          <ListItemText 
            onClick={()=>{getValue('Ubah',id)}} 
            primary="Ubah" 
          />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemText 
            onClick={()=>{getValue('Hapus',id)}} 
            primary="Hapus" 
          />
        </StyledMenuItem>
      </Menu>
    </Fragment>
  );
};

MoreButton.propTypes = {
  className: PropTypes.string,
  getValue: PropTypes.func,
  id: PropTypes.number,
};

export default memo(MoreButton);

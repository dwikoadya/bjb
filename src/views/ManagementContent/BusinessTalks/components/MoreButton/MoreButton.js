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

const MoreButton = props => {
  const { 
    showDeleteConfirmation, 
    showDataDetailModal, 
    index, 
    showChangeStatusConfirmation,
    status,
  } = props;
  const moreRef = useRef(null);
  const [openMenu, setOpenMenu] = useState(false);

  const handleMenuOpen = () => {
    setOpenMenu(true);
  };

  const handleMenuClose = () => {
    setOpenMenu(false);
  };

  const showModal = () => {
    showDataDetailModal(index);
    handleMenuClose();
  };

  const showConfirmation = () => {
    showDeleteConfirmation(index);
    handleMenuClose();
  };

  const showStatusConfirmation = (status) => {
    showChangeStatusConfirmation(index, status);
    handleMenuClose();
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
        onClose={handleMenuClose}
        open={openMenu}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <MenuItem onClick={showModal}>
          <ListItemText primary="Ubah" />
        </MenuItem>
        <MenuItem onClick={() => showStatusConfirmation(status === 'show' ? 'hide' : 'show')}>
          <ListItemText primary={`${status === 'show' ? 'Sembunyikan' : 'Perlihatkan'}`} />
        </MenuItem>
        <MenuItem onClick={() => showConfirmation('show')}>
          <ListItemText primary="Hapus" />
        </MenuItem>
      </Menu>
    </Fragment>
  );
};

MoreButton.propTypes = {
  className: PropTypes.string,
  index: PropTypes.number,
  showChangeStatusConfirmation: PropTypes.func,
  showDataDetailModal: PropTypes.func,
  showDeleteConfirmation: PropTypes.func,
  status: PropTypes.string,
};

export default memo(MoreButton);
/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import {
  AppBar,
  Typography,
  Button,
  IconButton,
  Toolbar,
  Hidden,
  Input,
  Popper,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ClickAwayListener,
  InputAdornment,
  Box
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { NotificationsPopover } from 'components';
import axios from 'utils/axios';
import useRouter from 'utils/useRouter';
import { logout } from 'actions';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import useStyles from './topbar-jss.js';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    elevation={0}
    getContentAnchorEl={null}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    width: '250px',
  },
}))(MenuItem);

const TopBar = props => {
  const { onOpenNavBarMobile, className, ...rest } = props;

  const classes = useStyles();
  const { history } = useRouter();
  const searchRef = useRef(null);
  const dispatch = useDispatch();
  const notificationsRef = useRef(null);
  const [pricingModalOpen, setPricingModalOpen] = useState(false);
  const [openSearchPopover, setOpenSearchPopover] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [openNotifications, setOpenNotifications] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleLogout = () => {
    history.push('/auth/login');
    localStorage.clear();
    dispatch(logout());
  };

  const handlePricingOpen = () => {
    setPricingModalOpen(true);
  };

  const handlePricingClose = () => {
    setPricingModalOpen(false);
  };

  const handleNotificationsOpen = () => {
    setOpenNotifications(true);
  };

  const handleNotificationsClose = () => {
    setOpenNotifications(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const handleSearchChange = event => {
    setSearchValue(event.target.value);

    if (event.target.value) {
      if (!openSearchPopover) {
        setOpenSearchPopover(true);
      }
    } else {
      setOpenSearchPopover(false);
    }
  };

  const handleSearchPopverClose = () => {
    setOpenSearchPopover(false);
  };

  const popularSearches = [
  ];

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
      color="#FFFFFF"
    >
      <Toolbar>
        <div className={classes.flexGrow} />
        <Hidden smDown>
          <Box
            border={1}
            borderColor="#C4C4C4"
            borderRadius={20}
            className={classes.box}
          >
            <Input
              className={classes.searchInput}
              disableUnderline
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                  >
                    <SearchIcon className={classes.searchIcon} />
                  </IconButton>
                </InputAdornment>
              }
              id="standard-start-adornment"
              onChange={handleSearchChange}
              placeholder="Cari..."
              value={searchValue}
            />
          </Box>
          <Popper
            anchorEl={searchRef.current}
            className={classes.searchPopper}
            open={openSearchPopover}
            transition
          >
            <ClickAwayListener onClickAway={handleSearchPopverClose}>
              <Paper
                className={classes.searchPopperContent}
                elevation={3}
              >
                <List>
                  {popularSearches.map(search => (
                    <ListItem
                      button
                      key={search}
                      onClick={handleSearchPopverClose}
                    >
                      <ListItemIcon>
                        <SearchIcon />
                      </ListItemIcon>
                      <ListItemText primary={search} />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </ClickAwayListener>
          </Popper>
        </Hidden>
        <Hidden mdDown>
          <IconButton
            className={classes.notificationsButton}
            color="inherit"
            onClick={handleNotificationsOpen}
            ref={notificationsRef}
          >
            <img src={'/icon/notification.png'} />
          </IconButton>
          <Button
            className={classes.logoutButton}
            color="inherit"
            onClick={handleClick}
          >
            <img src={'/icon/user.png'} />
            <div className={classes.profile}>
              <Typography
                className={classes.txt1}
                component="div"
                variant="h5"
              >
                <Box>
                  Super Admin
                </Box>
              </Typography>
              <Typography
                className={classes.txt1}
                component="div"
                variant="h7"
              >
                <Box >
                  superadmin@bankbjb.co.id
                </Box>
              </Typography>
            </div>
            <ExpandMoreIcon/>
          </Button>
        </Hidden>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onOpenNavBarMobile}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
      <NotificationsPopover
        anchorEl={notificationsRef.current}
        notifications={notifications}
        onClose={handleNotificationsClose}
        open={openNotifications}
      />
      <StyledMenu
        anchorEl={anchorEl}
        id="customized-menu"
        keepMounted
        onClose={handleClose}
        open={Boolean(anchorEl)}
      >
        <StyledMenuItem>
          <ListItemText color="white">Profil</ListItemText>
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemText color="white">Ubah Kata Sandi</ListItemText>
        </StyledMenuItem>
        <StyledMenuItem divider>
          <ListItemText>Pengaturan</ListItemText>
        </StyledMenuItem>
        <StyledMenuItem onClick={handleLogout}>
          <ListItemText color="white">Keluar</ListItemText>
          <ListItemIcon>
            <img src="/icon/log-out.png"/>
          </ListItemIcon>
        </StyledMenuItem>
      </StyledMenu>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onOpenNavBarMobile: PropTypes.func
};

export default TopBar;

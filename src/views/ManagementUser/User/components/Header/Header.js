/* eslint-disable react/no-multi-comp */
/* eslint-disable react/jsx-no-undef */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  CardContent,
  Typography,
  Grid,
  Button,
  Box,
  TextField,
  Select,
  MenuItem,
  Hidden
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import useStyles from '../components-jss';
import { useSelector } from 'react-redux';

const CustomTextField = withStyles((theme) => ({
  root: {
    '& .MuiOutlinedInput-root': {
      paddingLeft: 5,
      paddingRight: 5,
      paddingTop:0,
      paddingBottom:0,
      marginLeft:5,
      height:40,
      '& fieldset': {
        borderColor: '#C4C4C4',
        borderRadius:50,
      },
      '&:hover fieldset': {
        borderColor: theme.palette.primary,
        borderRadius:50,
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.primary,
        borderRadius:50,
      },
    },
  },
}))(TextField);

const Header = props => {
  const { className, setShowModal, dataPerPage, setDataPerPage } = props;
  const [action, setAction] = useState('Suspend');
  const { data: listRoles } = useSelector(state => state.role);
  const { data: listJobPositions } = useSelector(state => state.jobPosition);

  const classes = useStyles();

  const renderPerPage = () => (
    <Select
      className={clsx(classes.select, classes.space)}
      name="perPage"
      onChange={(e) => setDataPerPage(e.target.value)}
      value={dataPerPage}
      variant="outlined"
    >
      <MenuItem value={5}>5 Data</MenuItem>
      <MenuItem value={10}>10 Data</MenuItem>
      <MenuItem value={15}>15 Data</MenuItem>
      <MenuItem value={25}>25 Data</MenuItem>
    </Select>
  );

  const renderAction = () => (
    <Select
      className={classes.select}
      name="perPage"
      onChange={(event)=>{
        setAction(event.target.value)
      }}
      value={action}
      variant="outlined"
    >
      <MenuItem value={'Suspend'}>Suspend</MenuItem>
      <MenuItem value={'Lift Ban'}>Lift Ban</MenuItem>
      <MenuItem value={'Hapus'}>Hapus</MenuItem>
    </Select>
  );

  const renderJabatan = () => (
    <Select
      className={classes.select}
      defaultValue="3"
      name="perPage"
      variant="outlined"
    >
      {
        listJobPositions.map((item, index) => (
          <MenuItem 
            key={index}
            value={item.id}
          >
            {item.name}
          </MenuItem>
        ))
      }
    </Select>
  );

  const renderRole = () => (
    <Select
      className={classes.select}
      defaultValue="7"
      name="perPage"
      variant="outlined"
    >
      {
        listRoles.map((item, index) => (
          <MenuItem 
            key={index}
            value={item.id}
          >
            {item.name}
          </MenuItem>
        ))
      }
    </Select>
  );

  const renderSearch = () => (
    <CustomTextField
      className={classes.textField}
      name="perPage"
      placeholder="Cari nama/NIP"
      variant="outlined"
    />
  );
  
  const addUser = () => {
    setShowModal(true);
  };

  return (
    <div
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <div className={classes.root}>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <Typography variant="h3">Daftar User</Typography>
              <Typography
                style={{marginTop:'5px'}}
                variant="h6"
              >Atur tipe level akun yang dapat mengakses halaman dashboard BJB DiSentra.</Typography>
            </Grid>
            <Hidden mdDown>
              <Grid
                item
                md={6}
                xs={12}
              >
                <Box
                  display="flex"
                  flexDirection="row-reverse"
                >
                  <Button
                    className={classes.leftToolbar}
                    color="primary"
                    onClick={addUser}
                    type="submit"
                    variant="contained"
                  >
                    <Typography variant="button">Tambah User</Typography>
                  </Button>
                  <div className={classes.leftToolbar}>
                    <Typography variant="h6">Tampilkan: </Typography>
                    {renderPerPage()}
                  </div>
                </Box>
              </Grid>
            </Hidden>
            <Hidden mdUp>
              <Grid
                item
                md={6}
                xs={12}
              >
                <div className={classes.leftToolbar}>
                  <Typography variant="h6">Tampilkan:</Typography>
                  {renderPerPage()}
                </div>
              </Grid>
            </Hidden>
          </Grid>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <div className={classes.leftToolbar}>
                <Typography variant="h6">Tindakan: </Typography> 
                {renderAction()}
              </div>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <Box
                display="flex"
                flexDirection="row-reverse"
              >
                <Hidden mdDown>
                  <div className={classes.leftToolbar} />
                </Hidden>
              </Box>
            </Grid>
            <Hidden mdUp>
              <Grid
                container
                md={12}
                xs={12}
              />
            </Hidden>
          </Grid>
        </div>
      </CardContent>
    </div>
  );
};

Header.propTypes = {
  className: PropTypes.string,
  dataPerPage: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onSearch: PropTypes.func,
  setDataPerPage: PropTypes.func,
  setShowModal: PropTypes.func
};

export default Header;

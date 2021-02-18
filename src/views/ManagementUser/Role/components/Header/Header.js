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
  const { className, setShowModal, resultSearch } = props;
  const [action, setAction] = useState('Ubah');
  const [search, setSearch] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const classes = useStyles();

  const renderPerPage = () => (
    <Select
      className={classes.select}
      name="perPage"
      onChange={(event)=>{
        setRowsPerPage(event.target.value)
      }}
      value={rowsPerPage}
      variant="outlined"
    >
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
      <MenuItem value={'Ubah'}>Ubah</MenuItem>
      <MenuItem value={'Hapus'}>Hapus</MenuItem>
    </Select>
  );

  const renderSearch = () => (
    <CustomTextField
      className={classes.textField}
      name="perPage"
      onChange={(event)=>{
        setSearch(event.target.value)
      }}
      placeholder="Cari nama role..."
      value={search}
      variant="outlined"
    />
  );
  
  const addRole = () => {
    setShowModal(true);
  };

  function filterSearch(){
    resultSearch(search)
  }

  function resetSearch(){
    setSearch('')
    resultSearch(search)
  }

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
              <Typography variant="h3">Daftar Role</Typography>
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
                    onClick={addRole}
                    type="submit"
                    variant="contained"
                  >
                    <Typography variant="button">Tambah Role</Typography>
                  </Button>
                  <div className={classes.leftToolbar}>
                    Tampilkan: {renderPerPage()}
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
                    Tampilkan: {renderPerPage()}
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
                  Tindakan: {renderAction()}
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
                  <Button
                    className={classes.btn}
                    onClick={()=>{resetSearch()}}
                    type="submit"
                    variant="outlined"
                  >
                    <Typography variant="button">Reset</Typography>
                  </Button>
                  <Button
                    className={classes.btn}
                    color="secondary"
                    onClick={()=>{filterSearch()}}
                    type="submit"
                    variant="contained"
                  >
                    <Typography color="primary">Terapkan</Typography>
                  </Button>
                </Hidden>
                <div className={classes.leftToolbar}>
                    Filter : {renderSearch()}
                </div>
              </Box>
            </Grid>
            <Hidden mdUp>
              <Grid
                container
                md={12}
                xs={12}
              >
                <Button
                  className={classes.btn}
                  onClick={addRole}
                  type="submit"
                  variant="outlined"
                >
                  <Typography variant="button">Reset</Typography>
                </Button>
                <Button
                  className={classes.btn}
                  color="secondary"
                  onClick={addRole}
                  type="submit"
                  variant="contained"
                >
                  <Typography color="primary">Terapkan</Typography>
                </Button>
                <Button
                  className={classes.btn2}
                  color="primary"
                  onClick={addRole}
                  type="submit"
                  variant="contained"
                >
                  <Typography variant="button">Tambah</Typography>
                </Button>
              </Grid>
            </Hidden>
          </Grid>
        </div>
      </CardContent>
    </div>
  );
};

Header.propTypes = {
  className: PropTypes.string,
  resultSearch: PropTypes.func,
  setShowModal: PropTypes.func,
};

export default Header;

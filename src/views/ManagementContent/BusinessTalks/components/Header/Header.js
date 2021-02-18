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
  Select,
  MenuItem,
  Hidden,
  TextField
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import useStyles from '../components-jss';
import { KeyboardDatePicker } from '@material-ui/pickers';
import moment from 'moment';

const CustomDatePicker = withStyles((theme) => ({
  root: {
    '& .MuiInput-underline:before': {
      border: 'none'
    },
    '& .MuiInput-underline:after': {
      border: 'none'
    },
    width: 180,
    marginLeft: theme.spacing(2),
    border: '1px solid #C4C4C4',
    borderRadius: 50,
    padding: theme.spacing(0.5,2),
  }
}))(KeyboardDatePicker);

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
  const { 
    className, 
    setShowModal, 
    dataPerPage, 
    setDataPerPage, 
    executeFilter,
    resetFilter,
    setTitle,
    end_date, 
    start_date, 
    setStartDate,
    setEndDate,
    setTalkType,
    talk_type, 
    title, 
  } = props;
  const [action, setAction] = useState('Sembunyikan');

  const classes = useStyles();

  const renderPerPage = () => (
    <Select
      className={clsx(classes.select, classes.space)}
      name="perPage"
      onChange={(e) => setDataPerPage(e.target.value)}
      value={dataPerPage}
      variant="outlined"
    >
      <MenuItem value={10}>10 Data</MenuItem>
      <MenuItem value={50}>50 Data</MenuItem>
      <MenuItem value={100}>100 Data</MenuItem>
      <MenuItem value={200}>200 Data</MenuItem>
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
      <MenuItem value={'Sembunyikan'}>Sembunyikan</MenuItem>
      <MenuItem value={'Hapus'}>Hapus</MenuItem>
    </Select>
  );

  const renderStartDate = () => (
    <>
      <CustomDatePicker
        autoOk
        disableToolbar
        format="DD-MMM-YYYY"
        inputVariant="standard"
        onChange={(value) => setStartDate(moment(value).format('YYYY-MM-DD'))}
        value={start_date}
        variant="inline"
      />
    </>
  );

  const renderEndDate = () => (
    <>
      <CustomDatePicker
        autoOk
        disableToolbar
        format="DD-MMM-YYYY"
        inputVariant="standard"
        minDate={start_date}
        onChange={(value) => setEndDate(moment(value).format('YYYY-MM-DD'))}
        value={end_date}
        variant="inline"
      />
    </>
  );

  const renderCategory = () => (
    <Select
      className={classes.select}
      name="perPage"
      onChange={(event) => {
        setTalkType(event.target.value)
      }}
      value={talk_type}
      variant="outlined"
    >
      <MenuItem value={'$'}>Semua</MenuItem>
      <MenuItem value={'sentraminar'}>Sentraminar</MenuItem>
      <MenuItem value={'grupchat'}>Group Chat</MenuItem>
    </Select>
  );

  const renderSearch = () => (
    <CustomTextField
      className={classes.textField}
      name="perPage"
      onChange={(event)=>{
        setTitle(event.target.value)
      }}
      placeholder="Cari Judul..."
      value={title}
      variant="outlined"
    />
  );

  const addContent = () => {
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
              <Typography variant="h3">Bincang Bisnis</Typography>
              <Typography
                style={{marginTop:'5px'}}
                variant="h6"
              >Atur konten Bincang Bisnis untuk aplikasi mobile DiSentra</Typography>
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
                    onClick={addContent}
                    type="submit"
                    variant="contained"
                  >
                    <Typography variant="button">Tambah Konten</Typography>
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
                  <div className={classes.leftToolbar}>
                    {renderSearch()}
                    {renderCategory()}
                  </div>
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
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={4}
              xs={12}
            />
            <Grid
              item
              md={8}
              xs={12}
            >
              <Box
                alignItems="center"
                display="flex"
                flexDirection="row-reverse"
              >
                {renderEndDate()}
                <Typography variant="h6">&nbsp;Sampai</Typography>
                {renderStartDate()}
                <Typography variant="h6">Dari</Typography>
              </Box>
            </Grid>            
          </Grid>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={9}
              xs={12}
            />
            <Grid
              item
              md={3}
              xs={12}
            >
              <Box
                display="flex"
                flexDirection="row-reverse"
              >
                <Hidden mdDown>
                  <Button
                    className={classes.btn}
                    onClick={resetFilter}
                    type="button"
                    variant="outlined"
                  >
                    <Typography variant="button">Reset</Typography>
                  </Button>
                  <Button
                    className={classes.btn}
                    color="secondary"
                    onClick={executeFilter}
                    type="button"
                    variant="contained"
                  >
                    <Typography variant="buttonSecondary">Terapkan</Typography>
                  </Button>
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
  end_date: PropTypes.object, 
  executeFilter: PropTypes.func,
  onSearch: PropTypes.func,
  resetFilter: PropTypes.func,
  setDataPerPage: PropTypes.func,
  setEndDate: PropTypes.func,
  setShowModal: PropTypes.func,
  setStartDate: PropTypes.func,
  setTalkType: PropTypes.func,
  setTitle: PropTypes.func,
  start_date: PropTypes.object, 
  talk_type: PropTypes.string, 
  title: PropTypes.string, 
};

export default Header;

import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import useStyles from './result-jss';
import { withStyles } from '@material-ui/core/styles';
import {
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Button,
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { TableEditBar } from 'components';
import { MoreButton } from '../index';
import { useDispatch, useSelector } from 'react-redux';
import { setUserDataDetail } from 'actions';

const CardFooter = withStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    padding: '30px 0',
  }
}))(CardActions);

const Results = props => {
  const { 
    className, 
    onChangePage,
    setShowDataDetail, 
    setIsEdit, 
    showDeleteConfirmation, 
    showChangeStatusConfirmation,
  } = props;

  const classes = useStyles();
  const dispatch = useDispatch();

  const { data, pagination } = useSelector(state => state.user);
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(pagination?.current_page - 1 ?? 0)
  }, [pagination]);

  const handleSelectAll = event => {
    const selectedCustomers = event.target.checked
      ? data.map(customer => customer.id)
      : [];

    setSelectedCustomers(selectedCustomers);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomers.indexOf(id);
    let newSelectedCustomers = [];

    if (selectedIndex === -1) {
      newSelectedCustomers = newSelectedCustomers.concat(selectedCustomers, id);
    } else if (selectedIndex === 0) {
      newSelectedCustomers = newSelectedCustomers.concat(
        selectedCustomers.slice(1)
      );
    } else if (selectedIndex === selectedCustomers.length - 1) {
      newSelectedCustomers = newSelectedCustomers.concat(
        selectedCustomers.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedCustomers = newSelectedCustomers.concat(
        selectedCustomers.slice(0, selectedIndex),
        selectedCustomers.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomers(newSelectedCustomers);
  };

  const showDataDetailModal = (index, noEdit) => {
    if (!noEdit) {
      setIsEdit(true); 
    }
    dispatch(setUserDataDetail({
      payload: data[index]
    }))
    setShowDataDetail(true);
  }  

  return (
    <div
      className={clsx(classes.root, className)}
    >
      <Card>
        <Divider />
        <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div className={classes.inner}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedCustomers.length === data.length}
                        color="primary"
                        indeterminate={
                          selectedCustomers.length > 0 &&
                          selectedCustomers.length < data.length
                        }
                        onChange={handleSelectAll}
                      />
                    </TableCell>
                    <TableCell>Nama</TableCell>
                    <TableCell>NIP</TableCell>
                    <TableCell>Jabatan</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell align="right" />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((customer, index) => (
                    <TableRow
                      hover
                      key={index}
                      selected={selectedCustomers.indexOf(customer.id) !== -1}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={
                            selectedCustomers.indexOf(customer.id) !== -1
                          }
                          color="primary"
                          onChange={event =>
                            handleSelectOne(event, customer.id)
                          }
                          value={selectedCustomers.indexOf(customer.id) !== -1}
                        />
                      </TableCell>
                      <TableCell>
                        <div className={classes.nameCell}>
                          <div>
                            <Typography
                              color="inherit"
                              component="a"
                              onClick={() => showDataDetailModal(index, 'noEdit')}
                              variant="h6"
                            >
                              {customer.name}
                            </Typography>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{customer?.user_profile?.nip}</TableCell>
                      <TableCell>
                        {customer?.user_profile?.job_position.name}
                      </TableCell>
                      <TableCell>{customer?.email}</TableCell>
                      <TableCell>{customer?.roles?.name}</TableCell>
                      <TableCell align="right">
                        <MoreButton 
                          color="secondary" 
                          index={index}
                          showChangeStatusConfirmation={showChangeStatusConfirmation}
                          showDataDetailModal={showDataDetailModal}
                          showDeleteConfirmation={showDeleteConfirmation}
                          status={customer.status}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </PerfectScrollbar>
        </CardContent>
        <CardFooter className={classes.actions}>
          <div className={classes.paginationButton}>
            <Button
              color="secondary"
              onClick={() => onChangePage('prev')}
              variant="contained"
            >
              <ChevronLeftIcon />
            </Button>
            <Typography
              component="h1"
              variant="subtitle1"
            >
              {pagination?.current_page || 1}
            </Typography>
            <Button
              color="secondary"
              onClick={() => onChangePage('next')}
              variant="contained"
            >
              <ChevronRightIcon />
            </Button>
          </div>
          <div className={classes.paginationInfo}>
            <Typography
              color="secondary"
            >
              Halaman {pagination?.current_page || 1} dari {pagination?.total_pages || 1}
            </Typography>
          </div>
        </CardFooter>
      </Card>
      <TableEditBar selected={selectedCustomers} />
    </div>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  onChangePage: PropTypes.func,
  setIsEdit: PropTypes.func,
  setShowDataDetail: PropTypes.func,
  showChangeStatusConfirmation: PropTypes.func,
  showDeleteConfirmation: PropTypes.func,
};

Results.defaultProps = {
  customers: []
};

export default Results;
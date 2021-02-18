import React, { useState } from 'react';
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
  Link,
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { TableEditBar } from 'components';
import { MoreButton } from '../index';
import { useDispatch, useSelector } from 'react-redux';
import { setBannerDataDetail } from 'actions';

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

  const { data, pagination } = useSelector(state => state.banner);
  const [selectedCustomers, setSelectedCustomers] = useState([]);

  const handleSelectAll = event => {
    const selectedCustomers = event.target.checked
      ? data.map(content => content.id)
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
    dispatch(setBannerDataDetail({
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
                    <TableCell>Gambar</TableCell>
                    <TableCell>Kategori</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Aksi</TableCell>
                    <TableCell align="right" />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((content, index) => (
                    <TableRow
                      hover
                      key={index}
                      selected={selectedCustomers.indexOf(content.id) !== -1}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={
                            selectedCustomers.indexOf(content.id) !== -1
                          }
                          color="primary"
                          onChange={event =>
                            handleSelectOne(event, content.id)
                          }
                          value={selectedCustomers.indexOf(content.id) !== -1}
                        />
                      </TableCell>
                      <TableCell>
                        <div className={classes.nameCell}>
                          <div>
                           <img   
                            src={ content?.image?.url } 
                            alt="banner"
                            className={classes.banner}
                            onClick={() => showDataDetailModal(index, 'noEdit')} 
                          />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {content.banner_type}
                      </TableCell>
                      <TableCell>
                        {content.created_at}
                      </TableCell>
                      <TableCell>
                        <Link 
                          color="secondary"
                          href={content.link}
                          target="_blank" 
                          underline="always"
                          variant="subtitle1"
                        >
                          {content.link}
                        </Link>
                      </TableCell>
                      <TableCell align="right">
                        <MoreButton 
                          color="secondary" 
                          index={index}
                          showChangeStatusConfirmation={showChangeStatusConfirmation}
                          showDataDetailModal={showDataDetailModal}
                          showDeleteConfirmation={showDeleteConfirmation}
                          status={content.status}
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
  contents: []
};

export default Results;
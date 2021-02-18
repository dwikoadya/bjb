/* eslint-disable react/no-multi-comp */
/* eslint-disable react/sort-prop-types */
import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  CardActions,
  CardContent,
  Checkbox,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@material-ui/core';
import { TableEditBar } from 'components';
import { MoreButton } from '../index';
import { withStyles } from '@material-ui/core/styles';
import useStyles from '../components-jss';

const CustomTableCell = withStyles((theme) => ({
  root: {
    ...theme.typography.titleTable,
    borderBottom: `1px solid ${theme.palette.divider}`
  },
}))(TableCell);


const Results = props => {
  const { className, Roles, getValueAction, } = props;
  
  const classes = useStyles();
  
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
 
  
  const handleSelectAll = event => {
    const selectedRoles = event.target.checked
      ? Roles.map(role => role.id)
      : [];
    
    setSelectedRoles(selectedRoles);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedRoles.indexOf(id);
    let newSelectedRoles = [];

    if (selectedIndex === -1) {
      newSelectedRoles = newSelectedRoles.concat(selectedRoles, id);
    } else if (selectedIndex === 0) {
      newSelectedRoles = newSelectedRoles.concat(
        selectedRoles.slice(1)
      );
    } else if (selectedIndex === selectedRoles.length - 1) {
      newSelectedRoles = newSelectedRoles.concat(
        selectedRoles.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedRoles = newSelectedRoles.concat(
        selectedRoles.slice(0, selectedIndex),
        selectedRoles.slice(selectedIndex + 1)
      );
    }

    setSelectedRoles(newSelectedRoles);
  };

  const handleChangePage = (event, page) => {
    setPage(page);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(event.target.value);
  };

  return (
    <div
      className={clsx(classes.root, className)}
    >
      <Typography
        color="textSecondary"
        gutterBottom
        variant="body2"
      />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedRoles.length === Roles.length}
                      color="primary"
                      indeterminate={
                        selectedRoles.length > 0 &&
                          selectedRoles.length < Roles.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <CustomTableCell>Nama Role</CustomTableCell>
                  <CustomTableCell>Deskripsi</CustomTableCell>
                  <TableCell align="right" />
                </TableRow>
              </TableHead>
              <TableBody>
                {Roles.slice(0, rowsPerPage).map(role => (
                  <TableRow
                    hover
                    key={role.id}
                    selected={selectedRoles.indexOf(role.id) !== -1}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={
                          selectedRoles.indexOf(role.id) !== -1
                        }
                        color="primary"
                        onChange={event =>
                          handleSelectOne(event, role.id)
                        }
                        value={selectedRoles.indexOf(role.id) !== -1}
                      />
                    </TableCell>
                    <TableCell>{role.name}</TableCell>
                    <TableCell width="70%">{role.description}</TableCell>
                    <TableCell align="right">
                      <MoreButton
                        color="secondary"
                        getValue={(type,val)=>{
                          if (val !== null){
                            getValueAction(type,val)
                          }
                        }}
                        id={role.id}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <CardActions className={classes.actions}>
        <TablePagination
          component="div"
          count={Roles.length}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </CardActions>
      <TableEditBar selected={selectedRoles} />
    </div>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  getValueAction: PropTypes.func,
  Roles: PropTypes.array.isRequired,
  setShowModal: PropTypes.func,
  afterSubmit: PropTypes.func
};

Results.defaultProps = {
  Roles: []
};

export default Results;

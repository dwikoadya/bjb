/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import clsx from 'clsx';
import { 
  FormControl,
  Typography,
  useMediaQuery,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Button,
  DialogActions
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import useStyles from './form-jss';
import { withStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import swal from 'sweetalert';
import env from '../../../../../config/env';

const CustomTableCell = withStyles({
  root: {
    borderBottom: 'none',
  }
})(TableCell)

const Form = (props) => {
  
  const { afterSubmit,toggleModal, editId, afterUpdate } = props;
  const { register, handleSubmit, errors } = useForm();
  const [permission, setPermission] = useState([]);
  const [checked, setChecked] = useState([]);
  const [value, setValue] = useState([]);

  function fetchPermission(){
    axios.get(env.baseUrl+'/api/v1/permissions',{
      headers: {
        'Authorization' : 'Bearer '+localStorage.getItem('token')
      }
    }).then(response => {
      if(response.data.status === 'error'){
        swal(response.data.message, response.data.error.length > 0 ? response.data.error[0] : '' , 'error');
      }else{
        setPermission(response.data.data);
      }
    }).catch((error)=>{
      if (error.response.status === 401){
        localStorage.clear();
        window.location = '/auth/login';
      }
    });
  }

  const fetchShow = () => {
    axios.get(env.baseUrl+'api/v1/roles/'+editId,{
      headers: {
        'Authorization' : 'Bearer '+localStorage.getItem('token')
      }
    }).then(response => {
      if(response.data.status === 'error'){
        swal(response.data.message, response.data.error.length > 0 ? response.data.error[0] : '' , 'error');
      }else{
        setValue(response.data.data);
        var permissions = [];
        response.data.data.role_permissions.map((val)=>{
          permissions.push(val.permission_id)
        })
        setChecked(permissions)
      }
    }).catch((error)=>{
      if (error.response.status === 401){
        localStorage.clear();
        window.location = '/auth/login';
      }
    });
  };

  useEffect(() => {
    fetchPermission();
    if(editId){
      fetchShow();
    }
  }, []);

  const onSubmit = (data) => {
    if (editId !== null){
      updateRole(data);
    }else{
      addRole(data);
    }
  };

  const chagedCB = (event) => {
    if (getChecked(parseInt(event.target.value))){
      var list = checked;
      var id = list.indexOf(parseInt(event.target.value))
      list.splice(id,1)
      setChecked(list);
      setChecked((checked) => [...checked]);
    }else{
      setChecked((checked) => [...checked, parseInt(event.target.value)]);
    }
  };

  function updateRole(data) {
    var val = {};
    val['name'] = data.name;
    val['description'] = data.description;
    var role_permissions = [];
    checked.map((value) => {
      role_permissions.push({'permission_id':value})
    })
    val.role_permissions_attributes = role_permissions
    axios.put(env.baseUrl+'api/v1/roles/'+editId, val,{
      headers: {
        'Authorization' : 'Bearer '+localStorage.getItem('token')
      }
    })
      .then(function (response) {
        if(response.data.status === 'error'){
          swal(response.data.message, response.data.error.length > 0 ? response.data.error[0] : '' , 'error');
        }else{
          afterUpdate(editId,response.data.data)
        }
      })
      .catch(function (error) {
        swal('Kesalahan tidak diketahui', 'Server Internal Error', 'error');
        if (error.response.status === 401){
          localStorage.clear();
          window.location = '/auth/login';
        }
      });
  }

  function addRole(data) {
    var val = {};
    val['name'] = data.name;
    val['description'] = data.description;
    var role_permissions = [];
    checked.map((value) => {
      role_permissions.push({'permission_id':value})
    })
    val.role_permissions_attributes = role_permissions
    axios.post(env.baseUrl+'api/v1/roles', val,{
      headers: {
        'Authorization' : 'Bearer '+localStorage.getItem('token')
      }
    })
      .then(function (response) {
        if(response.data.status === 'error'){
          swal(response.data.message, response.data.error.length > 0 ? response.data.error[0] : '' , 'error');
        }else{
          afterSubmit(response.data.data)
        }
      })
      .catch(function (error) {
        swal('Kesalahan tidak diketahui', 'Server Internal Error', 'error');
        if (error.response.status === 401){
          localStorage.clear();
          window.location = '/auth/login';
        }
      });
  }

  function checkCb(value,name) {
    const checker = value.find(element => element.action_name === name);
    if (checker){
      return checker;
    }
    return false
  }

  function getChecked(id) {
    return checked.find(element => element === id);
  }

  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return(
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div className={clsx(classes.root, !fullScreen && classes.desktop)}>
          <div className={classes.sectionLeft}>
            <FormControl 
              fullWidth
            >
              <Typography
                component="p"
                variant="body1"
              >
                Nama Role
              </Typography>
              <input
                autoComplete="off"
                className={errors.name ? classes.inputRequired : classes.input}
                defaultValue={value.name || ''}
                name="name"
                ref={register({ required: true })}
              />
              {errors.name && <text className={classes.required}>
                Nama Role wajib diisi !
              </text>}
              <Typography
                component="p"
                variant="body1"
              >
                Deskripsi
              </Typography>
              <textarea
                className={errors.description ? classes.textareaRequired : classes.textarea}
                defaultValue={value.description || ''}
                name="description"
                ref={register({ required: true })}
              />
              {errors.description && <text className={classes.required}>
                Deskripsi wajib diisi !
              </text>}
            </FormControl>
          </div>
          <div className={classes.formContent}>
            <FormControl 
              fullWidth
            >
              <Typography
                component="p"
                variant="body1"
              >
              Akses
              </Typography>
              <TableContainer>
                <Table
                  aria-label="simple table"
                  size="small"
                >
                  <TableHead>
                    <TableRow>
                      <CustomTableCell>NAMA FITUR</CustomTableCell>
                      <CustomTableCell align="center">LIHAT</CustomTableCell>
                      <CustomTableCell align="center">TAMBAH</CustomTableCell>
                      <CustomTableCell align="center">UBAH</CustomTableCell>
                      <CustomTableCell align="center">HAPUS</CustomTableCell>
                      <CustomTableCell align="center">PERSETUJUAN</CustomTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {permission.map((row) => (
                      <TableRow key={row.permission_type}>
                        <CustomTableCell
                          component="th"
                          scope="row"
                        >
                          {row.permission_type}
                        </CustomTableCell>
                        <CustomTableCell 
                          align="center"
                        >
                          {
                            row.actions.length > 0 && checkCb(row.actions,'read') ? 
                              <Checkbox
                                checked={getChecked(checkCb(row.actions,'read').id)}
                                onChange={chagedCB}
                                value={checkCb(row.actions,'read').id}
                              /> : null
                          }
                        </CustomTableCell>
                        <CustomTableCell 
                          align="center"
                        >
                          {
                            row.actions.length > 0 && checkCb(row.actions,'create') ? 
                              <Checkbox
                                checked={getChecked(checkCb(row.actions,'create').id)}
                                onChange={chagedCB}
                                value={checkCb(row.actions,'create').id}
                              /> : null
                          }
                        </CustomTableCell>
                        <CustomTableCell 
                          align="center"
                        >
                          {
                            row.actions.length > 0 && checkCb(row.actions,'update') ? 
                              <Checkbox
                                checked={getChecked(checkCb(row.actions,'update').id)}
                                onChange={chagedCB}
                                value={checkCb(row.actions,'update').id}
                              /> : null
                          }
                        </CustomTableCell>
                        <CustomTableCell 
                          align="center"
                        >
                          {
                            row.actions.length > 0 && checkCb(row.actions,'destroy') ? 
                              <Checkbox
                                checked={getChecked(checkCb(row.actions,'destroy').id)}
                                onChange={chagedCB}
                                value={checkCb(row.actions,'destroy').id}
                              /> : null
                          }
                        </CustomTableCell>
                        <CustomTableCell 
                          align="center"
                        >
                          {
                            row.actions.length > 0 && checkCb(row.actions,'approval') ? 
                              <Checkbox
                                checked={getChecked(checkCb(row.actions,'approval').id)}
                                onChange={chagedCB}
                                value={checkCb(row.actions,'approval').id}
                              /> : null
                          }
                        </CustomTableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </FormControl>
          </div>
        </div>
        <div className={classes.formAction}>
          <DialogActions
            classes={{
              root: classes.modalPadding
            }}
          >
            <Button
              classes={{
                root: clsx(classes.buttonRounded, classes.expandButton)
              }}
              color="secondary"
              onClick={() => toggleModal(false)}
              variant="outlined"
            >
              Batal
            </Button>
            <Button 
              classes={{
                root: classes.buttonRounded
              }}
              color="secondary"
              type="submit"
              variant="contained"
            >
              Simpan
            </Button>
          </DialogActions>
        </div>
      </div>
    </form>
  )
}

export default Form;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table,Form,Header } from './components';
import { Page, Breadcrumb, Modal } from 'components';
import { Card } from '@material-ui/core';
import swal from 'sweetalert';
import env from '../../../config/env';
import useStyles from './role-jss.js';

const path = [
  ['Manajemen User', '/management-user/role'],
  ['Role', '/management-user/role']
];

const CustomerManagementList = () => {
  const classes = useStyles();

  const [roles, setRoles] = useState();
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  
  function fetchRoles(search=''){
    axios.get(env.baseUrl+'/api/v1/roles?search='+search,{
      headers: {
        'Authorization' : 'Bearer '+localStorage.getItem('token')
      }
    }).then(response => {
      if(response.data.status === 'error'){
        swal(response.data.message, response.data.error.length > 0 ? response.data.error[0] : '' , 'error');
      }else{
        setRoles(response.data.data);
      }
    }).catch((error)=>{
      if (error.response.status === 401){
        localStorage.clear();
        window.location = '/auth/login';
      }
    });
  }

  useEffect(() => {
    fetchRoles();
  }, []);

  function resultSearch(search){
    fetchRoles(search)
  }

  function afterSubmit(data) {
    setShowModal(false);
    setRoles((roles) => [...roles, data]);
    swal('Berhasil!', 'Anda berhasil menambah data!', 'success');
  }

  function afterUpdate(id,data) {
    var list = roles;
    var id_found = list.findIndex(element => element.id === parseInt(id))
    list[id_found].name = data.name
    list[id_found].description = data.description
    setShowModal(false);
    setRoles(list)
    setRoles((roles) => [...roles]);
    swal('Berhasil!', 'Anda berhasil mengubah data!', 'success');
  }

  function action(type,data) {
    if(type === 'Ubah'){
      if (data !== null){
        setEditId(data);
        setShowModal(true);
      }
    }else{
      swal({
        title: 'Apakah Anda yakin?',
        text: 'Setelah dihapus, Anda tidak akan dapat memulihkan data ini!',
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      })
        .then((willDelete) => {
          if (willDelete) {
            axios.delete(env.baseUrl+'/api/v1/roles/'+data,{
              headers: {
                'Authorization' : 'Bearer '+localStorage.getItem('token')
              }
            })
              .then(function (response) {
                if(response.data.status == 'success'){
                  var list = roles;
                  var id_found = list.findIndex(element => element.id === parseInt(data))
                  list.splice(id_found,1)
                  setRoles(list)
                  setRoles((roles) => [...roles]);
                  swal('Berhasil!', 'Anda berhasil menghapus data!', 'success');
                }else{
                  swal(response.data.message, response.data.error.length > 0 ? response.data.error[0] : '', 'error');
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
        });
    }
  }

  return (
    <Page
      className={classes.root}
      title="BJB Disentra - Role"
    >
      <Modal 
        children={
          <Form
            afterSubmit={(data)=>afterSubmit(data)}
            afterUpdate={(id,data)=>afterUpdate(id,data)}
            editId={editId}
            toggleModal={setShowModal}
          />
        }
        fullWidth
        isOpen={showModal}
        maxWidth="lg"
        title="Tambah Role"
        toggleModal={setShowModal} 
      />
      <Card>
        <div className={classes.breadcrumb}>
          <Breadcrumb route={path} />
        </div>
        <Header
          resultSearch={resultSearch}
          setShowModal={setShowModal} 
          showModal={showModal} 
        />
        {roles && (
          <Table
            afterSubmit={afterSubmit}
            className={classes.table}
            getValueAction={action}
            Roles={roles}
            setShowModal={setShowModal} 
          />
        )}
      </Card>
    </Page>
  );
};

export default CustomerManagementList;

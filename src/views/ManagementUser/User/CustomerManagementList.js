/*eslint-disable react/jsx-boolean-value*/
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import { Page, Breadcrumb, Modal } from 'components';
import { Header, Results, Form, DataDetail } from './components';
import { Card } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, deleteUser, changeStatusUser } from 'actions';
import { getRoles } from 'actions';
import { getJobPositions } from 'actions';
import { getBranchOffices } from 'actions';
import swal from 'sweetalert';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  results: {
    marginTop: theme.spacing(3)
  },
  breadcrumb:{
    margin: theme.spacing(3),
    marginBottom: -theme.spacing(6),
  }
}));

const path = [
  ['Manajemen User', '/management-user/user'],
  ['User', '/management-user/user']
];

const CustomerManagementList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [showDataDetail, setShowDataDetail] = useState(false);
  const [dataPerPage, setDataPerPage] = useState(10);
  const { data, pagination } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(getUser({
      payload: {
        dataPerPage
      }
    })); // Get users to display in management user
    dispatch(getRoles()); // Get roles for options in add user
    dispatch(getJobPositions()); // Get job position for options in add user
    dispatch(getBranchOffices()); // Get branch offices for options in add user
  }, []);

  useEffect(() => {
    dispatch(getUser({
      payload: {
        dataPerPage
      }
    })); 
  }, [dataPerPage]);

  const refetchUser = (perPage) => {
    dispatch(getUser({
      payload: {
        dataPerPage: perPage
      }
    }))
  };

  const showDeleteConfirmation = async (index) => {
    const confirmation = await swal({
      title: 'Hapus User',
      text: 'Setelah dihapus, Anda tidak akan dapat memulihkan data ini!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    if (confirmation) {
      deleteExecution(index);
    }
  };

  const deleteExecution = (index) => {
    dispatch(deleteUser({
      payload: {
        id: data[index].id
      }
    }))
  };

  const showChangeStatusConfirmation = async (index, status) => {
    const confirmation = await swal({
      title: status === 'suspend' ? 'Suspend User' : 'Aktifkan User',
      text: `Apakah Anda yakin akan ${status === 'suspend' ? 'mensuspend' : 'mengaktifkan'} user ini?`,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    if (confirmation) {
      suspendExecution(index, status);
    }
  };

  const suspendExecution = (index, status) => {
    dispatch(changeStatusUser({
      payload: {
        id: data[index].id,
        status
      }
    }))
  };

  const hideDetailModal = () => {
    setShowDataDetail(false);
    setIsEdit(false);
  };

  const onChangePage = (direction) => {
    let currentPage = pagination?.current_page ?? 1;
    const totalPages = pagination?.total_pages ?? 1;
    if (direction === 'next') {
      if (currentPage < totalPages) {
        dispatch(getUser({
          payload: {
            dataPerPage,
            page: pagination?.current_page + 1 ?? 1
          }
        }))
      }
    } else {
      if (currentPage > 1) {
        dispatch(getUser({
          payload: {
            dataPerPage,
            page: pagination?.current_page - 1 ?? 1
          }
        }))
      }
    }
  }

  return (
    <Page
      className={classes.root}
      title="Customer Management List"
    >
      <Modal 
        children={<Form toggleModal={setShowModal} />}
        isOpen={showModal}
        title="Tambah User"
        toggleModal={setShowModal}
      />
      <Modal
        children={
          <DataDetail 
            hideDetailModal={hideDetailModal}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            showChangeStatusConfirmation={showChangeStatusConfirmation}
            showDeleteConfirmation={showDeleteConfirmation}
          />
        }
        hideDetailModal={hideDetailModal}
        isOpen={showDataDetail}
        title="Detail User"
        toggleModal={setShowDataDetail}
      />
      <Card>
        <div className={classes.breadcrumb}>
          <Breadcrumb route={path} />
        </div>
        <Header 
          dataPerPage={dataPerPage}
          refetchUser={refetchUser}
          setDataPerPage={setDataPerPage}
          setShowModal={setShowModal} 
          showModal={showModal}
        />
        <Results
          className={classes.results}
          onChangePage={onChangePage}
          setIsEdit={setIsEdit}
          setShowDataDetail={setShowDataDetail}
          showChangeStatusConfirmation={showChangeStatusConfirmation}
          showDeleteConfirmation={showDeleteConfirmation}
        />
      </Card>
    </Page>
  );
};

export default CustomerManagementList;
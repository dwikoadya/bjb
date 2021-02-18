/*eslint-disable react/jsx-boolean-value*/
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import { Page, Breadcrumb, Modal } from 'components';
import { Header, Results, Form, DataDetail } from './components';
import { Card } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getBusinessTalk, deleteBusinessTalk, changeStatusBusinessTalk } from 'actions';
import swal from 'sweetalert';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(5, 4)
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
  ['Manajemen Konten', '/management-content/business-talk'],
  ['Bincang Bisnis', '/management-content/business-talk']
];

const CustomerManagementList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [title_cont, setTitle] = useState('');
  const [event_on_gteq, setStartDate] = useState(null);
  const [event_on_lteq, setEndDate] = useState(null);
  const [talk_type_cont, setTalkType] = useState('$');
  
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [showDataDetail, setShowDataDetail] = useState(false);
  const [dataPerPage, setDataPerPage] = useState(10);
  const { data, pagination } = useSelector(state => state.businessTalk);

  useEffect(() => {
    dispatch(getBusinessTalk({
      payload: {
        dataPerPage
      }
    })); // Get content to display in Business Talk
  }, []);

  useEffect(() => {
    dispatch(getBusinessTalk({
      payload: {
        dataPerPage
      }
    })); 
  }, [dataPerPage]);

  const refetchContent = (perPage, additionalFilter) => {
    dispatch(getBusinessTalk({
      payload: {
        dataPerPage: perPage || dataPerPage,
        params: additionalFilter,
      }
    }))
  };

  const showDeleteConfirmation = async (index) => {
    const confirmation = await swal({
      title: 'Hapus Konten',
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
    dispatch(deleteBusinessTalk({
      payload: {
        id: data[index].id
      }
    }))
  };

  const showChangeStatusConfirmation = async (index, status) => {
    const confirmation = await swal({
      title: status === 'show' ? 'Perlihatkan Konten' : 'Sembunyikan Konten',
      text: `Apakah Anda yakin akan ${status === 'show' ? 'memperlihatkan' : 'menyembunyikan'} konten ini?`,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    if (confirmation) {
      hideExecution(index, status);
    }
  };

  const hideExecution = (index, status) => {
    dispatch(changeStatusBusinessTalk({
      payload: {
        id: data[index].id,
        description: data[index].description,
        status,
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
        dispatch(getBusinessTalk({
          payload: {
            dataPerPage,
            page: pagination?.current_page + 1 ?? 1
          }
        }))
      }
    } else {
      if (currentPage > 1) {
        dispatch(getBusinessTalk({
          payload: {
            dataPerPage,
            page: pagination?.current_page - 1 ?? 1
          }
        }))
      }
    }
  }

  const executeFilter = () => {
    refetchContent(null, {
      event_on_gteq,
      event_on_lteq,
      talk_type_cont,
      title_cont,
    })
  };

  const resetFilter = () => {
    setStartDate(null);
    setEndDate(null);
    setTalkType('all');
    setTitle('');
    refetchContent(dataPerPage)
  };

  return (
    <Page
      className={classes.root}
      title="Business Talk List"
    >
      <Modal 
        children={<Form toggleModal={setShowModal} />}
        fullWidth={true}
        isOpen={showModal}
        maxWidth="lg"
        title="Tambah Konten"
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
        fullWidth={true}
        hideDetailModal={hideDetailModal}
        isOpen={showDataDetail}
        maxWidth="lg"
        title="Detail Bincang Bisnis"
        toggleModal={setShowDataDetail}
      />
      <Card>
        <div className={classes.breadcrumb}>
          <Breadcrumb route={path} />
        </div>
        <Header 
          dataPerPage={dataPerPage}
          end_date={event_on_lteq}
          executeFilter={executeFilter}
          resetFilter={resetFilter}
          setDataPerPage={setDataPerPage}
          setEndDate={setEndDate}
          setShowModal={setShowModal} 
          setStartDate={setStartDate}
          setTalkType={setTalkType}
          setTitle={setTitle}
          showModal={showModal}
          start_date={event_on_gteq}
          talk_type={talk_type_cont}
          title={title_cont}
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
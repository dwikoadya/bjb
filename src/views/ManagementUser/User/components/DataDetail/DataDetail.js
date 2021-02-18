import React, { useState, useEffect ,useRef } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { 
  FormControl, 
  Typography, 
  useMediaQuery,
  Button,
  CircularProgress,
} from '@material-ui/core';
import { useTheme, withStyles } from '@material-ui/core/styles';
import useStyles from './data-detail-jss';
import palette from 'theme/palette';
import { editUser, refreshStateUser } from 'actions';
import validation from '../../validation';
import { RoundedInput } from 'components';
import { RoundedSelect } from 'components';
import FieldDisplay from '../FieldDisplay';

const DangerText = withStyles(() => ({
  root: {
    margin: '15px 0',
    color: palette.error.main,
    fontWeight: 900,
    cursor: 'pointer',
  },
}))(Typography);

const TextTriggerFile = withStyles(() => ({
  root: {
    position: 'relative',
    cursor: 'pointer',
    fontWeight: 900
  }
}))(Typography);

function DataDetail(props) {
  const { 
    isEdit, 
    setIsEdit, 
    hideDetailModal, 
    showChangeStatusConfirmation, 
    showDeleteConfirmation,
  } = props;
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { data: dataUser, dataDetail, success, loading } = useSelector(state => state.user);
  const { data: listRoles } = useSelector(state => state.role);
  const { data: listJobPositions } = useSelector(state => state.jobPosition);
  const { data: listBranchOffices } = useSelector(state => state.branchOffice);
  const { register, handleSubmit, control, errors } = useForm();
  const [fileHandler, setFileHandler] = useState(null);
  const initialization = useRef(true);

  useEffect(() => {
    if (initialization.current) {
      initialization.current = false;
    } else {
      if (success && !loading) {
        closeModal(false);
        dispatch(refreshStateUser());
      }
    }
  }, [success, loading]);

  const closeModal = () => {
    hideDetailModal();
  };

  const switchToEdit = () => {
    setIsEdit(true);
  };

  const onSubmit = (data) => {
    dispatch(editUser({ 
      payload: fileHandler ? Object.assign({}, data, { photo: fileHandler }): data ,
      targetId: dataDetail.id
    }));
  };

  const setPhoto = (event) => {
    setFileHandler(event.target.files);
  };

  const showConfirmation = () => {
    const index = dataUser.map(user => user.id).indexOf(dataDetail.id);
    showDeleteConfirmation(index);
  };

  const showStatusConfirmation = (status) => {
    const index = dataUser.map(user => user.id).indexOf(dataDetail.id);
    showChangeStatusConfirmation(index, status);
  }

  return(
    <div className={clsx(classes.root, !fullScreen && classes.desktop)}>
      <div className={classes.uploadContainer}>
        <Typography
          component="p"
          variant="body1"
        >
          Foto User
        </Typography>
        <div className={clsx(classes.uploadArea, fullScreen && classes.fullWidthRel)}>
          {
            fileHandler ? (
              <img 
                alt="user"
                className={classes.userImage} 
                src={URL.createObjectURL(fileHandler[0])} 
              />
            ) : (
              <img 
                alt="user"
                className={classes.userImage} 
                src={dataDetail.photo} 
              />
            )
          }
          <div className={classes.uploadInfo}>
            <img 
              alt="camera" 
              src="/svg/camera.svg"
            />
            <Typography
              component="p"
              variant="caption"
            >
              Tambah Foto (Maks. ukuran 2MB)
            </Typography>
          </div>
        </div>
        {
          isEdit && (
            <>
              <TextTriggerFile
                component="h5"
                varian="body1"
              >
                <input 
                  accept="image/*" 
                  className={classes.fileEmbed} 
                  defaultValue={''}
                  name="photo"
                  onChange={setPhoto}
                  ref={register()}
                  type="file"
                />
                Ubah Foto
              </TextTriggerFile>
              <DangerText
                component="h5"
                onClick={() => showStatusConfirmation('suspend')}
                varian="body1"
              >
                Suspend User
              </DangerText>
              <DangerText
                component="h5"
                onClick={() => showStatusConfirmation('active')}
                varian="body1"
              >
                Lift Ban User
              </DangerText>
            </>
          )
        }
      </div>
      <div className={clsx(classes.formContent, fullScreen && classes.fullWidth)}>
        {
          isEdit ? (
            <RoundedInput 
              defaultValue={dataDetail.name}
              errorMessage={errors?.name?.message}
              errors={errors.name}
              label="Nama"
              name="name"
              register={register(validation.name)}
            />
          ) : (
            <FieldDisplay 
              data={dataDetail?.name} 
              label="Nama"
            />
          )
        }
        {
          isEdit ? (
            <FormControl fullWidth>
              <RoundedSelect
                control={control}
                defaultValue={dataDetail?.roles?.id || ''}
                errorMessage={errors?.role_ids?.message}
                errors={errors.role_ids}
                label="Role"
                name="role_ids"
                options={listRoles}
                validation={validation.role_ids}
              />
            </FormControl>
          ) : (
            <FieldDisplay 
              data={dataDetail?.roles?.name} 
              label="Role"
            />
          )
        }
        {
          isEdit ? (
            <RoundedInput
              defaultValue={dataDetail?.user_profile?.nip}
              errorMessage={errors?.nip?.message}
              errors={errors.nip}
              label="NIP"
              name="nip"
              register={register(validation.nip)}
              type="number"
            />
          ) : (
            <FieldDisplay 
              data={dataDetail?.user_profile?.nip} 
              label="NIP"
            />
          )
        }
        {
          isEdit ? (
            <FormControl fullWidth>
              <RoundedSelect
                control={control}
                defaultValue={dataDetail?.user_profile?.job_position?.id || ''}
                errorMessage={errors?.job_position_id?.message}
                errors={errors.job_position_id}
                label="Jabatan"
                name="job_position_id"
                options={listJobPositions}
                validation={validation.job_position_id}
              />
            </FormControl>
          ) : (
            <FieldDisplay 
              data={dataDetail?.user_profile?.job_position?.name || ''} 
              label="Jabatan"
            />
          )
        }
        {
          isEdit ? (
            <FormControl fullWidth>
              <RoundedSelect
                control={control}
                defaultValue={dataDetail?.user_profile?.branch_office?.id || ''}
                errorMessage={errors?.branch_office_id?.message}
                errors={errors.branch_office_id}
                label="Cabang"
                name="branch_office_id"
                options={listBranchOffices}
                validation={validation.branch_office_id}
              />
            </FormControl>
          ) : (
            <FieldDisplay 
              data={dataDetail?.user_profile?.branch_office?.id || ''} 
              label="Cabang"
            />
          )
        }
        {
          isEdit ? (
            <RoundedInput
              defaultValue={dataDetail.email}
              errorMessage="Format email tidak valid"
              errors={errors.email}
              label="Email"
              name="email"
              register={register(validation.email)}
              type="email"
            />
          ) : (
            <FieldDisplay 
              data={dataDetail.email} 
              label="Email"
            />
          )
        }
        {
          isEdit ? (
            <RoundedInput
              defaultValue={dataDetail.phone_number}
              errorMessage="Nomor telepon hanya terdiri dari 10 sampai 14 nomor"
              errors={errors.phone_number}
              label="Nomor Handphone"
              name="phone_number"
              register={register(validation.phone)}
              type="number"
            />
          ) : (
            <FieldDisplay 
              data={dataDetail.phone_number} 
              label="Nomor Handphone"
            />
          )
        }
        {
          isEdit ? (
            <div className={classes.buttonAction}>
              <Button
                classes={{
                  root: clsx(classes.buttonRounded, classes.expandButton)
                }}
                color="secondary"
                onClick={closeModal}
                variant="outlined"
              >
                Batal
              </Button>
              <Button 
                classes={{
                  root: classes.buttonRounded
                }}
                color="secondary"
                disabled={loading}
                endIcon={
                  loading ? (
                    <CircularProgress
                      color="secondary"
                      size={20} 
                    /> 
                  ) : null
                }
                onClick={handleSubmit(onSubmit)}
                variant="contained"
              >
                Simpan
              </Button>
            </div>
          ) : (
            <div className={classes.buttonAction}>
              <Button
                classes={{
                  root: clsx(classes.buttonRounded, classes.expandButton)
                }}
                onClick={showConfirmation}
              >
                Hapus
              </Button>
              <Button 
                classes={{
                  root: classes.buttonRounded
                }}
                color="secondary"
                onClick={switchToEdit}
                variant="contained"
              >
                Ubah User
              </Button>
            </div>
          )
        }
      </div>
    </div>
  )
}

DataDetail.propTypes = {
  hideDetailModal: PropTypes.func,
  isEdit: PropTypes.bool,
  setIsEdit: PropTypes.func,
  showChangeStatusConfirmation: PropTypes.func,
  showDeleteConfirmation: PropTypes.func,
};

export default DataDetail;
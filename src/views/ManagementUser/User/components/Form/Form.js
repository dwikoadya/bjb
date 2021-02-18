import React, { useState, useRef, useEffect} from 'react'
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { 
  FormControl, 
  Typography, 
  useMediaQuery,
  Button,
  CircularProgress,
} from '@material-ui/core';
import { useTheme, withStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, refreshStateUser } from 'actions';
import validation from '../../validation';
import useStyles from './form-jss';
import palette from 'theme/palette';
import { RoundedInput } from 'components';
import { RoundedSelect } from 'components';

function Form(props) {
  const { toggleModal } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const { success, error, loading } = useSelector(state => state.user);
  const { data: listRoles } = useSelector(state => state.role);
  const { data: listJobPositions } = useSelector(state => state.jobPosition);
  const { data: listBranchOffices } = useSelector(state => state.branchOffice);
  const theme = useTheme();
  const { register, handleSubmit, control, errors } = useForm();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [fileHandler, setFileHandler] = useState(null);
  const initialization = useRef(true);

  const PhotoErrorText = withStyles(() => ({
    root: {
      color: palette.error.main,
      marginBottom: 10,
      marginLeft: 10,
      marginTop: 10
    }
  }))(Typography);

  useEffect(() => {
    dispatch(refreshStateUser());
  }, []);

  const onSubmit = (data) => {
    dispatch(addUser({ 
      payload: data 
    }));
  };

  const setPhoto = (event) => {
    setFileHandler(event.target.files);
  };

  const closeModal = () => {
    toggleModal(false);
  };

  useEffect(() => {
    if (initialization.current) {
      initialization.current = false;
    } else {
      if (success && !loading) {
        toggleModal(false);
        dispatch(refreshStateUser());
      }
      if (error) {
        dispatch(refreshStateUser());
      }
    }
  }, [success, error, loading]);
  
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
          <div className={classes.uploadInfo}>
            {
              fileHandler &&
              <img
                alt="user"
                className={classes.userImage}
                src={URL.createObjectURL(fileHandler[0])}
              />
            }
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
          <input 
            accept="image/*" 
            className={classes.file} 
            name="photo"
            onChange={setPhoto}
            ref={register(validation.photo)}
            type="file" 
          />
        </div>
        {
          errors.photo &&
          <PhotoErrorText
            classes={classes.photoErrorText}
            component="p"
            variant="caption"
          >
            {errors.photo.message}
          </PhotoErrorText>
        }
      </div>
      <div className={clsx(classes.formContent, fullScreen && classes.fullWidth)}>
        <RoundedInput 
          defaultValue=""
          errorMessage={errors?.name?.message}
          errors={errors.name}
          label="Nama"
          name="name"
          register={register(validation.name)}
        />
        <FormControl fullWidth>
          <RoundedSelect
            control={control}
            defaultValue={listRoles[0]?.id || '1'}
            errorMessage={errors?.role_ids?.message}
            errors={errors.role_ids}
            label="Role"
            name="role_ids"
            options={listRoles}
            validation={validation.role_ids}
          />
        </FormControl>
        <RoundedInput
          defaultValue=""
          errorMessage={errors?.nip?.message}
          errors={errors.nip}
          label="NIP"
          name="nip"
          register={register(validation.nip)}
          type="number"
        />
        <FormControl fullWidth>
          <RoundedSelect
            control={control}
            defaultValue={listJobPositions[0]?.id || '1'}
            errorMessage={errors?.job_position_id?.message}
            errors={errors.job_position_id}
            label="Jabatan"
            name="job_position_id"
            options={listJobPositions}
            validation={validation.job_position_id}
          />
        </FormControl>
        <FormControl fullWidth>
          <RoundedSelect
            control={control}
            defaultValue={listBranchOffices[0]?.id || '1'}
            errorMessage={errors?.branch_office_id?.message}
            errors={errors.branch_office_id}
            label="Jabatan"
            name="branch_office_id"
            options={listBranchOffices}
            validation={validation.branch_office_id}
          />
        </FormControl>
        <RoundedInput
          defaultValue=""
          errorMessage="Format email tidak valid"
          errors={errors.email}
          label="Email"
          name="email"
          register={register(validation.email)}
          type="email"
        />
        <RoundedInput
          defaultValue=""
          errorMessage="Nomor telepon hanya terdiri dari 10 sampai 14 nomor"
          errors={errors.phone_number}
          label="Nomor Handphone"
          name="phone_number"
          register={register(validation.phone)}
          type="number"
        />
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
      </div>
    </div>
  )
}

Form.propTypes = {
  toggleModal: PropTypes.func
};

export default Form;
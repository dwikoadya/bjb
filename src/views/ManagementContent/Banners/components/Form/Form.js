import React, { useState, useRef, useEffect } from 'react'
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
import RadioGroup from '../RadioGroup';
import { RoundedSelect } from 'components';

function Form(props) {
  const { toggleModal } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const { success, error, loading } = useSelector(state => state.user);
  const theme = useTheme();
  const { register, handleSubmit, control, errors, watch } = useForm();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [fileHandler, setFileHandler] = useState(null);
  const initialization = useRef(true);
  const [category, setCategory] = useState('homepage');

  const PhotoErrorText = withStyles(() => ({
    root: {
      color: palette.error.main,
      marginBottom: 10,
      marginLeft: 10,
      marginTop: 100
    }
  }))(Typography);

  useEffect(() => {
    setCategory(watch('talk_type'))
  }, [watch('talk_type')]);

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

  return (
    <div className={clsx(classes.formContent, fullScreen && classes.fullWidth)}>
      <div className={classes.uploadContainer}>
        <Typography
          component="p"
          variant="body1"
        >
          Gambar*
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
      <RadioGroup
        control={control}
        errorMessage={errors?.talk_type?.message}
        errors={errors.talk_type}
        label="Kategori*"
        name="talk_type"
        options={[
          { label: 'Homepage', value: 'homepage' },
          { label: 'Menu DiSentra', value: 'menudisentra' }
        ]}
        validation={validation.talk_type}
        value={category}
      />
      {
        category === 'homepage' ? (
          <RoundedInput
            defaultValue=""
            errorMessage="Nomor telepon hanya terdiri dari 10 sampai 14 nomor"
            errors={errors.phone_number}
            label="URL*"
            name="phone_number"
            register={register(validation.phone)}
            type="text"
          />
        ) : (
            <div classname={classes.selectWrapper}>
              <FormControl fullWidth>
                <RoundedSelect
                  control={control}
                  defaultValue={''}
                  errorMessage={errors?.role_ids?.message}
                  errors={errors.role_ids}
                  label="Menu*"
                  name="role_ids"
                  options={[]}
                  validation={validation.role_ids}
                />
              </FormControl>
            </div>
          )
      }
      <RadioGroup
        control={control}
        errorMessage={errors?.active_type?.message}
        errors={errors.active_type}
        label="Status*"
        name="active_type"
        options={[
          { label: 'Aktif', value: 'aktif' },
          { label: 'Tidak Aktif', value: 'tidakaktif' }
        ]}
        validation={validation.talk_type}
        value={'video'}
      />
      <Typography
        component="p"
        variant="body1"
      >
        * Tidak boleh kosong
            </Typography>
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
  )
}

Form.propTypes = {
  toggleModal: PropTypes.func
};

export default Form;
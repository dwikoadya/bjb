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
import { addBanner, refreshStateBanner } from 'actions';
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
    setCategory(watch('category_type'))
  }, [watch('category_type')]);

  useEffect(() => {
    dispatch(refreshStateBanner());
  }, []);

  const onSubmit = (data) => {
    dispatch(addBanner({
      payload: data
    }));
  };

  const setImage = (event) => {
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
        dispatch(refreshStateBanner());
      }
      if (error) {
        dispatch(refreshStateBanner());
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
            name="image"
            onChange={setImage}
            ref={register(validation.image)}
            type="file"
          />
        </div>
        {
          errors.image &&
          <PhotoErrorText
            classes={classes.photoErrorText}
            component="p"
            variant="caption"
          >
            {errors.image.message}
          </PhotoErrorText>
        }
      </div>
      <RadioGroup
        control={control}
        errorMessage={errors?.category_type?.message}
        errors={errors.category_type}
        label="Kategori*"
        name="category_type"
        options={[
          { label: 'Homepage', value: 'homepage' },
          { label: 'Menu DiSentra', value: 'menudisentra' }
        ]}
        validation={validation.category_type}
        value={category}
      />
      {
        category === 'homepage' ? (
          <RoundedInput
            defaultValue=""
            errorMessage="Nomor telepon hanya terdiri dari 10 sampai 14 nomor"
            errors={errors.link}
            label="URL*"
            name="link"
            register={register(validation.link)}
            type="text"
          />
        ) : (
            <div classname={classes.selectWrapper}>
              <FormControl fullWidth>
                <RoundedSelect
                  control={control}
                  defaultValue={'home'}
                  errorMessage={errors?.banner_type?.message}
                  errors={errors.banner_type}
                  label="Menu*"
                  name="banner_type"
                  options={[{
                      id: 'home',
                      name: 'Homepage'
                  }, {
                      id: 'clinic',
                      name: 'Klinik'
                  }, {
                      id: 'talk',
                      name: 'Bincang Bisnis'
                  }, {
                      id: 'learning',
                      name: 'Sentra Belajar'
                  }, {
                      id: 'umkm',
                      name: 'Pasar UMKM'
                  }
                  ]}
                  validation={validation.banner_type}
                />
              </FormControl>
            </div>
          )
      }
      <RadioGroup
        control={control}
        errorMessage={errors?.status?.message}
        errors={errors.status}
        label="Status*"
        name="status"
        options={[
          { label: 'Aktif', value: 'active' },
          { label: 'Tidak Aktif', value: 'inactive' }
        ]}
        validation={validation.status}
        value={'active'}
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
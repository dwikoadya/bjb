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
import RadioGroup from '../RadioGroup';

function Form(props) {
  const { toggleModal } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const { success, error, loading } = useSelector(state => state.user);
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
          Thumbnail
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
          label="Judul"
          multiline={5}
          name="name"
          register={register(validation.name)}
        />
        <RadioGroup 
          control={control}
          errorMessage={errors?.talk_type?.message}
          errors={errors.talk_type}
          label="Kategori"
          name="talk_type"
          options={[
            {label: 'Video', value: 'video'},
            {label: 'E-Book', value: 'ebook'},
            {label: 'Berita', value: 'berita'}
          ]}
          validation={validation.talk_type}
          value={'video'}
        />
        <RoundedInput
          defaultValue=""
          errorMessage={errors?.nip?.message}
          errors={errors.nip}
          label="Penulis"
          name="nip"
          register={register(validation.nip)}
          type="text"
        />
        <RoundedInput
          defaultValue=""
          errorMessage="Nomor telepon hanya terdiri dari 10 sampai 14 nomor"
          errors={errors.phone_number}
          label="URL"
          name="phone_number"
          register={register(validation.phone)}
          type="text"
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
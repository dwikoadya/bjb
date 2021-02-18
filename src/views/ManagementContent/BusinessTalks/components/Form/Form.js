/* eslint-disable react/jsx-boolean-value */

import React, { useState, useRef, useEffect} from 'react'
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import {
  Typography, 
  useMediaQuery,
  Button,
  CircularProgress,
  Grid,
} from '@material-ui/core';
import { useTheme, withStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { addBusinessTalk, refreshStateBusinessTalk } from 'actions';
import validation from '../../validation';
import useStyles from './form-jss';
import palette from 'theme/palette';
import { RoundedInput } from 'components';
import DatePicker from '../DatePicker';
import TimePicker from '../TimePicker';
import RadioGroup from '../RadioGroup';

function Form(props) {
  const { toggleModal } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const { success, error, loading } = useSelector(state => state.businessTalk);
  const theme = useTheme();
  const { register, handleSubmit, errors, control, watch } = useForm();
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
    dispatch(refreshStateBusinessTalk());
  }, []);

  const onSubmit = (data) => {
    dispatch(addBusinessTalk({ 
      payload: Object.assign({}, data, {
        event_on: moment(data.event_on).format('YYYY-MM-DD')
      }) 
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
        dispatch(refreshStateBusinessTalk());
      }
      if (error) {
        dispatch(refreshStateBusinessTalk());
      }
    }
  }, [success, error, loading]);
  return(
    <div className={clsx(classes.root, !fullScreen && classes.desktop)}>
      <div className={clsx(classes.formContent, fullScreen && classes.fullWidth)}>
        <RoundedInput
          defaultValue=""
          errorMessage={errors?.title?.message}
          errors={errors.title}
          label="Judul"
          name="title"
          register={register(validation.title)}
          type="text"
        />
        <RoundedInput
          defaultValue=""
          errorMessage={errors?.theme?.message}
          errors={errors.theme}
          label="Tema"
          name="theme"
          register={register(validation.theme)}
          type="text"
        />
        <RoundedInput
          defaultValue=""
          errorMessage={errors?.description?.message}
          errors={errors.description}
          label="Deskripsi"
          multiline={15}
          name="description"
          register={register(validation.description)}
          type="number"
        />
      </div>
      <div className={classes.uploadContainer}>
        <RadioGroup 
          control={control}
          errorMessage={errors?.talk_type?.message}
          errors={errors.talk_type}
          label="Kategori"
          name="talk_type"
          options={[
            {label: 'Sentraminar', value: 'sentraminar'},
            {label: 'Group Chat', value: 'grupchat'}
          ]}
          validation={validation.talk_type}
          value={'sentraminar'}
        />
        <Typography
          component="p"
          variant="body1"
        >
          Gambar
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
            onChange={setPhoto}
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
      <div className={clsx(classes.formContent, fullScreen && classes.fullWidth)}>
        <DatePicker 
          control={control}
          defaultValue={new Date()}
          disablePast={true}
          errorMessage={errors?.event_on?.message}
          errors={errors.event_on}
          name="event_on"
          validation={validation.event_on}
        />
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            md={6}
            xs={12}
          >
            <TimePicker 
              defaultValue={''}
              errorMessage={errors?.start_time?.message}
              errors={errors.start_time}
              name="start_time"
              register={register}
              validation={validation.start_time}
            />
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
          >
            <TimePicker 
              defaultValue={''}
              errorMessage={errors?.end_time?.message}
              errors={errors.end_time}
              name="end_time"
              register={register}
              validation={validation.end_time}
            />
          </Grid>
        </Grid>
        <RoundedInput 
          defaultValue={''}
          errorMessage={errors?.max_participant?.message}
          errorMessageMax={
            errors.max_participant ? (
              (watch('talk_type')) === 'grupchat' ? (
                'Maksimal 250 peserta'
              ) : (
                'Maksimal 100 peserta'
              )
            ) : (
              null
            )
          }
          errors={errors.max_participant}
          label={
            `Jumlah Peserta (Maksimal ${
              (watch('talk_type')) === 'grupchat' ? 250 : 100
            })`
          }
          name="max_participant"
          register={
            register(Object.assign({}, validation.max_participant, {
              max: (watch('talk_type')) === 'grupchat' ? 250 : 100
            }))
          }
          type="number"
        />
        <RoundedInput
          defaultValue=""
          errorMessage={errors?.link?.message}
          errors={errors.link}
          label="URL"
          name="link"
          register={register(validation.link)}
          type="text"
        />
        <RoundedInput
          defaultValue=""
          errorMessage={errors?.speaker?.message}
          errors={errors.link}
          label="Pembicara"
          name="speaker"
          register={register(validation.speaker)}
          type="text"
        />
        <RadioGroup 
          control={control}
          error={errors.health_protocol}
          errorMessage={errors?.health_protocol?.message}
          label="Protokol Kesehatan"
          name="health_protocol"
          options={[
            {label: 'Ya', value: 'true'},
            {label: 'Tidak', value: 'false'}
          ]}
          value="true"
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
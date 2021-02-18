/* eslint-disable react/jsx-boolean-value */

import React, { useState, useEffect ,useRef } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { 
  Typography, 
  useMediaQuery,
  Button,
  CircularProgress,
  Grid,
} from '@material-ui/core';
import { useTheme, withStyles } from '@material-ui/core/styles';
import useStyles from './data-detail-jss';
import { editBusinessTalk, refreshStateBusinessTalk } from 'actions';
import validation from '../../validation';
import { RoundedInput } from 'components';
import FieldDisplay from '../FieldDisplay';
import DatePicker from '../DatePicker';
import TimePicker from '../TimePicker';
import RadioGroup from '../RadioGroup';
import palette from 'theme/palette';

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
  const { data: dataBusinessTalk, dataDetail, success, loading } = useSelector(state => state.businessTalk);
  const { register, handleSubmit, errors, control, watch } = useForm();
  const [fileHandler, setFileHandler] = useState(null);
  const initialization = useRef(true);

  useEffect(() => {
    if (initialization.current) {
      initialization.current = false;
    } else {
      if (success && !loading) {
        closeModal(false);
        dispatch(refreshStateBusinessTalk());
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
    dispatch(editBusinessTalk({ 
      payload: fileHandler ? Object.assign({}, data, { image: fileHandler }): data ,
      targetId: dataDetail.id
    }));
  };

  const setPhoto = (event) => {
    setFileHandler(event.target.files);
  };

  const showConfirmation = () => {
    const index = dataBusinessTalk.map(user => user.id).indexOf(dataDetail.id);
    showDeleteConfirmation(index);
  };

  const showStatusConfirmation = (status) => {
    const index = dataBusinessTalk.map(user => user.id).indexOf(dataDetail.id);
    showChangeStatusConfirmation(index, status);
  }
  return(
    <div className={clsx(classes.root, !fullScreen && classes.desktop)}>
      <div className={clsx(classes.formContent, fullScreen && classes.fullWidth)}>
        {
          isEdit ? (
            <RoundedInput
              defaultValue={dataDetail.title}
              errorMessage={errors?.title?.message}
              errors={errors.title}
              label="Judul"
              name="title"
              register={register(validation.title)}
              type="text"
            />
          ) : (
            <FieldDisplay
              data={dataDetail.title}
              label="Judul"
            />
          )
        }
        {
          isEdit ? (
            <RoundedInput
              defaultValue={dataDetail.theme}
              errorMessage={errors?.theme?.message}
              errors={errors.theme}
              label="Tema"
              name="theme"
              register={register(validation.theme)}
              type="text"
            />
          ) : (
            <FieldDisplay
              data={dataDetail.theme}
              label="Tema"
            />
          )
        }
        {
          isEdit ? (
            <RoundedInput
              defaultValue={dataDetail.description}
              errorMessage={errors?.description?.message}
              errors={errors.description}
              label="Deskripsi"
              multiline={15}
              name="description"
              register={register(validation.description)}
              type="text"
            />
          ) : (
            <FieldDisplay
              data={dataDetail.description}
              label="Deskripsi"
            />
          )
        }
      </div>
      <div className={classes.uploadContainer}>
        {
          isEdit ? (
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
              value={dataDetail.talk_type}
            />
          ) : (
            <FieldDisplay
              data={dataDetail.talk_type === 'sentraminar' ? 'Sentraminar' : 'Group Chat'}
              label="Kategori"
            />
          )
        }
        <Typography
          component="p"
          variant="body1"
        >
          Gambar
        </Typography>
        <div className={clsx(classes.uploadArea, fullScreen && classes.fullWidthRel)}>
          {
            fileHandler ? (
              <img 
                alt="content"
                className={classes.userImage} 
                src={URL.createObjectURL(fileHandler[0])} 
              />
            ) : (
              <img 
                alt="content"
                className={classes.userImage} 
                src={dataDetail.image?.url}
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
                  name="image"
                  onChange={setPhoto}
                  ref={register()}
                  type="file"
                />
                Ubah Gambar
              </TextTriggerFile>
            </>
          )
        }
      </div>
      <div className={clsx(classes.formContent, fullScreen && classes.fullWidth)}>
        {
          isEdit ? (
            <DatePicker 
              control={control}
              defaultValue={dataDetail.event_on}
              disablePast={true}
              errorMessage={errors?.event_on?.message}
              errors={errors.event_on}
              name="event_on"
              validation={validation.event_on}
            />
          ) : (
            <FieldDisplay 
              data={dataDetail.event_on_display}
              label="Tanggal"
            />
          )
        }
        {
          isEdit ? (
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
                  defaultValue={dataDetail.start_time}
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
                  defaultValue={dataDetail.end_time}
                  errorMessage={errors?.end_time?.message}
                  errors={errors.end_time}
                  name="end_time"
                  register={register}
                  validation={validation.end_time}
                />
              </Grid>
            </Grid>
          ) : (
            <FieldDisplay
              data={`${dataDetail.start_time} - ${dataDetail.end_time}`}
              label="Waktu"
            />
          )
        }
        {
          isEdit ? (
            <RoundedInput 
              defaultValue={dataDetail.max_participant}
              errorMessage={errors?.max_participant?.message}
              errorMessageMax={
                errors.max_participant ? (
                  (watch('talk_type') || dataDetail.talk_type) === 'grupchat' ? (
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
                  (watch('talk_type') || dataDetail.talk_type) === 'grupchat' ? 250 : 100
                })`
              }
              name="max_participant"
              register={
                register(Object.assign({}, validation.max_participant, {
                  max: (watch('talk_type') || dataDetail.talk_type) === 'grupchat' ? 250 : 100
                }))
              }
              type="number"
            />
          ) : (
            <FieldDisplay 
              data={dataDetail.max_participant} 
              label={`Jumlah Peserta (Maksimal ${dataDetail.talk_type === 'grupchat' ? 250 : 100})`}
            />
          )
        }
        {
          isEdit ? (
            <RoundedInput 
              defaultValue={dataDetail.link}
              errorMessage={errors?.link?.message}
              errors={errors.link}
              label="URL"
              name="link"
              register={register(validation.link)}
              type="text"
            />
          ) : (
            <FieldDisplay 
              data={dataDetail.link} 
              label="URL"
            />
          )
        }
        {
          isEdit ? (
            <RoundedInput 
              defaultValue={dataDetail.speaker}
              errorMessage={errors?.speaker?.message}
              errors={errors.speaker}
              label="Pembicara"
              name="speaker"
              register={register(validation.speaker)}
              type="text"
            />
          ) : (
            <FieldDisplay 
              data={dataDetail.speaker} 
              label="Pembicara"
            />
          )
        }
        {
          isEdit ? (
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
              value={dataDetail.health_protocol?.toString()}
            />
          ) : (
            <FieldDisplay
              data={dataDetail.health_protocol ? 'Ya' : 'Tidak'}
              label="Protokol Kesehatan"
            />
          )
        }
        {
          isEdit &&
          <DangerText
            component="h5"
            onClick={() => showStatusConfirmation(dataDetail.status === 'show' ? 'hide' : 'show')}
            varian="body1"
          >
            {dataDetail.status === 'show' ? 'Sembunyikan' : 'Perlihatkan'}
          </DangerText>
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
                Ubah
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
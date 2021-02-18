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
  Link,
} from '@material-ui/core';
import { useTheme, withStyles } from '@material-ui/core/styles';
import useStyles from './data-detail-jss';
import palette from 'theme/palette';
import { editUser, refreshStateUser } from 'actions';
import validation from '../../validation';
import { RoundedInput } from 'components';
import FieldDisplay from '../FieldDisplay';
import RadioGroup from '../RadioGroup';

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
  const { data: dataLearnigCenter, dataDetail, success, loading } = useSelector(state => state.learningCenter);
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
      payload: fileHandler ? Object.assign({}, data, { image: fileHandler }): data ,
      targetId: dataDetail.id
    }));
  };

  const setPhoto = (event) => {
    setFileHandler(event.target.files);
  };

  const showConfirmation = () => {
    const index = dataLearnigCenter.map(user => user.id).indexOf(dataDetail.id);
    showDeleteConfirmation(index);
  };

  const showStatusConfirmation = (status) => {
    const index = dataLearnigCenter.map(user => user.id).indexOf(dataDetail.id);
    showChangeStatusConfirmation(index, status);
  }
  console.log('details', dataDetail)

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
                alt="content"
                className={classes.userImage} 
                src={URL.createObjectURL(fileHandler[0])} 
              />
            ) : (
              <img 
                alt="content"
                className={classes.userImage} 
                src={dataDetail?.image?.url} 
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
              <DangerText
                component="h5"
                onClick={() => showStatusConfirmation('suspend')}
                varian="body1"
              >
                Sembunyikan
              </DangerText>
            </>
          )
        }
      </div>
      <div className={clsx(classes.formContent, fullScreen && classes.fullWidth)}>
        {
          isEdit ? (
            <RoundedInput 
              defaultValue={dataDetail.title}
              errorMessage={errors?.title?.message}
              errors={errors.title}
              label="Judul"
              multiline={5}
              name="title"
              register={register(validation.title)}
            />
          ) : (
            <FieldDisplay 
              data={dataDetail?.title} 
              label="Judul"
            />
          )
        }
        {
          isEdit ? (
            <RadioGroup 
              control={control}
              errorMessage={errors?.content_type?.message}
              errors={errors.content_type}
              label="Kategori"
              name="content_type"
              options={[
                {label: 'Video', value: 'video'},
                {label: 'E-Book', value: 'ebook'},
                {label: 'Berita', value: 'berita'}
              ]}
              validation={validation.content_type}
              value={'video'}
            />
          ) : (
            <FieldDisplay 
              data={dataDetail?.content_type} 
              label="Kategori"
            />
          )
        }
        {
          isEdit ? (
            <RoundedInput
              defaultValue={dataDetail.author_name}
              errorMessage={errors?.author_name?.message}
              errors={errors.author_name}
              label="Penulis"
              name="author_name"
              register={register(validation.author_name)}
              type="text"
            />
          ) : (
            <FieldDisplay 
              data={dataDetail.author_name} 
              label="Penulis"
            />
          )
        }
        {
          isEdit ? (
            <RoundedInput
              defaultValue={dataDetail.link}
              errorMessage="Nomor telepon hanya terdiri dari 10 sampai 14 nomor"
              errors={errors.link}
              label="URL"
              name="link"
              register={register(validation.link)}
              type="text"
            />
          ) : (
            <FieldDisplay 
              data={
                <Link 
                  color="secondary"
                  href={dataDetail.link}
                  target="_blank" 
                  underline="always"
                  variant="subtitle1"
                >
                  {dataDetail.link}
                </Link>
              } 
              label="URL"
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
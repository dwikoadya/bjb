import React, { useState, useEffect, useRef } from 'react';
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
  FormControl
} from '@material-ui/core';
import { useTheme, withStyles } from '@material-ui/core/styles';
import useStyles from './data-detail-jss';
import palette from 'theme/palette';
import { editBanner, refreshStateBanner } from 'actions';
import validation from '../../validation';
import { RoundedInput } from 'components';
import FieldDisplay from '../FieldDisplay';
import { RoundedSelect } from 'components';
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
  const { data: dataBanner, dataDetail, success, loading } = useSelector(state => state.banner);
  const { register, handleSubmit, control, errors, watch } = useForm();
  const [fileHandler, setFileHandler] = useState(null);
  const initialization = useRef(true);
  const [category, setCategory] = useState('homepage');

  useEffect(() => {
    if (watch('content_category')) {
      setCategory(watch('content_category'))
    }
  }, [watch('content_category')]);

  useEffect(() => {
    if (initialization.current) {
      initialization.current = false;
    } else {
      if (success && !loading) {
        closeModal(false);
        dispatch(refreshStateBanner());
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
    dispatch(editBanner({
      payload: fileHandler ? Object.assign({}, data, { image: fileHandler }) : data,
      targetId: dataDetail.id
    }));
  };

  const setPhoto = (event) => {
    setFileHandler(event.target.files);
  };

  const showConfirmation = () => {
    const index = dataBanner.map(banner => banner.id).indexOf(dataDetail.id);
    showDeleteConfirmation(index);
  };

  const showStatusConfirmation = (status) => {
    const index = dataBanner.map(banner => banner.id).indexOf(dataDetail.id);
    showChangeStatusConfirmation(index, status);
  }
  console.log('details', dataDetail)

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
            </>
          )
        }
      </div>
      {
        isEdit ? (
          <>
            <RadioGroup
              control={control}
              defaultValue={category}
              errorMessage={errors?.content_category?.message}
              errors={errors.content_category}
              label="Kategori*"
              name="content_category"
              options={[
                { label: 'Homepage', value: 'homepage' },
                { label: 'Menu DiSentra', value: 'menudisentra' },
              ]}
              validation={validation.content_category}
              value={category}
            />
            {
              category === 'homepage' ? (
                <RoundedInput
                  defaultValue={dataDetail.link}
                  errorMessage="Nomor telepon hanya terdiri dari 10 sampai 14 nomor"
                  errors={errors.link}
                  label="URL*"
                  name="link"
                  register={register(validation.link)}
                  type="text"
                />
              ) : (
                  <div className={classes.selectWrapper}>
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
          </>
        ) : (
            <FieldDisplay
              data={dataDetail?.banner_type}
              label="Kategori"
            />
          )
      }
      {
        isEdit ? (
          <>

          </>
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
          <RadioGroup
            control={control}
            errorMessage={errors?.created_at?.message}
            errors={errors.created_at}
            label="Status*"
            name=""
            options={[
              { label: 'Aktif', value: 'aktif' },
              { label: 'Tidak Aktif', value: 'tidakaktif' },
            ]}
            validation={validation.created_at}
            value={'aktif'}
          />
        ) : (
            <FieldDisplay
              data={dataDetail?.created_at}
              label="Status"
            />
          )
      }
      {
        isEdit ? (
          <Typography
            component="p"
            variant="body1"
          >
            * Tidak boleh kosong
          </Typography>
        ) : (
            <>

            </>
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
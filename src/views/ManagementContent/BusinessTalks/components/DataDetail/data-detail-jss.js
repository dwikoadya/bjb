import { makeStyles } from '@material-ui/styles';
import palette from 'theme/palette';

const useStyles = makeStyles(() => ({
  root: {
    justifyContent: 'space-between',
    width: '100%'
  },
  input: {
    marginBottom: 15,
  },
  select:{
    marginBottom: 15,
    marginTop: 5,
    height: '40px',
    borderRadius: 50,
    '&.MuiInputBase-root': {
      fontSize: 14
    }
  },
  uploadContainer: {
    marginBottom: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  uploadArea: {
    position: 'relative',
    borderRadius: 5,
    borderColor: palette.secondary.dark,
    width: '40vh',
    height: '40vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 15
  },
  withBorder: {
    border: '2px dashed',
  },
  userImage: {
    position: 'absolute',
    zIndex: 5,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  uploadInfo: {
    display: 'flex',
    flexDirection: 'column',
  },
  file: {
    height: '100%',
    width: '100%',
    cursor: 'pointer',
    position: 'absolute',
    opacity: 0,
    top: 0,
    left: 0
  },
  fileEmbed: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    height: 40,
    width: 100,
    cursor: 'pointer',
    opacity: 0,
  },
  desktop: {
    display: 'flex',
    width: '100%'
  },
  formContent: {
    width: '28%',
    justifyContent: 'flex-end'
  },
  fullWidth: {
    width: '100%'
  },
  fullWidthRel: {
    width: '100vw'
  },
  buttonRounded: {
    borderRadius: 20,
    textTransform: 'capitalize',
    marginLeft: 10,
    padding: '8px 32px'
  },
  buttonAction: {
    marginTop: 150,
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '20px 0 10px 0'
  }
}));

export default useStyles;
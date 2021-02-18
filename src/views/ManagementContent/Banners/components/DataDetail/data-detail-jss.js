import { makeStyles } from '@material-ui/styles';
import palette from 'theme/palette';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  input: {
    border: '1px solid #C4C4C4',
    outline: 'none',
    padding: theme.spacing(1.5) + 'px 15px',
    borderRadius: 20,
    marginBottom: 15,
    marginTop: 5,
    backgroundColor: palette.white
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
    width: '48%',
    marginBottom: 20,
  },
  uploadArea: {
    position: 'relative',
    borderRadius: 5,
    borderColor: palette.secondary.dark,
    width: '40vh',
    height: '20vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 15,
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
    backgroundColor: 'orange',
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
    width: '45vw'
  },
  formContent: {
    width: '100%',
    overflow: 'hidden',
    justifyContent: 'flex-end'
  },
  fullWidth: {
    width: '100%',
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
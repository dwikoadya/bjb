import { makeStyles } from '@material-ui/styles';
import palette from 'theme/palette';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: 'space-between',
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
    marginBottom: 20
  },
  uploadArea: {
    position: 'relative',
    border: '2px dashed',
    borderRadius: 5,
    borderColor: palette.secondary.dark,
    width: '40vh',
    height: '40vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  uploadInfo: {
    display: 'flex',
    flexDirection: 'column',
  },
  userImage: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  file: {
    height: '100%',
    width: '100%',
    backgroundColor: 'orange',
    cursor: 'pointer',
    position: 'absolute',
    opacity: 0,
    top: 0,
    left: 0,
    zIndex: 2
  },
  desktop: {
    display: 'flex',
    width: '100%'
  },
  formContent: {
    width: '48%',
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
  },
  box:{
    padding: theme.spacing(0.5,2),
    [theme.breakpoints.down('md')]: {
      left:50
    }
  },
}));

export default useStyles;
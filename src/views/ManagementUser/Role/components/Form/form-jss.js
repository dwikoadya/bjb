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
    padding: theme.spacing(1) + 'px 15px',
    borderRadius: 20,
    marginBottom: 15,
    marginTop: 5,
    backgroundColor: palette.white
  },
  inputRequired:{
    border: '1px solid red',
    outline: 'none',
    padding: theme.spacing(1) + 'px 15px',
    borderRadius: 20,
    marginBottom: 15,
    marginTop: 5,
    backgroundColor: palette.white
  },
  textarea:{
    border: '1px solid #C4C4C4',
    outline: 'none',
    padding: theme.spacing(1) + 'px 15px',
    borderRadius: 20,
    marginBottom: 15,
    marginTop: 5,
    backgroundColor: palette.white,
    height:'197px'
  },
  textareaRequired:{
    border: '1px solid red',
    outline: 'none',
    padding: theme.spacing(1) + 'px 15px',
    borderRadius: 20,
    marginBottom: 15,
    marginTop: 5,
    backgroundColor: palette.white,
    height:'197px'
  },
  sectionLeft: {
    width: '30%',
    marginBottom: 20
  },
  desktop: {
    display: 'flex',
    width: '100%'
  },
  formContent: {
    marginLeft: '2%',
    width: '68%',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  formAction:{
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  buttonRounded: {
    borderRadius: 20,
    textTransform: 'capitalize'
  },
  expandButton: {
    paddingLeft: 38,
    paddingRight: 38
  },
  modalPadding: {
    padding: theme.spacing(3)
  },
  required:{
    color:'red',
    marginLeft:15,
    marginTop:-10,
    marginBottom:10
  }
}));

export default useStyles;
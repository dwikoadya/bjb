import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginTop:theme.spacing(2)
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  content: {
    padding: 0
  },
  inner: {
    minWidth: 700
  },
  nameCell: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    height: 42,
    width: 42,
    marginRight: theme.spacing(1)
  },
  actions: {
    padding: theme.spacing(1),
    justifyContent: 'flex-end'
  },
  leftToolbar: {
    height:'40px',
    display: 'flex',
    borderRadius: 100,
    alignItems: 'center'
  },
  select:{
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(3),
    height: '40px',
    width:'108px',
    borderRadius: 50,
    '&.MuiInputBase-root': {
      fontSize: 14
    }
  },
  btn:{
    marginRight: theme.spacing(1.5),
    marginLeft: theme.spacing(1.5),
    [theme.breakpoints.only('xs')]: {
      width: '95px',
      marginRight: theme.spacing(0.2),
      marginLeft: theme.spacing(0.5),
    },
    height:'40px',
    display: 'flex',
    borderRadius: 50,
    alignItems: 'center'
  },
  btn2: {
    height:'40px',
    [theme.breakpoints.only('xs')]: {
      width: '95px',
      marginRight: theme.spacing(0.2),
      marginLeft: theme.spacing(0.2),
    },
    display: 'flex',
    borderRadius: 100,
    alignItems: 'center'
  },
  textField:{
    width:'350px',
    [theme.breakpoints.only('xs')]: {
      width: '230px',
    }
  }
}));

export default useStyles;

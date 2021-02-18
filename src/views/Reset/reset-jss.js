import { makeStyles } from '@material-ui/core';
const background =  '/images/covers/background.png'

const useStyles = makeStyles(theme => ({
  // Styleing React Component
  mainContainer: {
    height: '100%',
    width: '100%',
    position: 'fixed',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage:`url(${background})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  img: {
    marginBottom: 15,
    marginTop: 15,
    width: '192px',
    alignSelf:'center'
  },
  img2:{
    marginBottom: 15,
    marginTop: 15,
  },
  card: {
    display: 'flex',
    width: '417px',
    alignItems: 'center',
    padding: theme.spacing(4),
    [theme.breakpoints.only('xs')]: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      padding: theme.spacing(8),
    }
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    height: 56,
    '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: '#EFCA18'
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#EFCA18'
    }
  },
  links: {
    color: '#EFCA18',
    marginTop: 13,
    fontSize: 14
  },
  rememberMe: {
    alignSelf: 'center',
    flex: 1,
  },
  buttonContainer2: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(2),
    alignSelf: 'center',
  }
}));

export default useStyles;

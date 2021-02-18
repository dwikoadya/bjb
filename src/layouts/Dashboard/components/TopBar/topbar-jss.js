import { makeStyles } from '@material-ui/styles';
import { colors } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  flexGrow: {
    flexGrow: 1
  },
  searchIcon: {
    color: '#165581'
  },
  searchInput: {
    width :'358px'
  },
  searchPopper: {
    zIndex: theme.zIndex.appBar + 100
  },
  searchPopperContent: {
    marginTop: theme.spacing(1)
  },
  trialButton: {
    marginLeft: theme.spacing(2),
    color: theme.palette.white,
    backgroundColor: colors.green[600],
    '&:hover': {
      backgroundColor: colors.green[900]
    }
  },
  trialIcon: {
    marginRight: theme.spacing(1)
  },
  notificationsButton: {
    borderWidth:1,
    marginLeft: theme.spacing(1)
  },
  notificationsBadge: {
    backgroundColor: colors.orange[600]
  },
  logoutButton: {
    marginLeft: theme.spacing(1)
  },
  logoutIcon: {
    marginRight: theme.spacing(1)
  },
  box:{
    padding: theme.spacing(0.5,2),
    position:'absolute',
    left:280,
    [theme.breakpoints.down('md')]: {
      left:50
    }
  },
  txt1:{
    textTransform: 'none',
    marginLeft:theme.spacing(2),
    textAlign:'left',
    fontWeight:'600',
    marginBottom:'-4px'
  },
  txt2:{
    textTransform: 'none',
    marginLeft:theme.spacing(2),
    textAlign:'left',
    fontSize: '14px',
    marginTop:'-4px',
    color:'#727680'
  },
  profile:{
    width:'230px'
  }
}));

export default useStyles;
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    [theme.breakpoints.only('xs')]: {
      marginTop: theme.spacing(2),
    },
  },
  table: {
    marginTop: theme.spacing(3)
  },
  breadcrumb:{
    margin: theme.spacing(3),
    marginBottom: -theme.spacing(6),
  }
}));

export default useStyles;
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
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
  }
}))

export default useStyles;

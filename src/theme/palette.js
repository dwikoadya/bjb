import { colors } from '@material-ui/core';

const white = '#FFFFFF';
const black = '#000000';

export default {
  black,
  white,
  primary: {
    contrastText: white,
    dark: '#EFCA18',
    main: '#EFCA18',
    light: '#EFCA18'
  },
  secondary: {
    contrastText: white,
    dark: '#165581',
    main: '#165581',
    light: '#165581'
  },
  error: {
    contrastText: white,
    dark: colors.red[900],
    main: colors.red[600],
    light: colors.red[400]
  },
  text: {
    primary: colors.blueGrey[900],
    secondary: colors.blueGrey[600],
    link: colors.blue[600],
    custom: '#165581',
    required:'red'
  },
  link: colors.blue[800],
  icon: black,
  background: {
    default: '#F4F6F8',
    paper: white
  },
  blue: '#165581',
  divider: colors.grey[200],
};

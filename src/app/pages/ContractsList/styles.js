import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: '15%',
    justifyContent: 'center',
    justifyItems: 'center',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  buttonStyle: {
    fontSize: '16px',
    padding: '16px',
    width: '300px',
  },
  table: {
    minWidth: 650,
  },
  spanStyle: {
    fontSize: '32px',
  },
}));

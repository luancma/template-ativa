import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  selectGroup: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '40vw',
  },
  selectGroupSmall: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '70vw',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  formControl: {
    minWidth: 120,
  },
  formButtons: {
    display: 'flex',
    flexDirection: 'row',
    padding: '20px',
    width: '40vw',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  formControll: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  formControllSmall: {
    display: 'flex',
    width: '70vw',
    justifyContent: 'space-around',
    padding: '15px',
  },
  button: {
    width: '40vw',
    padding: '14px',
  },
  buttonSmall: {
    width: '70vw',
    padding: '14px',
  },
  textStyle: {
    width: '40vw',
  },
  textStyleSmall: {
    width: '70vw',
  },
  formSelect: {
    margin: '14px 0 14px ',
    minWidth: '40%',
  },
}));

import { makeStyles } from '@material-ui/core/styles';

export const useStyle = makeStyles(theme => ({
  grid: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '5%',
    marginBottom: '5%',
  },
  textStyle: {
    width: '40vw',
  },
  textStyleSmall: {
    width: '70vw',
  },
  spanTitle: {
    fontSize: '36px',
  },
  button: {
    width: '40vw',
    padding: '14px',
  },
  buttonSmall: {
    width: '70vw',
    padding: '14px',
  },
}));

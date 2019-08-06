import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SvgIcon from '@material-ui/core/SvgIcon';

export default function ContractPanel() {
  return <NestedList />;
}

const styleLink = {
  fontSize: '18px',
  color: '#616161',
};

function NestedList() {
  const useStyles = makeStyles(theme => ({
    root: {
      alignItems: 'center',
      width: '100%',
      maxWidth: '50vw',
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(10),
    },

    tableIcons: {
      display: 'flex',
      justifyContent: 'center',
      paddingTop: '20px',
    },
  }));

  const classes = useStyles();

  const icons = {
    panel:
      'M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z',
    add_panel:
      'M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9h-4v4h-2v-4H9V9h4V5h2v4h4v2z',
    add_playlist:
      'M14 10H2v2h12v-2zm0-4H2v2h12V6zm4 8v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM2 16h8v-2H2v2z',
  };

  return (
    <div className={classes.tableIcons}>
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={(
          <ListSubheader component="div" id="nested-list-subheader">
            <span style={{ fontSize: '16px' }}>Gerenciamento de contratos</span>
          </ListSubheader>
)}
        className={classes.root}
      >
        <ListItem button>
          <ListItemIcon>
            <SvgIcon style={{ fontSize: '36px' }}>
              <path d={icons.add_panel} />
            </SvgIcon>
          </ListItemIcon>
          <ListItemText primary="Criar novo contrato" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <SvgIcon style={{ fontSize: '36px' }}>
              <path d={icons.panel} />
            </SvgIcon>
          </ListItemIcon>
          <ListItemText primary="Lista de contratos" />
        </ListItem>
      </List>
    </div>
  );
}

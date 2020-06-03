import React, { ChangeEvent, FormEvent, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import {AppBar, Button, CircularProgress, TextField ,Toolbar} from '@material-ui/core';

import { useAppState } from '../../state';
import useVideoContext from '../../hooks/useVideoContext/useVideoContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      backgroundColor: theme.palette.background.default,
    },
    toolbar: {
      [theme.breakpoints.down('xs')]: {
        padding: 0,
      },
    },
    rightButtonContainer: {
      display: 'flex',
      alignItems: 'center',
      marginLeft: 'auto',
    },
    form: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      [theme.breakpoints.up('md')]: {
        marginLeft: '2.2em',
      },
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      maxWidth: 200,
    },
    loadingSpinner: {
      marginLeft: '1em',
    },
    displayName: {
      margin: '1.1em 0.6em',
      minWidth: '200px',
      fontWeight: 600,
    },
    joinButton: {
      margin: '1em',
    },
  })
);

export default function MenuBar() {
  const classes = useStyles();
  const { user, getToken } = useAppState();
  const { isConnecting, connect } = useVideoContext();

  const [name, setName] = useState<string>(user?.displayName || '');
  const [roomName, setRoomName] = useState<string>('');

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleRoomNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRoomName(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    getToken(name, roomName).then(token => connect(token));
  };

  return (
    <AppBar className={classes.container} position="static">
      <Toolbar className={classes.toolbar}>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              id="menu-name"
              label="Name"
              className={classes.textField}
              value={name}
              onChange={handleNameChange}
              margin="dense"
            />
            <TextField
              id="menu-room"
              label="Room"
              className={classes.textField}
              value={roomName}
              onChange={handleRoomNameChange}
              margin="dense"
            />
            <Button
              className={classes.joinButton}
              type="submit"
              color="primary"
              variant="contained"
            >
              Join Room
            </Button>
            {(isConnecting) && <CircularProgress className={classes.loadingSpinner} />}
          </form>
      </Toolbar>
    </AppBar>
  );
}

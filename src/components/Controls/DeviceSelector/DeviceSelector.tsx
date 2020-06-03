import React, { useState } from 'react';

import AudioInputList from './AudioInputList/AudioInputList';
import AudioOutputList from './AudioOutputList/AudioOutputList';
import { Dialog, Fab, DialogContent, Button, Theme } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import VideoInputList from './VideoInputList/VideoInputList';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: '500px',
      [theme.breakpoints.down('xs')]: {
        width: 'calc(100vw - 32px)',
      },
      '& .inputSelect': {
        width: 'calc(100% - 35px)',
      },
    },
    listSection: {
      margin: '1em 0',
    },
    button: {
      float: 'right',
    },
    paper: {
      [theme.breakpoints.down('xs')]: {
        margin: '16px',
      },
    },
    fab: {
      margin: theme.spacing(1),
      '&[disabled]': {
        color: 'rgba(225, 225, 225, 0.8)',
        backgroundColor: 'rgba(175, 175, 175, 0.6);',
      },
    },
  })
);

export default function DeviceSelector() {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Fab className={classes.fab} onClick={() => setIsOpen(true)} data-cy-device-select>
        <SettingsIcon />
      </Fab>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} classes={{ paper: classes.paper }}>
        <DialogContent className={classes.container}>
          <div className={classes.listSection}>
            <AudioInputList />
          </div>
          <div className={classes.listSection}>
            <AudioOutputList />
          </div>
          <div className={classes.listSection}>
            <VideoInputList />
          </div>
          <Button className={classes.button} onClick={() => setIsOpen(false)}>
            Done
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}

import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';

const NotificationDialog = ({ open, onClose, onSetNotification, todo, selectedDate }) => {
  const [notificationTime, setNotificationTime] = useState(dayjs().format('HH:mm'));

  const handleSetNotification = () => {
    const [hours, minutes] = notificationTime.split(':');
    const notificationDate = selectedDate.hour(hours).minute(minutes).second(0);
    onSetNotification(todo, notificationDate);
    onClose();
  };

  return (
    <div>
      <Dialog open={open} onClose={onClose}>
      <DialogActions>
        <Button onClick={onClose} variant="contained">
          x
        </Button>
      </DialogActions>
      <DialogTitle>Set Notification</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Set a time for the notification for your todo: "{todo?.text}"
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="time"
          label="Notification Time"
          type="time"
          fullWidth
          value={notificationTime}
          onChange={(e) => setNotificationTime(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSetNotification} variant='outlined'>OK</Button>
      </DialogActions>
    </Dialog>
    </div>
   
  );
};

export default NotificationDialog;

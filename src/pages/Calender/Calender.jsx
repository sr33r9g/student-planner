import React, { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CalendarWithTodoLogic from '../../Hooks/CalendarWithTodoLogic';
import NotificationDialog from '../Eve/NotificationDialog';
import dayjs from 'dayjs';

const Cal = () => {
  const {
    selectedDate,
    todos,
    newTodo,
    handleDateChange,
    addTodo,
    removeTodo,
    setNewTodo,
    addEvent,
  } = CalendarWithTodoLogic();

  const [open, setOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

  const handleClickOpen = (todo) => {
    setSelectedTodo(todo);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSetNotification = (todo, notificationDate) => {
    const delay = notificationDate.diff(dayjs());

    if (delay > 0) {
      setTimeout(() => {
        showNotification(todo.text);
      }, delay);
    }
  };

  const showNotification = (todoText) => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    } else if (Notification.permission !== "granted") {
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {
          new Notification("Todo Event", {
            body: todoText,
          });
        }
      });
    } else {
      new Notification("Todo Event", {
        body: todoText,
      });
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className='container hwc' style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-around' }}>
        <div className='box' style={{ padding: '3%' }}>
          <StaticDatePicker
            orientation="portrait"
            value={selectedDate}
            onChange={handleDateChange}
          />
        </div>
        <div className='container box' style={{ padding: '3%' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <TextField
              style={{ minWidth: '250px' }}
              label="Add a to-do"
              variant="outlined"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  addTodo();
                }
              }}
            />
            <Button variant="contained" onClick={addTodo}>+</Button>
          </div>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            {todos && todos.map((todo, index) => (
              <li key={index}>
                <div style={{ display: 'flex', width: '275px', justifyContent: 'space-between' }}>
                  <div style={{ flex: '1 1 auto', maxWidth: '135px', wordWrap: 'break-word' }}>{todo.text}</div>
                  <div>
                    <Button variant="contained" onClick={() => handleClickOpen(todo)} style={{ padding: '0px' }}>eve</Button>
                    <Button variant="outlined" onClick={() => removeTodo(todo)} style={{ padding: '0px' }}>-</Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <NotificationDialog
        open={open}
        onClose={handleClose}
        onSetNotification={handleSetNotification}
        todo={selectedTodo}
        selectedDate={selectedDate}
      />
    </LocalizationProvider>
  );
};

export default Cal;

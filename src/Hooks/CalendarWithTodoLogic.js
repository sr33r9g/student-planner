import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
const UserId =localStorage.getItem("user-id");
const id=JSON.parse(UserId)
const CalendarWithTodoLogic = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetchTodos();
  }, [selectedDate]); // Fetch todos when selected date changes
  
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const fetchTodos = async () => {
    try {
        
        console.log(id._id)
        const response = await fetch(`/api/todo/fetchTodos/${selectedDate.format('YYYY-MM-DD')}/${id._id}`);
        console.log(selectedDate.format('YYYY-MM-DD'),id._id)
        if (response.ok) {
            const data = await response.json();
            console.log('Fetched todos:', data.todos);
            setTodos(data.todos);
        } else {
            throw new Error('Failed to fetch todos: ' + response.status);
        }
    } catch (error) {
        console.error('Error fetching todos:', error.message);
        // Display error message to user or handle it appropriately
    }
};


const addTodo = async () => {
  console.log(id._id)
  try {
    if (newTodo.trim() !== '') {
      // Optimistically update UI
      const todoToAdd = {
        date: selectedDate.format('YYYY-MM-DD'),
        text: newTodo,
        completed: false,
        // Replace with the actual username
      };
      
      // Send request to add todo
      const response = await fetch(`/api/todo/todolistadd/${id._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todoToAdd),
      });

      if (!response.ok) {
        throw new Error('Failed to add todo');
      }

      // Fetch todos again after adding a new todo
      fetchTodos();
    }
  } catch (error) {
    console.error('Error adding todo:', error);
  }
};

  
  const removeTodo = async(todo) => {
    try {
        console.log(todo._id);
        const response = await fetch(`/api/todo/todolistdel/${todo._id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Fetched todos:', data.todos);
            // Assuming setTodos is a function to update state
            setTodos(data.todos); // You need to define setTodos appropriately
            fetchTodos();
        } else {
            throw new Error('Failed to fetch todos: ' + response.status);
        }
    } catch (error) {
        console.error('Error fetching todos:', error.message);
        // Display error message to user or handle it appropriately
    }
   
  };
  const addEvent=(todo)=>{
    console.log(todo)
   
   
  }


  
  return {
    selectedDate,
    todos,
    newTodo,
    handleDateChange,
    addTodo,
    removeTodo,
    setNewTodo ,
    addEvent
  
  // Pass setNewTodo to allow updating newTodo state
  };
};

export default CalendarWithTodoLogic;

import './App.css'
import * as React from 'react';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {Grid} from '@mui/material';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {TaskListContext} from "./context/todoContext.jsx";
import {v4 as uuid} from 'uuid';
import TaskComponent from "./TaskComponent.jsx";
import {useEffect, useState} from "react";

const theme = createTheme({
    typography: {
        fontFamily: [
            'Roboto',
        ],
        fontWeight: 500,
    }

});
function App() {
    const [tasksList ,setTaskList] = useState([
        {
            id: uuid(),
            title: 'Task 1',
            description: 'Task 1',
            isCompleted: false,
        },
        {
            id: uuid(),
            title: 'Task 2',
            description: 'Task 2',
            isCompleted: false,
        },
        {
            id: uuid(),
            title: 'Task 3',
            description: 'Task 3',
            isCompleted: false,
        },
        {
            id: uuid(),
            title: 'Task 4',
            description: 'Task 4',
            isCompleted: false,
        }
    ]);
    const [taskTitle, setTaskTitle] = useState('');
    function addTask () {
        let storedTasks = [];
        if(taskTitle.trim()) {
            storedTasks = [...tasksList, {title:taskTitle, description: taskTitle}];
            setTaskList(storedTasks);
        }
        setTaskTitle('');
    }

    useEffect(() => {
        setTaskList(JSON.parse(localStorage.getItem('tasksList')));
    }, []);
  return (
      <ThemeProvider theme={theme}>

              <Container className="container" maxWidth="sm">
                  {/* Start Header */}
                  <Typography variant="h2">
                      My Tasks
                  </Typography>

                  <Stack spacing={2} direction="row" alignItems="center" justifyContent="center">
                      <Button variant="outlined">All Tasks</Button>
                      <Button variant="outlined">Completed</Button>
                      <Button variant="outlined">Not Completed</Button>
                  </Stack>
                  <TaskListContext.Provider value={{tasksList,setTaskList}}>
                      {/* Start Task */}
                      {tasksList.map((task) => (
                          <TaskComponent key={task.id} task={task} />
                      ))}
                      {/* Start Add Task */}
                  </TaskListContext.Provider>
                  <Grid container spacing={1} alignItems="stretch" flexDirection="row">
                      <Grid size={8}>
                          <TextField value={taskTitle} id="outlined-basic" label="The Title of task" variant="outlined" fullWidth onChange={(e) => setTaskTitle(e.target.value)} />
                      </Grid>
                      <Grid size={4}>
                          <Button variant="outlined" fullWidth style={{height:"100%"}} onClick={addTask}>Add Task</Button>
                      </Grid>
                  </Grid>
              </Container>

      </ThemeProvider>
  )
}

export default App

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
import {useState} from "react";
import {useLocalStorage} from "./Hooks/useLocalStorage.js";

const theme = createTheme({
    typography: {
        fontFamily: [
            'Roboto',
        ],
        fontWeight: 500,
    }
});

// Default tasks
const defaultTasks =  [
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
];

function App() {
    // Initialize state with function to avoid ESLint warning
    const [tasksList, setTaskList] = useLocalStorage('tasksList',defaultTasks);
    const [taskTitle, setTaskTitle] = useState('');
    const [filterMode, setFilterMode] = useLocalStorage('filterMode','all');

    function addTask() {
        if(taskTitle.trim()) {
            const newTask = {
                id: uuid(),
                title: taskTitle.trim(),
                description: taskTitle.trim(),
                isCompleted: false
            };
            setTaskList(prevTasks => [...prevTasks, newTask]);
            setTaskTitle('');
        }
    }

    // Filter tasks based on mode
    const filteredTasks = tasksList.filter(task => {
        if (filterMode === 'completed') return task.isCompleted;
        if (filterMode === 'notCompleted') return !task.isCompleted;
        return true;
    });

    return (
        <ThemeProvider theme={theme}>
            <Container className="container" maxWidth="sm">
                {/* Start Header */}
                <Typography variant="h2">
                    My Tasks
                </Typography>

                <Stack spacing={2} direction="row" alignItems="center" justifyContent="center">
                    <Button
                        variant={filterMode === 'all' ? "contained" : "outlined"}
                        onClick={() => setFilterMode('all')}
                    >
                        All Tasks ({tasksList.length})
                    </Button>
                    <Button
                        variant={filterMode === 'completed' ? "contained" : "outlined"}
                        onClick={() => setFilterMode('completed')}
                    >
                        Completed ({tasksList.filter(t => t.isCompleted).length})
                    </Button>
                    <Button
                        variant={filterMode === 'notCompleted' ? "contained" : "outlined"}
                        onClick={() => setFilterMode('notCompleted')}
                    >
                        Active ({tasksList.filter(t => !t.isCompleted).length})
                    </Button>
                </Stack>

                <TaskListContext.Provider value={{tasksList, setTaskList}}>
                    {/* Start Task */}
                    {filteredTasks.length === 0 ? (
                        <Typography
                            variant="body1"
                            sx={{
                                textAlign: 'center',
                                marginTop: 5,
                                marginBottom: 5,
                                opacity: 0.7
                            }}
                        >
                            {filterMode === 'all' && 'No tasks yet. Add one below!'}
                            {filterMode === 'completed' && 'No completed tasks'}
                            {filterMode === 'notCompleted' && 'No active tasks'}
                        </Typography>
                    ) : (
                        filteredTasks.map((task) => (
                            <TaskComponent key={task.id} task={task} />
                        ))
                    )}
                </TaskListContext.Provider>

                {/* Start Add Task */}
                <Grid container spacing={1} alignItems="stretch" flexDirection="row">
                    <Grid size={8}>
                        <TextField
                            value={taskTitle}
                            id="outlined-basic"
                            label="The Title of task"
                            variant="outlined"
                            fullWidth
                            onChange={(e) => setTaskTitle(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    addTask();
                                }
                            }}
                        />
                    </Grid>
                    <Grid size={4}>
                        <Button
                            variant="outlined"
                            fullWidth
                            style={{height:"100%"}}
                            onClick={addTask}
                            disabled={!taskTitle.trim()}
                        >
                            Add Task
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    );
}

export default App;
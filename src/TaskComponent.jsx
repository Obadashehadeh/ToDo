import {Card, Grid, IconButton,Button,DialogTitle,Dialog,DialogContent,DialogContentText,DialogActions,Typography} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
// import AddIcon from '@mui/icons-material/Add';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import EditIcon from '@mui/icons-material/Edit';
import * as React from "react";
import {TaskListContext} from "./context/todoContext.jsx";
import {useContext, useEffect, useState} from "react";
import TextField from "@mui/material/TextField";




export default function TaskComponent({task}) {
    const {tasksList, setTaskList} = useContext(TaskListContext);
    const [updatedTask,setUpdatedTask] = useState({title:task.title,description:task.title});
    const [openDelete, setOpenDelete] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);

    function handleCompleted () {
        const updatedTasksList = tasksList.map((t) => {
            if(t.id === task.id) {
                t.isCompleted = !t.isCompleted;
            }
            return t;
        })
        setTaskList(updatedTasksList);
        localStorage.setItem('tasksList', JSON.stringify(updatedTasksList));
    }

    const handleClickOpenDelete = () => {
        setOpenDelete(true);
    };

    const handleCloseDelete = () => {
        setOpenDelete(false);
    };

    const deleteTask = () => {
        const updatedTasksList = tasksList.filter((t) => {
            return t.id !== task.id;
        })
        setTaskList(updatedTasksList);
        localStorage.setItem('tasksList', JSON.stringify(updatedTasksList));
    }

    const handleCloseEdit = () => {
        setOpenEdit(false);
    }

    const handleSubmitEdit = (event) => {
        event.preventDefault();
        const updatedTasksList = tasksList.map((t) => {
            if(t.id === task.id) {
                t.title = updatedTask.title;
                t.description = updatedTask.description;
            }
            return t;
        })
        setTaskList(updatedTasksList);
        localStorage.setItem('tasksList', JSON.stringify(updatedTasksList));
        setOpenEdit(false);
    }

    const handleClickOpenEdit = () => {
        setOpenEdit(true);
    }

    useEffect(() => {
        const storedTasks = localStorage.getItem('tasksList');
        setTaskList(JSON.parse(storedTasks))
    },[])
    return (
        <Card sx={{
            minHeight:'50px',
            marginTop: 5,
            marginBottom: 5,
            padding:'5px',
        }}>
            <Grid container sx={{
                display: 'flex',
                width: "100%",
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row'
            }}>
                <Grid size={8} sx={{textAlign: 'left'}}>
                    <Typography variant="h5">
                        {task.title}
                    </Typography>

                    <Typography variant="h6">
                        {task.description}
                    </Typography>
                </Grid>
                <Grid size={4} display="flex" flexDirection="row" alignItems='center' justifyContent='space-between'>
                    <IconButton className="iconBtn" sx={{color:"red"}}>
                        <DeleteIcon onClick={handleClickOpenDelete} />
                    </IconButton>
                    <IconButton className="iconBtn" sx={{color:"blue"}}>
                        <EditIcon onClick={handleClickOpenEdit} />
                    </IconButton>
                    <IconButton className="iconBtn" sx={{
                        color: task.isCompleted ? "white" : "green",
                        backgroundColor:task.isCompleted ? "green" : "white"
                    }}>
                        <TaskAltIcon value={task.isCompleted} onClick={()=>{handleCompleted(task.id)}} />
                    </IconButton>
                </Grid>
            </Grid>
            <Dialog
                open={openDelete}
                onClose={handleCloseDelete}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {`Are you sure you want to delete task?`}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {`You cannot undo this action.`}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDelete}>Disagree</Button>
                    <Button onClick={deleteTask} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openEdit} onClose={handleCloseEdit}>
                <DialogTitle>Edit Task</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmitEdit} id="subscription-form">
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Title"
                            id='title'
                            type="text"
                            fullWidth
                            variant="standard"
                            value={updatedTask.title}
                            onChange={(e) => setUpdatedTask({...updatedTask,title: e.target.value})}
                        />
                        <TextField
                            margin="dense"
                            label="Description"
                            id="description"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={updatedTask.description}
                            onChange={(e) => setUpdatedTask({...updatedTask,description: e.target.value})}

                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEdit}>Cancel</Button>
                    <Button type="submit" form="subscription-form">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </Card>

    )
}
import {Card, Grid, IconButton,Button,DialogTitle,Dialog,DialogContent,DialogContentText,DialogActions,Typography} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import EditIcon from '@mui/icons-material/Edit';
import * as React from "react";
import {TaskListContext} from "./context/todoContext.jsx";
import {useContext, useState} from "react";
import TextField from "@mui/material/TextField";

export default function TaskComponent({task}) {
    const {tasksList, setTaskList} = useContext(TaskListContext);
    const [updatedTask, setUpdatedTask] = useState({
        title: task.title,
        description: task.description
    });
    const [openDelete, setOpenDelete] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);

    function handleCompleted() {
        const updatedTasksList = tasksList.map((t) => {
            if(t.id === task.id) {
                return {...t, isCompleted: !t.isCompleted};
            }
            return t;
        });
        setTaskList(updatedTasksList);
    }

    const handleClickOpenDelete = () => {
        setOpenDelete(true);
    };

    const handleCloseDelete = () => {
        setOpenDelete(false);
    };

    const deleteTask = () => {
        const updatedTasksList = tasksList.filter((t) => t.id !== task.id);
        setTaskList(updatedTasksList);
        setOpenDelete(false);
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
        // Reset form to original values
        setUpdatedTask({
            title: task.title,
            description: task.description
        });
    };

    const handleSubmitEdit = (event) => {
        event.preventDefault();
        const updatedTasksList = tasksList.map((t) => {
            if(t.id === task.id) {
                return {
                    ...t,
                    title: updatedTask.title,
                    description: updatedTask.description
                };
            }
            return t;
        });
        setTaskList(updatedTasksList);
        setOpenEdit(false);
    };

    const handleClickOpenEdit = () => {
        setOpenEdit(true);
    };

    return (
        <Card sx={{
            minHeight:'50px',
            marginTop: 5,
            marginBottom: 5,
            padding:'5px',
            opacity: task.isCompleted ? 0.7 : 1,
            textDecoration: task.isCompleted ? 'line-through' : 'none'
        }}>
            <Grid container sx={{
                display: 'flex',
                width: "100%",
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row'
            }}>
                <Grid size={8} sx={{textAlign: 'left'}}>
                    <Typography variant="h5" sx={{textDecoration: 'inherit'}}>
                        {task.title}
                    </Typography>
                    <Typography variant="h6" sx={{textDecoration: 'inherit'}}>
                        {task.description}
                    </Typography>
                </Grid>
                <Grid size={4} display="flex" flexDirection="row" alignItems='center' justifyContent='space-between'>
                    <IconButton
                        className="iconBtn"
                        sx={{color:"red"}}
                        onClick={handleClickOpenDelete}
                    >
                        <DeleteIcon />
                    </IconButton>
                    <IconButton
                        className="iconBtn"
                        sx={{color:"blue"}}
                        onClick={handleClickOpenEdit}
                    >
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        className="iconBtn"
                        sx={{
                            color: task.isCompleted ? "white" : "green",
                            backgroundColor: task.isCompleted ? "green" : "white"
                        }}
                        onClick={handleCompleted}
                    >
                        <TaskAltIcon />
                    </IconButton>
                </Grid>
            </Grid>

            {/* Delete Dialog */}
            <Dialog
                open={openDelete}
                onClose={handleCloseDelete}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {`Are you sure you want to delete "${task.title}"?`}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        You cannot undo this action.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDelete}>Cancel</Button>
                    <Button onClick={deleteTask} autoFocus color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Edit Dialog */}
            <Dialog open={openEdit} onClose={handleCloseEdit}>
                <DialogTitle>Edit Task</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmitEdit} id="edit-task-form">
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Title"
                            id='title'
                            type="text"
                            fullWidth
                            variant="standard"
                            value={updatedTask.title}
                            onChange={(e) => setUpdatedTask({...updatedTask, title: e.target.value})}
                            required
                        />
                        <TextField
                            margin="dense"
                            label="Description"
                            id="description"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={updatedTask.description}
                            onChange={(e) => setUpdatedTask({...updatedTask, description: e.target.value})}
                            required
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEdit}>Cancel</Button>
                    <Button type="submit" form="edit-task-form">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
}
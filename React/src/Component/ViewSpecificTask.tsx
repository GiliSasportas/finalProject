import { Avatar, Button, Card, CardActions, CardContent, CardMedia, Grid, Paper, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { Textarea } from "@mui/joy";
import { useCookies } from "react-cookie";
import { useLocation } from "react-router-dom";
import axios from "axios";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EditNoteIcon from '@mui/icons-material/EditNote';


// show specific task
export const ViewSpecificTask = () => {
    const { state } = useLocation();
    const [showFile, setShowFile] = useState(false);
    const [file, setFile] = useState<any>();
    const [checked, setChecked] = useState<any>();
    const [cookies, setCookie] = useCookies(['token']);
    const [remarks, setRemarks] = React.useState('');

    const handleChange = (event: any) => {
        setChecked(event.target.checked);
       

        if (event.target.checked) {
            updateStudentDoIt(event.target.id);
        }
    }
    // create new note about this task
    const createNote = () => {
        if (remarks === '') {
            alert("ההודעה ריקה,ההודעה לא תשלח"!);
            return;
        }
        const token = cookies.token;
  

        axios.put("http://localhost:3000/task/Remarks", {
            Headers: { Authorization: `${token}` },
            method: 'PUT',
            body: {
                Remarks: remarks, idTask: state.task._id
            },
        })
            .then((response) => {
             
                alert(response.data)
            }).catch((error) => {
              
                alert(error.response.data.message);
            })
    }
    // update the task to has been done
    const updateStudentDoIt = (id: string) => {
  
        axios.put('http://localhost:3000/task', {
            Headers: {
                Authorization: `${cookies.token}`,
                Accept: 'application/json'
            },
            body: {
                taskId: id
            }
        })
        .then((response)=>{
        
            
         alert(response.data)
        })

            .catch(error => {
                alert(error.response.data.message)

            });
    }

    const showTaskFiles = () => {
     
        const taskId = state.task._id;
        axios.get(`http://localhost:3000/task/file:${taskId}`,
            {
                headers: { Authorization: `${cookies.token}` },
                responseType: "stream"
            }
        ).then(response => {
            const downloadLink = document.createElement('a')
            downloadLink.href = response.data;
            downloadLink.download = `${state.task.subjectName}.pdf`
            document.body.appendChild(downloadLink);
            downloadLink.click(); // Simulate a click on the link to initiate the download
            document.body.removeChild(downloadLink); // Clean up the temporary element
        })
            .catch(error => {
                alert(error.response.data.message)
            })
    }
    return (
        <>
            <div>
                <br />
                <br />
            </div>
            <Paper
                sx={{
                    p: 2,
                    margin: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    maxWidth: 800,
                    flexGrow: 1,
                    direction: 'rtl',
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                }}
            >
                <Grid container spacing={2}>
                    <Grid item>
                        <Avatar sx={{ bgcolor: "ActiveCaption", width: 70, height: 70 }}>
                            < AssignmentIcon sx={{ fontSize: 40 }} />

                        </Avatar>
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <b> תיאור המטלה:</b>
                                <Typography gutterBottom variant="subtitle1" component="div" >
                                    <b>{state.task.subjectName}</b>{" | "}
                                    {/* {teacher} */}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    {state.task.lessonDescription}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {state.task.taskText}
                                </Typography>
                            </Grid>
                            <Grid item>


                                <Button variant="text" onClick={showTaskFiles}>   <FileDownloadOutlinedIcon />להורדת הקובץ המצורף

                                </Button>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle1" component="div">
                                {/* $19.00 */}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
            <div>
                <br />
                <br />
            </div>
            <Paper
                sx={{
                    p: 2,
                    margin: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    maxWidth: 800,
                    flexGrow: 1,
                    direction: 'rtl',
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                }}
            >
                <Grid container spacing={2}>
                    <Grid item>
                        <Avatar sx={{ bgcolor: "ActiveCaption", width: 70, height: 70 }}>
                            <EditNoteIcon sx={{ fontSize: 50 }} />

                        </Avatar>
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <b>עריכת המטלה:</b>

                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <input type="checkbox" id={state.task._id} onChange={((e) => { handleChange(e) })} style={{ width: 20, height: 30 }} />
                                    ביצעת את המטלה?
                                </div>
                                <Typography gutterBottom variant="h8" component="div">יש לך הארות\הערות על המטלה זה המקום--
                                    <Textarea onChange={(e) => (setRemarks(e.target.value))} style={{ height: 100, width: 700 }}></Textarea>

                                </Typography>
                                {/* <Typography variant="body2" color="text.secondary"> */}
                                <Stack  >
                                    <Button variant="outlined" onClick={createNote}>
                                        שלח
                                    </Button>
                                </Stack>
                            </Grid>
                            <Grid item>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle1" component="div">
                                {/* $19.00 */}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
            </>
    )
}






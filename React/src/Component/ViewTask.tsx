
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from 'react-router-dom';
import { Alert, Autocomplete, Avatar, Button, Card, CardActions, CardContent, CardMedia, Collapse, Grid, IconButton, Stack, TextField, Typography, tableCellClasses } from "@mui/material";
import { useCookies } from 'react-cookie';
import { Box, ButtonGroup } from "@mui/joy";
import CloseIcon from '@mui/icons-material/Close';
import { pink } from "@mui/material/colors";
import moment from "moment";
import { styled } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';

export const ViewTask = () => {
    const [taskList, setTaskList] = useState([]);
    const [list, setList] = useState<any>([]);
    const [taskList2, setTaskList2] = useState([]);
    const [dateList, setDateList] = useState([])
    const [subjectList, setSubjectList] = useState([])
    const [open, setOpen] = useState(true);
    const navigate = useNavigate();
    const [checked, setChecked] = React.useState(false);
    const [cookies, setCookie] = useCookies(['token']);
    const [subject, setSubject] = useState<any>([])
    const [subject1, setSubject1] = useState(["math"])


    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: '',
            color: theme.palette.common.black,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
            
        },
    }));
    const handleChange = (event: any) => {
     
        setChecked(event.target.checked);
    

        if (event.target.checked) {
            updateStudentDoIt(event.target.id);
        }

    };

    


    useEffect(() => {
        axios.get('http://localhost:3000/task', {
            headers: {
                Authorization: `${cookies.token}`,
                Accept: 'application/json'
            },
        })
            .then(response => {
                const alltsks = response.data;
           
                setTaskList(alltsks);
                setTaskList2(alltsks);
                sortTasksByDate(alltsks);

            })
            .catch(error => {
        
                alert(error.response.data.message)
            });




    }, [])

    const updateStudentDoIt = (id: string) => {
        axios.put('http://localhost:3000/task', {
            headers: {
                Authorization: `${cookies.token}`,
                Accept: 'application/json'
            },
            body: {
                taskId: id
            }
        }).then(() => {
            const showEror = document.getElementById('alertError');
            if (showEror)
                showEror.style.display = 'flex';

        })

            .catch(error => {
             
            });
    }

    const sortTasksByDate = (tasks: any) => {
        setTaskList2(tasks);
        
        tasks.sort(function (a: any, b: any) {
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
        

            return Date.parse(b.date) - Date.parse(a.date);
        });
        setTaskList2(tasks);
    }

 


    useEffect(() => {
        let list1 = [{}]
       
        taskList.forEach((element) => {
            list1.push({ "label": element.subjectName })
          });
          
          list1 = [...new Set(list1.map(JSON.stringify))].map(JSON.parse);
      
          setSubject(list1)
          
    }, [taskList])


    function bySubject(s: any) {
     
        setTaskList2(taskList)
        let subjects
        let list = taskList;
        subjects = list.filter((i: any) => i.subjectName == s)
        setTaskList2(subjects)
    }
    const allTasks = () => {

        setTaskList2(taskList)
    }
    const byDate = () => {
        debugger
     
        setTaskList2(taskList)
        let subjects;
        let list = taskList
        subjects = list.filter(task => moment(new Date(Date.now())).utc().format('DD/MM/YYYY') === moment(task.date).utc().format('DD/MM/YYYY'))
   
        setTaskList2(subjects);
    }
    const chekDate = (date: Date) => {
        return (moment(new Date(Date.now())).utc().format('DD/MM/YYYY') === moment(date).utc().format('DD/MM/YYYY'))
    }
    return (
        <>
            <div>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        '& > *': {
                            m: 1,
                        },
                    }}
                >

                    <ButtonGroup variant="outlined" aria-label="outlined button group" >
                        <Button onClick={byDate}>משימות מהיום</Button>
                        <Autocomplete
                            id="combo-box-demo"
                            options={subject}
                            getOptionLabel={(option) => option.label}
                            style={{ padding: '5%', color: '#1976D2' }}
                            sx={{ width: '90%', height: '50%', color: '#1976D2' }}
                            onSelect={(e) => bySubject(e.target.value)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="משימות לפי מקצוע"
                                    // Extract the desired property
                                    style={{ textAlign: 'right', color: '#1976D2' }}
                                />
                            )}
                        />
                        <Button onClick={allTasks}>כל המשימות</Button>
                    </ButtonGroup>
                </Box>

                {taskList2.map((task: any) => (
                    <>
                        <div style={{ display: 'flex', direction: 'rtl', justifyContent: 'space-evenly' }}>
                            <Card sx={{ width: '60%', display: 'flex', }} style={{ display: "inline-block", margin: 12, direction: 'rtl' }}>
                                <CardMedia
                                />
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Stack direction="row" spacing={2}>
                                        <Avatar
                                            alt={task.subjectName}
                                            src={`/src/assets/images/${task.subjectName}.png`}
                                            sx={{ width: 56, height: 56, marginRight: 2, marginTop: 2 }}
                                        />
                                    </Stack>
                                    {/* <input type="checkbox" id={task._id} onChange={((e) => { handleChange(e) })} style={{ width: 20, height: 30 }} /> */}

                                </div>
                                {chekDate(task.date) && <StyledTableCell align="right">היום
                                </StyledTableCell>}
                                {!chekDate(task.date) && <StyledTableCell align="right">{moment(task.date).utc().format('DD/MM/YYYY')}
                                </StyledTableCell>}
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">

                                        {task.subjectName}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {task.taskText}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" onClick={(() => { navigate('/main/ViewSpecificTask', { state: { task: task, img: `/src/assets/images/${task.subjectName}.png` } }) })}>צפה במשימה</Button>
                                </CardActions>
                            </Card>
                        </div>
                    </>
                )
                )
                }
                <div id="alertError" style={{ display: 'none' }}>
                    <Box sx={{ width: '50%', position: 'fixed', top: '15%', alignItems: 'center' }}  >
                        <Collapse in={open}>
                            <Alert
                                severity="success"
                                action={
                                    <IconButton
                                        aria-label="close"
                                        color="inherit"
                                        size="small"
                                        style={{ alignItems: 'center' }}
                                        onClick={() => {
                                            setOpen(false);
                                        }}
                                    >
                                        <CloseIcon fontSize="inherit" />
                                    </IconButton>
                                }
                                sx={{ mb: 2 }}
                            >
                                המשימה עודכנה כנעשתה
                            </Alert>
                        </Collapse>
                    </Box>
                </div>
            </div>
        </>
    )
}
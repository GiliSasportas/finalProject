import axios from "axios"
import { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useCookies } from 'react-cookie';
import { Button } from "@mui/joy";
import moment from "moment";
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React from "react";


export const taskStatusTeachet = () => {
    const [taskList, setTaskList] = useState<any>([]);
    const [students, setStudents] = useState([]);
    const [names, setNames] = useState<any>([]);
    const [isHovered, setIsHovered] = useState(false);
    const [studentsDoTasks, setStudentsDoTasks] = useState<any>([]);
    const [cookies, setCookies] = useCookies(['token']);
    const [open, setOpen] = React.useState(false);
    const [remarks, setRemarks] = useState<any>();
    const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');
    const remarksByTasks = (scrollType: DialogProps['scroll'], task: any) => () => {
        setRemarks(showRemark(task, 0));

        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const descriptionElementRef = React.useRef<HTMLElement>(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: '',
            color: theme.palette.common.black,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: '#FFEAF9'
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));
    const doSetTaskList = (taskList: any) => {
        setTaskList(taskList);
    }

    const doSetStudent = (students: any) => {
        setStudents(students);
    }
    useEffect(() => {
        axios.get('http://localhost:3000/task/taskByTeacher', {
            headers: {
                Authorization: `${cookies.token}`,
                Accept: 'application/json'
            }
        }
        )

            .then(response => {
                setTaskList(response.data);
                sortTasksByDate(response.data);
            })
            .catch(error => {
                alert(error.response.data.message)
            });
    }, [])

    useEffect(() => {
        axios.get('http://localhost:3000/Login/students', {
            method: 'GET'
        })
            .then(response => {
                doSetStudent(response.data);
            })
            .catch(error => {
            });
    }, [taskList])

    const sortTasksByDate = (tasks: any) => {
        setTaskList(tasks);

        tasks.sort(function (a: any, b: any) {
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
          

            return Date.parse(b.date) - Date.parse(a.date);
        });
        setTaskList(tasks);
    }

    const func = (task: any) => {
       
        let names = [];

        for (let i = 0; i < task.studetDoIt?.length; i++) {
            if (task.studetDoIt[i]?.name != undefined)
                names.push(task.studetDoIt[i]?.name + " ,");
        }
        return names;
    }

    // רשימת ההערות
    const showRemark = (task: any, i: number): string => {
        if (task.Remarks[i]?.remark != undefined) {
            return task.Remarks[i]?.user + ":" + task.Remarks[i]?.remark + " , " + showRemark(task, i + 1);
        }
        return "";
    }
    const haveRemars = (task: any) => showRemark(task, 0) != '';
    const chekDate = (date: Date) => (moment(new Date(Date.now())).utc().format('DD/MM/YYYY') === moment(date).utc().format('DD/MM/YYYY'))
    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700, marginTop: 3, direction: 'rtl' }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell > התלמידים שביצעו את המטלה</StyledTableCell>
                            <StyledTableCell align="right">מקצוע המטלה</StyledTableCell>
                            <StyledTableCell align="right">תאור המטלה</StyledTableCell>
                            <StyledTableCell align="right">תגובות ההורים</StyledTableCell>
                            <StyledTableCell align="right">תאריך</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {taskList.map((task: any) => (

                            <StyledTableRow key={task.subjectName}>
                                <StyledTableCell style={{ textAlign: 'center' }} component="th" scope="row" >
                                    {func(task)}


                                </StyledTableCell>
                                <StyledTableCell align="right">{task.subjectName}</StyledTableCell>
                                <StyledTableCell align="right">{task.taskText}</StyledTableCell>
                                <StyledTableCell align="right" sx={{ color: 'black' }} >
                                    {
                                        haveRemars(task, 0) && <Button onClick={remarksByTasks('paper', task)} sx={{ backgroundColor: "black" }}>צפיה בהערות על המטלה</Button>
                                    }
                                    {
                                        !haveRemars(task, 0) && <Button disabled sx={{ backgroundColor: "green" }}>צפיה בהערות על המטלה</Button>

                                    }

                                </StyledTableCell>
                                {chekDate(task.date) && <StyledTableCell align="right">היום
                                </StyledTableCell>}
                                {!chekDate(task.date) && <StyledTableCell align="right">{moment(task.date).utc().format('DD/MM/YYYY')}
                                </StyledTableCell>}

                            </StyledTableRow>


                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <React.Fragment>

                <Dialog
                    open={open}
                    onClose={handleClose}
                    scroll={scroll}
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                >
                    <DialogTitle id="scroll-dialog-title">:הערות על המטלה</DialogTitle>
                    <DialogContent dividers={scroll === 'paper'}>
                        <DialogContentText
                            id="scroll-dialog-description"
                            ref={descriptionElementRef}
                            tabIndex={-1}
                        >
                            {remarks}

                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>סגור</Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        </>
    )
}








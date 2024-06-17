import { Button } from "@mui/joy";
import axios from "axios"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { Link, useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import moment from "moment";
import FilePresentOutlinedIcon from '@mui/icons-material/FilePresentOutlined';

export const StatusStudent = () => {
    const [cookie, setCookie] = useCookies(['token']);
    const navigate = useNavigate();
    //get status to do homework or not
    const [statusTaskList, setStatusTaskList] = useState([])
    useEffect(() => {
        axios.get('http://localhost:3000/task/status', {
            method: 'GET',
            headers: {
                Authorization: `${cookie.token}`,
                Accept: 'application/json'
            },

        }).then((response) => {

            setStatusTaskList(response.data);
            sortTasksByDate(response.data)

        }).catch((error:any) => {
            alert(error.response.data.message)
        })
    }, [])



    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: '',
            color: theme.palette.common.black,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: '#FFEAF9'
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));
    const chekDate = (date: Date) => {
        return (moment(new Date(Date.now())).utc().format('DD/MM/YYYY') === moment(date).utc().format('DD/MM/YYYY'))
    }

    const sortTasksByDate = (tasks: any) => {
        setStatusTaskList(tasks);
        tasks.sort(function (a: any, b: any) {
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.

            return Date.parse(b.task.date) - Date.parse(a.task.date);
        });
        setStatusTaskList(tasks);
    }

    return (
        <>


            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700, marginTop: 3, direction: 'rtl' }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>בוצע?</StyledTableCell>
                            <StyledTableCell align="right">מקצוע המטלה</StyledTableCell>
                            <StyledTableCell align="right">תאור המטלה</StyledTableCell>
                            <StyledTableCell align="right">מעבר למטלה</StyledTableCell>
                            <StyledTableCell align="right">תאריך</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {statusTaskList.map((t: any) => (
                            <StyledTableRow key={t.subjectName}>
                                <StyledTableCell component="th" scope="row">
                                    {t.doIt ? (
                                        <TaskAltIcon />
                                    ) :
                                        <HighlightOffIcon />
                                    }
                                </StyledTableCell>
                             
                                <StyledTableCell align="right">{t.task.subjectName}</StyledTableCell>
                                <StyledTableCell align="right">{t.task.taskText}</StyledTableCell>
                                <StyledTableCell align="right">  <Button style={{ backgroundColor: 'black' }} onClick={(() => (
                                    navigate('/main/ViewSpecificTask', { state: { task: t.task } })
                                ))}> לצפיה ועריכת מטלה זו</Button></StyledTableCell>

                                {chekDate(t.task.date) && <StyledTableCell align="right">היום
                                </StyledTableCell>}
                                {!chekDate(t.task.date) && <StyledTableCell align="right">{moment(t.task.date).utc().format('DD/MM/YYYY')}
                                </StyledTableCell>}
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>





        </>
    )


}





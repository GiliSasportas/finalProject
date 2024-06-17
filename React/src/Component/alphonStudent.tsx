import axios, { all } from "axios";
import Box from '@mui/material/Box';
import { useCookies } from 'react-cookie';
import React, { useState } from 'react';
import { ShowStudent } from "./ShowStudent/ShowStudent";
import { Search } from "@mui/icons-material";
import { Autocomplete, Button, FormControl, InputLabel, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";


export const alphonStudent=()=>{
    const [cookies, setCookie] = useCookies(['token']);
    const [cookiesSymbol, setCookieSymbol] = useCookies(['symbol']);
    const [found, setFound] = useState({}); 
    const [allClass, setAllClass] = useState<any>([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [students, setStudents] = useState<any>([]);
    const [fullName, setFullName] = useState();

    const sortAB = (studentsx: any) => {
        studentsx.sort((a: any, b: any) => a.lastname.localeCompare(b.lastname))
        return studentsx;
    } 

    React.useEffect(() => {
        axios.get('http://localhost:3000/class/byStudent', {
            headers: { symbol: cookiesSymbol.symbol ,token:cookies.token}
        })
            .then(response => {
                setAllClass(response.data.classStudentsList);
                const allClassStudent = response.data.classStudentsList;
                sortAB(allClassStudent);
                setStudents(allClassStudent)
            
            })
            .catch(error => {
            });
    }, []);

  

    const searchStudent = () => {
        let listStudentFound = []
        let studentsClass = allClass;
        studentsClass.forEach((s: any) => {
            if (s == undefined) {
                setStudents([]);
                return
            }
            if (Array.isArray(s)) {
                if ((s[0]?.firstname?.includes(fullName) || s[0]?.lastname?.includes(fullName)))
                    listStudentFound.push(s[0]);
            }
            else {
                if ((s?.firstname?.includes(fullName) || s?.lastname?.includes(fullName)))
                    listStudentFound.push(s);
            }

        });

        setStudents(listStudentFound);


    }
   
    const allStudentInClass=(allClass:any)=>{
       
         sortAB(allClass);
         setAllClass(allClass);
       

        setStudents(allClass);
        
    }
 

    return(
        
        <div>


<div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}>
                <Button onClick={searchStudent} sx={{ fontSize: 20 }}><Search /></Button>
                <TextField fullWidth id="fullWidth" onChange={(e: any) => { setFullName(e.target.value) }} sx={{ direction: "rtl", width: 800, display: "flex" }} />
                {/* <Button onClick={() => { setStudents(allStudents) }}>לצפיה בכל התלמידים</Button> */}
                <Button onClick={() => { allStudentInClass(allClass) }}>לצפיה בכל התלמידים</Button>

            </div>
            <br />
            <br /> 
         {/* <ShowStudent selectedItem={students} /> */}
         <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650, direction: 'rtl' }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">שם תלמיד</TableCell>
                            <TableCell align="right">שם משפחה</TableCell>
                            <TableCell align="right">טלפון</TableCell>
                            <TableCell align="right">כתובת מגורים</TableCell>
                            <TableCell align="right"> </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                  {students?.map((student: any) => (
                            <>
                                <TableRow>
                                    <TableCell align="right">{student[0]?.firstname || student.firstname} </TableCell>
                                    <TableCell align="right">{student[0]?.lastname || student.lastname}</TableCell>
                                    <TableCell align="right">{student[0]?.phone || student.phone}</TableCell>
                                    <TableCell align="right">{student[0]?.address || student.address}</TableCell>
                                    <TableCell align="right">{student[0]?.email || student.email}</TableCell>
                                </TableRow></>
                        ))
                        } 
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

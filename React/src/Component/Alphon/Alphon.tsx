
import axios from "axios";
import Box from '@mui/material/Box';
import { useCookies } from 'react-cookie';
import React, { useState } from 'react';
import './Alphon.css'
import { Autocomplete, Button, FormControl, InputLabel, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { Class, Search } from "@mui/icons-material";
export const Alphon = () => {

    const [students, setStudents] = useState<any>([]);
    const [allClasses, setAllClasses] = useState<any>([]);
    const [classesByYearBook, setClassesByYearBook] = useState<any>();
    const [cookies, setCookie] = useCookies(['token']);
    const [cookiesSymbol, setCookieSymbol] = useCookies(['symbol']);
    const [fullName, setFullName] = useState();
    const [allStudents, setAllStudents] = useState([]);

    React.useEffect(() => {
        axios.get('http://localhost:3000/class', {
            headers: { symbol: cookiesSymbol.symbol }
        })
            .then(response => {

                const allClass = response.data;

                setAllClasses(allClass);

                const studentsSchoolDetails = response.data.map((student: any) => { return student.classStudentsList });
                 setAllStudents(studentsSchoolDetails);
                 allStudentSchool(studentsSchoolDetails);

                let classByYerabook = [{}]
                let classes = allClass;

                let classesList = classes.map((c: any) => (c.yearbook));
                classesList = [...new Set(classesList)];
                classesList.forEach((e: any) => {
                    classByYerabook.push({ classes: findByClass(e, allClass), yearbook: e });
                });

                setClassesByYearBook(classByYerabook);
                setClassesByYearBook((prevState: any) => (prevState ?? []).slice(1));

            })
            .catch(error => {
            });
    }, []);


    const sortAB = (studentsx: any) => {
        studentsx.sort((a: any, b: any) => a.lastname.localeCompare(b.lastname))
        return students;
    }


    const findByClass = (yearbook: String, classes: any) => {

        return classes.filter((e: any) => (yearbook === e.yearbook));
    }
    const searchStudent = () => {
        let listStudentFound = []
        let studentsClass = students;
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
    const allStudentSchool = (s:any) => {
        let StudentSchool = [{}];
        
        s?.forEach((yearBook:any) => {
            yearBook.forEach((student:any) => {
                StudentSchool.push(student);
               
            });
           
        });
        StudentSchool.shift()
        sortAB(StudentSchool);
        setStudents(StudentSchool);
    };
        
    //    sortAB(students);
    
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}>
                <Button onClick={searchStudent} sx={{ fontSize: 20 }}><Search /></Button>
                <TextField fullWidth id="fullWidth" onChange={(e: any) => { setFullName(e.target.value) }} sx={{ direction: "rtl", width: 800, display: "flex" }} />
                <Button onClick={() => { allStudentSchool(allStudents) }}>לצפיה בכל התלמידים</Button>

            </div>
            <br />
            <br />
            

            <><div style={{ display: 'flex', justifyContent: 'space-around' }}>    
                {classesByYearBook?.map((e: any) => (
                    <div key={e.yearbook} style={{ display: 'inline-block', marginRight: '10px' }}>
                        <FormControl sx={{ m: 0, minWidth: 140 }} size="small">
                            <InputLabel id="demo-select-small-label">{e.yearbook}</InputLabel>
                            <Autocomplete
                                disablePortal
                                options={e.classes.map((e1: any) => e1.className)}
                                sx={{ width: '70%', direction: 'rtl', textAlign: 'center' }}
                                renderInput={(params: any) => (
                                    <TextField
                                        {...params}
                                        sx={{ textAlign: 'right' }} />
                                )}
                                onSelect={(selectedClassName: any) => {
                                    const selectedObject = e.classes.find(
                                        (e1: any) => e1.className === selectedClassName.target.value
                                    );
                                  
                                  const StudentsList=selectedObject?.classStudentsList;
                                  sortAB(StudentsList);
                                  setStudents(StudentsList)
                                }} />
                        </FormControl>
                    </div>
                ))}
            </div><br /><br /></>

               
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

        </>
    )
}

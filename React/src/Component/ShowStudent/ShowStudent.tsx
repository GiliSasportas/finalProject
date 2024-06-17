
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export function ShowStudent({ selectedItem }: { selectedItem: any }) {


  const [classStudentsList, setClassStudentsList] = React.useState([]);
  React.useEffect(() => {
   
    if (selectedItem.classStudentsList?.length > 0 && JSON.stringify(selectedItem.classStudentsList[0]) === '{}') {
      selectedItem.classStudentsList = selectedItem?.classStudentsList.slice(1);
    }
   

    setClassStudentsList(selectedItem?.classStudentsList);
    sortAB(selectedItem?.classStudentsList);
  },
    [selectedItem]);

  const sortAB = (studentsx: any) => {
    studentsx?.sort(
      (a: any, b: any) => (a.lastname ?? '').localeCompare(b.lastname ?? '')
    );

  };








  return (
    <TableContainer component={Paper} 
  
    >
      <Table sx={{ minWidth: 650 }} aria-label="caption table" style={{tableLayout:'fixed'}}>

        <TableHead>
          <TableRow>

            <TableCell align="right" style={{  fontWeight: 'bold' }}><h3>רחוב</h3></TableCell>
            <TableCell align="right"style={{  fontWeight: 'bold' }}>טלפון</TableCell>
            <TableCell align="right"style={{  fontWeight: 'bold' }}>שם משפחה</TableCell>
            <TableCell align="right"style={{  fontWeight: 'bold' }}>שם פרטי</TableCell>


          </TableRow>
        </TableHead>
        
        <TableBody>
        
          {classStudentsList?.map((student: any) => (
            <TableRow >
              <TableCell align="right">{student.address}</TableCell>
              <TableCell align="right">{student.phone}</TableCell>
              <TableCell align="right">{student.lastname}</TableCell>
              <TableCell align="right">{student.firstname}</TableCell>
            </TableRow>
          ))}
          {/* </div> */}
        </TableBody>
        
      </Table>
    </TableContainer>
  );
}


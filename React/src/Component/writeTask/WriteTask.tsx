import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Textarea from '@mui/joy/Textarea';
import axios from "axios";
import { useCookies } from 'react-cookie';
import './writeTask.css'
import { Autocomplete, TextField } from '@mui/joy';
import { FileUploadOutlined } from '@mui/icons-material';
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';





export const WriteTask = (data: any) => {
  const [cookies, setCookie] = useCookies(['token']);
  const [definationLesson, setDefinationLesson] = useState("");
  const [subjectChoose, setSubjectChoose] = useState();
  const [classes, setClasses] = useState<any>([]);
  const [taskText, setTaskText] = useState('');
  const [classes2, setClasses2] = useState<any>([]);
  const [classChoose, setclassChoose] = useState([]);
  const [fontWeight, setFontWeight] = useState('normal');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [subjectName, setSubjectName] = useState();
  const [open, setOpen] = useState(true);
  const [subjectsByTeacher, setSubjectsByTeacher] = useState([]);
  const [file, setFile] = useState<File>();
  const [fileName, setFileName] = useState(" ");

  const isFirstRender = React.useRef(true)

  const handleFileUpload = (taskId: string) => {
  
    const formData = new FormData();
    formData.append("file", file);


    axios.post(`http://localhost:3000/task/file:${taskId}`, formData, {

      headers: {
        Authorization: `${cookies.token}`,
        "Content-Type": "multipart/form-data",

      },
      method: 'POST',

    })
      .then((response) => {

        alert("הנתונים נשמרו מערכת" + response.data);
      })
      .catch((error) => {
        alert("הקובץ לא הועלה ")
      });
  };


  // create new task 
  const createTask = () => {
    
    if (!subjectChoose || !subjectName || !taskText || !definationLesson  || classes2.length==0)   {

      alert("לא הזנת את כל הנתונים")
      return;
    }
    if (!file) {
      alert("לא הועלה קובץ ");
      return;
    }
    const token = cookies.token;
    axios.post("http://localhost:3000/task", {
      Headers: { Authorization: `${token}` },
      method: 'POST',
      body: {
        subjectId: subjectChoose, subjectName: subjectName, taskText: taskText, lessonDescription: definationLesson, studetDoIt: [], date: new Date(Date.now()), Classes: classes2
      },
    })
      .then((response) => {
        handleFileUpload(response.data);
        alert("המשימה נקלטה בהצלחה!")
        // updateData();


      }).catch(() => {

        alert("ישנה תקלה בשמירת הנתונים נסה שוב להזין את כל הנתונים")
        //  updateData();
      });
  }

  const setClassesHelp = (e: any) => {
    
    let temp = classes2;
    if (!e.target.checked) {
      temp.pop(e.currentTarget.id);
      setClasses2(temp);
      return;
    }

    temp.push(e.currentTarget.id);
    setClasses2(temp);

  }
  // get the subject's teacher
  React.useEffect(() => {
    console.log(cookies.token, "token");

    axios.get('http://localhost:3000/task/subjects', {
      method: 'GET',
      headers: {
        Authorization: `${cookies.token}`,
        Accept: 'application/json'
      },
    })
      .then(response => {
        setSubjectsByTeacher(response.data);
      })
      .catch(error => {
      });
  }, []);

  React.useEffect(() => {
    axios.get('http://localhost:3000/task/Classes', {
      method: 'GET',
      headers: {
        Authorization: `${cookies.token}`,
        Accept: 'application/json'
      },
    })
      .then(response => {
        setClasses(response.data);

      })
      .catch(error => {
        alert(error.response.data.message);
      });
  }, []);

const updateData=()=>{
  const autocompleteInputs = document.querySelectorAll('.MuiAutocomplete-clearIndicator'); // Get all Autocomplete clear indicator icons on the page
  autocompleteInputs.forEach((clearIcon) => {
    clearIcon.click(); // Simulate click on clear indicator to reset Autocomplete values
  });
  const textFields = document.querySelectorAll('input[type="text"], textarea'); // Get all text input fields and text areas on the page
  textFields.forEach((field) => {
    field.value = ''; // Clear text input field and text area values
  });
  document.getElementById("checkbox")!.checked = false;


  setDefinationLesson("");
  setTaskText("");  
  //  setSubjectName();
  // setSubjectChoose();

}
 

  return (
  
    <>
     
      <h4 style={{ textAlign: 'center', marginBottom: '2%' }}>.מורה יקר! בדף זה הנך נדרש למלא את מטלת השיעור עם אפשרות להעלאת קבצים יש לבחור את הכיתות שלהן מונגש החומר ולציין באיזה מקצוע מדובר</h4>
      <div >
        <div style={{display:'flex',justifyContent: 'center'}}>
          {/* <p>סמן את הכיתות להם תשלח המטלה</p> */}
          {classes.map((classroom: any) => (
            <div style={{ textAlign: 'center' }}>

              <input type="checkbox" id={classroom?._id} onChange={(e) => { setClassesHelp(e) }} />
              {classroom?.className}
            </div>

          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'row-reverse', marginRight: '10%', marginBottom: '1%' }}>
          <p style={{ direction: 'ltr', marginLeft: 10 }}>   מקצוע השיעור
          </p>
          <Autocomplete
            disablePortal

            id="combo-box-demo"
            options={subjectsByTeacher}
            sx={{ width: '70%', direction: 'rtl', textAlign: 'center' }}
            renderInput={(params: any) => <TextField  {...params} label="מקצועות"
              sx={{ textAlign: 'right' }} />
            }
            // לסדר שיהיה עם subjectID subjectName
            onSelect={(e: any) => {
              setSubjectChoose(e.target.value);
              setSubjectName(e.target.value);
            }
            }

          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row-reverse', marginRight: '10.6%' }}>
          <p style={{ marginLeft: 10 }}>נושא השיעור</p>
          <Textarea
            onChange={(e) => setDefinationLesson(e.target.value)}
            placeholder="בקצרה מהלך השיעור"
            sx={{ width: '70.5%', height: 100, direction: 'rtl' }}
            minRows={5}
            maxRows={20} />

        </div>
        <div style={{ display: 'flex', flexDirection: 'row-reverse', marginRight: '10.5%', marginTop: '1%' }}>
          <p style={{ marginLeft: 10 }}>תאור המטלה</p>
          <Textarea
            onChange={(e) => setTaskText(e.target.value)}
            placeholder="כתיבת תאור המטלה"
            sx={{ width: '70.5%', height: 100, direction: 'rtl' }}
            minRows={5}
            maxRows={20} />

        </div>
      </div>
      <div className="App" style={{ display: 'flex', flexDirection: 'row-reverse' }}>
        <form >
          <Button component="label" variant='outlined' sx={{ width: 959, height: 130, marginRight: 32.5, marginTop: 2 }} startIcon={<FileUploadOutlined style={{ fontSize: 120 }} />}>

            <input type="file" accept='application/pdf' style={{ display: 'none' }} onChange={(event: any) => setFile(event.target.files[0])} />
          </Button>
          {fileName}
        </form>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Button variant="contained" sx={{ ml: 'auto', marginTop: 2, marginRight: 77 }} startIcon={<DataSaverOnIcon />} onClick={createTask}> שלח רקע  שיעור ומטלה יומית</Button>
      </div>
   
    </>

  )
}

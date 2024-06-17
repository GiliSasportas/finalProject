import { Button } from '@mui/joy';
import axios from 'axios';
import * as React from 'react';
import XLSX from 'xlsx';
import { useCookies } from 'react-cookie';
import { Autocomplete, TextField } from '@mui/material';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

export const UploadFileDetails = () => {


    const [file, setFile] = React.useState<File>();
    const [cookiesToken, setCookieToken] = useCookies<any>(['token']);
    const [chookiesSymbol, setChookiesSymbol] = useCookies(['symbol']);
    let usersToSignUp = [{}];
    const [cookies, setCookie] = useCookies(['symbol']);
    const yearBook = ["א", "ב", "ג", "ד", "ה", "ו", "ז", "ח", "אחר"]
    const [classWithNum, setClassWithNum] = React.useState([" "])
    const [selected, setSelected] = React.useState(false)
    const [yearbook, setYearbook] = React.useState('')
    const [className, setClassName] = React.useState('')
    const [classes, setClasses] = React.useState([])

    const buttonSize = {
        width: '35%',
        height: '21vh',
        fontSize: '1rem',
    };

    const classesWithNum = (c: string) => {
        setYearbook(c)
        setClassName('')
        let temp = ['']
        for (let index = 1; index < 6; index++) {
            temp.push(index + "" + c);
        }
        setClassWithNum(temp)
        setSelected(true)
        return classWithNum;



    }
    const uploadFileDetails = () => {
        const formData = new FormData();
        formData.append("file", file);

        axios.post("http://localhost:3000/sign-up/uploadFile", formData, {
            headers: {
                Authorization: `${cookiesToken.token}`,
                "Content-Type": "multipart/form-data",
            },
        })
            .then((response) => {

            })
            .catch((error) => {
                // handle errors
            });
    };

    const validEmail = (email: string) => {
        debugger
        return /^\S+@\S+\.\S+$/.test(email);
    }
    const validId = (id: string) => {
        debugger
        return /^[0-9]{9}$/.test(id);
    }
    const validPhone = (phone: string) => {
        debugger
        return /^[0-9]{9}$/.test(phone);

    }
    const validName = (name: string) => {
        debugger
        // return /^[a-z\u0590-\u05fe]+$/i.test(name);
        return true;
    }



    const readFile = () => {

        const formData = new FormData();
        formData.append('file', file);

        const reader = new FileReader();

        reader.onloadend = () => {
            const data = new Uint8Array(reader.result as ArrayBuffer);
            const workbook = XLSX.read(data, { type: 'array' });
            // Assuming the first sheet in the Excel file is the one you want to read
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData: any = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            let users = [];
            debugger

            for (let i = 1; i < jsonData.length; i++) {

                if (!(validName(jsonData[i][0]) && validName(jsonData[i][1]) && validId(jsonData[i][2]) && validName(jsonData[i][3]) && validPhone(jsonData[i][4]) && validId(jsonData[i][6]) && validEmail(jsonData[i][7]))) {
                    alert(jsonData[i][1] + "  אחד או יותר מהנתונים של משתמש זה לא תקין, משתמש זה לא נוסף ");

                }
                else {





                    if (jsonData[i][0] == undefined || jsonData[i][1] == undefined || jsonData[i][2] == undefined || jsonData[i][8] == undefined) {
                        alert(" אחד או יותר מהנתונים בקובץ חסר. הוסף את הנתון והעלה מחדש.")
                        return;
                    }
                    let student = {
                        firstname: jsonData[i][0],
                        lastname: jsonData[i][1],
                        idUser: jsonData[i][2],
                        phone: jsonData[i][8],
                        address: jsonData[i][5],
                        type: 'Student',

                        classId: '',
                        idSchool: cookies.symbol

                    }

                    let parent = {
                        firstname: jsonData[i][3],
                        lastname: jsonData[i][1],
                        idUser: jsonData[i][6],
                        idChild: jsonData[i][2],
                        phone: "0" + jsonData[i][4],
                        address: jsonData[i][5],
                        password: " ",
                        type: 'Parent',
                        email: jsonData[i][7],
                        idSchool: cookies.symbol

                    }
                    users.push(student, parent);

                }
            }
            if (users.length == 0) {
                alert("הכיתה לא נוספה במערת,נקלטו נתונים לא תקינים ")
            }
            else {
                createUsers(users);
            }


        };

        reader.readAsArrayBuffer(file);

    }

    const Check = () => {
        axios.get('http://localhost:3000/task/Classes', {
            method: 'GET',
            headers: {
                Authorization: `${cookies.token}`,
                Accept: 'application/json'
            },
        })
            .then(response => {

                setClasses(response.data)
            })
            .catch(error => {
                alert("error.response.data");
            });
    }
    const createUsers = (users: any) => {


       

        //אם לא בחר 
        if (yearbook === '' || className === '') {
            alert("אחד או יותר מהנתונים לא הושלמו בחר שוב")
            return;
        }

        axios.post("http://localhost:3000/sign-up/excel", {
            body: { users: users, className: className, yearbook: yearbook, symbol: chookiesSymbol.symbol, Authorization: `${cookiesToken.token}`, },

        }).then((response) => {
            alert(response.data)
            // alert("הנתונים נשמרו ");

        }).catch((error) => {
            alert(error);
        })
    }


    const downloadFileDetails = () => {

        axios.get('http://localhost:3000/sign-up/getFile'
            , { responseType: "stream" }
        ).then(response => {
            const downloadLink = document.createElement('a')
            downloadLink.href = response.data;
            downloadLink.download = `v.xls`// Set the default download filename
            document.body.appendChild(downloadLink);
            downloadLink.click(); // Simulate a click on the link to initiate the download
            document.body.removeChild(downloadLink); // Clean up the temporary element
        })
            .catch(error => {
                alert("אירעה שגיאה בעת הורדת הקובץ.")
            });

    }


    return (
        <>
            <br />
            <p style={{ textAlign: 'center' }}>ע"מ לרשום את  התלמידים שלך הנך נדרש להוריד את הקובץ עם תבנית של רשומות עבור פרטי התלמידים</p>
            <div style={{ display: 'flex', justifyContent: 'center' }}>

                {selected && <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={classWithNum}
                    sx={{ width: '10%', height: '50%', marginRight: 5 }}
                    renderInput={(params) => <TextField {...params} label="כיתה"
                        onSelect={(e: any) => { setClassName(e.target.value) }}
                        style={{ textAlign: 'right' }} />}
                />}
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={yearBook}
                    sx={{ width: '10%', height: '50%', direction: 'rtl', display: 'flex', flexDirection: 'column' }}
                    renderInput={(params) => <TextField {...params} sx={{ direction: 'rtl' }} label="שנתון"
                        onSelect={(e) => { classesWithNum(e.target.value) }}
                        style={{ textAlign: 'right' }} />}
                />

                <br />


            </div>
            <div style={{ marginRight: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <br />
                <Button component="label" variant='outlined' onClick={downloadFileDetails} style={buttonSize} color="primary" ><FileDownloadOutlinedIcon sx={{ fontSize: "140%" }} />
                    <p>הורד תבנית קובץ אקסל בה תזין את נתוני התלמידים </p>
                </Button>
                <Button component="label" variant='outlined' sx={{ marginTop: 5 }} color="primary" style={buttonSize}><FileUploadOutlinedIcon sx={{ fontSize: "140%" }} />
                    העלה את הקובץ בו שמרת את הנתונים של תלמידיך.

                    <input type='file' accept=".xls, .xlsx" style={{ display: 'none' }} onChange={(e: any) => { setFile(e.target.files[0]) }} />
                </Button>
                <br />
                <Button variant='outlined' onClick={readFile}>שמור ושלח</Button>


            </div>




        </>

    )
}


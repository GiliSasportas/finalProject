import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import AlertTitle from '@mui/material/AlertTitle';
import { Link, useNavigate, } from 'react-router-dom';
import { Alert, Collapse, FormControl, Hidden, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
// import './Log'
import { Visibility, VisibilityOff } from '@mui/icons-material';


export function CreatPassword() {

    const navigate = useNavigate();
    const [email, setEmail] = React.useState<any | null>(null);
    const [password, setPassword] = React.useState<any | null>(null);
    const [id, setId] = React.useState<any | null>(null);
    const [newPass, setNewPass] = React.useState<any | null>(null);
    const [showPassword, setShowPassword] = React.useState(false);
    const [open2, setOpent2] = React.useState(false);

    const [open, setOpen] = React.useState(true);
    const [passMail, setPassMail] = React.useState();
    const [passUser, setPassUser] = React.useState();
    const [createPass, setCreatePass] = React.useState(false);

    const [symbol, setSymbol] = React.useState('1234');
    const [error, setError] = React.useState('');
    const [cookies, setCookie] = useCookies(['token', 'symbol']);
    // const [cookies, setCookie, removeCookie] = useCookies([]);
    const defaultTheme = createTheme();
    const [showAlert, setShowAlert] = React.useState(false);

    // Function to handle the event that triggers the alert
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };


    // save new data
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
      
    };
    // Calling a server to receive a token
    const sendPassMail = () => {
        if (!(/\S+@\S+\.\S+/.test(email))) {
            return;
        }
        axios.post('http://localhost:3000/Login/validationUser', {
            method: 'POST',
            body: {
                email: email,
                id: id

            },
        }
        ).then(response => {
            alert("נשלחת סיסמא למייל")
            setPassMail(response.data);
            setCreatePass(true);

        })
            .catch(error => {

                alert(error.response.data)

            });
    }

    function checkPass() {
        if (passUser === passMail) {
            setCreatePass(true);
            alert("OK");
            setOpent2(true);
        }

        else
            alert("הסיסמא אינה תואמת לסיסמא שנשלחה")


    }

    function updatePass() {
        if (!validPssword())
            return;

        axios.put(('http://localhost:3000/Login'), {
            method: 'PUT',
            body: {
                password: newPass,
                email: email,
                id: id
            }
        }).then((response) => {
            alert(" הסיסמה עודכנה בהצלחה הנך מועבר להרשמה");
            // enterUser();
            localStorage.clear();
            navigate('/Login')


        }).catch((error) => {
            alert(error.response.data)

        })
    }
    const enterUser = () => {


        axios.post('http://localhost:3000/Login', {
            method: 'POST',
            body: {
                password: newPass, symbol: symbol, email: email

            },
        }
        ).then(response => {
            // get token
            debugger
            const token = response.data.tokenUser.access_token;
            const dateInTwoWeek = new Date();
            dateInTwoWeek.setDate(dateInTwoWeek.getDate() + 2 * 7);
            setCookie('token', token, { path: '/', expires: dateInTwoWeek });

            setCookie('symbol', symbol, { path: '/', expires: dateInTwoWeek });

        
        })
            .catch(error => {
                alert(error.response.data);
                
            });


    }
    function isValidPassword(password: string) {
        const letterCount = (password.match(/[a-zA-Z]/g) || []).length;
        const numberCount = (password.match(/[0-9]/g) || []).length;

        return /^[a-zA-Z0-9]{8}$/.test(password) && letterCount >= 2 && numberCount >= 2;
    }
    const validPssword = () => {
        if (!isValidPassword(newPass)) {
            alert('הסיסמא שהזנת אינה תקינה , הסיסמא צריכה לנכיל 8 תווים לפחות 2 מספרים ולפחות 2 אותיות  באנגלית ללא תווים מיוחדים');
            return false
        } else {
            setError('');
            return true;

        }
    };

    return (

        <>
            <ThemeProvider theme>

                <Grid container component="main" sx={{ height: '100vh' }}>


                    <Grid item xs={12} sx={{ height: '100vh' }}>
                        {/* <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square sx={{ height: '100vh' }}> */}
                        <Box
                            sx={{
                                my: 8,
                                mx: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <img src="src/assets/images/final_logo.png" alt="" />

                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    // type='email'
                                    label="מייל"
                                    name="email"
                                    autoComplete="email"
                                    // autoFocus
                                    onChange={(e) => {
                                        setEmail(e.target.value); 
                                    }} />
                                <h5 color='red'>{error}</h5>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="id"
                                    label="תעודת זהות"
                                    type="id"
                                    id="id"
                                    autoComplete="current-password"
                                    onChange={(e) => setId(e.target.value)} />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    onClick={sendPassMail}
                                >
                                    שלח סיסמא למייל
                                </Button>

                                {createPass && <div>
                                    <Button sx={{ margin: 3 }} onClick={(e) => checkPass()}>
                                        שלח לאימות
                                    </Button>
                                    <TextField
                                        margin="normal"
                                        required

                                        name="pass"
                                        label="הסיסמה שהתקבלה"
                                        // type="password"
                                        id="id"

                                        onChange={(e: any) => { setPassUser(e.target.value) }}
                                    />
                                    <br />

                                    {open2 &&
                                        // <div style={{
                                        //     display: 'flex', flexDirection: 'row-reverse'

                                        // }}>
                                        //     {/* // <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined"> */}

                                        //     {/* <InputLabel htmlFor="outlined-adornment-password">סיסמא חדשה</InputLabel> */}
                                        //     <OutlinedInput
                                        //         id="outlined-adornment-password"
                                        //         type={showPassword ? 'text' : 'password'}
                                        //         // onChange={(e) => { ckeck(e.target.value) }}

                                        //         onChange={(e) => { setNewPass(e.target.value) }}
                                        //         endAdornment={
                                        //             <InputAdornment position="end">
                                        //                 <IconButton
                                        //                     aria-label="toggle password visibility"
                                        //                     onClick={handleClickShowPassword}
                                        //                     onMouseDown={handleMouseDownPassword}
                                        //                     edge="end"
                                        //                 >
                                        //                     {showPassword ? <VisibilityOff /> : <Visibility />}
                                        //                 </IconButton>
                                        //             </InputAdornment>

                                        //         }
                                        //         label="Password"
                                        //     />
                                        //     <Button onClick={(e: any) => updatePass()}>
                                        //         אשר סיסמא
                                        //     </Button>

                                        // </div>
                                        <div>
                                                  <Button onClick={(e: any) => updatePass()}>
                                        אשר סיסמא
                                     </Button>
                                        <TextField
                                            margin="normal"
                                            required

                                            name="pass"
                                            label="סיסמה חדשה"
                                            // type="password"
                                            id="id"

                                            onChange={(e: any) => { setNewPass(e.target.value) }}

                                        />
                                  
                                     </div>

                                    }
                                </div>
                                }
                                <Grid container>
                                    <Grid item xs>
                                    </Grid>
                                    <Grid item>
                                        {/* <Link to="SignUp" style={{textDecoration:'none',color:'black'}}>משתמש לא רשום? הרשם כאן</Link>  */}
                                        {/* <Link to="/SignUp"></Link>  */}
                                    </Grid>

                                </Grid>
                                {/* <Copyright sx={{ mt: 5 }} /> */}
                            </Box>
                        </Box>

                    </Grid>

                </Grid>
            </ThemeProvider>

            {open && <div id="alertError" style={{ display: 'none' }}>
                <Box sx={{ width: '50%', position: 'fixed', top: '15%', alignItems: 'center' }}  >
                    <Collapse in={open}>
                        <Alert
                            severity="error"
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
                            משתמש לא קים עבור להרשמה
                        </Alert>
                    </Collapse>
                </Box>
            </div>
            }
        </>
    );
}




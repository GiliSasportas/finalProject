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
import { useNavigate, } from 'react-router-dom';
import { Alert, Checkbox, Collapse, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';




export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState<any | null>(null);
  const [textError, setTextError] = React.useState<any | null>("שגיאה");
  const [symbol, setSymbol] = React.useState<any | null>(null);
  const [password, setPassword] = React.useState<any | null>(null);
  const [open, setOpen] = React.useState(true);
  const [error, setError] = React.useState('');
  const [cookies, setCookie] = useCookies(['token', 'symbol']);
  const defaultTheme = createTheme();
  const [idStudent, setIdStudent] = React.useState('');
  const [isParentUser, setIsParentUser] = React.useState(false);
  // validation email
  function isValidEmail(email: string) {
    return /^[a-zA-Z0-9]+@gmail\.com$/.test(email);
  }
  function isValidPassword(password: string) {
    const letterCount = (password.match(/[a-zA-Z]/g) || []).length;
    const numberCount = (password.match(/[0-9]/g) || []).length;

    return /^[a-zA-Z0-9]{8}$/.test(password) && letterCount >= 2 && numberCount >= 2;
  }
  function isValidSymbol(symbol: string) {
    return /^\d+$/.test(symbol);
  }

  const validEmail = () => {
    if (!isValidEmail(email)) {
      setError('המייל שהזנת לא תקין, הזן שוב');
      return false;
    } else {
      setError('');
      return true;

    }
  };
  // validation password
  const validPssword = () => {
    if (!isValidPassword(password)) {
      setError('הסיסמא שהזנת אינה תקינה , הסיסמא צריכה להכיל 8 תווים לפחות 2 מספרים ולפחות 2 אותיות  באנגלית ללא תווים מיוחדים');
      return false;
    } else {
      setError('');
      return true;

    }
  };

  const validSymbol = () => {
    if (!isValidSymbol(symbol)) {
      setError(' הסמל מוסד שהזנת אינו תקין, הזן שוב - מכיל ספרות בלבד');
      return false;
    } else {
      setError('');
      return true;

    }
  };
  // save new data
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setEmail(data.get('email')),
      setPassword(data.get('password'))
  };
  // Calling a server to receive a token
  const onLogin = () => {
    debugger
    if (!validEmail())
      return;
    if (!validPssword())
      return;
    if (!validSymbol())
      return;
      debugger
      if(isParentUser&&idStudent===''){
      alert("הכנס תז תלמיד");
      return;
      }
      
      

    axios.post('http://localhost:3000/Login', {
      method: 'POST',
      body: {
        password: password, symbol: symbol, email: email, idStudent: idStudent

      },
    }
    ).then(response => {
      // get token
      const token = response.data.tokenUser.access_token;
      localStorage.setItem('type', response.data.tokenUser.type);

      setCookie('token', token);
      setCookie('symbol', symbol);
      // enter to home page
      navigate('/main/BackgroundHome');
    })
      .catch(error => {
        alert(error.response.data);
        const alertError = document.getElementById("alertError");
        setTextError(error.response.data);
        alert(textError)


      });
  }

  return (

    <>
      <ThemeProvider theme={defaultTheme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: 'url(src/assets/images/books.png) ',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.6,
            }}
          >
            <div style={{
              color: 'black', direction: 'rtl', fontSize: 20, fontWeight: 'bold', display: 'flex', flexWrap: 'wrap', margin: 40
            }}>
              <h1 style={{ color: 'black', fontFamily: 'luna' }}>הורה - מורה </h1>
              <h2>מערכת לתקשורת בין מורים להורי תלמידיהם בכל מערכת הבית ספרית</h2>
            </div>
          </Grid>
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
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
                  type='email'
                  label="מייל"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={(e) => setEmail(e.target.value)} />
                <h5 color='red'>{error}</h5>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="סיסמא"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)} />
                <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                  <Checkbox onChange={(e: any) => { setIsParentUser(e.target.checked) }} />
                  <h5>?הורה</h5>
                </div>
                {isParentUser && <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="תז תלמיד"
                  type="text"
                  autoComplete="current-password"
                  onChange={(e) => setIdStudent(e.target.value)}
                />
                }
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="symbol"
                  label="סמל מוסד"
                  type="password"
                  id="symbol"
                  autoComplete="current-password"
                  onChange={(e) => setSymbol(e.target.value)} />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={onLogin}
                >
                  התחברות
                </Button>
                <Grid container>
                  <Grid item xs>

                  </Grid>
                  <Grid item>
         
                    <Button onClick={(() => (navigate('/CreatePass')))}>
                      ?משתמש חדש? שכחתי סיסמה
                    </Button>
                    {/* <Link to="/SignUp"></Link> */}
                  </Grid>
                </Grid>
                {/* <Copyright sx={{ mt: 5 }} /> */}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>

      <div id="alertError" style={{ display: 'none' }}>
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
              {textError}
            </Alert>
          </Collapse>
        </Box>
      </div>
    </>

  );
}
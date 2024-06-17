import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FormControl, IconButton, Input, InputAdornment, InputLabel } from '@mui/material';
export default function PaymentForm(item:any) {


  const [email, setEmail] = React.useState("");
  const [id, setId] = React.useState("");
  const [firstname, setFname] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [cookiesSymbol, setCookieSymbol] = useCookies(['symbol']);

  const [cookies, setCookie] = useCookies(['token']);
  const [showPassword, setShowPassword] = React.useState(false);
  // password show
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const validData = () => {

    const validEmail = /\S+@\S+\.\S+/.test(email);
    const valisText = /^[a-z\u05D0-\u05EA]+$/i.test(firstname);
    const validDidit = /^\d+$/.test(id);
    if (!validEmail || !valisText || !validDidit || !password)
      alert("הנתונים לא תקינים")
    else
      createParent();


  }
  const createParent = () => {
    axios.post("http://localhost:3000/sign-up",
      {
        body: { password: password, firstname: firstname, email: email, lastname: item.value.lastname, phone: item.value.phone, address:item.value.address, idUser: id, idChild:item.value.idChild, type: 'Parent',idSchool:cookiesSymbol.symbol },
      })
      .then((response) => {
        console.log(response.data);

      });
  }
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="firstname"
            label="שם פרטי"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
            onChange={(e) => (setFname(e.target.value))}

          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="email"
            label="אימייל"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
            onChange={(e) => (setEmail(e.target.value))}

          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="udentity"
            label="מספר זהות"
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
            onChange={(e) => (setId(e.target.value))}

          />
        </Grid>
        {/* <Grid item xs={12} md={6}>
          <TextField
            required
            id="password"
            label="סיסמה"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
            onChange={(e) => (setPassword(e.target.value))}

          />
        </Grid> */}
         <Grid item xs={12} style={{ display: 'flex' }}>
            {/* <FormControl variant="standard" >
               <InputLabel htmlFor="standard-adornment-password">סיסמה</InputLabel> 
               <Input required

                id="standard-adornment-password"
                type={showPassword ? 'text' : 'password'}
                onChange={(e) => (setPassword(e.target.value))}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton

                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              /> 
            </FormControl> */}
          </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="לשמור את הפרטים?"
            onClick={validData}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
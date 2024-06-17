import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import axios from 'axios';
import { useCookies } from 'react-cookie';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { FormControl, IconButton, Input, InputAdornment, InputLabel } from '@mui/material';
import { DateField } from '@mui/x-date-pickers';
import { Visibility, VisibilityOff } from '@mui/icons-material';
// import userDetailsContex from './userDetails.contex';


 
  //
  export const ChildForm =(item: any)=> {
    // const  contextType=userDetailsContex.toString();
    const details=React.useContext(item);
    // alert(contextType);
  const [cookies, setCookie] = useCookies(['token']);
  const [cookiesSymbol, setCookieSymbol] = useCookies(['symbol']);
  const [value, setValue] = React.useState<string | null>();
  const [firstname, setFirstname] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  // validation
  const validId = (id: string) => {
    console.log(id.length == 4 || id.length == 5, "id", id);
    return id.length == 4 || id.length == 5;
  }
  const validPhone = (phone: string) => {
    console.log(phone.length == 10, "phon", phone);
    return phone.length == 10;
  }
  function isValidDigits(idOrPhone: string) {
    console.log(/^\d+$/.test(idOrPhone), "id/phon", idOrPhone);
    return /^\d+$/.test(idOrPhone);
  }
  function isValidText(text: string) {
    console.log(/^[a-z\u05D0-\u05EA]+$/i.test(text), "text", text);
    return /^[a-z\u05D0-\u05EA]+$/i.test(text);
  }


  const validData = () => {
    // console.log( item.value.address,"Address");
    // console.log(firstname,"firstname");
    // console.log(item.value.lastname,"item.value.lastname");
    // console.log(item.value.idChild,"item.value.idChild");
    // console.log(item.value.phone,"phone");

    if (!isValidDigits(item.value.idChild) || !isValidText(firstname) || !isValidText(item.value.lastname)
      || !(item.value.address) || !validPhone(item.value.phone) || !validId(item.value.idChild)
    ) {
      alert(" הנתונים לא תקינים או שחלקם לא הושלמו");
      console.log("לא נישמר");

    }

    else
      console.log("שומר נתונים");

    createStudent();

  }
  const createStudent = () => {


    console.log(item.value.phone, item.value.lastname, item.value.idChild);

    axios.post("http://localhost:3000/sign-up",
      {

        body: { firstname: firstname, lastname: item.value.lastname, phone: item.value.phone, address: item.value.address, idUser: item.value.idChild, type: 'Student',classId:"",idSchool:cookiesSymbol.symbol },
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
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label=" שם פרטי"
            type='text'
            fullWidth
            autoComplete="given-name"
            variant="standard"
            onChange={(e) => (setFirstname(e.target.value))
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="שם משפחה"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            onChange={(e) => (item.value.setLastname(e.target.value))}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="כתובת"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            onChange={(e) => (item.value.setAddress(e.target.value))}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="identity"
            name="identity"
            label="מספר זהות"
            fullWidth
            variant="standard"
            onChange={(e) => (item.value.setIdChild(e.target.value))}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="phone"
            name="phone"
            label="מספר טלפון"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            onChange={(e) => (item.value.setPhone(e.target.value))}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs} >
            <DateField

              fullWidth
              onChange={(newValue: any) => {
                console.log(`${newValue.$D}/${newValue.$M + 1}/${newValue.$y}`);

                setValue(`${newValue.$D}/${(newValue.$M + 1)}/${newValue.$y}`)
              }}

              variant="standard"
              label="תאריך לידה" />
          </LocalizationProvider>
          <Grid item xs={12} style={{ display: 'flex' }}>
            <FormControl variant="standard" >
              {/* <InputLabel htmlFor="standard-adornment-password">סיסמה</InputLabel> */}
              {/* <Input required

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
              /> */}
            </FormControl>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" id="toSave" name="saveAddress" value="yes" onClick={validData}

            />}
            label="לשמור את הפרטים?"
          />
        </Grid>
      </Grid>
     
    </React.Fragment>
  )
}
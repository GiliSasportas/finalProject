import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PaymentForm from './FatherForm';
import { Link } from 'react-router-dom';
import { ChildForm } from './childForm';
import { useContext } from 'react';
import FatherForm from './FatherForm';
import Context from './userDetails.contex'



  // const theme = 'light';
  // There is shared data between a parent and its child,
  //  so this data will pass between the components and be written once 
export const Checkout = () => {

  const steps = ['רישום ילד', 'רישום הורה'];
  const [lastname, setLastname] = React.useState('');
  const [idChild, setIdChild] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [idParent, setIdParent] = React.useState('');
  const [firstName, setFirstname] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [nameOfParent, setNameOfParent] = React.useState('');

  // const [address, setAddress] = React.useState('');
// const y=useContext()

  const SharedDetails = {
    firstName:firstName,
    lastname: lastname,
    idChild: idChild,
    phone: phone,
    address: address,
    nameOfParent:nameOfParent,
    email:email,
    idParent:idParent,
    setLastname: setLastname,
    setIdChild: setIdChild,
    setPhone: setPhone,
    setAddress: setAddress,
    setFirstname:setFirstname,
    setEmail:setEmail,
    setNameOfParent:setNameOfParent,
    setIdParent:setIdParent
  }

  const userDetails=React.createContext("SharedDetails");
  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return <ChildForm  value={SharedDetails}/>;
      case 1:
        return <PaymentForm value={SharedDetails} />;

      default:
        throw new Error('Unknown step');
    }
  }

  const defaultTheme = createTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    //הוספה
    if (!lastname || !idChild || !phone || !address) {
      alert(' אחד או יותר מהנתונים חסרים')
     
      return;
    }

    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <Context.Provider value="SharedDetails">
      {/* <ChildForm />
      <FatherForm /> */}
    {/* <ThemeProvider theme={defaultTheme}> */}

      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar style={{ direction: 'rtl' }}>
          <img src='src/assets/images/final_logo.png' style={{ width: "13%", height: "13%" }}></img>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            הרשמה למערכת
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom style={{ textAlign: 'center' }}>
                נרשמת בהצלחה למערכת הורה מורה
              </Typography>
              <Typography variant="subtitle1" style={{ textAlign: 'center' }}>
                תודה שנרשמת למערכת הורה מורה<br />
                נשמח לראות אותך בפעילות <br />
                מאחלים לך הצלחה רבה <br />
              </Typography>
              <Link to='/Login'>עבור להתחברות</Link>
            </React.Fragment>

          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    חזור
                  </Button>
                )}
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? 'הבא' : 'הבא'}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>

      </Container>
    {/* </ThemeProvider> */}
    </Context.Provider>
  );
}
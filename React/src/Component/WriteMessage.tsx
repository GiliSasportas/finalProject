import * as React from 'react';
import Alert from '@mui/material/Alert';
import axios from 'axios';
import { Box, Button } from '@mui/joy';
import { Collapse, TextField, Typography } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import Autocomplete from '@mui/material/Autocomplete';
import SendIcon from '@mui/icons-material/Send';
import { useCookies } from 'react-cookie';


export const WriteMessage = () => {
  const [write, setWrite] = React.useState(" Teacher")
  const [text, setText] = React.useState("");
  const [classes, setClasses] = React.useState([]);
  const [cookies, setCookie] = useCookies(['token']);
  const [open, setOpen] = React.useState(true);
  const [count, setCount] = React.useState(0);
  const [title, setTitle] = React.useState();
  const [classesToSendMessage, setClassesToSendMessage] = React.useState<any>([]);
  const [selectedOptions, setSelectedOptions] = React.useState<any>([]);

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;


  const updateData = () => {
    const autocompleteInputs = document.querySelectorAll('.MuiAutocomplete-clearIndicator'); // Get all Autocomplete clear indicator icons on the page
    autocompleteInputs.forEach((clearIcon) => {
      clearIcon.click(); // Simulate click on clear indicator to reset Autocomplete values
    });
    const textFields = document.querySelectorAll('input[type="text"], textarea'); // Get all text input fields and text areas on the page
    textFields.forEach((field) => {
      field.value = ''; // Clear text input field and text area values
    });



    setClasses([]);
    setText('');
    setTitle(undefined);
    setSelectedOptions([])
  }

  const listClasses = (data: any) => {
    let listClasses_ = [{}]
    listClasses_ = data.map((_class: any) => {
      return { label: _class.className, value: _class._id };
    });
    setClasses(listClasses_);



  }

  const handleCheckboxChange = (event: any, option: any) => {

    if (event.target.checked) {
      setSelectedOptions([...selectedOptions, option]);

    } else {
      setSelectedOptions(selectedOptions.filter((selectedOption: any) => selectedOption._id !== option._id));
    }
  };
  // create new task 


  const validDataToMessage = () => {

    if (text === '' || selectedOptions.length == 0 || !title) {
      alert("ההודעה לא נשלחה לא השלמת את כל השדות.")
      return false;
    }
    return true;
  }

  const createMessage = () => {

    const validData = validDataToMessage();
    if (!validData)
      return;
    axios.post("http://localhost:3000/message",
      {
        method: 'POST',
        Headers: {
          Authorization: `${cookies.token}`,
          Accept: 'application/json'
        },
        body: {
          writeName: write, content: text, title: title, count: count, date: new Date(Date.now()), classesToMessage: selectedOptions.map((c: any) => { return c.value })
        },
      })
      .then((response) => {


        alert("ההודעה נשלחה בהצלחה");
        // updateData();
      }).catch(() => {
        alert("ההודעה לא נשלחה, כנראה שלא הזנתה את אחד מהנתונים")
        // updateData();
      }
      );
  }

  const addToListClassesSend = (e: any) => {
    let temp = classesToSendMessage;
    if (e.target.checked == true)
      temp.push(e.target.id);
    else {
      var filteredArray = temp.filter(function (t: any) { return t !== e.target.id })
      temp = filteredArray;
    }
    setClassesToSendMessage(temp);
  }

  const typeOfMessage = () => {
    const inputSelect = document.querySelector('input')?.value;
    return inputSelect;
  }
  // option to message
  const listOfTypeMesssage = [
    { label: "הודעה חשובה" },
    { label: 'דבר ההנהלה' },
    { label: 'מבחן' },
    { label: 'מסיבה ' },
    { label: 'טיול' },
    { label: 'יציאה' },
    { label: 'אחר' },
  ];
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
        listClasses(response.data);
      })
      .catch(error => {
        alert("שגיאה");
      });
  }, []);

  const handleSelectClass = (value: any) => {
    setSelectedOptions(value);
  }

  return (
    <>
      <form >
        <div
          style={{ padding: '2%', }}
        >
          <Box
            sx={{
              backgroundColor: '#f0f0f0',
              padding: '4%',
              borderRadius: '8px',
              margin: ' auto',
              direction: 'rtl',
              wordWrap: 'break-word',
              wordBreak: 'break-all',
              width: '40%',
              height: '40%',
              position: 'left'

            }}
          >
            <div style={{ display: 'flex', flexWrap: 'nowrap', marginBottom: 12 }}>

              <Autocomplete
                multiple
                id="classes"
                options={classes}
                sx={{ paddingLeft: 2 }}
                getOptionLabel={(option: any) => option.label}
                onChange={(event, value) => {
                  handleSelectClass(value);
                }}
                style={{ width: 500 }}
                renderInput={(params) => (
                  <TextField {...params} label="למי לשלוח?" sx={{ textAlign: 'rtl' }} placeholder="כיתות לשליחת ההודעה" autoComplete="off" />

                )}
              />
              <Autocomplete
                disablePortal
                id="titleMessage"
                options={listOfTypeMesssage}
                style={{}}
                sx={{ width: '90%', height: '50%' }}
                renderInput={(params) => <TextField {...params} label="כותרת ההודעה "
                  onSelect={(e) => { setTitle(e.target.value) }}
                  style={{ textAlign: 'right' }} />}
              />
            </div>
            <Typography variant="h6" className={title} >
            </Typography>
            <TextField onChange={(e) => setText(e.target.value)}
              id="text"
              fullWidth
              label="תוכן ההודעה"
              multiline
              rows={10}
              className={text}
              style={{ width: '100%' }}
              autoComplete="off"
            />
            <Button color="primary" onClick={createMessage} type='submit'
              style={{ width: '90%', marginTop: '5%', marginInline: "5%" }}

            ><SendIcon style={{ paddingLeft: 10 }} />
              שלח
            </Button>
          </Box>
        </div>
        <div id="alertError" style={{ display: 'none' }}>
          <Box sx={{ width: '50%', position: 'fixed', top: '15%', alignItems: 'center' }}  >
            <Collapse in={open}>
              <Alert
                severity="warning"
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
                לא השלמת את כל שדות המטלה!
              </Alert>
            </Collapse>
          </Box>

        </div>
      </form>
    </>

  );
}

import React, { useState } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { WriteTask } from './WriteTask';
import { FileUploadOutlined, Input, TextFields } from '@mui/icons-material';
import { UploadFileDetails } from '../signUpExcel/UploadFileDetails';
import { useCookies } from 'react-cookie';



export const UploadDoc = () => {


  // const [file, setFile] = useState<File | undefined>();
  const [fileName, setFileName] = useState(" ");
  const [hasFile, setHasFile] = useState(false);
  const [cookies, setCookie] = useCookies(['token']);

  const handleFileUpload = (event: any) => {
    setFileName(event.target.value);
    // get the selected file from the input
    const file = event.target.files[0];
    // create a new FormData object and append the file to it
    const formData = new FormData();
    formData.append("file", file);
    // make a POST request to the File Upload API with the FormData object and Rapid API headers
    axios.post("http://localhost:3000/task/file", formData, {
      headers: {
        Authorization: `${cookies.token}`,
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {

        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <WriteTask data={hasFile} />
      <div className="App" style={{ display: 'flex', flexDirection: 'row-reverse' }}>
        <p>העלאת קבצים מהשיעור<br />
          וקבצי המטלה</p>
        <form >

          <div >

            <Button component="label" variant="contained" sx={{ width: 958, height: 150, marginRight: 12, marginTop: 3 }} startIcon={<FileUploadOutlined style={{ fontSize: 120, color: 'black' }} />}>

              <input type="file" accept='application/pdf' style={{ display: 'none' }} onChange={(e) => handleFileUpload(e)} />

            </Button>

            <div>

            </div>
          </div>
          {fileName}
        </form>
      </div>
    </>

  );
}







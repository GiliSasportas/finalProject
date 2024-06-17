

import { Avatar, Box, Button, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import './ShowMessage.css';
import React, { useState } from 'react';
import { Card, Container } from '@mui/joy';
import moment from "moment";
import { Navigate, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';


// הצגת ההודעות להורה
export const ShowMessage = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [cookies, setCookie] = useCookies(['token']);

  const [message, setMessage] = React.useState<any>([]);
  const [messages, setMessages] = React.useState([]);

  const [showButton, setShowButton] = useState(true);
  //  קבלת ההודעה האחרונה אוטומטית 



  React.useEffect(() => {
    axios.get('http://localhost:3000/message/last')
      .then(response => {
        setMessage(response.data);
      })
      .catch(error => {
     
      });
  }, [])

  // קבלת כל ההודעות
  const allthemessage = () => {


    let bground = document.getElementById('background');
    if (bground)
      bground.style.height = "100%";
    axios.get('http://localhost:3000/message', {
      headers: {
        Authorization: `${cookies.token}`,
        Accept: 'application/json'
      },
    })

      .then(response => {
        setMessages(response.data);
      })
      .catch(error => {
       
      });
 


    setShowButton(false);
  }

  return (
    <>
      <div
     
      >

        <Typography variant="caption" style={{ backgroundColor: '#F2F2F2' }}>
          <div >
            <h2 style={{ textAlign: 'center' }} >הורים יקרים שלום וברכה</h2>

            <h3 style={{ textAlign: 'center' }}>שימו ❤️ ההודעות חשובות </h3>
          </div>
        </Typography>


        <div style={{ display: 'flex', direction: 'rtl', justifyContent: 'space-evenly', backgroundColor: 'white' }}>
          <Card sx={{ width: '60%', display: 'flex', backgroundColor: '#F2F2F2' }}
            style={{ display: "inline-block", margin: 12, direction: 'rtl' }}
          >
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                <h4 style={{ direction: 'ltr', }}>{moment(message.date).utc().format('DD/MM/YYYY')}</h4>
                <h2 style={{ direction: 'rtl' }}>{message.title}</h2>
                <h3 style={{ direction: 'rtl' }}>{message.content}</h3>
              </Typography>
            </CardContent>
          </Card>
        </div>

        {messages.map((messaeg: any) => (
          <div style={{ display: 'flex', direction: 'rtl', justifyContent: 'space-evenly' }}>
            <Card sx={{ width: '60%', display: 'flex', backgroundColor: '#F2F2F2' }}
              style={{ display: "inline-block", margin: 12, direction: 'rtl' }}
            >
              <CardContent>
                <Typography variant="body2" color="text.secondary">

                  <h4 style={{ direction: 'ltr' }}>{moment(messaeg.date).utc().format('DD/MM/YYYY')}</h4>
                  <h2 style={{ direction: 'rtl' }}>{messaeg.title}</h2>
                  <h3 style={{ direction: 'rtl' }}>{messaeg.content}</h3>
                </Typography>
              </CardContent>
            </Card>
          </div>
        ))}

        <div>
          { showButton && (
            <Button onClick={allthemessage} variant="contained" color="primary" >לכל ההודעות לחץ כאן</Button>
            )
          }
        </div>
        
      </div>
    </>
  )
}


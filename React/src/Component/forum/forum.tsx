
import PersonPinIcon from '@mui/icons-material/PersonPin';
import { Button, InputAdornment, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import moment from "moment";

import { useCookies } from "react-cookie";
import AccountCircle from '@mui/icons-material/AccountCircle';
;

export const Forum = () => {
    const [cookies, setCookie] = useCookies(['token']);
    const [textMessage, setTextMessage] = useState('');
    const [messages, setMessages] = useState([]);

    React.useEffect(() => {
        userMessage()
    }, [])

    const userMessage = () => {
        axios.get('http://localhost:3000/forum', {
            method: 'GET',
            headers: {
                Authorization: `${cookies.token}`,
                Accept: 'application/json'
            }
        })
            .then(response => {
               
                setMessages(response.data)
            })
            .catch(error => {
               
            });
    }

    const creatMessage = () => {
        axios.post('http://localhost:3000/forum',
            {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `${cookies.token}`,
                },
                method: 'POST',

                body: {
                    date: new Date(Date.now()), text: textMessage
                },
            })
            .then((response) => {
              
                userMessage();
                setTextMessage("");
            }).catch((error) => {
              
            }
            );

    }
    const chekDate = (date: Date) => (moment(new Date(Date.now())).utc().format('DD/MM/YYYY') === moment(date).utc().format('DD/MM/YYYY'))

    return (
        <div style={{ background: '#fff', borderRadius: '8px', padding: '20px', flexGrow: '1' }}>
            <div style={{ height: '450px', overflowY: 'scroll', marginBottom: '20px' }}>
                {messages.messages?.map((m: any, index: any) => (
                    <div key={index} style={{ marginBottom: '10px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', textAlign: 'right' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginBottom: '5px' }}>
                            {chekDate(m.date) && <Typography variant="body2" style={{ marginRight: '70px', color: '#888' }}>היום   {moment(m.date).utc().format('DD/MM/YYYY')}</Typography>}

                            {!chekDate(m.date) && <Typography variant="body2" style={{ marginRight: '70px', color: '#888' }}>   {moment(m.date).utc().format('DD/MM/YYYY')}</Typography>}

                            <Typography sx={{ marginRight: '100px' }} variant="h6">{m.userName}</Typography>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', marginRight: '70px' }}>
                            <div style={{ background: m.isCurrentUser ? '#dcf8c6' : '#f3f3f3', padding: '10px', borderRadius: '8px', textAlign: m.isCurrentUser ? 'right' : 'left' }}>
                                <Typography variant="body1">{m.text}</Typography>

                            </div>
                            {!m.isCurrentUser && <AccountCircle size={24} style={{ marginLeft: '10px' }} />}

                            {m.isCurrentUser && <AccountCircle size={24} style={{ marginLeft: '3px' }} />}
                        </div>
                    </div>
                ))}
            </div>




            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginBottom: '20px' }}>
            <Button variant="contained" style={{marginRight:7}}color="primary" onClick={creatMessage}>שלח</Button>
                <TextField
                    multiline
                    rows={2}
                    variant="outlined"
                    value={textMessage}
                    onChange={(e) => setTextMessage(e.target.value)}
                    style={{ flex: '1', marginRight: '10px', direction: 'rtl' }}
                />
               
            </div>
        </div >

    )

}

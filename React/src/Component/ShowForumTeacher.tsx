import { Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import PersonPinIcon from '@mui/icons-material/PersonPin';
import moment from "moment";

export const ShowForumTeacher = ({ forumClass }: { forumClass: any }) => {
    const [messages, setMessages] = useState(forumClass);
    const [textMessage, setTextMessage] = useState('');
    const [cookies, setCookie] = useCookies(['token']);
    const [selectedBox, setSelectedBox] = React.useState("");


    React.useEffect(() => {
        userMessage()
    },
        // []
        [messages]
    )

    const userMessage = () => {
        axios.get('http://localhost:3000/forum/byTeacher/messages', {
            method: 'GET',
            headers: {
                Authorization: `${cookies.token}`, class: forumClass._id,
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


        axios.post('http://localhost:3000/forum/byteacher',
            {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `${cookies.token}`,
                },
                method: 'POST',
                body: {
                    date: new Date(Date.now()), text: textMessage, class: forumClass._id,
                },
            })
            .then((response) => {
                userMessage();
                setTextMessage(" ");

            }).catch((error) => {
            }
            );
    }
    const chekDate = (date: Date) => (moment(new Date(Date.now())).utc().format('DD/MM/YYYY') === moment(date).utc().format('DD/MM/YYYY'))

    return (
        <div style={{ background: '#fff', borderRadius: '8px', padding: '20px', flexGrow: '1' }}>
            <div style={{ height: '360px', overflowY: 'scroll', marginBottom: '20px' }}>
                {messages.messages?.map((m: any, index: any) => (
                    <div key={index} style={{ marginBottom: '10px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', textAlign: 'right' }}

                    >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginBottom: '5px' }}>
                            {chekDate(m.date) && <Typography variant="body2" style={{ marginRight: '70px', color: '#888' }}>היום   {moment(m.date).utc().format('DD/MM/YYYY')}</Typography>}

                            {!chekDate(m.date) && <Typography variant="body2" style={{ marginRight: '70px', color: '#888' }}>   {moment(m.date).utc().format('DD/MM/YYYY')}</Typography>}

                            <Typography variant="h6">{m.userName}</Typography>

                            {m.isCurrentUser && <PersonPinIcon size={24} style={{ marginLeft: '10px' }} />}
                            {!m.isCurrentUser && <PersonPinIcon size={24} style={{ marginRight: '10px' }} />}

                        </div>
                        <div style={{ background: m.isCurrentUser ? '#dcf8c6' : '#f3f3f3', padding: '10px', borderRadius: '8px', textAlign: m.isCurrentUser ? 'right' : 'left', margin: 10 }}>
                            <Typography variant="body1">{m.text}</Typography>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginBottom: '20px' }}>
                <Button variant="contained" color="primary" style={{ marginRight: 7 }} onClick={() => creatMessage()}>שלח</Button>

                <TextField
                    multiline
                    rows={1}
                    variant="outlined"
                    label="Message"
                    value={textMessage}
                    onChange={(e) => setTextMessage(e.target.value)}
                    style={{ flex: '1', marginRight: '10px', direction: "rtl" }}
                />
            </div>
        </div>
    );
}

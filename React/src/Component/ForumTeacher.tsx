
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { Button, Box } from "@mui/material";
import { ShowForumTeacher } from "./ShowForumTeacher";

export const ForumTeacher = () => {
  const [cookies] = useCookies(['token']);
  const [textMessage, setTextMessage] = useState('');
  const [classes, setClasses] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);


  useEffect(() => {
    const fetchMessages = () => {
      axios.get('http://localhost:3000/forum/byTeacher', {
        method: 'GET',
        headers: {
          Authorization: `${cookies.token}`,
          Accept: 'application/json'
        }
      })
        .then(response => {
        
          setClasses(response.data)
        })
        .catch(error => {
      
        });
    };

    fetchMessages();
  }, []);
  const handleBoxClick = (clas: any) => {
    setSelectedMessage(null);
    setSelectedMessage(clas);


   
  };
  
const c= classes.filter((item: any) => item !== null);
 
  
return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {c.map((c: any) => (
          <Box
            key={c._id}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '300px',
              height: '50px',
              backgroundColor: 'pink',
              color: 'white',
              fontSize: '24px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              padding: '10px',
              margin: '10px',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.1)',
              },
            }}
            onClick={() => handleBoxClick(c)}
          >
            <div>{` פורום כיתה ${c.className}`} </div>
          </Box>
        ))}
      </div>
      {selectedMessage && <ShowForumTeacher forumClass={selectedMessage} />}
    </>
  );
  }
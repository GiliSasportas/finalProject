import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Outlet, useNavigate } from 'react-router-dom';
// menu to write task 

export const Task = () => {
    const [value, setValue] = React.useState(0);
    const navigate = useNavigate();
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    }


    return (
        <>
            {/* <Box sx={{ width: '100%', bgcolor: 'background.paper', paddingTop: 5 }}>
                <Tabs value={value} onChange={handleChange} centered>
                    <Tab label="העלאת שיכפולים מהשיעור" onClick={(() => {
                        navigate('UploadDoc')
                    })} />
                    <Tab label="כתיבת מטלת הבית" onClick={(() => {

                        navigate('WriteTask')
                    })} />

                </Tabs>
            </Box>
            <Outlet /> */}
        </>
    )
}

import AssignmentIcon from '@mui/icons-material/Assignment';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import ChatIcon from '@mui/icons-material/Chat';
import EventNoteIcon from '@mui/icons-material/EventNote';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import AlbumIcon from '@mui/icons-material/Album';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import ImageIcon from '@mui/icons-material/Image';
import LoginIcon from '@mui/icons-material/Login';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];



export const Main = () => {

  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['token']);
  const [value, setValue] = React.useState(0);
  const [user, setUser] = React.useState(0);
  const [navigateByType, setNavigateByType] = React.useState<any>([{ name: 'התחברות', icon: < LoginIcon />, parentNavigate: '/Login', teacherNavigate: '/Login' },
  { name: 'מטלות בית', icon: <AssignmentIcon />, parentNavigate: '/main/ViewTask', teacherNavigate: '/main/WriteTask' },
  { name: 'סטטוס המטלות', icon: < AlbumIcon />, parentNavigate: '/main/StatusStudent', teacherNavigate: '/main/taskStatusTeachet' },
  { name: 'הודעות מערכת', icon: <AttachEmailIcon />, parentNavigate: '/main/ShowMessage', teacherNavigate: '/main/WriteMessage' },
  { name: 'פורומים ', icon: <ChatIcon />, parentNavigate: '/main/Forum', teacherNavigate: '/main/TeacherForum' },
  { name: 'אלפון ', icon: < EventNoteIcon />, parentNavigate: '/main/alphonStudent', teacherNavigate: '/main/alphon', }]);


  React.useEffect(() => {

    if (localStorage.getItem('type')?.toString() === 'Teacher') {
      let  arr =  navigateByType;
      arr = [...navigateByType,{ name: 'רישום תלמידים ', icon: < EventNoteIcon />, teacherNavigate: '/main/sinUp', }]
      setNavigateByType(arr);
    }

    axios.get('http://localhost:3000/Login/byUser', {
      headers: {token:cookies.token}
  })
      .then(response => {
       
        setUser(response.data);
        
            
      })
      .catch(error => {
         
      });

    
  }, [])


  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  const navigatToCorrectPage = (e: any) => {
    const userType = localStorage.getItem('type')?.toString();
    if (userType === 'Teacher')
      navigate(e.teacherNavigate);
    else if (userType === "Parent" || userType === 'Student')
      navigate(e.parentNavigate);
    else {
      alert("משתמש לא מחובר עבור להתחברות או הרשמה");
      navigate('/Login');
    }
  }

  return (


    <>
      <AppBar position="sticky" sx={{ backgroundColor: 'black', height: 90, direction: 'rtl' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{
            paddingTop: 1

          }}>
            <Typography
              variant="h6"
              noWrap
              component="a"
              onClick={() => { navigate('/main/BackgroundHome') }}
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
         
            </Typography>

            <img src="/src/assets/images/logo__.png" style={{ width: 130, marginTop: '-1vh' }} onClick={() => { navigate('/main/BackgroundHome'); }} />

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
              {navigateByType.map((page: any) => (
                  <MenuItem >

                    <Button key={page}
                      onClick={(e: any) => navigatToCorrectPage(page)}>
                      <Typography textAlign="center" >{page.name}</Typography>
                    </Button>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: 'none', mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >


            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {navigateByType.map((page: any) => (
                <Button

                  key={page}
                  onClick={(e: any) => navigatToCorrectPage(page)}

                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page.icon}
                  <br />
                  {page.name}

                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              {/* <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip> */}
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <h4>{user.name}</h4>
          </Toolbar>
        </Container>

      </AppBar >
      <Outlet />
    </>
  )
}















// < >

//   <Tabs value={value} sx={{ backgroundColor: 'black', direction: 'rtl' }} onChange={handleChange} aria-label="icon label tabs example" style={{ margin: 'auto' }}>


//     <Tab icon={< AlbumIcon />} label="סטטוס " style={{ color: 'white' }} onClick={() => {

//       navigatToCorrectPage('taskStatusTeachet', 'StatusStudent');

//     }} />
//     <Tab icon={< LoginIcon />} label="התחברות " style={{ color: 'white' }} onClick={() => {

//       navigate('/Login');

//     }} />

//     <Tab icon={<AttachEmailIcon />} label="הודעות" style={{ color: 'white' }} onClick={() => {

//       navigatToCorrectPage('WriteMessage', 'ShowMessage');
//     }} />
//     <Tab icon={<PersonPinIcon />} style={{ color: 'white' }} label="אלפון" onClick={() => {
//       navigate('/main/alphon');
//     }} />
//     <Tab icon={<ImageIcon />} style={{ color: 'white' }} label=" גלריה" onClick={() => {
//       navigate('/main/Galery');
//     }} />
//     <Tab icon={<ChatIcon />} style={{ color: 'white' }} label="פורומים"  onClick={() => {
//       navigatToCorrectPage('TeacherForum','Forum' );
//     }}/>
//     <Tab icon={<EventNoteIcon />} style={{ color: 'white' }} label="מערכת שעות" />
//     <Tab icon={<AssignmentIcon />} style={{ color: 'white' }} label="מטלות בית" onClick={() => {
//       navigatToCorrectPage('writeTask', 'ViewTask');
//     }} />
//        <Tab icon={<AssignmentIcon />} style={{ color: 'white' }} label="הרשמה" onClick={() => {
//       navigate('signUp');
//     }} />
//     <img src="/src/assets/images/final_logo.png" width={'13%'} height={'13%'} alt="" style={{ direction: 'ltr', paddingRight: '35%' }} />
//   </Tabs>
//   <Outlet />
// </>
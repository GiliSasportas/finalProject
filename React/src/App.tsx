import { Login } from './Component/Login';
import './index.css'
import './fonts/calibri.ttf';
import { Route, Routes } from 'react-router-dom';
import { Forum } from '@mui/icons-material';



function App() {


    return (
        <>
            <Login />
            {/* <Routes></Routes> */}
            <Routes>
            <Route path='*' element={<Forum />} />
</Routes>
        </>
    );
}

export default App;



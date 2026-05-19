import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import { AdminHome } from './pages/admin/Home.jsx';
import { UserHome } from './pages/users/Home.jsx';

const App = () => {

    return (
        <BrowserRouter>
            <Routes>

                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path='/forgot-password' element={<ForgotPassword/>} />
                <Route path='/admin/home' element={<AdminHome/>} />
                <Route path='/user/home' element={<UserHome/>} />

            </Routes>
        </BrowserRouter>
    );
};

export default App;
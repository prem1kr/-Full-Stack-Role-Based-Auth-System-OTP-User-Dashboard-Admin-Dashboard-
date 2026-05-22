import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import AdminHome from './pages/admin/Home.jsx';
import UserHome from './pages/users/Home.jsx';
import Profile from './pages/users/Profile.jsx';
import StudentsPage from './pages/admin/Student.jsx';
import Course from './pages/admin/Course.jsx';
import Department from './pages/admin/Department.jsx';


const App = () => {

    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path='/forgot-password' element={<ForgotPassword />} />
                <Route path='/admin/home' element={<AdminHome />} />
                <Route path='/user/home' element={<UserHome />} />
                <Route path='/user/profile' element={<Profile />} />
                <Route path='/admin/student' element={<StudentsPage />} />
                <Route path='/admin/courses' element={<Course />} />
                <Route path='/admin/departments' element={<Department />} />

            </Routes>
        </BrowserRouter>
    );
};

export default App;
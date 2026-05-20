import React from 'react';
import '../styles/UserSidebar.css';
import { FaHome, FaUserGraduate, FaChalkboardTeacher, FaBook, FaBuilding, FaCalendarCheck, FaClipboardList, FaBriefcase, FaCog, FaTimes } from 'react-icons/fa';

const UserSidebar = ({ sidebarOpen, setSidebarOpen }) => {

    return (
        <>
            <div className={`sidebar-overlay ${sidebarOpen ? 'show-sidebar-overlay' : ''}`} onClick={() => setSidebarOpen(false)}></div>
            <aside className={`sidebar ${sidebarOpen ? 'show-sidebar' : ''}`}>
                
                <div className="sidebar-top">
                    <h2 className="logo"> User </h2>
                    <button className="close-btn" onClick={() => setSidebarOpen(false)}> <FaTimes /> </button>
                </div>

                <ul className="menu">
                    <li className="active">
                        <span className="menu-icon"> <FaHome /> </span>
                        Dashboard
                    </li>

                    <li>
                        <span className="menu-icon"><FaUserGraduate /> </span>
                        Students
                    </li>

                    <li>
                        <span className="menu-icon"> <FaChalkboardTeacher /> </span>
                        Teachers
                    </li>

                    <li>
                        <span className="menu-icon"> <FaBook /> </span>
                        Courses
                    </li>

                    <li>
                        <span className="menu-icon"> <FaBuilding /> </span>
                        Departments
                    </li>

                    <li>
                        <span className="menu-icon"> <FaCalendarCheck /> </span>
                        Attendance
                    </li>

                    <li>
                        <span className="menu-icon"> <FaClipboardList /> </span>
                        Exams
                    </li>

                    <li>
                        <span className="menu-icon">  <FaBriefcase />  </span>
                        Placements
                    </li>

                    <li>
                        <span className="menu-icon"> <FaCog /> </span>
                        Settings
                    </li>

                </ul>
            </aside>
        </>
    );
};

export default UserSidebar;
import React from 'react';
import '../styles/AdminSidebar.css';
import { FaHome, FaUserGraduate, FaChalkboardTeacher, FaBook, FaBuilding, FaCalendarCheck, FaClipboardList, FaBriefcase, FaCog, FaTimes } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';

const UserSidebar = ({ sidebarOpen, setSidebarOpen }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { name: "Dashboard", path: "/admin/home", icon: <FaHome /> },
        { name: "Students", path: "/admin/student", icon: <FaUserGraduate /> },
        { name: "Teachers", path: "/admin/teachers", icon: <FaChalkboardTeacher /> },
        { name: "Courses", path: "/admin/courses", icon: <FaBook /> },
        { name: "Departments", path: "/admin/departments", icon: <FaBuilding /> },
        { name: "Attendance", path: "/admin/attendance", icon: <FaCalendarCheck /> },
        { name: "Exams", path: "/admin/exams", icon: <FaClipboardList /> },
        { name: "Placements", path: "/admin/placements", icon: <FaBriefcase /> },
        { name: "Settings", path: "/admin/settings", icon: <FaCog /> }
    ];

    return (
        <>
            <div className={`sidebar-overlay ${sidebarOpen ? 'show-sidebar-overlay' : ''}`} onClick={() => setSidebarOpen(false)}></div>
            <aside className={`sidebar ${sidebarOpen ? 'show-sidebar' : ''}`}>
                <div className="sidebar-top">
                    <h2 className="logo">User</h2>
                    <button className="close-btn" onClick={() => setSidebarOpen(false)}>
                        <FaTimes />
                    </button>
                </div>

                <ul className="menu">
                    {menuItems.map((item) => (
                        <li key={item.path} className={location.pathname === item.path ? "active" : ""} onClick={() => navigate(item.path)}>
                            <span className="menu-icon">{item.icon}</span>
                            {item.name}
                        </li>
                    ))}
                </ul>

            </aside>
        </>
    );
};

export default UserSidebar;
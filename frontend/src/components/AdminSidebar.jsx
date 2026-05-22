import React from 'react';
import '../styles/sidebar/AdminSidebar.css';
import { FaHome, FaUserGraduate, FaBook, FaBuilding, FaTimes, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';

const AdminSidebar = ({ sidebarOpen, setSidebarOpen }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        const confirmLogout = window.confirm("Are you sure you want to logout?");
        if (confirmLogout) {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            navigate('/');
        }
    };

    const menuItems = [
        { name: "Dashboard", path: "/admin/home", icon: <FaHome /> },
        { name: "Students", path: "/admin/student", icon: <FaUserGraduate /> },
        { name: "Courses", path: "/admin/courses", icon: <FaBook /> },
        { name: "Departments", path: "/admin/departments", icon: <FaBuilding /> },
    ];

    return (
        <>
            <div className={`sidebar-overlay ${sidebarOpen ? 'show-sidebar-overlay' : ''}`} onClick={() => setSidebarOpen(false)}></div>
            <aside className={`sidebar ${sidebarOpen ? 'show-sidebar' : ''}`}>
                <div className="sidebar-top">
                    <h2 className="logo">Admin</h2>
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

                    <li className="logout-item" onClick={handleLogout}>
                        <span className="icon"> <FaSignOutAlt /></span>
                        <span>Logout</span>
                    </li>
                </ul>

            </aside>
        </>
    );
};

export default AdminSidebar;
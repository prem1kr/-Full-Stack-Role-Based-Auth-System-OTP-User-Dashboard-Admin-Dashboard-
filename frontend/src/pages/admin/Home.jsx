import React, { useEffect, useState } from 'react';
import '../../styles/AdminHome.css';
import AdminSidebar from '../../components/AdminSidebar';
import { FaBook, FaBuilding, FaChalkboardTeacher, FaUserGraduate } from 'react-icons/fa';
import { getAllProfiles } from '../../hooks/useProfile';

const AdminHome = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const userJson = localStorage.getItem('user');
  const user = userJson ? JSON.parse(userJson) : null;
  const Id = user?.id;
  const name = user?.userName?.charAt(0).toUpperCase();
  const [users, setUsers] = useState([]);

  const stats = [
    {
      title: 'Students',
      value: '1,240',
      icon: <FaUserGraduate />
    },
    {
      title: 'Teachers',
      value: '85',
      icon: <FaChalkboardTeacher />
    },
    {
      title: 'Courses',
      value: '32',
      icon: <FaBook />
    },
    {
      title: 'Departments',
      value: '12',
      icon: <FaBuilding />
    }
  ];


  useEffect(() => {
    const fetchAllUserProfile = async () => {
      const response = await getAllProfiles();
      if (response.success) {
        setUsers(response.profiles);
      } else {
        alert(response.message)
      }
    }
    fetchAllUserProfile();
  }, []);


  return (
    <div className="dashboard">
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <main className="main-content">
        <div className="navbar">

          <div className="nav-left">
            <button className="menu-btn" onClick={() => setSidebarOpen(true)}> ☰ </button>
            <h1>Dashboard</h1>
          </div>

          <div className="admin-info">
            <span className="admin-avatar">{name}</span>
          </div>

        </div>

        <div className="cards">
          {stats.map((item, index) => (
            <div className="card" key={index}>

              <div className="card-top">
                <span className="icon">{item.icon}</span>
                <h3>{item.title}</h3>
              </div>

              <h2>{item.value}</h2>
            </div>
          ))}

        </div>

        <div className="table-container">
          <h2>Recent Students</h2>
          <div className="table-wrapper">
            <table>

              <thead>
                <tr>
                  <th>Roll No</th>
                  <th>Student Name</th>
                  <th>Course</th>
                  <th>Year</th>
                </tr>
              </thead>

              <tbody>
                {users.map((student, index) => (
                  <tr key={index}>
                    <td>{student.rollNumber}</td>
                    <td>{student.userName}</td>
                    <td>{student.course}</td>
                    <td>{student.semester}</td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminHome;
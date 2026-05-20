import React, { useEffect, useState } from 'react';
import '../../styles/AdminHome.css';
import AdminSidebar from '../../components/AdminSidebar';
import { FaBook, FaBuilding, FaChalkboardTeacher, FaUserGraduate } from 'react-icons/fa';
import { getAllProfiles } from '../../hooks/useProfile';
import { getAllUser } from '../../hooks/useAuth';

const AdminHome = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const userJson = localStorage.getItem('user');
  const user = userJson ? JSON.parse(userJson) : null;
  const Id = user?.id;
  const name = user?.userName?.charAt(0).toUpperCase();
  const [TotalUsers, setTotalUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const adminCount = TotalUsers.filter((user) => user.role === 'admin').length;
  const userCount = TotalUsers.filter((user) => user.role === 'user').length;

  const courseStats = allUsers.reduce((acc, user) => {
    const course = user.course;
    if (course) {
      acc[course] = (acc[course] || 0) + 1;
    }
    return acc;
  }, {});
  const totalCourses = Object.keys(courseStats).length;

  const stats = [
    {
      title: 'Students',
      value: userCount,
      icon: <FaUserGraduate />
    },
    {
      title: 'Teachers',
      value: adminCount,
      icon: <FaChalkboardTeacher />
    },
    {
      title: 'Courses',
      value: totalCourses,
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
        setAllUsers(response.profiles);
      } else {
        alert(response.message)
      }
    }
    fetchAllUserProfile();
  }, []);

  useEffect(() => {
    const getAllUsers = async () => {
      const response = await getAllUser();
      if (response.success) {
        setTotalUsers(response.users);
      } else {
        alert(response.message);
      }
    }
    getAllUsers();
  }, [])



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
                {allUsers.map((student, index) => (
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
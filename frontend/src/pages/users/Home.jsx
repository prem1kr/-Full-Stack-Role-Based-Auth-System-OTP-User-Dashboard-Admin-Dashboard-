import React, { useState } from 'react';
import '../../styles/UserHome.css';
import AdminSidebar from '../../components/UserSidebar';
import { FaBook, FaBuilding, FaChalkboardTeacher, FaUserGraduate } from 'react-icons/fa';

const UserHome = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const stats = [
    {
      title: 'Students',
      value: '1,240',
      icon: <FaUserGraduate/>
    },
    {
      title: 'Teachers',
      value: '85',
      icon: <FaChalkboardTeacher/>
    },
    {
      title: 'Courses',
      value: '32',
      icon: <FaBook/>
    },
    {
      title: 'Departments',
      value: '12',
      icon: <FaBuilding/>
    }
  ];

  const students = [
    {
      roll: '101',
      name: 'Prem Kumar',
      course: 'B.Tech ECE',
      year: '3rd Year'
    },
    {
      roll: '102',
      name: 'Rahul Sharma',
      course: 'BCA',
      year: '2nd Year'
    },
    {
      roll: '103',
      name: 'Anjali',
      course: 'MBA',
      year: '1st Year'
    },
    {
      roll: '104',
      name: 'Aman',
      course: 'B.Tech CSE',
      year: '4th Year'
    }
  ];

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
            <img src="https://i.pravatar.cc/40" alt="admin" />
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
                {students.map((student, index) => (
                  <tr key={index}>
                    <td>{student.roll}</td>
                    <td>{student.name}</td>
                    <td>{student.course}</td>
                    <td>{student.year}</td>
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

export default UserHome;
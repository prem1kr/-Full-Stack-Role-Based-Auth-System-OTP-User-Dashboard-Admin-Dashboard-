import React, { useEffect, useState } from 'react';
import '../../styles/userDashboard/UserHome.css';
import { FaBook, FaBuilding, FaUserGraduate, FaIdCard } from 'react-icons/fa';
import { deleteProfile, getProfile } from '../../hooks/useProfile.js';
import { useNavigate } from 'react-router-dom';
import { Edit, Trash2 } from 'lucide-react';
import Profile from './Profile.jsx';

const UserHome = () => {
  const [showEdit, setShowEdit] = useState(false);
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const Id = user?.id;
  const name = user?.userName?.split(" ").map(n => n.charAt(0).toUpperCase()).join("");
  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to logout?');
    if (confirmLogout) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      navigate('/');
    }
  };


  const dashboardStats = [
    {
      title: 'Course',
      value: profile?.course || '0',
      icon: <FaBook />
    },

    {
      title: 'Department',
      value: profile?.branch || '0',
      icon: <FaBuilding />
    },

    {
      title: 'Semester',
      value: profile?.semester || '0',
      icon: <FaUserGraduate />
    },

    {
      title: 'Roll Number',
      value: profile?.rollNumber || '0',
      icon: <FaIdCard />
    }
  ];

 
    const fetchProfile = async () => {
      try {
        const response = await getProfile(Id);
        setProfile(response.profile);
      } catch (err) {
        console.error('Fetch profile failed', err);
      }
    };
  
    useEffect(()=> {
      fetchProfile();
    },[]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this student?");
    if (confirmDelete) {
      const response = await deleteProfile(Id);
      if (response.success) {
        fetchProfile();
      }
    }
  };

  return (
    <div className="user-dashboard-wrapper">
      <main className="user-dashboard-main">

        <div className="user-dashboard-header">
          <div className="user-dashboard-title">
            <h1>User Dashboard</h1>
          </div>
          <div className="user-dashboard-user-section">
            <button className="user-dashboard-logout-btn" onClick={handleLogout}>  Logout </button>
            {!profile ? <button onClick={() => setShowEdit(true)} className='add-profile-btn'> Add Profile </button> : <span className="user-dashboard-avatar">{name}</span>}
          </div>
        </div>

        <div className="user-dashboard-cards-grid">
          {dashboardStats.map((item, key) => (
            <div className="user-dashboard-card" key={key}>

              <div className="user-dashboard-card-top">
                <span className="user-dashboard-card-icon">{item.icon}</span>
                <h3>{item.title}</h3>
              </div>

              <h2>{item.value}</h2>
            </div>
          ))}
        </div>


        <div className="table-wrapper">
          <table>

            <thead>
              <tr>
                <th>Name</th>
                <th>Roll No</th>
                <th>Student Name</th>
                <th>Course</th>
                <th>Semester</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>

            <tbody>
              {profile ? (
                <tr>
                  <td>{profile.userName}</td>
                  <td>{profile.rollNumber}</td>
                  <td>{profile.userName}</td>
                  <td>{profile.course}</td>
                  <td>{profile.semester}</td>

                  <td>
                    <button className="edit-btn" onClick={() => setShowEdit(true)}> <Edit size={18} /></button>
                  </td>
                  <td>
                    <button className="delete-btn" onClick={() => handleDelete(profile.userId)} > <Trash2 size={18} />  </button>
                  </td>
                </tr>

              ) : (
                <tr>
                  <td colSpan="5" className="no-data">  No students found </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>

        {showEdit && (
          <div className="modal-overlay">
            <div >
              <button className="close-btn" onClick={() => setShowEdit(false)}> X </button>
              <Profile profile={profile} setProfile={setProfile} />
            </div>
          </div>
        )}

      </main >
    </div >
  );
};

export default UserHome;
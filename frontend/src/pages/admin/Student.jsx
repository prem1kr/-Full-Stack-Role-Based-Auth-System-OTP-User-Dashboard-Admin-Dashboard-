import React, { useEffect, useState } from "react";
import "../../styles/StudentsPage.css";
import "../../styles/AdminHome.css";
import AdminSidebar from "../../components/AdminSidebar.jsx";
import { Trash2 } from "lucide-react";
import { deleteProfile, getAllProfiles } from "../../hooks/useProfile.js";

const StudentsPage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [allUsers, setAllUsers] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));
    const name = user?.userName?.charAt(0).toUpperCase();
    const Id = user?.id;

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

    const handleDelete = async() => {
        const confirmDelete = window.confirm("Are you sure you want to delete this student?");
        if (confirmDelete) {
          const response = await deleteProfile(Id);
          alert(response.message);
        }
    };

    return (
        <div className="dashboard">
            <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <main className="main-content">

                <div className="navbar">
                    <div className="nav-left">
                        <button className="menu-btn" onClick={() => setSidebarOpen(true)}> ☰ </button>
                        <h1>Students</h1>
                    </div>

                    <div className="admin-info">
                        <span className="admin-avatar">{name}</span>
                    </div>
                </div>

                <div className="table-card">
                    <div className="table-title">
                        <h2>Total Students</h2>
                        <span>Total: {allUsers?.length || 0}</span>
                    </div>

                    <div className="table-wrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th>Roll No</th>
                                    <th>Student Name</th>
                                    <th>Course</th>
                                    <th>Semester</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {allUsers && allUsers.length > 0 ? (
                                    allUsers.map((student) => (
                                        <tr key={student._id || student.rollNumber}>
                                            <td>{student.rollNumber}</td>
                                            <td>{student.userName}</td>
                                            <td>{student.course}</td>
                                            <td>{student.semester}</td>

                                            <td>
                                                <button className="delete-btn" onClick={() => handleDelete(student._id)}>
                                                    <Trash2 size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="no-data">  No students found </td>
                                    </tr>
                                )}
                            </tbody>

                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default StudentsPage;
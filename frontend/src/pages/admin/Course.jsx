import React, { useEffect, useState } from "react";
import "../../styles/course/Course.css";
import AdminSidebar from "../../components/AdminSidebar.jsx";
import { FaBook } from "react-icons/fa";

import { getAllProfiles } from "../../hooks/useProfile.js";

const Course = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [allProfiles, setAllProfiles] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState("All");
    const user = JSON.parse(localStorage.getItem("user"));
    const name = user?.userName?.split(" ").map(n => n.charAt(0).toUpperCase()).join("");

    useEffect(() => {
        const fetchAllUserProfile = async () => {
            const response = await getAllProfiles();
            if (response.success) {
                setAllProfiles(response.profiles);
                setFilteredStudents(response.profiles);
            } else {
                alert(response.message);
            }
        };
        fetchAllUserProfile();
    }, []);

    // Course Statistics
    const courseStats = allProfiles.reduce((acc, student) => {
        const course = student.course;
        if (course) { acc[course] = (acc[course] || 0) + 1; }
        return acc;
    }, {});

    // Filter Buttons
    const courses = ["All", ...Object.keys(courseStats)];

    // Filter Handler
    const handleFilter = (course) => {
        setSelectedCourse(course);
        if (course === "All") {
            setFilteredStudents(allProfiles);
        } else {
            const filtered = allProfiles.filter((student) => student.course === course);
            setFilteredStudents(filtered);
        }
    };

    return (

        <div className="dashboard">
            <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <main className="main-content">

                {/* Navbar */}
                <div className="navbar">
                    <div className="nav-left">
                        <button className="menu-btn" onClick={() => setSidebarOpen(true)}>  ☰</button>
                        <h1>Courses</h1>
                    </div>

                    <div className="admin-info">
                        <span className="admin-avatar"> {name} </span>
                    </div>

                </div>

                <div className="course-cards">
                    {Object.entries(courseStats).map(
                        ([course, count], index) => (

                            <div className="course-card" key={index} onClick={() => handleFilter(course)}>
                                <div className="course-card-top">
                                    <span className="course-icon"> <FaBook /> </span>
                                    <h3>{course}</h3>
                                </div>
                                <h2>{count}</h2>
                                <p>Total Students</p>
                            </div>
                        )
                    )}

                </div>

                <div className="course-filter">
                    {courses.map((course, index) => (
                        <button key={index} className={selectedCourse === course ? "filter-btn active-filter" : "filter-btn"}
                            onClick={() => handleFilter(course)} > {course} </button>
                    ))}
                </div>

                <div className="table-card">
                    <div className="table-title">
                        <h2> {selectedCourse} Students</h2>
                        <span> Total: {filteredStudents.length} </span>
                    </div>

                    <div className="table-wrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th>Roll No</th>
                                    <th>Student Name</th>
                                    <th>Course</th>
                                    <th>Branch</th>
                                    <th>Semester</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredStudents.length > 0 ? (
                                    filteredStudents.map((student) => (
                                        <tr key={student._id || student.rollNumber}>
                                            <td>{student.rollNumber}</td>
                                            <td>{student.userName}</td>
                                            <td>{student.course}</td>
                                            <td>{student.branch}</td>
                                            <td>{student.semester}</td>
                                        </tr>
                                    ))

                                ) : (

                                    <tr>
                                        <td colSpan="5" className="no-data" > No students found </td>
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

export default Course;
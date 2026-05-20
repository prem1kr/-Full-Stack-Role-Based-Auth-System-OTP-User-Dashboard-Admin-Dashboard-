import React, { useState } from 'react';

const AdminHome = () => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    phone: '',
    address: '',
    pincode: '',
    course: '',
    branch: '',
    semester: '',
    rollNumber: ''

  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Profile Updated");
  };

  return (

    <div className="container">
      <h1>Admin Home</h1>

      <form className="form" onSubmit={handleUpdate}>
        <h1>Edit Profile</h1>

        <input type="text" name="userName" value={formData.userName} disabled />
        <input type="email" name="email" value={formData.email} disabled />
        <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
        <textarea name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
        <input type="text" name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange} />
        <input type="text" name="course" placeholder="Course" value={formData.course} onChange={handleChange} />
        <input type="text" name="branch" placeholder="Branch" value={formData.branch} onChange={handleChange} />
        <input type="number" name="semester" placeholder="Semester" value={formData.semester} onChange={handleChange} />
        <input type="text" name="rollNumber" placeholder="Roll Number" value={formData.rollNumber} onChange={handleChange} />
        <button type="submit"> Update Profile </button>

      </form>
    </div>
  );
};

export default AdminHome;

import React, { useState } from 'react';
import { addProfile, getProfile, updateProfile } from '../../hooks/useProfile';
import LoadingSpinner from '../../components/Loading.jsx';

const Profile = () => {
  const userJson = localStorage.getItem('user');
  const user = userJson ? JSON.parse(userJson) : null;
  const name = user?.userName;
  const Email = user?.email;
  const [profile, setProfile] = useState();
  const Id = user?.id;
  console.log(profile);
  const [userName] = useState(name);
  const [email] = useState(Email);
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [course, setCourse] = useState('');
  const [branch, setBranch] = useState('');
  const [semester, setSemester] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [Loading, setLoading] = useState(false)

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = {userId:Id, userName, email, phone, address, pincode, course, branch, semester, rollNumber };
    try {
      setLoading(true)
      const response = await getProfile(Id);
      console.log("PROFILE DATA :", response);
      if (!response || !response.success) {
       const response =  await addProfile(formData);
        setProfile(response.profile);
        alert.log('profile added');

      } else {
        const updateData = { phone, address, pincode, course, branch, semester, rollNumber }
        await updateProfile(Id,updateData);
        alert('Profile Updated');
      }

    } catch (err) {
      console.error('Failed to save profile', err);
      alert('Failed to update profile');
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleUpdate}>
        <h1>Edit Profile</h1>

        <input type="text" name="userName" value={userName} disabled />
        <input type="email" name="email" value={email} disabled />
        <input type="text" name="phone" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <textarea name="address" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
        <input type="text" name="pincode" placeholder="Pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} />
        <input type="text" name="course" placeholder="Course" value={course} onChange={(e) => setCourse(e.target.value)} />
        <input type="text" name="branch" placeholder="Branch" value={branch} onChange={(e) => setBranch(e.target.value)} />
        <input type="number" name="semester" placeholder="Semester" value={semester} onChange={(e) => setSemester(e.target.value)} />
        <input type="text" name="rollNumber" placeholder="Roll Number" value={rollNumber} onChange={(e) => setRollNumber(e.target.value)} />

        {Loading ? <LoadingSpinner/> : <button type="submit">Update Profile</button>}
      </form>
    </div>
  );
};

export default Profile;

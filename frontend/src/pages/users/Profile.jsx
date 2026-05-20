import React, { useEffect, useState } from 'react';
import { addProfile, getProfile, updateProfile } from '../../hooks/useProfile';
import LoadingSpinner from '../../components/Loading.jsx';

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const Id = user?.id;
  const userName = user?.userName || '';
  const email = user?.email || '';
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [course, setCourse] = useState('');
  const [branch, setBranch] = useState('');
  const [semester, setSemester] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const courseOptions = ['B.Tech', 'BCA', 'MBA', 'MCA', 'BBA', 'B.Com'];
  const branchOptions = ['CSE', 'ECE', 'ME', 'CE', 'EE', 'IT'];

  useEffect(() => {
    if (!Id) return;
    const fetchProfile = async () => {
      try {
        const response = await getProfile(Id);
        setProfileData(response.profile);
      } catch (err) {
        console.error('Fetch profile failed', err);
      }
    };
    fetchProfile();
  }, [Id]);

  useEffect(() => {
    if (!profileData) return;
    setPhone(profileData.phone || '');
    setAddress(profileData.address || '');
    setPincode(profileData.pincode || '');
    setCourse(profileData.course || '');
    setBranch(profileData.branch || '');
    setSemester(profileData.semester || '');
    setRollNumber(profileData.rollNumber || '');
  }, [profileData]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!phone || !address || !pincode || !course || !branch || !semester || !rollNumber) {
      return alert('All fields are required');
    }

    if (!courseOptions.includes(course)) {
      return alert('Invalid course selected');
    }
    if (!branchOptions.includes(branch)) {
      return alert('Invalid branch selected');
    }
    if (semester < 1 || semester > 8) {
      return alert('Semester must be between 1 and 8');
    }

    const formData = { userId: Id, userName, email, phone, address, pincode, course, branch, semester: Number(semester), rollNumber };

    try {
      setLoading(true);
      if (!profileData) {
        await addProfile(formData);
        alert('Profile added successfully');
      } else {
        const updateData = { phone, address, pincode, course, branch, semester: Number(semester), rollNumber };
        await updateProfile(Id, updateData);
        alert('Profile updated successfully');
      }

    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || 'Failed to save profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleUpdate}>
        <h1>Edit Profile</h1>

        <input value={userName} disabled />
        <input value={email} disabled />

        <input placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <textarea placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
        <input placeholder="Pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} />

        <select value={course} onChange={(e) => setCourse(e.target.value)}>
          <option value="">Select Course</option>
          {courseOptions.map((c) => (<option key={c} value={c}>{c}</option>))}
        </select>

        <select value={branch} onChange={(e) => setBranch(e.target.value)}>
          <option value="">Select Branch</option>
          {branchOptions.map((b) => (<option key={b} value={b}>{b}</option>))}
        </select>

        <input type="number" placeholder="Semester (1-8)" value={semester} onChange={(e) => setSemester(e.target.value)} />
        <input placeholder="Roll Number" value={rollNumber} onChange={(e) => setRollNumber(e.target.value)} />

        {loading ? <LoadingSpinner /> : <button type="submit">Save Profile</button>}
      </form>
    </div>
  );
};

export default Profile;
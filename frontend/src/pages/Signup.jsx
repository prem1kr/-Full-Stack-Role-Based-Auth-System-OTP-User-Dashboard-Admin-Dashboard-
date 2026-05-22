import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendotp, signup, verifyotp } from '../hooks/useAuth.js';
import { validateSignup } from '../utils/signupValidation.js';
import LoadingSpinner from '../components/Loading.jsx';
import '../styles/signup/signup.css'

const Signup = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [Loading, setLoading] = useState(false);
    const [otp, setOtp] = useState('');
    const [showOtp, setShowOtp] = useState(false);
    const [users, setUsers] = useState();
    const [showSignup, setShowSignup] = useState(true);

    const handleSignup = async (e) => {
        e.preventDefault();
        const validation = validateSignup({ name, email, password, role });
        if (!validation.success) {
            return alert(validation.message);
        }

        try {
            setLoading(true);
            const data = { userName: name, email, password, role };
            const response = await signup(data);
            if (response.success) {
                setShowOtp(true);
                setShowSignup(false);
                setUsers(response.user);
                alert(`${role}, ${name} ${response.message}`);
                console.log(response.user);
                const id = response.user.id;
                await sendotp(id);
            } else {
                alert(response.message);
            }

        } catch (error) {
            console.log(error);
            alert("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const id = users.id;
            const response = await verifyotp(id, otp);
            if (response.success) {
                alert(`${users.role} Verified successfully`);
                navigate('/');
            } else {
                alert(response.message);
            }

        } catch (error) {
            console.log(error);
            alert("Something went wrong");
        } finally {
            setLoading(false);
        }

    }

    return (
        <div className="auth-page">
            <form className="auth-card">

                <h1 className="auth-title">Signup</h1>

                {showSignup && (
                    <>
                        <select className="auth-input" value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="">Select Role</option>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>

                        <input className="auth-input" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                        <input className="auth-input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input className="auth-input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

                        {Loading ? <LoadingSpinner /> : <button className="auth-btn" type="button" onClick={handleSignup}>  Signup </button>}
                    </>
                )}

                {showOtp && (
                    <>
                        <input className="auth-input" type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
                        {Loading ? <LoadingSpinner /> : <button className="auth-btn" type="button" onClick={handleVerifyOtp}>Verify OTP</button>}
                    </>
                )}

                <p className="auth-link" onClick={() => navigate('/')}>  Already have account? </p>

            </form>
        </div>
    );
};

export default Signup;
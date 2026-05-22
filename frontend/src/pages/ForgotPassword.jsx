import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { resetpassword, sendotpemail, verifyotpemail } from '../hooks/useAuth.js';
import '../styles/login/login.css'
import LoadingSpinner from '../components/Loading.jsx';


const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showEmail, setShowEmail] = useState(true);
    const [showOtp, setShowOtp] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [users, setUsers] = useState();
    const Navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSendOtp = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await sendotpemail(email);
            if (response.success) {
                setShowEmail(false);
                setShowOtp(true);
                alert('OTP send successfully');
            }

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await verifyotpemail(email, otp);
            if (response.success) {
                setUsers(response.user);
                alert(`OTP Verified successfully`);
                setShowOtp(false);
                setShowNewPassword(true);
            }

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }

    }

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const id = users.id;
            const response = await resetpassword(id, newPassword);
            if (response.success) {
                alert("Password Reset Successful");
                Navigate('/');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }


    };

    return (
        <div className="auth-page">
            <form className="auth-card">
                <h1 className="auth-title">Forgot Password</h1>

                {showEmail && (
                    <>
                        <input className="auth-input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        {loading ? <LoadingSpinner /> : <button className="auth-btn" type="button" onClick={handleSendOtp}> Send OTP </button>}
                    </>
                )}

                {showOtp && (
                    <>
                        <input className="auth-input" type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
                        {loading ? <LoadingSpinner /> : <button className="auth-btn" type="button" onClick={handleVerifyOtp}>    Verify OTP </button>}
                    </>
                )}

                {showNewPassword && (
                    <>
                        <input className="auth-input" type="password" placeholder="Enter New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                        {loading ? <LoadingSpinner /> : (<button className="auth-btn" type="button" onClick={handleResetPassword}>    Reset Password </button>)}
                    </>
                )}

            </form>
        </div>
    );
};

export default ForgotPassword;
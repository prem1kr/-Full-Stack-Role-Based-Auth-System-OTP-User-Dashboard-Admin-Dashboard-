import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showEmail, setShowEmail] = useState(true);
    const [showOtp, setShowOtp] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const Navigate = useNavigate();

    const handleSendOtp = (e) => {
        e.preventDefault();
        const generatedOtp = Math.floor(
            100000 + Math.random() * 900000
        );
        alert(`OTP Sent To ${email}`, generatedOtp);
        setShowEmail(false);
        setShowOtp(true);

    };

    const handleVerifyOtp = (e) => {
        e.preventDefault();
        alert(`OTP Verified successfully`);
        setShowOtp(false);
        setShowNewPassword(true);
    }

    const handleResetPassword = (e) => {
        e.preventDefault();
        alert("Password Reset Successful");
        Navigate('/login');

    };

    return (
        <div className="container">
            <form className="form">
                <h1>Forgot Password</h1>

                {showEmail &&
                    <>
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <button onClick={handleSendOtp}> Send OTP </button>
                    </>
                }

                {showOtp &&
                    <>
                        <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
                        <button onClick={handleVerifyOtp}> Verify OTP </button>
                    </>
                }

                {showNewPassword &&
                    <>
                        <input type="password" placeholder="Enter New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                        <button onClick={handleResetPassword}>  Reset Password </button>
                    </>
                }


            </form>
        </div>
    );
};

export default ForgotPassword;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showOtp, setShowOtp] = useState(false);
    const [otp, setOtp] = useState('');
    const [showLoginForm, setShowLoginForm] = useState(true);

    const handleLogin = (e) => {
        e.preventDefault();
        setShowOtp(true);
        setShowLoginForm(false);
    };

    const handleVerifyOtp = (e) => {
        e.preventDefault();
        alert(`${role} Verified successfully`);
        if (role === 'admin') {
            navigate('/admin/home');
        } else {
            navigate('/user/home');
        }
        alert(`${role} Login Successful`);

    }

    return (

        <div className="container">
            <form className="form" onSubmit={handleLogin} >
                <h1>Login</h1>

                {showLoginForm &&
                    <>
                        <select value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value=""> Select Role  </option>
                            <option value="user"> User </option>
                            <option value="admin">  Admin</option>
                        </select>

                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <p onClick={() => navigate('/forgot-password')}> Forgot Password </p>

                        <button type="submit"> Login </button>
                    </>
                }

                {showOtp &&
                    <>
                        <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
                        <button onClick={handleVerifyOtp}> Verify OTP </button>
                    </>
                }

                <p onClick={() => navigate('/signup')}> Create Account </p>

            </form>
        </div>
    );
};

export default Login;
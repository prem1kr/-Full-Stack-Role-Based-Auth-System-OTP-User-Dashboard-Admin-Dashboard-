import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateLogin } from '../utils/loginValidation.js';
import { login, sendotp, sendotpemail, verifyotp } from '../hooks/useAuth.js';
import LoadingSpinner from '../components/Loading.jsx';

const Login = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showOtp, setShowOtp] = useState(false);
    const [otp, setOtp] = useState('');
    const [showLoginForm, setShowLoginForm] = useState(true);
    const [Loading, setLoading] = useState(false);
    const [users, setUsers] = useState();

    const handleLogin = async (e) => {
        e.preventDefault();
        const validation = validateLogin({ email, password, role });
        if (!validation.success) {
            return alert(validation.message);
        }

        try {
            setLoading(true);
            const data = { email, password };
            await sendotpemail(email);

            const response = await login(data);
            if (response.success) {
                setUsers(response.user);
                alert(response.message);
                setShowOtp(true);
                setShowLoginForm(false);

            } else {
                alert(response.message);
            }

        } catch (error) {
            console.log(error);
            return alert("Something went wrong");
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
                alert(`${users.role} Login Successful`);

                if (users.role === 'admin') {
                    navigate('/admin/home');
                } else {
                    navigate('/user/home');
                }
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

                        {Loading ? <LoadingSpinner /> : <button type="submit"> Login </button>}
                    </>
                }

                {showOtp &&
                    <>
                        <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
                        {Loading ? <LoadingSpinner /> : <button onClick={handleVerifyOtp}> Verify OTP </button>}
                    </>
                }

                <p onClick={() => navigate('/signup')}> Create Account </p>

            </form>
        </div>
    );
};

export default Login;
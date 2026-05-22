import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateLogin } from '../utils/loginValidation.js';
import { login } from '../hooks/useAuth.js';
import LoadingSpinner from '../components/Loading.jsx';
import '../styles/login/login.css'

const Login = () => {
    const navigate = useNavigate();
    // const [role, setRole] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [Loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        const validation = validateLogin({ email, password });
        if (!validation.success) {
            return alert(validation.message);
        }
        try {
            setLoading(true);
            const data = { email, password };
            const response = await login(data);
            if (response.success) {
                alert(response.message);
                localStorage.setItem("user", JSON.stringify(response.user));
                localStorage.setItem("token", response.token);
                if (response.user.role === 'admin') {
                    navigate('/admin/home');
                } else {
                    navigate('/user/home');
                }

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


    return (

        <div className="auth-page">
            <form className="auth-card" onSubmit={handleLogin}>
                <h1 className="auth-title">Login</h1>

                <input className="auth-input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input className="auth-input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <p className="auth-link" onClick={() => navigate('/forgot-password')}> Forgot Password </p>

                {Loading ? <LoadingSpinner /> : <button className="auth-btn" type="submit">  Login </button>}
                <p className="auth-link" onClick={() => navigate('/signup')}> Create Account </p>

            </form>
        </div>
    );
};

export default Login;
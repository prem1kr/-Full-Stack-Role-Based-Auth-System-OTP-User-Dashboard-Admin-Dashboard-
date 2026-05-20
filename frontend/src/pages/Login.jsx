import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateLogin } from '../utils/loginValidation.js';
import { login } from '../hooks/useAuth.js';
import LoadingSpinner from '../components/Loading.jsx';

const Login = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [Loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        const validation = validateLogin({ email, password, role });
        if (!validation.success) {
            return alert(validation.message);
        }
        try {
            setLoading(true);
            const data = { email, password };
            const response = await login(data);
            if (response.success) {
                alert(response.message);
                localStorage.setItem('user', JSON.stringify(response.user));
                if (role === 'admin') {
                    navigate('/admin/home');
                } else {
                    navigate('/user/profile');
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

        <div className="container">
            <form className="form" onSubmit={handleLogin} >
                <h1>Login</h1>

                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value=""> Select Role  </option>
                    <option value="user"> User </option>
                    <option value="admin">  Admin</option>
                </select>

                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <p onClick={() => navigate('/forgot-password')}> Forgot Password </p>

                {Loading ? <LoadingSpinner /> : <button type="submit"> Login </button>}

                <p onClick={() => navigate('/signup')}> Create Account </p>

            </form>

        </div>
    );
};

export default Login;
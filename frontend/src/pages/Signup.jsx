import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = (e) => {
        e.preventDefault();
        alert(`${role},${name} Signup Successful`);
        navigate('/login');
    };

    return (
        <div className="container">
            <form className="form" onSubmit={handleSignup} >
                <h1>Signup</h1>

                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value=""> Select Role  </option>
                    <option value="user"> User </option>
                    <option value="admin">  Admin</option>
                </select>

                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

                <button type="submit"> Signup </button>
                <p onClick={() => navigate('/login')}> Already have account? </p>

            </form>
        </div>
    );
};

export default Signup;
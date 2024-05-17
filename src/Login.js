import React,{useState} from 'react'
import axios from 'axios';
import './login.css'
const Login = ({onLogin}) =>{
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const handleLogin = async (e) =>{
        e.preventDefault();
        try{
            const {data} = await axios.post('http://localhost:3001/login',{username,password});
            onLogin(data.token);
        }catch(error){
            console.error('Login failed',error.response.data);
        }
    };
    return (
        <section className = "container">
        <h2>Thông tin đăng nhập</h2>
        <form onSubmit={handleLogin} className='form'>
            <label for="username"><span>Username</span></label>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
            <label for="password"><span>Password</span></label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
            <button type="submit">Login</button>
        </form>
        </section>
    );  
};

export default Login;
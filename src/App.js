import React, { useState } from 'react';
import Login from './Login';
import axios from 'axios';
function App() {
  const [token, setToken] = useState(localStorage.getItem('jwtToken'));
  const onLogin = (token) => {
    localStorage.setItem('jwtToken', token);
    setToken(token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };
  return (
    <div>
      {!token ? (
        <Login onLogin={onLogin} />
      ) : (
        <h1>You are logged in!</h1>
      )}
    </div>
  );
}
export default App;
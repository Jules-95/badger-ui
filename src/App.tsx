import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './routes/login';
import { NeedAuth } from './routes/NeedAuth';
import Serveur from './routes/serveur';
import User from './routes/user';
import Vm from './routes/vm';


export default function App() {

const [token, setToken] = useState("");

useEffect(() => {
  const monToken = localStorage.getItem("token");
  console.log("token :", monToken)
  if (monToken) {
    setToken(monToken);
  }
}, []);

  return (
    <BrowserRouter>
    <h1>Interface pour Badger</h1>
    <ul>
      <li><NavLink to='/login'>Login</NavLink></li>
      <li><NavLink to='/serveur'>Serveurs</NavLink></li>
      <li><NavLink to='/user'>Users</NavLink></li>
      <li><NavLink to='/vm'>Vm</NavLink></li>
    </ul>

      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route element={<NeedAuth token={token} />}>
          <Route path="/serveur" element={<Serveur token={token} />} />
          <Route path="/user" element={<User token={token} />} />
          <Route path="/vm" element={<Vm token={token} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )

}

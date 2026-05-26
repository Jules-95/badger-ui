import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { useState } from 'react';
import Login from './routes/login';
import { NeedAuth } from './routes/NeedAuth';
import Serveur from './routes/serveur';
import User from './routes/user';
import Vm from './routes/vm';


export default function App() {

  // useState initialise le token avec la valeur dans localStorage 
  // get Item va chercher le token sauvegarder dans le nav
  // Pour || "" ca fix le problème de redirection vers login au refesh -> le token démarrait à "" et attendait le use effect (token vide donc /login) 
  // Maintenant token dispo dès le premier affichage -> NeedAuth ne voit plus de token vide
const [token, setToken] = useState(localStorage.getItem("token") || "");

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

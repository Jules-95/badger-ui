import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Login from './routes/login';
import { NeedAuth } from './routes/NeedAuth';
import Serveur from './routes/serveur';
import User from './routes/user';
import Vm from './routes/vm';
import Layout from './routes/Layout';
import Home from './routes/Home';


export default function App() {

  // useState initialise le token avec la valeur dans localStorage 
  // get Item va chercher le token sauvegarder dans le nav
  // Pour || "" ca fix le problème de redirection vers login au refesh -> le token démarrait à "" et attendait le use effect (token vide donc /login) 
  // Maintenant token dispo dès le premier affichage -> NeedAuth ne voit plus de token vide
const [token, setToken] = useState(localStorage.getItem("token") || "");

  return (
    <BrowserRouter>
      <Routes>
        {/* Route publique */}
        <Route path="/login" element={<Login setToken={setToken} />} />

        {/* Routes protégées */}
        <Route element={<NeedAuth token={token} />}>
          <Route element={<Layout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/serveur" element={<Serveur token={token} />} />
            <Route path="/user" element={<User token={token} />} />
            <Route path="/vm" element={<Vm token={token} />} />
          </Route>
        </Route>

        {/* Par défaut → login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );

}

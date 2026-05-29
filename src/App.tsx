import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './routes/login';
import { NeedAuth } from './routes/NeedAuth';
import Serveur from './routes/serveur';
import User from './routes/user';
import Vm from './routes/vm';
import Layout from './routes/Layout';
import Home from './routes/Home';


export default function App() {


  // Token stocké dans le store redux et accessible depuis n'importe où needAuth, serveur user et vm surligné en rouge 
  return (
    <BrowserRouter>
      <Routes>
        {/* Route publique */}
        <Route path="/login" element={<Login />} />

        {/* Routes protégées */}
        <Route element={<NeedAuth />}>
          <Route element={<Layout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/serveur" element={<Serveur />} />
            <Route path="/user" element={<User />} />
            <Route path="/vm" element={<Vm />} />
          </Route>
        </Route>

        {/* Par défaut → login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );

}

// pages/Home.jsx

import { useSelector } from "react-redux";

export default function Home() {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="page">

      <div className="home-hero">
        <h2>Bonjour, {user?.firstname} 👋</h2>
        <p>Bienvenue sur Badger en moins bien. Utilisez la navbar pour naviguer.</p>
      </div>

      <div className="home-wip">
        <p>Récap des données importantes ici <br/> En cours de développement</p>
      </div>

    </div>
  );
}
import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <nav>
        <ul>
          <li><NavLink to="/home">Home</NavLink></li>
          <li><NavLink to="/serveur">Serveurs</NavLink></li>
          <li><NavLink to="/user">Users</NavLink></li>
          <li><NavLink to="/vm">VM</NavLink></li>
        </ul>
      </nav>

      {/* La page qui sera active va s'affihcer ici */}
      <Outlet />
    </div>
  );
}
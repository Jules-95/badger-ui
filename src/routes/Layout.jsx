import { useDispatch } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { removeToken } from "../store/slices/authSlice";

export default function Layout() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Utilisation de removeToken de authSlice qui vide le store et le localstorage
    dispatch(removeToken());
    navigate("/login");
  };

  return (
    <div>
      <nav>
        <ul>
          <li><NavLink to="/home">Home</NavLink></li>
          <li><NavLink to="/serveur">Serveurs</NavLink></li>
          <li><NavLink to="/user">Users</NavLink></li>
          <li><NavLink to="/vm">VM</NavLink></li>
        </ul>
        <button onClick={handleLogout}>Logout</button>
      </nav>

      {/* La page qui sera active va s'affihcer ici */}
      <Outlet />
    </div>
  );
}
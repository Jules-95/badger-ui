import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { removeToken } from "../store/slices/authSlice";

export default function Layout() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Ici récupération des infos de l'utilisateur connecté depuis le jwt décodé dans le store Redux
  const user = useSelector((state) => state.auth.user);

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

        {/* Info de l'user connecté */}
        {user && (
          <div>
            <p>{user.firstname} {user.name}</p>
            <p>{user.email}</p>
            <p>{user.roles[0]}</p>
          </div>
        )}

        <button onClick={handleLogout}>Logout</button>
      </nav>

      {/* La page qui sera active va s'affihcer ici */}
      <Outlet />
    </div>
  );
}
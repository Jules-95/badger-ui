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
    <div className="app">
      <nav className="navbar">
        <div className="navbar-left">
          <NavLink to="/home">
          <img
            src="https://badger.arcplex.dev/badger.png"
            alt="Badger"
            className="navbar-logo"
          />
          </NavLink>
          <span className="navbar-brand">Badger</span>
          <ul className="navbar-links">
            <li>
              <NavLink to="/home">Home</NavLink>
            </li>
            <li>
              <NavLink to="/serveur">Servers</NavLink>
            </li>
            <li>
              <NavLink to="/user">Users</NavLink>
            </li>
            <li>
              <NavLink to="/vm">VM</NavLink>
            </li>
          </ul>
        </div>

        <div className="navbar-right">
          {user && (
            <div className="navbar-user">
              <span>
                {user.firstname} {user.name}
              </span>
              <span className="navbar-role">{user.roles[0]}</span>
            </div>
          )}
          <button className="btn-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

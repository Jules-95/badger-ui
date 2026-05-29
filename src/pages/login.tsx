import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setToken } from "../store/slices/authSlice";
import useNotification from "../hooks/useNotification";
import Notification from "../components/Notifications";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/home";

  // use Dispatch permet d'envoyer des action au store redux
  const dispatch = useDispatch();

  const { notification, showMessage } = useNotification();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch("https://badger.arcplex.dev/api/v2/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.success) {
      // dispatch envoie l'action setToken au store
      // authSlice stock le token dan redux et dans localstorage
      dispatch(setToken(data.jwt));

      //Affichage du jwt décodé
      console.log("token décodé :", JSON.parse(atob(data.jwt.split(".")[1])));

      navigate(from, { replace: true });
    } else {
      showMessage("Identifiants incorrects", "error");
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="login-logo">
          <img src="https://badger.arcplex.dev/badger.png" alt="Badger" />
          <h1>Badger</h1>
          <p>TP React Jules</p>
        </div>
        <div className="login-form">
          <h2>Login to your account</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Username"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </div>
            <button type="submit" className="btn-primary btn-full">
              Login
            </button>
          </form>
        </div>
      </div>
      <Notification
        message={notification?.message ?? null}
        type={notification?.type ?? null}
      />
    </div>
  );
}

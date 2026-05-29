import { useState } from "react"
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom"
import { setToken } from "../store/slices/authSlice";



export default function Login () {
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/home";

    // use Dispatch permet d'envoyer des action au store redux 
    const dispatch = useDispatch();

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
      console.log("token décodé :", JSON.parse(atob(data.jwt.split('.')[1])));     

      navigate(from, { replace: true });
    } else {
      alert("Identifiants incorrects");
    }
}; 

return (
    <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" />
        <button type="submit">Login</button>
    </form> 
    );
}


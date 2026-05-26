import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

//Typage
interface LoginType {
    setToken: (token: string) => void;
}

export default function Login ({ setToken }: LoginType) {
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/user";

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch("https://badger.arcplex.dev/api/v2/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log(data);

    if (data.success) {
      localStorage.setItem("token", data.jwt); 
      setToken(data.jwt);                         
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


import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Serveur() {

    // use selector lit le token directement depuis le store
    const token = useSelector((state) => state.auth.token);


    // Création de la variable User comme un tableau vide
    const [servers, setServers] = useState([]);

    // Rappel useEffect  : S'execute au chargement -> Appel l'api en passant le jwt dans le header -> res.json converti la reponse en json -> data c'est le tableau d'util -> setUsers(data) = Je stock le tableau dans le state pour l'afficher -> Enfin useEffect se relance si le token a changé

    useEffect(() => {
        fetch("https://badger.arcplex.dev/api/v2/admin/server/me", {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => res.json())
        .then((data) => {
            setServers(data);
         });
    }, [token]);



    return (

    <div>
      <h2>Serveurs</h2>
      {servers.map((server) => (
        <p key={server.id}>{server.id}</p> 
      ))}
    </div>

    );
}
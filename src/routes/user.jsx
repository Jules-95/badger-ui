import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function User() {

    // use selector lit le token directement depuis le store
    const token = useSelector((state) => state.auth.token);


    // Création de la variable User comme un tableau vide
    const [users, setUsers] = useState([]);

    // Rappel useEffect  : S'execute au chargement -> Appel l'api en passant le jwt dans le header -> res.json converti la reponse en json -> data c'est le tableau d'util -> setUsers(data) = Je stock le tableau dans le state pour l'afficher -> Enfin useEffect se relance si le token a changé

    useEffect(() => {
        fetch("https://badger.arcplex.dev/api/v2/admin/user/me", {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => res.json())
        .then((data) => {
            setUsers(data);
         });
    }, [token]);



    return (
        <div>
            <h2>Utilisateurs</h2>

            <table>
                <thead>
                    <tr>
                        <th>Prénom</th>
                        <th>Nom</th>
                        <th>Email</th>
                        <th>Rôle</th>
                        <th>Actif</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user)=> (
                       <tr key={user.id}>
                        <td>{user.firstname}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.roles[0]}</td>
                        <td>{user.active ? "OUI" : "NON"}</td>
                        <td>
                            <button>Détail</button>
                            <button>Modifier</button>
                            <button>Supprimer</button>
                        </td>
                       </tr> 
                    ))}
                </tbody>
            </table>

            <button> Ajouter User</button>
        </div>
    );
}
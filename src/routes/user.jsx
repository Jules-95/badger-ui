import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function User() {

    // use selector lit le token directement depuis le store
    const token = useSelector((state) => state.auth.token);


    // Création de la variable User comme un tableau vide
    const [users, setUsers] = useState([]);

    
    // AJOUTER UN USER 

    // Afficher ou non la modale 
    const [showForm, setShowForm] = useState(false)

    // Les données du form de création
    const[newUser, setNewUser] = useState({
        name: "",
        firstname: "",
        email: "",
        ssh_user: "",
        team: "",
        role: "",
        ip_address: "127.0.0.1"
    });

    const handleChange = (e) => {
        setNewUser({...newUser, [e.target.name]: e.target.value });
    }

    const handleCreate = (e) => {
        e.preventDefault();
        fetch("https://badger.arcplex.dev/api/v2/admin/user", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser),
        })
        .then((res) => res.json())
        .then((data)=> {
            console.log(data);
            setShowForm(false);
        });
    }

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
                        <th>Nom</th>
                        <th>Email</th>
                        <th>Team</th>
                        <th>SSH User</th>
                        <th>Rôle</th>
                        <th>Actif</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user)=> (
                       <tr key={user.id}>
                        <td>{user.firstname} {user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.team.name}</td>
                        <td>{user.ssh_user}</td>
                        <td>{user.roles[0]}</td>
                        <td>{user.active ? "OUI" : "NON"}</td>
                        <td>
                            <button>Modifier</button>
                            <button>Supprimer</button>
                        </td>
                       </tr> 
                    ))}
                </tbody>
            </table>

            <button onClick={() => setShowForm(true)}>Ajouter User</button>
            {/* Formulaire d'ajout */}
            {showForm && (
                <div style={{
                        position: "fixed", top: 0, left: 0,
                        width: "100%", height: "100%",
                        backgroundColor: "rgba(0,0,0,0.5)",
                        display: "flex", justifyContent: "center", alignItems: "center"
                }}>
                    <div style={{ backgroundColor: "white", padding: "2rem", widht: "400px"}}>
                        <h3>Formulaire d'ajout d'utilisateur</h3>
                        <form onSubmit={handleCreate}>
                            <div><input name="firstname" placeholder="Prénom" onChange={handleChange} required /></div>
                            <div><input name="name" placeholder="Nom" onChange={handleChange} required /></div>
                            <div><input name="email" placeholder="email" onChange={handleChange} required /></div>
                            <div><input name="ssh_user" placeholder="User SSH" onChange={handleChange} required /></div>

                            <div>
                                <select name="role" onChange={handleChange}>
                                    <option value="">Choisir un rôle</option>
                                    <option value="ROLE_USER">User</option>
                                    <option value="ROLE_ADMIN">Admin</option>
                                </select>
                            </div>
                            <div><input name="team" type="number" placeholder="Saisir l'id de la team" onChange={handleChange} required /></div>
                            <button type="submit">Ajouter</button>
                            <button type="button" onClick={() => setShowForm(false)}>Annuler</button>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
}
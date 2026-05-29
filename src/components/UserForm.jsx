import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../styles/Form.css";

// Composant pour la création et l'édition d'un user
// Props :
// - user : null si création / Objet user existant si edition
// - onSubmit : Fonction appelé pour la soumission (handleCreate ou handleEdit)
// - onClose : Fonction pour fermer la modale

export default function UserForm({ user, onSubmit, onClose }) {

    // Sert pour appeler /client/me depuis ici en appelant le store Redux
    const token = useSelector((state) => state.auth.token);

    const [teams, setTeams] = useState([]);
    
    useEffect(() => {
        fetch("https://badger.arcplex.dev/api/v2/admin/client/me", {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => res.json())
        .then((data) => setTeams(data));
    }, []);


  const [formData, setFormData] = useState(
    user
      ? {
          ...user,
          role: user.roles[0],
          team: user.team.id, // Solution IA
        }
      : {
          name: "",
          firstname: "",
          email: "",
          ssh_user: "",
          team: "",
          role: "",
          password: "",
          ip_address: "127.0.0.1",
        },
  );

  // Met à jour le champ modifié dans formData sans toucher aux autres
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Envoie les données à User.jsx sans rechargement
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>{user ? "Modifier l'utilisateur" : "Ajouter un utilisateur"}</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              name="firstname"
              placeholder="Prénom"
              value={formData.firstname}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              name="name"
              placeholder="Nom"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              name="ssh_user"
              placeholder="SSH User"
              value={formData.ssh_user}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <select name="team" value={formData.team} onChange={handleChange}>
                <option value="">Choisir team</option>
                {teams.map((team) => (
                    <option key={team.id} value={team.id}>{team.name}</option>
                ))}
            </select>
          </div>
          <div>
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="">Choisir un rôle</option>
              <option value="ROLE_USER">User</option>
              <option value="ROLE_DEVELOPER">Développeur</option>
              <option value="ROLE_CLIENT_ADMIN">Clien Admin</option>
              <option value="ROLE_SUPER_ADMIN">Super Admin</option>
            </select>
          </div>
          {!user && (
            <div>
                <input
                    name="password"
                    type="password"
                    placeholder="Mot de passe"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </div>
          )}
          

          <button type="submit">{user ? "Modifier" : "Ajouter"}</button>
          <button type="button" onClick={onClose}>
            Annuler
          </button>
        </form>
      </div>
    </div>
  );
}

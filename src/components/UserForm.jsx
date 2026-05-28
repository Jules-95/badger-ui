import { useState } from "react";
import "../styles/Form.css";

// Composant pour la création et l'édition d'un user
// Props :
// - user : null si création / Objet user existant si edition
// - onSubmit : Fonction appelé pour la soumission (handleCreate ou handleEdit)
// - onClose : Fonction pour fermer la modale

export default function UserForm({ user, onSubmit, onClose }) {
  // role et team demande une conveersion entre api et formualire (Solution temporaire -> IA)
  // Pour team il faut utiliser /client et pas un number pour id
  const [formData, setFormData] = useState(
    user
      ? {
          ...user,
          role: user.roles[0],
          team: user.team.id,
        }
      : {
          name: "",
          firstname: "",
          email: "",
          ssh_user: "",
          team: "",
          role: "",
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
        <h3>{user ? "Modifier l'utilisateur" : "Autouter un utilisateur"}</h3>
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
            <input
              name="team"
              type="number"
              placeholder="Team Id"
              value={formData.team}
              onChange={handleChange}
              required
            />
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

          <button type="submit">{user ? "Modifier" : "Ajouter"}</button>
          <button type="button" onClick={onClose}>
            Annuler
          </button>
        </form>
      </div>
    </div>
  );
}

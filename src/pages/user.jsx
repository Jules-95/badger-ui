import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserForm from "../components/UserForm";
import usePermissions from "../hooks/usePermissions";
import Notification from "../components/Notifications";
import useNotification from "../hooks/useNotification";

export default function User() {
  // use selector lit le token directement depuis le store
  const token = useSelector((state) => state.auth.token);

  // Verification des permissions
  const { canWrite, canDelete } = usePermissions();

  // Liste des utilisateurs affichés dans le tableau
  const [users, setUsers] = useState([]);

  // Afficher ou non la modale
  const [showForm, setShowForm] = useState(false);

  // Stock l'user selectionné pour l'édition - null si aucun
  const [editUser, setEditUser] = useState(null);

  //Utilisation du hook personalisé pour les notifications
  const { notification, showMessage } = useNotification();

  // Récupération de la liste complète des users depuis l'API
  const fetchUsers = () => {
    fetch("https://badger.arcplex.dev/api/v2/admin/user/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data));
  };

  // Rappel useEffect  : S'execute au chargement -> useEffect se relance si le token a changé
  useEffect(() => {
    fetchUsers();
  }, [token]);

  // Création d'un user : Reçoit les données du form UserForm
  // Ajout direct de l'user retourné par l'API au state sans fetchUsers
  const handleCreate = (formData) => {
    const payload = {
      name: formData.name,
      firstname: formData.firstname,
      email: formData.email,
      ssh_user: formData.ssh_user,
      role: formData.role,
      team: formData.team,
      ip_address: formData.ip_address,
      plain_password: formData.password,
    };

    fetch("https://badger.arcplex.dev/api/v2/admin/user", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
    .then((res) => {
        if (!res.ok) {
            return res.json().then((err) => {
                const message = Object.values(err)[0];
                showMessage(`Erreur : ${message}`, "error");
                return null;
            });
        }
        return res.json();
    })
    .then((data) => {
        if (!data) return;
        setUsers([...users, data]);
        setShowForm(false);
        showMessage("Utilisateur créé avec succès", "success");
    });
  };

  // Modif d'un user : Reçoit les données du form UserForm
  const handleEdit = (formData) => {
    // Construction d'un objet avec les champs attendus par l'API
    // Problèmes avec role et team - Erreur 400 (Team à résoudre en utilisant /client)
    const payload = {
      name: formData.name,
      firstname: formData.firstname,
      email: formData.email,
      ssh_user: formData.ssh_user,
      role: formData.role,
      team: formData.team,
      ip_address: formData.ip_address,
    };

    fetch(`https://badger.arcplex.dev/api/v2/admin/user/${formData.id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) {
            return res.json().then((err) => {
                const message = Object.values(err)[0];
                showMessage(`Erreur : ${message}`, "error");
                return null;
            });
        }
        return res.json();

      })
      .then((data) => {
        if (!data) return;
        setUsers(users.map((u) => (u.id === data.id ? data : u)));
        setEditUser(null);
        showMessage("Utilisateur modifié avec succès", "success");
      });
  };

  const handleDelete = (userId) => {
    const confirmed = window.confirm(
      "Voulez-vous vraiment supprimer cet utilisateur ? ",
    );
    if (!confirmed) return;

    fetch(`https://badger.arcplex.dev/api/v2/admin/user/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
        if (!res.ok) {
            return res.json().then((err) => {
               const message = Object.values(err)[0]; 
               showMessage(`Erreur : ${message}`, "error");
               return null;
        });
    }
      setUsers(users.filter((u) => u.id !== userId));
      showMessage("Utilisateur supprimé avec succès", "success");
    });

  };

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
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                {user.firstname} {user.name}
              </td>
              <td>{user.email}</td>
              <td>{user.team.name}</td>
              <td>{user.ssh_user}</td>
              <td>{user.roles[0]}</td>
              <td>{user.active ? "OUI" : "NON"}</td>
              <td>
                {/* setEditUser stock l'user cliqué et ouvre la modale avec ses infos préremplies */}
                {canWrite && (
                    <button onClick={() => setEditUser(user)}>Modifier</button>
                )}
                {canDelete && (
                    <button onClick={() => handleDelete(user.id)}>Supprimer</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

       {canWrite && (
        <button onClick={() => setShowForm(true)}>Ajouter User</button>
       )}   

      {/* Modale form Ajout : user = null donc form vide*/}
      {showForm && (
        <UserForm
          user={null}
          onSubmit={handleCreate}
          onClose={() => setShowForm(false)}
        />
      )}

      {/* Modale form Edit : user = editUser donc form pré rempli*/}
      {editUser && (
        <UserForm
          user={editUser}
          onSubmit={handleEdit}
          onClose={() => setEditUser(null)}
        />
      )}

      <Notification
        message={notification?.message}
        type={notification?.type}
      />
    </div>
  );
}

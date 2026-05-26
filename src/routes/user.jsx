import { useEffect, useState } from "react";

export default function User({ token }) {

    // Création de la variable User comme un tableau vide
  const [users, setUsers] = useState([]);

    // Rappel use effect:  
    // S'exécute une fois au chargement -> Appel à l'API en passant le JWT dans le header -> res.json converti la reponse en json -> data c'est le tableau d'utilisateur -> setUser(data) = Je stock le tableau dans le state pour l'afficher -> Enfin useEffect se relance si le token a changé  
  useEffect(() => {
    fetch("https://badger.arcplex.dev/api/v2/admin/user", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUsers(data);
      });
  }, [token]);


  // J'ai users qui est le tableau d'utilisateur récupéré depuis l'api plus haut
  // map parcourt chaqude util du tableau (Comme un forEach) -> créer un <p> pour chaque util.
  // Key permet a React d'identifier chaque élément de façon unique (id comme clé primaire)
  return (
    <div>
      <h2>Utilisateurs</h2>
      {users.map((user) => (
        <p key={user.id}>{user.firstname} {user.name} — {user.email}</p>
      ))}
    </div>
  );
}
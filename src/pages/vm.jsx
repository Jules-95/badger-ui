import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Vm() {

    // use selector lit le token directement depuis le store
    const token = useSelector((state) => state.auth.token);


    // Création de la variable User comme un tableau vide
    const [vms, setVms] = useState([]);

    // Rappel useEffect  : S'execute au chargement -> Appel l'api en passant le jwt dans le header -> res.json converti la reponse en json -> data c'est le tableau d'util -> setUsers(data) = Je stock le tableau dans le state pour l'afficher -> Enfin useEffect se relance si le token a changé

    useEffect(() => {
        fetch("https://badger.arcplex.dev/api/v2/admin/vm/me", {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => res.json())
        .then((data) => {
            setVms(data);
         });
    }, [token]);



    return (

    <div>
      <h2>VM</h2>
      {vms.map((vm) => (
        <p key={vm.id}>{vm.id}</p> 
      ))}
    </div>

    );
}
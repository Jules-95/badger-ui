import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Vm() {

  const token = useSelector((state) => state.auth.token);

  // Tableau des VMs affiché dans le tableau
  const [vms, setVms] = useState([]);

  // Chargement des VMs au montage du composant
  useEffect(() => {
    fetch("https://badger.arcplex.dev/api/v2/admin/vm/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setVms(data));
  }, [token]);

  return (
    <div className="page">

      <div className="page-header">
        <h2>Machines virtuelles</h2>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>OS</th>
            <th>CPU</th>
            <th>RAM (Go)</th>
            <th>IP publique</th>
            <th>Serveur</th>
            <th>Port SSH</th>
          </tr>
        </thead>
        <tbody>
          {vms.map((vm) => (
            <tr key={vm.id}>
              <td>{vm.name}</td>
              <td>{vm.os}</td>
              <td>{vm.cpu}</td>
              <td>{vm.ram}</td>
              <td>{vm.public_ip}</td>
              {/* server est un objet imbriqué -> server.name */}
              <td>{vm.server?.name}</td>
              <td>{vm.ssh_port}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}
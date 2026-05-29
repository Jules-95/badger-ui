// pages/Server.jsx

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import usePermissions from "../hooks/usePermissions";
import Notification from "../components/Notifications";


export default function Server() {
  const token = useSelector((state) => state.auth.token);
  const { canWrite, canDelete } = usePermissions();
  const [servers, setServers] = useState([]);
 

  useEffect(() => {
    fetch("https://badger.arcplex.dev/api/v2/admin/server/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setServers(data));
  }, [token]);

  return (
    <div className="page">
      <div className="page-header">
        <h2>Servers</h2>
        {/* Bouton désactivé — CRUD à implémenter */}
        {canWrite && (
          <button className="btn-add" disabled title="Fonctionnalité à venir">
            + Ajouter
          </button>
        )}
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>IP publique / privée</th>
            <th>URL</th>
            <th>Subnet</th>
            <th>CPU</th>
            <th>RAM (Go)</th>
            <th>Stock (Mo)</th>
            <th>Hyperviseur</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {servers.map((server) => (
            <tr key={server.id}>
              <td>{server.name}</td>
              <td>{server.public_ip} / {server.private_ip}</td>
              <td>{server.public_url}</td>
              <td>{server.subnet}</td>
              <td>{server.cpu}</td>
              <td>{server.ram}</td>
              <td>{server.stock}</td>
              <td>{server.hypervisor}</td>
              <td className="table-actions">
                {/* Boutons désactivés — TODO : implémenter le CRUD */}
                {canWrite && (
                  <button className="btn-secondary" disabled title="Fonctionnalité à venir">
                    Modifier
                  </button>
                )}
                {canDelete && (
                  <button className="btn-danger" disabled title="Fonctionnalité à venir">
                    Supprimer
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}
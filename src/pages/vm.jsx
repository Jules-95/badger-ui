import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import VmForm from "../components/VmForm";
import usePermissions from "../hooks/usePermissions";
import Notification from "../components/Notifications";
import useNotification from "../hooks/useNotification";

export default function Vm() {
  const token = useSelector((state) => state.auth.token);
  const { canWrite, canDelete } = usePermissions();
  const [vms, setVms] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editVm, setEditVm] = useState(null);
  const { notification, showMessage } = useNotification();

  // Chargement des VMs au montage du composant
  useEffect(() => {
    fetch("https://badger.arcplex.dev/api/v2/admin/vm/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setVms(data));
  }, [token]);

  // Payload (Création) avec les champs attendus par l'api
  const handleCreate = (formData) => {
    const payload = {
      name: formData.name,
      os: formData.os,
      cpu: Number(formData.cpu),
      ram: Number(formData.ram),
      stock: Number(formData.stock),
      server: Number(formData.server),
      public_ip: formData.public_ip,
      private_ip: formData.private_ip,
      ssh_port: Number(formData.ssh_port),
    };

    fetch("https://badger.arcplex.dev/api/v2/admin/vm", {
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
        setVms([...vms, data]);
        setShowForm(false);
        showMessage("VM créée avec succès", "success");
      });
  };

  // Payload (Edition)
  const handleEdit = (formData) => {
    const payload = {
      name: formData.name,
      os: formData.os,
      cpu: Number(formData.cpu),
      ram: Number(formData.ram),
      stock: Number(formData.stock),
      server: Number(formData.server),
      public_ip: formData.public_ip,
      private_ip: formData.private_ip,
      ssh_port: Number(formData.ssh_port),
    };

    fetch(`https://badger.arcplex.dev/api/v2/admin/vm/${editVm.id}`, {
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
        setVms(vms.map((v) => (v.id === data.id ? data : v)));
        setEditVm(null);
        showMessage("VM modifiée avec succès", "success");
      });
  };

  const handleDelete = (vmId) => {
    const confirmed = window.confirm(
      "Voulez-vous vraiment supprimer cette VM ?",
    );
    if (!confirmed) return;

    fetch(`https://badger.arcplex.dev/api/v2/admin/vm/${vmId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      if (!res.ok) {
        return res.json().then((err) => {
          const message = Object.values(err)[0];
          showMessage(`Erreur : ${message}`, "error");
          return null;
        });
      }
      setVms(vms.filter((v) => v.id !== vmId));
      showMessage("VM supprimée avec succès", "success");
    });
  };

  return (
    <div className="page">
      <div className="page-header">
        <h2>Machines virtuelles</h2>
        {canWrite && (
          <button className="btn-add" onClick={() => setShowForm(true)}>
            + Ajouter
          </button>
        )}
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
            <th>Actions</th>
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
              <td className="table-actions">
                {canWrite && (
                  <button
                    className="btn-secondary"
                    onClick={() => setEditVm(vm)}
                  >
                    Modifier
                  </button>
                )}
                {canDelete && (
                  <button
                    className="btn-danger"
                    onClick={() => handleDelete(vm.id)}
                  >
                    Supprimer
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <VmForm
          vm={null}
          onSubmit={handleCreate}
          onClose={() => setShowForm(false)}
        />
      )}
      {editVm && (
        <VmForm
          vm={editVm}
          onSubmit={handleEdit}
          onClose={() => setEditVm(null)}
        />
      )}

      <Notification message={notification?.message} type={notification?.type} />
    </div>
  );
}

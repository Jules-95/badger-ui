import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "../styles/Form.css";

export default function VmForm({ vm, onSubmit, onClose }) {
  const token = useSelector((state) => state.auth.token);

  // Liste des serveurs pour le <select>
  const [servers, setServers] = useState([]);

  // Chargement des serveurs au montage du composant
  useEffect(() => {
    fetch("https://badger.arcplex.dev/api/v2/admin/server", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setServers(data));
  }, []);

  const [formData, setFormData] = useState(
    vm
      ? {
          name: vm.name,
          os: vm.os,
          cpu: vm.cpu,
          ram: vm.ram,
          stock: vm.stock,
          public_ip: vm.public_ip,
          private_ip: vm.private_ip,
          ssh_port: vm.ssh_port,
          server: vm.server?.id,
        }
      : {
          name: "",
          os: "",
          cpu: "",
          ram: "",
          stock: "",
          public_ip: "",
          private_ip: "",
          ssh_port: "",
          server: "",
        },
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>{vm ? "Modifier la VM" : "Ajouter une VM"}</h3>
        <form onSubmit={handleSubmit}>
          <div className="modal-form-grid">
            <div>
              <label>Nom*</label>
              <input
                name="name"
                placeholder="ex : pfSense"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>OS*</label>
              <input
                name="os"
                placeholder="ex : Debian"
                value={formData.os}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>CPU*</label>
              <input
                name="cpu"
                type="number"
                placeholder="ex : 4"
                value={formData.cpu}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>RAM (Go)*</label>
              <input
                name="ram"
                type="number"
                placeholder="ex : 8"
                value={formData.ram}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Stock*</label>
              <input
                name="stock"
                type="number"
                placeholder="ex : 1700"
                value={formData.stock}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>IP publique</label>
              {/* Pas required */}
              <input
                name="public_ip"
                placeholder="ex : 91.199.0.43"
                value={formData.public_ip}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>IP privée*</label>
              <input
                name="private_ip"
                placeholder="ex : 172.20.0.10"
                value={formData.private_ip}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Port SSH*</label>
              <input
                name="ssh_port"
                type="number"
                placeholder="ex : 22"
                value={formData.ssh_port}
                onChange={handleChange}
                required
              />
            </div>

            </div>

            <label>Serveur*</label>
            <select
              name="server"
              value={formData.server}
              onChange={handleChange}
              required
            >
              <option value="">Choisir un serveur</option>
              {servers.map((server) => (
                <option key={server.id} value={server.id}>
                  {server.name}
                </option>
              ))}
            </select>

          <div className="modal-actions">
            <button type="submit" className="btn-primary">
              {vm ? "Modifier" : "Ajouter"}
            </button>
            <button type="button" className="btn-secondary" onClick={onClose}>
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

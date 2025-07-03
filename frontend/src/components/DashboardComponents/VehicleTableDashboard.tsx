'use client'
import React, { useEffect, useState } from 'react';
import api from '../../services/api'; 
import VehicleModal from '../Modals/VehicleModal';

type Vehicle = {
  id: string;
  name: string;
  plate: string;
  status: string;
};

const VehicleTableDashboard = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  // Pega a lista de veículos no backend
  const fetchVehicles = async () => {
    try {
      const response = await api.get('/vehicles');
      setVehicles(response.data);
    } catch (error) {
      console.error('Erro ao buscar veículos:', error);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  return (
    <section>
      <button onClick={() => setModalOpen(true)}>Cadastrar Veículo</button>

      <table>
        <thead>
          <tr>
            <th>Veículo</th>
            <th>Placa</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((v) => (
            <tr key={v.id}>
              <td>{v.name}</td>
              <td>{v.plate}</td>
              <td>{v.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalOpen && (
        <VehicleModal
          onClose={() => setModalOpen(false)}
          onVehicleCreated={fetchVehicles}
        />
      )}
    </section>
  );
};

export default VehicleTableDashboard;

'use client'
import React, { useEffect, useState } from 'react';
import api from '../../services/api'; 
import VehicleModal from '../Modals/VehicleModal';

type Vehicle = {
  id: string;
  model: string;
  plate: string;
  status: string;
};
type Props = {
  vehicles: Vehicle[];
  fetchVehicles: () => void;
};

const VehicleTableDashboard = ({ vehicles, fetchVehicles }: Props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

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
              <td>{v.model}</td>
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

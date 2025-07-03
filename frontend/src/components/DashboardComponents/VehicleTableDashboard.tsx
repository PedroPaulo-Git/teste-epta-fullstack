'use client'
import React, { useEffect, useState } from 'react';
import api from '../../services/api'; 
import VehicleModal from '../Modals/VehicleModal';
import { CirclePlus } from 'lucide-react'; //adição de react lucide por conta do nome do icon ser lucide circle no figma

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
    <section className='mt-10'>
      <button 
      onClick={() => setModalOpen(true)}
      className='bg-blueButton-100 text-white flex text-center gap-2 p-2 
      rounded-full hover:bg-blueButton-200 cursor-pointer hover:scale-98 transition'><CirclePlus/>Cadastrar Veículo</button>

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

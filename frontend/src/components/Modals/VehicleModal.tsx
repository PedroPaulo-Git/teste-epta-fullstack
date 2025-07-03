import React, { useState } from 'react';
import api from '../../services/api';

type Props = {
  onClose: () => void;
  onVehicleCreated: () => void;
};

const VehicleModal: React.FC<Props> = ({ onClose, onVehicleCreated }) => {
  const [model, setModel] = useState('');
  const [plate, setPlate] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/vehicles', { model, plate });
      onVehicleCreated();
      onClose();
    } catch (error) {
      console.error('Erro ao cadastrar veículo:', error);
    }
  };

  return (
    <div className="modal-background">
      <div className="modal-content">
        <h2>Cadastrar Veículo</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Modelo"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Placa"
            value={plate}
            onChange={(e) => setPlate(e.target.value)}
            required
          />
          <button type="submit">Salvar</button>
          <button type="button" onClick={onClose}>Cancelar</button>
        </form>
      </div>
    </div>
  );
};

export default VehicleModal;

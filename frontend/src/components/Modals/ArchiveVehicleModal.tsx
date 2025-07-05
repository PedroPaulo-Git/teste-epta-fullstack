import React, { useState } from "react";
import api from "../../services/api";
import { Vehicle } from "../../types";
import { Archive, X } from "lucide-react";
import NotificationToast from "../ui/NotificationToast";
import { useNotificationToast } from "../../hooks/useNotificationToast";

type Props = {
  vehicle: Vehicle;
  onClose: () => void;
  onVehicleArchived: () => void;
};

const ArchiveVehicleModal: React.FC<Props> = ({
  vehicle,
  onClose,
  onVehicleArchived,
}) => {
  const [loading, setLoading] = useState(false);
  const { toast, showSuccess, showError, hideToast } = useNotificationToast();

  const handleArchive = async () => {
    setLoading(true);
    try {
      await api.patch(`/api/vehicles/${vehicle.id}/archive`);
      onVehicleArchived();
      showSuccess("Veículo arquivado com sucesso!");
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err) {
      showError("Erro ao arquivar veículo. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed poppins-regular inset-0 bg-black/50 flex items-center justify-center z-50">
      <NotificationToast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />

      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md mx-auto relative">
        <button
          className="absolute cursor-pointer top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
          onClick={onClose}
        >
          <X size={16} />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="bg-yellow-100 p-3 rounded-full">
              <Archive size={40} className="text-yellow-600" />
            </div>
          </div>

          <h2 className="font-extrabold text-xl text-center mb-2">
            Arquivar Veículo
          </h2>

          <p className="text-grayDefault-600 mb-6">
            Tem certeza que deseja arquivar o veículo{" "}
            <span className="font-semibold text-grayDefault-800">
              "{vehicle.model}"
            </span>
            ? O veículo ficará inativo.
          </p>

          <div className="flex gap-3 w-full">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 p-3 rounded-xl font-semibold text-grayDefault-600 border-2 border-grayInputBorder-100 hover:bg-gray-50 transition"
            >
              Cancelar
            </button>

            <button
              type="button"
              onClick={handleArchive}
              disabled={loading}
              className="flex-1 p-3 rounded-xl font-semibold text-white transition shadow-[0_4px_15px_rgba(245,158,11,0.25)] bg-yellow-500 hover:bg-yellow-600 hover:scale-98 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Arquivando..." : "Arquivar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchiveVehicleModal;

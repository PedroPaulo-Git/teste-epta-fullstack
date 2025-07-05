import React, { useState } from "react";
import api from "../../services/api";
import { Trash2, X, AlertTriangle } from "lucide-react";
import { Toast } from "../ui/Toast";
import { ToastState } from "../../types";

type Props = {
  onClose: () => void;
  onVehicleDeleted: () => void;
  vehicleId: string;
  vehicleName: string;
};

const DeleteVehicleModal: React.FC<Props> = ({ 
  onClose, 
  onVehicleDeleted, 
  vehicleId, 
  vehicleName 
}) => {
  const [toast, setToast] = useState<ToastState>(null);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await api.delete(`/api/vehicles/${vehicleId}`);
      onVehicleDeleted();
      setToast({ type: "success", message: "Veículo deletado com sucesso!" });
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err) {
      setToast({
        type: "error",
        message: "Erro ao deletar veículo. Tente novamente.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed poppins-regular inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md mx-auto relative">
        <button
          className="absolute cursor-pointer top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
          onClick={onClose}
        >
          <X size={16} />
        </button>
        
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="bg-red-100 p-3 rounded-full">
              <Trash2 size={40} className="text-red-600" />
            </div>
          </div>
          
          <h2 className="font-extrabold text-xl text-center mb-2">
            Deletar Veículo
          </h2>
          
          <div className="flex items-center gap-2 mb-6 text-yellow-600">
            <AlertTriangle size={20} />
            <p className="text-sm font-medium">Ação irreversível</p>
          </div>
          
          <p className="text-grayDefault-600 mb-6">
            Tem certeza que deseja deletar o veículo{" "}
            <span className="font-semibold text-grayDefault-800">
              "{vehicleName}"
            </span>
            ? Esta ação não pode ser desfeita.
          </p>
          
          <div className="flex gap-3 w-full">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 p-3 rounded-xl cursor-pointer  font-semibold text-grayDefault-600 border-2 border-grayInputBorder-100 hover:bg-gray-50 transition"
            >
              Cancelar
            </button>
            
            <button
              type="button"
              onClick={handleDelete}
              disabled={loading}
              className="flex-1 p-3 cursor-pointer rounded-xl font-semibold text-white transition shadow-[0_4px_15px_rgba(220,38,38,0.25)] bg-red-600 hover:bg-red-700 hover:scale-98 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Deletando..." : "Deletar"}
            </button>
          </div>
        </div>
      </div>
      
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default DeleteVehicleModal; 
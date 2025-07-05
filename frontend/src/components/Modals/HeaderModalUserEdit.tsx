import React, { useState, useEffect } from "react";
import api from "../../services/api";
import { User, X, Loader2 } from "lucide-react";
import NotificationToast from "../ui/NotificationToast";
import { useNotificationToast } from "../../hooks/useNotificationToast";

type Props = {
  onClose: () => void;
  onUserUpdated: () => void;
  currentName: string;
};

const HeaderModalUserEdit: React.FC<Props> = ({
  onClose,
  onUserUpdated,
  currentName,
}) => {
  const { toast, showSuccess, showError, hideToast } = useNotificationToast();
  const [newName, setNewName] = useState(currentName);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setNewName(currentName);
  }, [currentName]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) {
      showError("Nome não pode estar vazio");
      return;
    }

    if (newName.trim() === currentName) {
      showError("Nome deve ser diferente do atual");
      return;
    }

    setLoading(true);
    try {
      await api.put("/auth/profile", { name: newName.trim() });

      onUserUpdated();
      showSuccess("Perfil atualizado com sucesso!");
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (error: any) {
      showError("Erro ao atualizar nome. Tente novamente.");
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
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
          onClick={onClose}
        >
          <X size={16} />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="bg-blue-100 p-3 rounded-full mb-4">
            <User size={40} className="text-blue-600" />
          </div>

          <h2 className="font-extrabold text-xl text-center mb-2">
            Editar Perfil
          </h2>

          <form onSubmit={handleUpdateProfile} className="w-full mt-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 text-left mb-2">
                Nome
              </label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Digite seu nome"
                disabled={loading}
              />
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="flex-1 p-3 rounded-lg font-semibold text-gray-600 border-2 border-gray-300 hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancelar
              </button>

              <button
                type="submit"
                disabled={loading}
                className="flex-1 p-3 justify-center rounded-lg font-semibold text-white bg-blueButton-100 hover:bg-blueButton-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 size={16} className="mx-auto animate-spin" />
                ) : (
                  "Salvar"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HeaderModalUserEdit;

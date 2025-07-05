import React, { useState } from "react";
import api from "../../services/api";
import { Car, X } from "lucide-react";
import { Toast } from "../ui/Toast";
import { ToastState } from "../../types";

type Props = {
  onClose: () => void;
  onVehicleCreated: () => void;
};

const VehicleModal: React.FC<Props> = ({ onClose, onVehicleCreated }) => {
  const [toast, setToast] = useState<ToastState>(null);
  const [model, setModel] = useState("");
  const [plate, setPlate] = useState("");

  const formatPlate = (value: string) => {
    const cleaned = value
      .replace(/[^a-zA-Z0-9]/g, "")
      .toUpperCase()
      .slice(0, 7);
    let formatted = "";

    for (let i = 0; i < cleaned.length; i++) {
      if (i === 3) formatted += "-";
      formatted += cleaned[i];
    }

    return formatted;
  };

  const handlePlateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPlate(e.target.value);
    setPlate(formatted);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/api/vehicles", { model, plate });
      onVehicleCreated();
      setToast({ type: "success", message: "Veículo cadastrado com sucesso!" });
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err) {
     console.log(err) 
      const error = err as any;
  const errorMsg = error?.response?.data?.message?.toLowerCase();
  const isPlateError =
    errorMsg?.includes("placa") || plate.length < 8;

  if (isPlateError) {
    setToast({
      type: "error",
      message: "Placa inválida. Verifique o formato: ABC-1D23.",
    });
  } else {
    setToast({
      type: "error",
      message: "Erro ao cadastrar veículo. Tente novamente.",
    });
  }
    }
  };
  const isPlateValid = /^[A-Z]{3}-\d[A-Z]\d{2}$/.test(plate);
  const isModelValid = model.trim().length > 0;
  return (
    <div className="fixed poppins-regular inset-0 bg-black/50 flex items-center justify-center z-50 ">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md mx-auto relative">
        <button
          className="absolute cursor-pointer top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
          onClick={() => {
            onClose();
          }}
        >
          <X size={16} />
        </button>
        <div className="flex flex-col items-center text-center">
          <h2
            className="flex font-extrabold text-lg text-center items-center 
        justify-center gap-2 "
          >
            <Car size={50} />
            Cadastrar Novo Veículo
          </h2>
          <form
            onSubmit={handleSubmit}
            className="mt-6 gap-5 flex flex-col poppins-regular w-full"
          >
            <span className="flex flex-col text-left">
              <label className="text-grayInputText-400 font-medium" htmlFor="">
                Nome do Veículo
              </label>
              <input
                type="text"
                placeholder="Digite o nome do Veículo"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="border border-grayInputBorder-100  text-grayDefault-600 bg-gray-50 shadow-sm rounded-xl p-2 focus:outline-none transition mt-2 pl-3"
              />
            </span>
            <span className="flex flex-col text-left">
              <label className="text-grayInputText-400 font-medium" htmlFor="">
                Placa do Veículo
              </label>
              <input
                type="text"
                placeholder="Digite a Placa do Veículo"
                value={plate}
                onChange={handlePlateChange}
                className="border border-grayInputBorder-100 text-grayDefault-600 bg-gray-50 shadow-sm rounded-xl p-2 focus:outline-none transition mt-2 pl-3"
              />
            </span>
            <button
              type="submit"
              //   disabled={!isPlateValid || !isModelValid}
              className={`cursor-pointer
    w-full p-3 mt-2 rounded-xl font-semibold text-white transition shadow-[0_4px_15px_rgba(233,68,75,0.25)]
    bg-blueButton-100 hover:bg-blueButton-200 hover:scale-98
    ${!isPlateValid || !isModelValid ? "" : ""}
  `}
            >
              Criar Veiculo
            </button>
          </form>
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

export default VehicleModal;

"use client";
import React, { useEffect, useState } from "react";
import api from "../../services/api";
import VehicleModal from "../Modals/VehicleModal";
import { CirclePlus, Pencil, Archive, Trash2 } from "lucide-react"; //adição de react lucide por conta do nome do icon ser lucide circle no figma

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
    <section className="mt-10 ">
      <button
        onClick={() => setModalOpen(true)}
        className="bg-blueButton-100 text-white flex text-center gap-2 p-2 
      rounded-full hover:bg-blueButton-200 cursor-pointer hover:scale-98 transition"
      >
        <CirclePlus />
        Cadastrar Veículo
      </button>

      <table className="min-w-full divide-y border-separate border-spacing-y-4 divide-gray-200 ">
        <thead>
          <tr className="">
            <th className="px-6 border-b border-black/10 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutralDashboard-100">
              Veículo
            </th>
            <th className="px-6 border-b border-black/10 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutralDashboard-100">
              Placa
            </th>
            <th className="px-6 border-b border-black/10 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutralDashboard-100">
              Status
            </th>
             <th className="px-6 border-b border-black/10 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutralDashboard-100">
            
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-grayBackgroundTable-100 gap-4">
          {vehicles.map((vehicle, index) => (
            <tr
              key={vehicle.id}
              className={index % 2 === 0 ? "bg-white/90  " : "bg-white "}
            >
              <td className="whitespace-nowrap px-6 py-4 text-sm text-black  border-b border-black/10">
                {vehicle.model}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-black  border-b border-black/10">
                {vehicle.plate}
              </td>
              <td className="flex items-center gap-2 whitespace-nowrap px-6 py-4 text-sm text-black  border-b border-black/10">
                <span className="block w-2 h-2 bg-greenCircleVehicleActive-100 rounded-full"></span>
                {vehicle.status === "active" ? "Ativo" : "Inativo"}
              </td>

              <td className="whitespace-nowrap px-6 py-2 text-right text-sm font-medium border-b border-black/10">
                <span className="flex items-center justify-center gap-3">
                  <span className="bg-white shadow-sm w-8 h-8 flex items-center justify-center rounded-md">
                    <Pencil
                      size={18}
                      className="cursor-pointer text-black  hover:text-blue-600"
                    />
                  </span>
                  <span className="bg-white shadow-sm w-8 h-8 flex items-center justify-center rounded-md">
                    <Archive
                      size={18}
                      className="cursor-pointer text-black  hover:text-yellow-600"
                    />
                  </span>
                  <span className="bg-white shadow-sm w-8 h-8 flex items-center justify-center rounded-md">
                    <Trash2
                      size={18}
                      className="cursor-pointer text-red-500  hover:text-red-800"
                    />
                  </span>
                </span>
              </td>
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

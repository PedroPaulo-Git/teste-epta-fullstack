"use client";
import React, { useEffect, useState } from "react";
import api from "../../services/api";
import VehicleModal from "../Modals/VehicleModal";
import DeleteVehicleModal from "../Modals/DeleteVehicleModal";
import {
  CirclePlus,
  Pencil,
  Archive,
  Trash2,
  MoreVertical,
} from "lucide-react"; //adição de react lucide por conta do nome do icon ser lucide circle no figma

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
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const handleDeleteClick = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setDeleteModalOpen(true);
    setOpenDropdownId(null); // Fecha o dropdown mobile
  };

  const handleDeleteSuccess = () => {
    fetchVehicles();
    setDeleteModalOpen(false);
    setSelectedVehicle(null);
  };

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
      <div className="mt-4 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <div className=" w-full sm:min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full border-separate border-spacing-y-4  ">
                <thead>
                  <tr className="">
                    <th className="border-b pl-2 sm:pl-4  border-black/10 py-3 text-left text-sm font-medium uppercase tracking-wider text-neutralDashboard-100">
                      Veículo
                    </th>
                    <th className="border-b pl-14 px-6 sm:pr-2 border-black/10 py-3 text-left text-sm font-medium uppercase tracking-wider text-neutralDashboard-100">
                      Placa
                    </th>
                    <th className="border-b pr-2 sm:pr-11 border-black/10 py-3 text-left text-sm font-medium uppercase tracking-wider text-neutralDashboard-100">
                      Status
                    </th>
                    {/* <th className="border-b px-3 border-black/10 py-3 text-left text-sm font-medium uppercase tracking-wider text-neutralDashboard-100">
            </th> */}
                  </tr>
                </thead>
              </table>
              <div className="md:max-h-96 overflow-y-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <tbody className="bg-grayBackgroundTable-100 w-full gap-4 ">
                    {vehicles.map((vehicle, index) => (
                      <tr
                        key={vehicle.id}
                        className={
                          index % 2 === 0 ? "bg-white/90  " : "bg-white "
                        }
                      >
                        <td className="whitespace-normal px-2 sm:px-6 py-4 text-sm text-black border-b border-black/10">
                          {vehicle.model}
                        </td>
                        <td className="whitespace-nowrap pr-2 sm:px-6 py-4 text-sm text-black  border-b border-black/10">
                          {vehicle.plate}
                        </td>
                        <td className="flex justify-between whitespace-nowrap sm:px-6 py-4 text-sm text-black  border-b border-black/10">
                          <div className="flex items-center gap-2">
                            <span className="block w-2 h-2 bg-greenCircleVehicleActive-100 rounded-full"></span>
                            {vehicle.status === "active" ? "Ativo" : "Inativo"}
                          </div>

                          <span className="hidden sm:flex items-center justify-end gap-3">
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
                            <span 
                             onClick={() => handleDeleteClick(vehicle)}
                             className="bg-white shadow-sm w-8 h-8 flex items-center justify-center rounded-md">
                              <Trash2
                                size={18}
                                className="cursor-pointer text-red-500  hover:text-red-800"
                              />
                            </span>
                          </span>

                          {/* Para mobile */}
                          <div className="sm:hidden relative">
                            <button
                              onClick={() =>
                                setOpenDropdownId(
                                  openDropdownId === vehicle.id
                                    ? null
                                    : vehicle.id
                                )
                              }
                              className="w-8 h-8 flex items-center justify-center rounded-md"
                            >
                              <MoreVertical size={18} className="text-black" />
                            </button>

                            {openDropdownId === vehicle.id &&  (
                              <div className="absolute right-0 mt-2  bg-white shadow-lg rounded-md z-50 p-2 flex flex-col gap-2">
                                <button className="flex items-center gap-2 text-sm text-black hover:text-blue-600">
                                  <Pencil size={16} />
                                  Editar
                                </button>
                                <button className="flex items-center gap-2 text-sm text-black hover:text-yellow-600">
                                  <Archive size={16} />
                                  Arquivar
                                </button>
                                <button 
                                  className="flex items-center gap-2 text-sm text-red-500 hover:text-red-800"
                                  onClick={() => handleDeleteClick(vehicle)}
                                >
                                  <Trash2 size={16} />
                                  Deletar
                                </button>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {modalOpen && (
        <VehicleModal
          onClose={() => setModalOpen(false)}
          onVehicleCreated={fetchVehicles}
        />
      )}

      {deleteModalOpen && selectedVehicle && (
        <DeleteVehicleModal
          onClose={() => {
            setDeleteModalOpen(false);
            setSelectedVehicle(null);
          }}
          onVehicleDeleted={handleDeleteSuccess}
          vehicleId={selectedVehicle.id}
          vehicleName={selectedVehicle.model}
        />
      )}
    </section>
  );
};

export default VehicleTableDashboard;

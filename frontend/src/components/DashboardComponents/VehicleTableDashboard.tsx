"use client";
import React, { useEffect, useState } from "react";
import api from "../../services/api";
import VehicleModal from "../Modals/VehicleModal";
import DeleteVehicleModal from "../Modals/DeleteVehicleModal";
import EditVehicleModal from "../Modals/EditVehicleModal";
import ArchiveVehicleModal from "../Modals/ArchiveVehicleModal";
import {
  CirclePlus,
  Pencil,
  Archive,
  Trash2,
  MoreVertical,
  RotateCcw,
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

type ModalState = {
  create: boolean;
  edit: boolean;
  archive: boolean;
  delete: boolean;
  selectedVehicle: Vehicle | null;
  openDropdownId: string | null;
};

const VehicleTableDashboard = ({ vehicles, fetchVehicles }: Props) => {
  const [modalState, setModalState] = useState<ModalState>({
    create: false,
    edit: false,
    archive: false,
    delete: false,
    selectedVehicle: null,
    openDropdownId: null,
  });

  const openModal = (
    type: "create" | "edit" | "archive" | "delete",
    vehicle?: Vehicle
  ) => {
    setModalState({
      create: type === "create",
      edit: type === "edit",
      archive: type === "archive",
      delete: type === "delete",
      selectedVehicle: vehicle || null,
      openDropdownId: null,
    });
  };

  const closeModal = () => {
    setModalState({
      create: false,
      edit: false,
      archive: false,
      delete: false,
      selectedVehicle: null,
      openDropdownId: null,
    });
  };

  const handleSuccess = () => {
    fetchVehicles();
    closeModal();
  };

  const toggleDropdown = (vehicleId: string) => {
    setModalState((prev) => ({
      ...prev,
      openDropdownId: prev.openDropdownId === vehicleId ? null : vehicleId,
    }));
  };

  const handleRestore = async (vehicleId: string) => {
    try {
      await api.patch(`/api/vehicles/${vehicleId}/restore`);
      fetchVehicles();
    } catch (error) {
      console.error("Erro ao restaurar veículo:", error);
    }
  };

  return (
    <section className="mt-10 ">
      <button
        onClick={() => openModal("create")}
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
                    <th className="border-b pl-14 sm:pl-0 px-6 sm:pr-4 border-black/10 py-3 text-left text-sm font-medium uppercase tracking-wider text-neutralDashboard-100">
                      Placa
                    </th>
                    <th className="border-b pr-2 sm:pr-16 border-black/10 py-3 text-left text-sm font-medium uppercase tracking-wider text-neutralDashboard-100">
                      Status
                    </th>
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
                            <span
                              className={`block w-2 h-2 rounded-full ${
                                vehicle.status === "active"
                                  ? "bg-greenCircleVehicleActive-100"
                                  : "bg-YellowCircleVehicleInactive-100"
                              }`}
                            ></span>
                            <span className="flex items-center gap-2">
                              {vehicle.status === "active"
                                ? "Ativo"
                                : "Inativo"}
                           
                            </span>
                          </div>

                          <span className="hidden sm:flex items-center justify-end gap-3">
                            <span
                              className="bg-white shadow-sm w-8 h-8 
                            flex items-center justify-center rounded-md"
                              onClick={() => openModal("edit", vehicle)}
                            >
                              <Pencil
                                size={18}
                                className="cursor-pointer text-black  hover:text-blue-600"
                              />
                            </span>
                            {vehicle.status === "active" ? (
                              <span className="bg-white shadow-sm w-8 h-8 flex items-center justify-center rounded-md">
                                <Archive
                                  size={18}
                                  className="cursor-pointer text-black  hover:text-yellow-600"
                                  onClick={() => openModal("archive", vehicle)}
                                />
                              </span>
                            ) : (
                              <span className="bg-white shadow-sm w-8 h-8 flex items-center justify-center rounded-md">
                                <RotateCcw
                                  size={18}
                                  className="cursor-pointer text-black  hover:text-yellow-600"
                                  onClick={() => handleRestore(vehicle.id)}
                                />
                              </span>
                            )}

                            <span
                              className="bg-white shadow-sm w-8 h-8 flex items-center justify-center rounded-md"
                              onClick={() => openModal("delete", vehicle)}
                            >
                              <Trash2
                                size={18}
                                className="cursor-pointer text-red-500  hover:text-red-800"
                              />
                            </span>
                          </span>

                          {/* Para mobile */}
                          <div className="sm:hidden ">
                            <button
                              onClick={() => toggleDropdown(vehicle.id)}
                              className="w-8 h-8 flex items-center justify-center rounded-md cursor-pointer"
                            >
                              
                              <MoreVertical size={18} className="text-black" />
                            </button>

                            {modalState.openDropdownId === vehicle.id && (
                              <div className="absolute right-0 mt-2  bg-white shadow-lg rounded-md z-50 p-2 flex flex-col gap-2">
                                <div
                                  className="absolute -top-2 right-4 transform rotate-45 w-4 h-4 bg-white shadow-xl z-50"
                                  style={{ right: "calc(50% - 8px)" }}
                                ></div>
                                <button
                                  className="flex items-center cursor-pointer gap-2 text-sm text-black hover:text-blue-600"
                                  onClick={() => openModal("edit", vehicle)}
                                >
                                  <Pencil size={16} />
                                  Editar
                                </button>
                                {vehicle.status === "active" ? (
                                  <button
                                    className="flex items-center cursor-pointer gap-2 text-sm text-black hover:text-yellow-600"
                                    onClick={() => openModal("archive", vehicle)}
                                  >
                                    <Archive size={16} />
                                    Arquivar
                                  </button>
                                ):(<>
                                <button
                                    className="flex items-center cursor-pointer gap-2 text-sm text-black hover:text-yellow-600"
                                    onClick={() => handleRestore(vehicle.id)}
                                  >
                                    <RotateCcw size={16} />
                                    Restaurar
                                  </button>
                                </>)}
                                <button
                                  className="flex items-center cursor-pointer gap-2 text-sm text-black hover:text-red-600"
                                  onClick={() => openModal("delete", vehicle)}
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

      {/* Modais */}
      {modalState.create && (
        <VehicleModal onClose={closeModal} onVehicleCreated={handleSuccess} />
      )}

      {modalState.delete && modalState.selectedVehicle && (
        <DeleteVehicleModal
          onClose={closeModal}
          onVehicleDeleted={handleSuccess}
          vehicleId={modalState.selectedVehicle.id}
          vehicleName={modalState.selectedVehicle.model}
        />
      )}

      {modalState.edit && modalState.selectedVehicle && (
        <EditVehicleModal
          onClose={closeModal}
          onVehicleUpdated={handleSuccess}
          vehicle={modalState.selectedVehicle}
        />
      )}

      {modalState.archive && modalState.selectedVehicle && (
        <ArchiveVehicleModal
          onClose={closeModal}
          onVehicleArchived={handleSuccess}
          vehicle={modalState.selectedVehicle}
        />
      )}
    </section>
  );
};

export default VehicleTableDashboard;

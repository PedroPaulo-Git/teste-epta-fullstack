"use client";
import React, { useEffect, useState, useRef } from "react";
import api from "../../services/api";
import VehicleModal from "../Modals/VehicleModal";
import DeleteVehicleModal from "../Modals/DeleteVehicleModal";
import EditVehicleModal from "../Modals/EditVehicleModal";
import ArchiveVehicleModal from "../Modals/ArchiveVehicleModal";
import { SearchService } from "../../services/searchService";
import {
  CirclePlus,
  Pencil,
  Archive,
  Trash2,
  MoreVertical,
  RotateCcw,
  Filter,
  Car,
  Loader2,
  Search,
} from "lucide-react"; //adição de react lucide por conta do nome do icon ser lucide circle no figma
import { Vehicle, ModalState, FilterState } from "../../types";

type Props = {
  vehicles: Vehicle[];
  fetchVehicles: () => void;
  loading: boolean;
};

const VehicleTableDashboard = ({ vehicles, fetchVehicles, loading }: Props) => {
  const [modalState, setModalState] = useState<ModalState>({
    create: false,
    edit: false,
    archive: false,
    delete: false,
    selectedVehicle: null,
    openDropdownId: null,
  });

  const [filterState, setFilterState] = useState<FilterState>({
    sortBy: "name",
    statusFilter: "all",
    isOpen: false,
    searchTerm: "",
  });

  // detectar cliques fora do dropdown
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const filterDropdownRef = useRef<HTMLDivElement>(null);

  //fechar dropdown quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalState.openDropdownId) {
        const dropdownElement = dropdownRefs.current[modalState.openDropdownId];
        if (
          dropdownElement &&
          !dropdownElement.contains(event.target as Node)
        ) {
          setModalState((prev) => ({
            ...prev,
            openDropdownId: null,
          }));
        }
      }

      // fechar dropdown de filtro
      if (
        filterState.isOpen &&
        filterDropdownRef.current &&
        !filterDropdownRef.current.contains(event.target as Node)
      ) {
        setFilterState((prev) => ({ ...prev, isOpen: false }));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalState.openDropdownId, filterState.isOpen]);

  // function pra filtrar e ordenar veículos
  const getFilteredVehicles = () => {
    // Primeiro aplicar pesquisa
    let filtered = SearchService.searchVehicles(
      vehicles,
      filterState.searchTerm
    );

    // Depois aplicar filtro por status
    if (filterState.statusFilter !== "all") {
      filtered = filtered.filter(
        (vehicle) => vehicle.status === filterState.statusFilter
      );
    }

    // Ordenar
    filtered.sort((a, b) => {
      if (filterState.sortBy === "name") {
        return a.model.localeCompare(b.model);
      } else {
        return a.status.localeCompare(b.status);
      }
    });

    return filtered;
  };

  const filteredVehicles = getFilteredVehicles();

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
      setModalState((prev) => ({
        ...prev,
        openDropdownId: null,
      }));
    } catch (error) {
      console.error("Erro ao restaurar veículo:", error);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterState((prev) => ({ ...prev, searchTerm: e.target.value }));
  };

  return (
    <section className="mt-10 ">
      <div className=" flex flex-col sm:flex-row items-center gap-3 mb-4 ">
  
        <div className=" flex gap-3 w-full sm:w-auto">
          <button
            onClick={() => openModal("create")}
            className="w-64 bg-blueButton-100 text-white flex text-center items-center gap-2 p-2 
        rounded-full hover:bg-blueButton-200 cursor-pointer hover:scale-98 transition"
          >
            <CirclePlus />
            Cadastrar Veículo
          </button>
          <div className="relative" ref={filterDropdownRef}>
            <button
              onClick={() =>
                setFilterState((prev) => ({ ...prev, isOpen: !prev.isOpen }))
              }
              className={`p-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${
                filterState.isOpen
                  ? "bg-blueButton-100 text-white"
                  : "bg-gray-50 hover:bg-gray-100 text-gray-600"
              }`}
              title="Filtrar veículos"
            >
              <Filter size={16} />
              <span className=" text-sm font-medium">Filtrar</span>
            </button>

            {/* Filtro */}
            {filterState.isOpen && (
              <div className="absolute top-full right-0 sm:left-0 mt-2 w-56 bg-white shadow-xl rounded-md z-50 p-2 flex flex-col gap-2">
              {/* Ordenação */}
              <div className="p-3">
                <h5 className="text-xs font-medium text-gray-500 mb-2">
                  Ordenar por
                </h5>
                <div className="space-y-1">
                  <div
                    className={`flex items-center gap-3 p-2 rounded-md cursor-pointer transition-all ${
                      filterState.sortBy === "name"
                        ? "bg-blue-50 text-blueButton-100"
                        : "hover:bg-gray-50 text-gray-700"
                    }`}
                    onClick={() =>
                      setFilterState((prev) => ({ ...prev, sortBy: "name" }))
                    }
                  >
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                        filterState.sortBy === "name"
                          ? "border-blueButton-100 bg-blueButton-100"
                          : "border-gray-300"
                      }`}
                    ></div>
                    <span className="text-sm font-medium">Nome (A-Z)</span>
                  </div>

                  <div
                    className={`flex items-center gap-3 p-2 rounded-md cursor-pointer transition-all ${
                      filterState.sortBy === "status"
                        ? "bg-blue-50 text-blueButton-100"
                        : "hover:bg-gray-50 text-gray-700"
                    }`}
                    onClick={() =>
                      setFilterState((prev) => ({ ...prev, sortBy: "status" }))
                    }
                  >
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                        filterState.sortBy === "status"
                          ? "border-blueButton-100 bg-blueButton-100"
                          : "border-gray-300"
                      }`}
                    ></div>
                    <span className="text-sm font-medium">Status</span>
                  </div>
                </div>
              </div>

              {/* Filtro por Status */}
              <div className="p-3 pt-0">
                <h5 className="text-xs font-medium text-gray-500 mb-2">
                  Filtrar por status
                </h5>
                <div className="space-y-1">
                  <div
                    className={`flex items-center gap-3 p-2 rounded-md cursor-pointer transition-all ${
                      filterState.statusFilter === "all"
                        ? "bg-blue-50 text-blueButton-100"
                        : "hover:bg-gray-50 text-gray-700"
                    }`}
                    onClick={() =>
                      setFilterState((prev) => ({
                        ...prev,
                        statusFilter: "all",
                      }))
                    }
                  >
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                        filterState.statusFilter === "all"
                          ? "border-blueButton-100 bg-blueButton-100"
                          : "border-gray-300"
                      }`}
                    ></div>
                    <span className="text-sm font-medium">Todos</span>
                  </div>

                  <div
                    className={`flex items-center gap-3 p-2 rounded-md cursor-pointer transition-all ${
                      filterState.statusFilter === "active"
                        ? "bg-green-50 text-greenCircleVehicleActive-100"
                        : "hover:bg-gray-50 text-gray-700"
                    }`}
                    onClick={() =>
                      setFilterState((prev) => ({
                        ...prev,
                        statusFilter: "active",
                      }))
                    }
                  >
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                        filterState.statusFilter === "active"
                          ? "border-2 border-greenCircleVehicleActive-100 bg-greenCircleVehicleActive-100"
                          : "border-gray-300"
                      }`}
                    ></div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Ativos</span>
                    </div>
                  </div>

                  <div
                    className={`flex items-center gap-3 p-2 rounded-md cursor-pointer transition-all ${
                      filterState.statusFilter === "inactive"
                        ? "bg-yellow-50 text-YellowCircleVehicleInactive-100"
                        : "hover:bg-gray-50 text-gray-700"
                    }`}
                    onClick={() =>
                      setFilterState((prev) => ({
                        ...prev,
                        statusFilter: "inactive",
                      }))
                    }
                  >
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                        filterState.statusFilter === "inactive"
                          ? "border-YellowCircleVehicleInactive-100 bg-YellowCircleVehicleInactive-100"
                          : "border-gray-300"
                      }`}
                    ></div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Inativos</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          </div>
        </div>
      </div>
      {/* Campo de Pesquisa */}
      <div className="relative flex-1 max-w-md w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Pesquisar por nome ou placa..."
            value={filterState.searchTerm}
            onChange={handleSearchChange}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blueButton-100 focus:border-blueButton-100 sm:text-sm"
          />
        </div>
      {/* Contador de resultados */}
      {filterState.searchTerm && (
        <div className="mb-4 text-sm text-gray-600">
          {filteredVehicles.length === 1
            ? `1 veículo encontrado para "${filterState.searchTerm}"`
            : `${filteredVehicles.length} veículos encontrados para "${filterState.searchTerm}"`}
        </div>
      )}

      <div className="mt-4 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <div className=" w-full sm:min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full border-separate border-spacing-y-4  ">
                <thead>
                  <tr className="">
                    <th className="border-b sm:pl-6 border-black/10 py-3 text-left text-sm font-medium uppercase tracking-wider text-neutralDashboard-100 min-w-[75px]  md:max-w-[70px] md:min-w-[50px] xl:min-w-[300px] 2xl:min-w-[400px]">
                      Veículo
                    </th>
                    <th className="border-b pl-6 border-black/10 py-3 text-left text-sm font-medium uppercase tracking-wider text-neutralDashboard-100 md:max-w-[70px] md:min-w-[50px] xl:min-w-[300px] 2xl:min-w-[400px]">
                      Placa
                    </th>
                    <th className="border-b pl-6 border-black/10 py-3 text-left text-sm font-medium uppercase tracking-wider text-neutralDashboard-100 sm:pr-20 md:max-w-[10px] md:min-w-[120px] xl:min-w-[300px] 2xl:min-w-[400px]">
                      Status
                    </th>
                  </tr>
                </thead>
              </table>
              <div className="md:max-h-96 overflow-y-auto">
                {loading ? (
                  // Loader enquanto carrega
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className=" p-6 rounded-full mb-4">
                      <Loader2
                        size={48}
                        className="text-gray-400 animate-spin"
                      />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Carregando veículos...
                    </h3>
                    <p className="text-gray-500 max-w-sm">
                      Aguarde enquanto buscamos seus veículos.
                    </p>
                  </div>
                ) : filteredVehicles.length === 0 ? (
                  // Fallback quando não há veículos
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="bg-gray-100 p-6 rounded-full mb-4">
                      <Car size={48} className="text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {vehicles.length === 0
                        ? "Nenhum veículo cadastrado"
                        : "Nenhum veículo encontrado"}
                    </h3>
                    <p className="text-gray-500 mb-4 max-w-sm">
                      {vehicles.length === 0
                        ? "Comece cadastrando seu primeiro veículo para gerenciar sua frota."
                        : filterState.searchTerm
                        ? `Nenhum veículo encontrado para "${filterState.searchTerm}". Tente outro termo de pesquisa.`
                        : "Tente ajustar os filtros para encontrar o que procura."}
                    </p>
                    {vehicles.length === 0 && (
                      <button
                        onClick={() => openModal("create")}
                        className="bg-blueButton-100 text-white px-4 py-2 rounded-lg hover:bg-blueButton-200 transition-colors"
                      >
                        Cadastrar Primeiro Veículo
                      </button>
                    )}
                  </div>
                ) : (
                  <table className="min-w-full divide-y divide-gray-200">
                    <tbody className="bg-grayBackgroundTable-100 w-full gap-4 ">
                      {filteredVehicles.map((vehicle, index) => (
                        <tr
                          key={vehicle.id}
                          className={
                            index % 2 === 0 ? "bg-white/90  " : "bg-white "
                          }
                        >
                          <td className="whitespace-normal px-2 sm:px-6 py-4 text-sm text-black border-b border-black/10 min-w-20  ">
                            {vehicle.model}
                          </td>
                          <td className="whitespace-nowrap pr-2 sm:px-6 py-4 text-sm text-black  border-b border-black/10 ">
                            {vehicle.plate}
                          </td>
                          <td className="flex justify-between whitespace-nowrap sm:px-6 py-4 text-sm text-black  border-b border-black/10  ">
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
                                    onClick={() =>
                                      openModal("archive", vehicle)
                                    }
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
                                <MoreVertical
                                  size={18}
                                  className="text-black"
                                />
                              </button>

                              {modalState.openDropdownId === vehicle.id && (
                                <div
                                  ref={(el) => {
                                    dropdownRefs.current[vehicle.id] = el;
                                  }}
                                  className="absolute right-0 mt-2  bg-white shadow-lg rounded-md z-50 p-2 flex flex-col gap-2"
                                >
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
                                      onClick={() =>
                                        openModal("archive", vehicle)
                                      }
                                    >
                                      <Archive size={16} />
                                      Arquivar
                                    </button>
                                  ) : (
                                    <>
                                      <button
                                        className="flex items-center cursor-pointer gap-2 text-sm text-black hover:text-yellow-600"
                                        onClick={() =>
                                          handleRestore(vehicle.id)
                                        }
                                      >
                                        <RotateCcw size={16} />
                                        Restaurar
                                      </button>
                                    </>
                                  )}
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
                )}
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
          vehicle={modalState.selectedVehicle}
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

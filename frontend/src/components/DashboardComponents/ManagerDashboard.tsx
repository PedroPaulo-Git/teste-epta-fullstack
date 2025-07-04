
'use client'
import React, { useEffect, useState } from "react";
import HeaderManager from "./shared/HeaderManager";
import VehicleTableDashboard from "./VehicleTableDashboard";
import api from "@/services/api";


const ManagerDashboard = () => {
  type Vehicle = {
    id: string;
    model: string;
    plate: string;
    status: string;
  };

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);    
  const ativos = vehicles.filter((v) => v.status === "active").length;
  const inativos = vehicles.filter((v) => v.status === "inactive").length;


  // Pega a lista de veículos no backend
  const fetchVehicles = async () => {
    try {
      const response = await api.get("/api/vehicles");
      // console.log("vehicles", response);
      setVehicles(response.data);
    } catch (error) {
      console.error("Erro ao buscar veículos:", error);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);


  return (
    <section className="w-full p-8">
      <HeaderManager
        ativos={ativos}
        inativos={inativos}
        total={vehicles.length}
      />
      <VehicleTableDashboard
        vehicles={vehicles}
        fetchVehicles={fetchVehicles}
      />
    </section>
  );
};

export default ManagerDashboard;

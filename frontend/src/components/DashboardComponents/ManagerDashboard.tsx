"use client";
import React, { useEffect, useState } from "react";
import HeaderManager from "./shared/HeaderManager";
import VehicleTableDashboard from "./VehicleTableDashboard";
import api from "@/services/api";
import { Vehicle } from "@/types";

const ManagerDashboard = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const ativos = vehicles.filter((v) => v.status === "active").length;
  const inativos = vehicles.filter((v) => v.status === "inactive").length;

  // Pega a lista de veículos no backend
  const fetchVehicles = async () => {
    setLoading(true);
    try {
      const response = await api.get("/api/vehicles");
      // console.log("vehicles", response);
      setVehicles(response.data);
    } catch (error) {
      console.error("Erro ao buscar veículos:", error);
    } finally {
      setLoading(false);
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
        loading={loading}
      />
    </section>
  );
};

export default ManagerDashboard;

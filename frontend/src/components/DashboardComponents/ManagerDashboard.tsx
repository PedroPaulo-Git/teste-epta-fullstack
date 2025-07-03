import React from "react";
import Image from "next/image";
import HeaderManager from "./shared/HeaderManager";
import VehicleTableDashboard from "./VehicleTableDashboard";
const ManagerDashboard = () => {
  return (
    <section className="w-full p-8">
     <HeaderManager/>
     <VehicleTableDashboard/>
    </section>
  );
};

export default ManagerDashboard;

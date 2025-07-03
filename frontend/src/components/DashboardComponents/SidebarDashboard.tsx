import React from "react";
import Image from "next/image";
const SidebarDashboard = () => {
  return (
    <div className="lg:w-60 border-r border-neutralDashboard-800 pl-4 pt-6 h-screen">
      <Image src="/assets/Logo.png" alt="Logo" width={100} height={100} />
      <div>
        <h2 className="text-neutralDashboard-100">Navegação</h2>
        <div className="flex gap-2 flex-col">
          <span className="flex gap-2 bg-neutralDashboard-800 p-2 px-4 mr-1 rounded-full">
            <Image
              src="/assets/DashboardIcon.svg"
              alt="Logo"
              width={20}
              height={40}
            />
            <p>Dashboard</p>
          </span>
          <span className="flex gap-2 bg-neutralDashboard-800 p-2 px-4 mr-1 rounded-full">
            <Image
              src="/assets/Relatorio.svg"
              alt="Logo"
              width={20}
              height={40}
            />
            <p>Relatório</p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SidebarDashboard;

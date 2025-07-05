"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

const SidebarDashboard = () => {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Atualizar item ativo baseado na rota atual
  useEffect(() => {
    if (pathname === "/dashboard") {
      setActiveItem("Dashboard");
    } else if (pathname === "/relatorio") {
      setActiveItem("Relatório");
    }
  }, [pathname]);

  const handleItemClick = (itemName: string) => {
    setActiveItem(itemName);
    setIsSidebarOpen(false); // Fechar sidebar mobile

    // Navegar para a página correspondente
    if (itemName === "Dashboard") {
      router.push("/dashboard");
    } else if (itemName === "Relatório") {
      router.push("/relatorio");
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const getItemClasses = (itemName: string) => {
    return `flex gap-2 p-2 px-4 mr-1 rounded-full cursor-pointer ${
      activeItem === itemName
        ? "bg-neutralDashboard-800 text-blue-500"
        : "text-neutralDashboard-100 grayscale "
    }`;
  };

  return (
    <>
      <div className="lg:hidden p-4 absolute">
        <Menu
          size={24}
          onClick={toggleSidebar}
          className="text-neutralDashboard-100 cursor-pointer"
        />
      </div>

      {/* Sidebar Mobile (Overlay) */}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-56 bg-white border-r border-neutralDashboard-800 p-6 pr-2 transition-transform duration-300 ease-in-out lg:hidden ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Botão de fechar */}
        <X
          size={18}
          onClick={toggleSidebar}
          className="absolute top-4 right-4 cursor-pointer text-neutralDashboard-100"
        />

        {/* sidebar mobile */}
        <Image
          src="/assets/Logo.png"
          alt="Logo"
          width={100}
          height={100}
          className="ml-4 w-32"
        />
        <h2 className="text-neutralDashboard-100 my-4 mx-5">Navegação</h2>

        <div className="flex gap-2 flex-col">
          <span
            className={getItemClasses("Dashboard")}
            onClick={() => handleItemClick("Dashboard")}
          >
            <Image
              src="/assets/DashboardIconActive.svg"
              alt="Logo"
              width={20}
              height={40}
            />
            <p>Dashboard</p>
          </span>
          <span
            className={getItemClasses("Relatório")}
            onClick={() => handleItemClick("Relatório")}
          >
            <Image
              src="/assets/DashboardRelatorioActive.svg"
              alt="Logo"
              width={20}
              height={40}
            />
            <p>Relatório</p>
          </span>
        </div>
      </div>
      <div className="hidden lg:min-w-72 lg:block border-r border-neutralDashboard-800 pl-4 pt-6 h-screen transition-all">
        <div>
          <Image
            src="/assets/Logo.png"
            alt="Logo"
            width={100}
            height={100}
            className=" ml-4 w-32"
          />
          <h2 className="text-neutralDashboard-100 my-4 mx-5">Navegação</h2>

          <div className="flex gap-2 flex-col">
            <span
              className={getItemClasses("Dashboard")}
              onClick={() => handleItemClick("Dashboard")}
            >
              <Image
                src="/assets/DashboardIconActive.svg"
                alt="Logo"
                width={20}
                height={40}
              />
              <p>Dashboard</p>
            </span>
            <span
              className={getItemClasses("Relatório")}
              onClick={() => handleItemClick("Relatório")}
            >
              <Image
                src="/assets/DashboardRelatorioActive.svg"
                alt="Logo"
                width={20}
                height={40}
              />
              <p>Relatório</p>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarDashboard;

"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { logout } from "@/services/api";
import { useAuth } from "@/hooks/useAuth";
import HeaderModalUserEdit from "../../Modals/HeaderModalUserEdit";
import { HeaderManagerProps } from "@/types";

const HeaderManager = ({ ativos, inativos, total }: HeaderManagerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, fetchUserData, isLoading } = useAuth();

  useEffect(() => {
    // Buscar dados do usuário
    fetchUserData();
  }, [fetchUserData]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    // Fecha dropdown só se não focou em nenhum elemento filho
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsOpen(false);
    }
  };

  const handleUserUpdated = () => {
    fetchUserData();
  };

  return (
    <>
      <header
        ref={dropdownRef}
        className="flex flex-col "
        onBlur={handleBlur}
        tabIndex={0}
      >
        <button
          className="flex gap-4 ml-auto cursor-pointer"
          onClick={() => setIsOpen((prev: any) => !prev)}
        >
          <Image
            src="/assets/DashboardUser.svg"
            alt=""
            width={25}
            height={25}
          />
          <Image
            src="/assets/DashboardArrowDown.svg"
            alt=""
            width={15}
            height={15}
            className={`transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
        {isOpen && (
          <div className="absolute right-0 mt-10 w-40 bg-white shadow-lg rounded-md z-50 p-2 flex flex-col gap-1">
            <button
              onClick={() => {
                setShowProfileModal(true);
                setIsOpen(false);
              }}
              className="text-left text-sm hover:bg-gray-100 p-2 rounded-md cursor-pointer text-gray-800"
            >
              Editar Perfil
            </button>
            <button
              onClick={logout}
              className="text-left text-sm hover:bg-red-100 p-2 rounded-md cursor-pointer text-red-500"
            >
              Sair
            </button>
          </div>
        )}
        <div>
          <h1 className="text-neutralDashboard-100 text-3xl md:text-5xl md:font-normal mb-2 flex gap-2 items-center ">
            Olá{" "}
            {isLoading ? (
              <span className="inline-block w-24 h-8 lg:w-48 lg:h-12 bg-gray-300 rounded animate-pulse"></span>
            ) : (
              user?.name || "Usuário"
            )}
            ,
          </h1>
          <h2 className="text-neutralDashboard-700 sm:text-2xl md:font-normal">
            Cadastre e gerencie seus veículos
          </h2>
        </div>
        <div className="grid md:grid-cols-3  gap-10 md:w-5/6 2xl:w-2/3 mt-10">
          <span className="flex items-center shadow-md p-6 gap-4 rounded-md hover:scale-101 hover:shadow-lg transition">
            <div className="bg-graySecondary-300 w-14 h-14 flex items-center text-center justify-center rounded-full">
              <Image
                src="/assets/DashboardRelatorioActive.svg"
                alt="Logo"
                width={40}
                height={100}
              />
            </div>
            <div className="">
              <p className="text-graySecondary-600 font-normal">Total</p>
              <p className="text-darkgraySecondary-900 md:text-2xl">
                <strong>{total}</strong>
              </p>
            </div>
          </span>
          <span className="flex items-center shadow-md p-6 gap-4 rounded-md hover:scale-101 hover:shadow-lg transition">
            <div className="bg-graySecondary-300 w-14 h-14 flex items-center text-center justify-center rounded-full">
              <Image
                src="/assets/DashboardCheckMark.svg"
                alt=""
                width={40}
                height={100}
              />
            </div>

            <div className="">
              <p className="text-graySecondary-600 font-normal">Ativos</p>
              <p className="text-darkgraySecondary-900 md:text-2xl">
                <strong>{ativos}</strong>
              </p>
            </div>
          </span>
          <span className="flex items-center shadow-md p-6 gap-4 rounded-md hover:scale-101 hover:shadow-lg transition">
            <div className="bg-graySecondary-300 w-14 h-14 flex items-center text-center justify-center rounded-full">
              <Image
                src="/assets/DashboardUserYellow.svg"
                alt=""
                width={40}
                height={100}
              />
            </div>

            <div className="">
              <p className="text-graySecondary-600 font-normal">inativos</p>
              <p className="text-darkgraySecondary-900 md:text-2xl">
                <strong>{inativos}</strong>
              </p>
            </div>
          </span>
        </div>
      </header>

      {/* Modal de Edição de Perfil */}
      {showProfileModal && (
        <HeaderModalUserEdit
          onClose={() => setShowProfileModal(false)}
          onUserUpdated={handleUserUpdated}
          currentName={user?.name || ""}
        />
      )}
    </>
  );
};

export default HeaderManager;

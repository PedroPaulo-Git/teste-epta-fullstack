import React from "react";
import Image from "next/image";

type HeaderManagerProps = {
  ativos: number;
  inativos: number;
  total: number;
};

const HeaderManager = ({ ativos, inativos, total }: HeaderManagerProps) => {
  return (
    <header className="flex flex-col ">
      <span className="flex gap-4 ml-auto">
        <Image src="/assets/DashboardUser.svg" alt="" width={25} height={25} />
        <Image
          src="/assets/DashboardArrowDown.svg"
          alt=""
          width={15}
          height={15}
        />
      </span>
      <div>
        <h1 className="text-neutralDashboard-100 text-3xl md:text-5xl md:font-normal mb-2">
          Olá Ewerton,
        </h1>
        <h2 className="text-neutralDashboard-700 sm:text-2xl md:font-normal">
          Cadastre e gerencie seus veículos
        </h2>
      </div>
      <div className="grid md:grid-cols-3  gap-10 md:w-5/6 xl:w-2/3 mt-10">
        <span className="flex items-center shadow-md p-6 gap-4 rounded-md">
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
        <span className="flex items-center shadow-md p-6 gap-4 rounded-md">
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
        <span className="flex items-center shadow-md p-6 gap-4 rounded-md">
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
  );
};

export default HeaderManager;

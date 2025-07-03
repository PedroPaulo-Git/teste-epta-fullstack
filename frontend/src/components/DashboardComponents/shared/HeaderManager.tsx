import React from "react";
import Image from "next/image";

const HeaderManager = () => {
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
        <h1 className="text-neutralDashboard-100 md:text-5xl md:font-normal mb-2">
          Olá Ewerton,
        </h1>
        <h2 className="text-neutralDashboard-700 md:text-2xl md:font-normal">
          Cadastre e gerencie seus veículos
        </h2>
      </div>
      <div className="grid md:grid-cols-3  gap-10 lg:w-2/3 mt-10">
        <span className="flex shadow-md p-4 gap-4 rounded-md">
          <div className="bg-graySecondary-300 w-12 h-12 flex items-center text-center justify-center rounded-full">
            <Image
              src="/assets/DashboardRelatorioActive.svg"
              alt="Logo"
              width={30}
              height={100}
            />
          </div>
          <div className="">
            <p>Total</p>
            <p>
              <strong>350</strong>
            </p>
          </div>
        </span>
        <span className="flex shadow-md p-4 gap-4 rounded-md">
          <div className="bg-graySecondary-300 w-12 h-12 flex items-center text-center justify-center rounded-full">
            <Image
              src="/assets/DashboardCheckMark.svg"
              alt=""
              width={30}
              height={100}
            />
          </div>

          <div className="">
            <p>Total</p>
            <p>
              <strong>350</strong>
            </p>
          </div>
        </span>
        <span className="flex shadow-md p-4 gap-4 rounded-md">
          <div className="bg-graySecondary-300 w-12 h-12 flex items-center text-center justify-center rounded-full">
            <Image
              src="/assets/DashboardUserYellow.svg"
              alt=""
              width={30}
              height={100}
            />
          </div>

          <div className="">
            <p>Total</p>
            <p>
              <strong>350</strong>
            </p>
          </div>
        </span>
      </div>
    </header>
  );
};

export default HeaderManager;

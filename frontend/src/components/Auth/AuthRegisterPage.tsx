'use client'
import Image from "next/image";
import React from 'react'

const AuthRegisterPage = () => {
     const handleSubmitForm = (e:any)=>{
    e.preventDefault()
    window.alert("função pra login")
  }
 
  return (
      <section className="bg-grayDefault-100 m-16 xl:m-36 grid grid-cols-2 rounded-4xl">
        <div className="flex flex-col text-center p-14 xl:p-28 ">
          <div>
            <Image
              width={100}
              height={100}
              alt="Logo"
              src="/assets/Logo.png"
              className="mx-auto mb-2 w-[157px] h-[44px]"
            />
            <p className="text-grayDefault-600">
              Bem-vindo de volta! Insira seus dados.
            </p>
          </div>
          <form onSubmit={handleSubmitForm} className="mt-6 gap-5 flex flex-col poppins-regular">
            <span className="flex flex-col text-left">
              <label className="text-grayInputText-400 font-medium" htmlFor="">Email</label>
              <input
                type="text"
                placeholder="Digite seu e-mail"
                className="border border-grayInputBorder-100  text-grayDefault-600 bg-gray-50 shadow-sm rounded-xl p-2 focus:outline-none transition mt-2 pl-3"
              />
            </span>
            <span className="flex flex-col text-left">
              <label className="text-grayInputText-400 font-medium" htmlFor="">Password</label>
              <input
                type="password"
                placeholder="Digite sua senha"
                className="border border-grayInputBorder-100 text-grayDefault-600 bg-gray-50 shadow-sm rounded-xl p-2 focus:outline-none transition mt-2 pl-3"
              />
            </span>
  
            <button type="submit" className="w-full bg-blueButton-100 text-white font-semibold p-3 rounded-xl mt-5 shadow-lg">
              Entrar
            </button>
            <p className="text-xs mt-28">
              Não tem uma conta?{" "}
              <a href="/register" className="text-blueButton-100 font-semibold ">
                Cadastre-se gratuitamente!
              </a>
            </p>
          </form>
        </div>
        <div className="bg-blueButton-100 rounded-r-4xl"></div>
      </section>
    );
}

export default AuthRegisterPage
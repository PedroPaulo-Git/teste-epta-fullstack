"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { checkTokenValidity } from "../services/api";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuthAndRedirect = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (token) {
          const isValid = await checkTokenValidity();
          if (isValid) {
            // Token válido, redirecionar para dashboard
            router.push('/dashboard');
            return;
          }
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthAndRedirect();
  }, [router]);

  // Mostrar loading enquanto verifica autenticação
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blueButton-100"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex md:items-center md:justify-center md:p-4 poppins-regular">
      <section
        className="bg-grayDefault-100 flex flex-col-reverse justify-end mx-auto w-full 
        md:w-auto md:grid md:grid-cols-2 rounded-4xl"
      >
        <div className="bg-blueButton-100 md:rounded-r-4xl h-4 md:h-auto block md:hidden"></div>

        <div className="sm:max-w-80 mx-auto flex flex-col my-auto text-center p-4 md:p-10 xl:px-0 xl:py-20 ">
          <div className="">
            <Image
              width={100}
              height={100}
              alt="Logo"
              src="/assets/Logo.png"
              className="mx-auto mb-2 w-[157px] h-[44px]"
            />
            <h1 className="text-2xl lg:text-3xl font-bold text-grayDefault-600 my-4">
              Bem-vindo ao nosso sistema
            </h1>
            <p className="text-grayDefault-600 mb-8 text-base lg:text-lg">
              Escolha como deseja acessar sua conta
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <Link
              href="/login"
              className="cursor-pointer
              w-full p-3 mt-5 rounded-xl font-semibold text-white transition shadow-[0_4px_15px_rgba(233,68,75,0.25)]
              bg-blueButton-100 hover:bg-blueButton-200 hover:scale-98"
            >
              Fazer Login
            </Link>

            <Link
              href="/register"
              className="cursor-pointer w-full p-2 rounded-xl font-semibold 
              text-blueButton-100 transition border-2 border-blueButton-100 
              hover:bg-blueButton-100 hover:text-white hover:scale-98 text-center"
            >
              Criar Conta
            </Link>
          </div>

          <p className="text-sm mt-8 text-grayDefault-500">
            Acesse sua conta ou crie uma nova gratuitamente
          </p>
        </div>

        <div
          className="bg-blueButton-100 rounded-b-4xl md:rounded-bl-none md:rounded-r-4xl 
         flex items-center justify-center md:min-h-[200px] lg:min-h-0"
        >
          <div className="text-center text-white p-8">
            <h2 className="text-xl lg:text-2xl font-bold mb-4">
              Sistema Completo
            </h2>
            <p className="text-base lg:text-lg opacity-90">
              Gerencie seus dados de forma segura e eficiente
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";

const AuthPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLoginSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });
      const data = response.data;
      console.log("Data:", data);
      localStorage.setItem("token", data.token);
      router.push("/dashboard");
      alert("Login realizado com sucesso!");
    } catch (err: any) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex md:items-center md:justify-center md:p-4">
    <section className="bg-grayDefault-100 flex flex-col-reverse justify-end mx-auto w-full md:w-auto md:grid md:grid-cols-2 rounded-4xl">
    <div className="bg-blueButton-100 md:rounded-r-4xl h-4 md:h-auto block md:hidden"></div>
      <div className="flex flex-col my-auto text-center p-10 md:p-16 xl:px-28 xl:py-24">
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
        <form
          onSubmit={handleLoginSubmitForm}
          className="mt-6 gap-5 flex flex-col poppins-regular"
        >
          <span className="flex flex-col text-left">
            <label className="text-grayInputText-400 font-medium" htmlFor="">
              Email
            </label>
            <input
              type="text"
              placeholder="Digite seu e-mail"
              onChange={(e) => setEmail(e.target.value)}
              className="border border-grayInputBorder-100  text-grayDefault-600 bg-gray-50 shadow-sm rounded-xl p-2 focus:outline-none transition mt-2 pl-3"
            />
          </span>
          <span className="flex flex-col text-left">
            <label className="text-grayInputText-400 font-medium" htmlFor="">
              Password
            </label>
            <input
              type="password"
              placeholder="Digite sua senha"
              onChange={(e) => setPassword(e.target.value)}
              className="border border-grayInputBorder-100 text-grayDefault-600 bg-gray-50 shadow-sm rounded-xl p-2 focus:outline-none transition mt-2 pl-3"
            />
          </span>

          <button
            type="submit"
            className="cursor-pointer
            w-full p-3 mt-5 rounded-xl font-semibold text-white transition shadow-[0_4px_15px_rgba(233,68,75,0.25)]
           bg-blueButton-100 hover:bg-blueButton-200 hover:scale-98"
          >
          
             {loading ? <Loader2 className="animate-spin mx-auto" size={20} />: "Entrar"}
          </button>
          <p className="text-xs mt-28">
            Não tem uma conta?{" "}
            <a href="/register" className="text-blueButton-100 font-semibold ">
              Cadastre-se gratuitamente!
            </a>
          </p>
        </form>
      </div>
      <div className="bg-blueButton-100 md:rounded-r-4xl h-4 md:h-auto"></div>
    </section>
    </div>
  );
};

export default AuthPage;

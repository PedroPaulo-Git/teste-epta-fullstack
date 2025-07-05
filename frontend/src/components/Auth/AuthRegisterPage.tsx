"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import api from "../../services/api";
import NotificationToast from "../ui/NotificationToast";
import { useNotificationToast } from "../../hooks/useNotificationToast";

const AuthRegisterPage = () => {
  const router = useRouter();
  const { toast, showSuccess, showError, hideToast } = useNotificationToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{[key: string]: string}>({});

  const clearErrors = () => {
    setFieldErrors({});
  };

  const handleRegisterSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    clearErrors();
    
    try {
      const response = await api.post("/auth/register", {
        name,
        email,
        password,
      });
      
      showSuccess("Registro realizado com sucesso!");
      setTimeout(() => {
        router.push("/login");
      }, 1500);
      
    } catch (err: any) {
      console.log("Erro completo:", err);
      
      // Verifica se é um erro de validação do Zod
      if (err.response?.data?.errors) {
        const errors = err.response.data.errors;
        const fieldErrorsMap: {[key: string]: string} = {};
        
        errors.forEach((error: any) => {
          fieldErrorsMap[error.field] = error.message;
        });
        
        setFieldErrors(fieldErrorsMap);
        showError("Por favor, corrija os erros nos campos");
      } else if (err.response?.data?.message) {
        // Erro geral do backend
        showError(err.response.data.message);
      } else {
        // Erro genérico
        showError("Erro no registro. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  const getFieldError = (fieldName: string) => {
    return fieldErrors[fieldName];
  };

  const getInputClassName = (fieldName: string) => {
    const baseClass = "border text-grayDefault-600 bg-gray-50 shadow-sm rounded-xl p-2 focus:outline-none transition mt-2 pl-3";
    const errorClass = "border-red-500 focus:border-red-500";
    const normalClass = "border-grayInputBorder-100 focus:border-blueButton-100";
    
    return `${baseClass} ${getFieldError(fieldName) ? errorClass : normalClass}`;
  };

  return (
    <div className="min-h-screen flex md:items-center md:justify-center md:p-4">
      {/* componente toast */}
      <NotificationToast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
        
      />
      
      <section className="bg-grayDefault-100 flex flex-col-reverse justify-end mx-auto w-full md:w-auto md:grid md:grid-cols-2 rounded-4xl">
        <div className="bg-blueButton-100 md:rounded-r-4xl h-4 md:h-auto block md:hidden"></div>
        <div className="sm:min-w-80 flex flex-col my-auto text-center p-10 md:p-16 xl:p-0 xl:mx-14 xl:py-24">
          <div>
            <Image
              width={100}
              height={100}
              alt="Logo"
              src="/assets/Logo.png"
              className="mx-auto mb-2 w-[157px] h-[44px]"
            />
            <p className="text-grayDefault-600">
              Crie sua conta! Insira seus dados.
            </p>
          </div>
          <form onSubmit={handleRegisterSubmitForm} className="mt-6 gap-5 flex flex-col poppins-regular">
            <span className="flex flex-col text-left">
              <label className="text-grayInputText-400 font-medium" htmlFor="name">Nome</label>
              <input
                type="text"
                id="name"
                placeholder="Digite seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={getInputClassName('name')}
              />
              {getFieldError('name') && (
                <span className="text-red-500 text-sm mt-1">{getFieldError('name')}</span>
              )}
            </span>
            
            <span className="flex flex-col text-left">
              <label className="text-grayInputText-400 font-medium" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={getInputClassName('email')}
              />
              {getFieldError('email') && (
                <span className="text-red-500 text-sm mt-1">{getFieldError('email')}</span>
              )}
            </span>
            
            <span className="flex flex-col text-left">
              <label className="text-grayInputText-400 font-medium" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={getInputClassName('password')}
              />
              {getFieldError('password') && (
                <span className="text-red-500 text-sm mt-1">{getFieldError('password')}</span>
              )}
            </span>

            <button 
              type="submit" 
              className="cursor-pointer w-full p-3 mt-5 rounded-xl font-semibold text-white transition shadow-[0_4px_15px_rgba(233,68,75,0.25)] bg-blueButton-100 hover:bg-blueButton-200 hover:scale-98"
            >
              {loading ? <Loader2 className="animate-spin mx-auto" size={20} /> : "Registrar-se"}
            </button>
            
            <p className="text-xs mt-10">
              Já tem uma conta?{" "}
              <a href="/login" className="text-blueButton-100 font-semibold">
                Faça login aqui!
              </a>
            </p>
          </form>
        </div>
        <div className="bg-blueButton-100 md:rounded-r-4xl h-4 md:h-auto"></div>
      </section>
    </div>
  );
};

export default AuthRegisterPage;
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { checkTokenValidity } from "./api";

//serviço para validação de token
export function useAuthGuard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validateAuth = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          router.push("/login");
          return;
        }

        //token é válido?
        const isValid = await checkTokenValidity();

        //se token nao for válido:
        if (!isValid) {
          localStorage.removeItem("token");
          router.push("/login");
          return;
        }

        setLoading(false); // autorizado, pode exibir dashboard
      } catch (error) {
        console.error("Erro na validação do token:", error);
        localStorage.removeItem("token");
        router.push("/login");
      }
    };

    validateAuth();
  }, [router]);

  return { loading };
}

import axios from "axios";

// usando url do backend direto sem .env, usar 'http://localhost:5000/' para desenvolvimento
console.log("🔧 ENV TEST:", process.env.NEXT_PUBLIC_API_URL);
const api = axios.create({
  // baseURL: API_BASE_URL || 'http://localhost:5000/',
  baseURL: 'https://teste-epta-fullstack-backend.up.railway.app/',
});

// interceptor adiciona token automaticamente
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// interceptor para tratar erros 401, caso token do localstorage ja tenha sido inválidado
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const url = error.config?.url || '';
      const isAuthRoute = url.includes('/auth/login') || url.includes('/auth/register');
      
      console.log("401 error on URL:", url, "isAuthRoute:", isAuthRoute);
      
      if (!isAuthRoute) {
        // Token inválido ou expirado apenas para rotas protegidas
        if (typeof window !== "undefined") {
          console.log("Removing token and redirecting to login");
          localStorage.removeItem("token");
          // Redirecionar para login
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

//Função que verifica se o token é válido
export const checkTokenValidity = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return false;
    }
    
    // req para verificar se o token é válido
    await api.get("/auth/verify");
    return true;
  } catch (error) {
    localStorage.removeItem("token");
    return false;
  }
};

// limpar token e redirecionar
export const logout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }
};

export default api;

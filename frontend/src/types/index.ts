export type Vehicle = {
  id: string;
  model: string;
  plate: string;
  status: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
};

export type AuthResponse = {
  token: string;
  user: User;
};

export type ToastProps = {
  type: 'success' | 'error' | 'warning';
  message: string;
  onClose: () => void;
};

export type ToastState = {
  type: "success" | "error";
  message: string;
} | null; 
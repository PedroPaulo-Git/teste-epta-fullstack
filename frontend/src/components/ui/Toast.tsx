'use client';
import React, { useEffect, useState } from 'react';
import { Check, XCircle, AlertTriangle } from 'lucide-react';

type ToastProps = {
  type: 'success' | 'error' | 'warning';
  message: string;
  onClose: () => void;
};

const iconMap = {
  success: <Check className="text-green-600" size={20} />,
  error: <XCircle className="text-red-600" size={20} />,
  warning: <AlertTriangle className="text-yellow-600" size={20} />,
};

export const Toast: React.FC<ToastProps> = ({ type, message, onClose }) => {
  useEffect(() => {
    const timeout = setTimeout(onClose, 3000);
    return () => clearTimeout(timeout);
  }, [onClose]);

  return (
    <div className="fixed top-5 left-1/2 z-50 -translate-x-1/2 rounded-lg bg-white shadow-xl border px-4 py-3 flex items-center gap-2 animate-fade-in-up">
      {iconMap[type]}
      <p className="text-sm text-black">{message}</p>
    </div>
  );
};

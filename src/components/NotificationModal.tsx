"use client";
import { X } from "lucide-react";
import React, { useEffect } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

interface NotificationModalProps {
  title: string;
  message: string;
  buttonText?: string;
  onClose: () => void;
  onConfirm: () => void;
}

const NotificationModal = ({
  title = "Alert",
  message = "This is a notification.",
  buttonText = "Confirm",
  onClose,
  onConfirm,
}: NotificationModalProps) => {
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="relative bg-bg-primary-light dark:bg-bg-primary-dark text-text-primary dark:text-text-secondary p-6 pt-16 rounded-xl shadow-2xl w-11/12 max-w-md text-center">
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-bg-primary-light dark:bg-bg-primary-dark rounded-full p-1">
          <AiOutlineCloseCircle className="text-red-500" size={64} />
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-red-500 transition-colors"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold mb-3">
          {title}
        </h2>
        <p className="text-base mb-8">{message}</p>

        <button
          onClick={onConfirm}
          className="px-5 py-2.5 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-all duration-300 ease-in-out"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default NotificationModal;

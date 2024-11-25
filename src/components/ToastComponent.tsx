import { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  type: "success" | "error" | "info" | "warning" | "default";
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    setTimeout(() => {
      onClose();
    }, 5000);
  }, [onClose]);

  const toastColors: Record<string, string> = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
    warning: "bg-yellow-500",
    default: "bg-gray-500",
  };

  return (
    <div
      className={`flex items-center justify-between w-80 p-4 mb-2 text-white rounded-md shadow-lg ${toastColors[type]}`}
    >
      <span>{message}</span>
      <button
        onClick={onClose}
        className="ml-4 text-xl font-semibold text-white hover:text-gray-200"
      >
        ×
      </button>
    </div>
  );
};

// ---------------------------------------------

interface ToastType {
  id: number;
  message: string;
  type: "success" | "error" | "info" | "warning" | "default";
}

const ToastComponent: React.FC = () => {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  const addToast = (
    message: string,
    type: "success" | "error" | "info" | "warning" | "default" = "success"
  ) => {
    const newToast = { message, type, id: Date.now() };
    setToasts((prevToast) => [...prevToast, newToast]);
  };

  const removeToast = (id: number) => {
    setToasts((prevToast) => prevToast.filter((toast) => toast.id !== id));
  };

  return (
    <div className="fixed top-0 right-0 p-4 space-y-2 z-50">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
      <div className="fixed bottom-10 left-10 space-y-2">
        <button
          onClick={() => addToast("This is a success message!", "success")}
          className="px-4 py-2 bg-green-500 text-white rounded-lg"
        >
          Show Success Toast
        </button>
        <button
          onClick={() => addToast("This is an error message!", "error")}
          className="px-4 py-2 bg-red-500 text-white rounded-lg"
        >
          Show Error Toast
        </button>
        <button
          onClick={() => addToast("This is an info message!", "info")}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Show Info Toast
        </button>
        <button
          onClick={() => addToast("This is a warning message!", "warning")}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg"
        >
          Show Warning Toast
        </button>
        <button
          onClick={() => addToast("This is a default message!", "default")}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg"
        >
          Show Default Toast
        </button>
      </div>
    </div>
  );
};

export default ToastComponent;

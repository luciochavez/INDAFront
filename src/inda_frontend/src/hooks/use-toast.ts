import { useState } from 'react';

// ✅ Esto es un custom hook, así que lo nombramos con el prefijo "use"
export function useToast() {
  const [message, setMessage] = useState<string | null>(null);

  const toast = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 3000); // Auto-hide after 3s
  };

  return {
    toast,
    message,
  };
}

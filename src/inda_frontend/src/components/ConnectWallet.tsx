import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Wallet, ChevronDown, CheckCircle, XCircle, Copy, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { AuthClient } from '@dfinity/auth-client';
import { Principal } from '@dfinity/principal';

// Tipos para la ventana Plug
declare global {
  interface Window {
    ic?: {
      plug?: {
        isConnected: () => Promise<boolean>;
        requestConnect: (options?: {
          whitelist?: string[];
          host?: string;
        }) => Promise<boolean>;
        createAgent: (options?: {
          whitelist?: string[];
          host?: string;
        }) => Promise<any>;
        getPrincipal: () => Promise<Principal>;
        disconnect: () => Promise<void>;
      };
    };
  }
}

const ConnectWallet = ({ className }: { className?: string }) => {
  const { toast } = useToast(); // ✅ CORRECTO: usamos el hook
  const [isOpen, setIsOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [principalId, setPrincipalId] = useState('');
  const [authClient, setAuthClient] = useState<AuthClient | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [walletType, setWalletType] = useState<'ii' | 'plug' | 'stoic' | null>(null);

  // Inicialización del cliente de autenticación
  useEffect(() => {
    const initAuth = async () => {
      try {
        // Inicializar AuthClient para Internet Identity
        const client = await AuthClient.create();
        setAuthClient(client);

        // Verificar si el usuario ya está autenticado
        const isAuthenticated = await client.isAuthenticated();

        if (isAuthenticated) {
          const identity = client.getIdentity();
          const principal = identity.getPrincipal();

          setIsConnected(true);
          setPrincipalId(principal.toString());
          setWalletType('ii');
        } else {
          // Verificar conexión con Plug
          await checkPlugConnection();
        }

        setIsInitializing(false);
      } catch (error) {
        console.error('Error initializing auth client:', error);
        toast("Could not initialize authentication. Please try again later."); // ✅ así debe usarse el toast
        setIsInitializing(false);
      }
    };

    initAuth();
  }, []);

  // Más funciones del componente...
  // (El resto del código lo puedes ir construyendo)
  const checkPlugConnection = async () => {
    if (window.ic?.plug) {
      const connected = await window.ic.plug.isConnected();

      if (connected) {
        const principal = await window.ic.plug.getPrincipal();
        setPrincipalId(principal.toString());
        setIsConnected(true);
        setWalletType('plug');
        toast("Connected with Plug wallet.");
      }
    }
  };

  return (
    <div className={cn("relative", className)}>
      {/* Renderizado condicional basado en el estado de conexión */}
      {/* Aquí iría el UI */}
    </div>
  );
};

export default ConnectWallet;

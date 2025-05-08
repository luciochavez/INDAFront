import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { AuthClient } from "@dfinity/auth-client";
import { Actor, ActorSubclass, HttpAgent, Identity, AnonymousIdentity } from "@dfinity/agent";
import { _SERVICE } from "../declarations/backend/backend.did";

interface WalletContextProps {
  identity: Identity;
  actor: ActorSubclass<_SERVICE> | null;
  isConnected: boolean;
  connectPlug: () => Promise<void>;
  disconnectPlug: () => Promise<void>;
  connectII: () => Promise<void>;
}

const WalletContext = createContext<WalletContextProps | undefined>(undefined);

const canisterId = import.meta.env.VITE_CANISTER_ID_BACKEND;
const host = import.meta.env.VITE_DFX_NETWORK === "ic" ? "https://icp0.io" : "http://localhost:4943";

export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [identity, setIdentity] = useState<Identity>(new AnonymousIdentity());
  const [actor, setActor] = useState<ActorSubclass<_SERVICE> | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const createActorWithIdentity = async (identity: Identity) => {
    const agent = new HttpAgent({ identity, host });
    if (import.meta.env.VITE_DFX_NETWORK === "local") {
      try {
        await agent.fetchRootKey();
      } catch (error) {
        console.warn("No se pudo obtener la root key en local:", error);
      }
    }
    const backend_idl = (await import("../declarations/backend")).idlFactory;
    const actor = Actor.createActor(backend_idl, {
      agent,
      canisterId,
    }) as ActorSubclass<_SERVICE>;
    setActor(actor);
  };

  const connectPlug = async () => {
    if (!window.ic?.plug) {
      alert("Plug Wallet no está disponible.");
      return;
    }
    const connected = await window.ic.plug.requestConnect({
      whitelist: [canisterId],
      host,
    });
    if (connected) {
      setIsConnected(true);
      const plugIdentity = window.ic.plug.agent?.getIdentity?.();
      setIdentity(plugIdentity);
      await createActorWithIdentity(plugIdentity);
      localStorage.setItem("plugConnected", "true");
    } else {
      setIsConnected(false);
      setIdentity(new AnonymousIdentity());
      setActor(null);
      localStorage.removeItem("plugConnected");
    }
  };

  const disconnectPlug = async () => {
    if (window.ic?.plug) {
      await window.ic.plug.disconnect();
    }
    setIsConnected(false);
    setIdentity(new AnonymousIdentity());
    setActor(null);
    localStorage.removeItem("plugConnected");
  };

  const connectII = async () => {
    const authClient = await AuthClient.create();
    await authClient.login({
      identityProvider: "https://identity.ic0.app/#authorize",
      onSuccess: async () => {
        const iiIdentity = authClient.getIdentity();
        setIdentity(iiIdentity);
        setIsConnected(true);
        await createActorWithIdentity(iiIdentity);
      },
    });
  };

  useEffect(() => {
    const init = async () => {
      if (window.ic?.plug) {
        const plugIsConnected = await window.ic.plug.isConnected();
        if (plugIsConnected) {
          setIsConnected(true);
          const plugIdentity = window.ic.plug.agent?.getIdentity?.();
          setIdentity(plugIdentity);
          await createActorWithIdentity(plugIdentity);
          return;
        }
      }
      // Fallback to Internet Identity
      const authClient = await AuthClient.create();
      const currentIdentity = authClient.getIdentity();
      setIdentity(currentIdentity);
      setIsConnected(!currentIdentity.getPrincipal().isAnonymous());
      await createActorWithIdentity(currentIdentity);
    };
    init();
  }, []);

  return (
    <WalletContext.Provider
      value={{
        identity,
        actor,
        isConnected,
        connectPlug,
        disconnectPlug,
        connectII,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = (): WalletContextProps => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};

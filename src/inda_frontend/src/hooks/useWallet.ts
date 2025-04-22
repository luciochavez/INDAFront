import { useState } from "react";
import { AuthClient } from "@dfinity/auth-client";
import { Actor, HttpAgent } from "@dfinity/agent";

// 👇 Importa el IDL y el canisterId de tus bindings
import { idlFactory as backend_idl } from "@/declarations/backend";
// import { canisterId as backend_id } from "@/declarations/backend";

const backend_id = import.meta.env.VITE_CANISTER_ID_BACKEND;
export function useWallet() {
  const [principal, setPrincipal] = useState<string | null>(null);
  const [actor, setActor] = useState<any>(null);
  const [isPlug, setIsPlug] = useState<boolean>(false);

  const isPlugAvailable = (): boolean => {
    return typeof window !== "undefined" &&
      typeof window.ic !== "undefined" &&
      typeof window.ic.plug !== "undefined";
  };

  const connect = async () => {
    if (isPlugAvailable()) {
      setIsPlug(true);

      const connected = await window.ic.plug.requestConnect({
        whitelist: [backend_id],
        // host: "https://mainnet.dfinity.network",
        host: "http://localhost:4943",
      });

      if (connected) {
        const plugPrincipal = await window.ic.plug.getPrincipal();
        setPrincipal(plugPrincipal.toText());

        const plugActor = await window.ic.plug.createActor({
          canisterId: backend_id,
          interfaceFactory: backend_idl,
        });

        setActor(plugActor);
        return;
      }

      console.warn("Plug no se pudo conectar.");
    } else {
      // Usar Internet Identity
      const authClient = await AuthClient.create();
      await authClient.login({
        identityProvider: "https://identity.ic0.app/#authorize",
        onSuccess: async () => {
          const identity = authClient.getIdentity();
          const iiPrincipal = identity.getPrincipal();
          setPrincipal(iiPrincipal.toText());

          const agent = new HttpAgent({ identity });
          const iiActor = Actor.createActor(backend_idl, {
            agent,
            canisterId: backend_id,
          });

          setActor(iiActor);
        },
      });
    }
  };

  return {
    connect,
    principal,
    actor,
    isPlug,
  };
}

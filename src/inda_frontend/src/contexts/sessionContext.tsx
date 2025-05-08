import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { HttpAgent, Identity, AnonymousIdentity, ActorSubclass } from '@dfinity/agent';
import { User, Partnership, UserBrand, UserCreator, _SERVICE } from '../declarations/backend/backend.did';
import { createActor } from "../declarations/backend";
import { AuthClient } from '@dfinity/auth-client';
import ModalProviderSelect from '../components/auth/ModalProviderSelect';

const canisterId = import.meta.env.VITE_CANISTER_ID_BACKEND as string
const host = import.meta.env.VITE_DFX_NETWORK === "local" ? "http://localhost:4943/?canisterId=rdmx6-jaaaa-aaaaa-aaadq-cai" : "https://identity.ic0.app";

type SessionContextType = {
  user: User| Partnership| UserBrand| UserCreator | null;
  identity: Identity;
  isAuthenticated: boolean;
  backend: ActorSubclass<_SERVICE>;
  login: () => void;
  logout: () => Promise<void>;
  updateUser: (user: User) => void;
};

const defaultSessionContext: SessionContextType = {
  user: null,
  identity: new AnonymousIdentity(),
  isAuthenticated: false,
  backend: createActor(canisterId, {
    agentOptions: { identity: new AnonymousIdentity(), host }
  }),
  login: () => { },
  logout: async () => { },
  updateUser: () => { },
};

const SessionContext = createContext<SessionContextType>(defaultSessionContext);

type SessionProviderProps = {
  children: ReactNode;
};

export const SessionProvider = ({ children }: SessionProviderProps) => {
  const [user, setUser] = useState<User | Partnership | UserBrand | UserCreator | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authClient, setAuthClient] = useState<AuthClient | null>(null);
  const [identity, setIdentity] = useState<Identity>(new AnonymousIdentity());
  const [backend, setBackend] = useState<ActorSubclass<_SERVICE>>(
    createActor(canisterId, {
      agentOptions: { identity: new AnonymousIdentity(), host }
    })
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    AuthClient.create().then(setAuthClient);
    init();
  }, []);

  useEffect(() => {
    const setupAgent = async () => {
      const agent = await HttpAgent.create({
        identity,
        host,
      });
      setBackend(createActor(canisterId, { agent }));

    };
    setupAgent();
  }, [identity]);

  useEffect(() => {
    const getUser = async () => {
      const dataUser = await backend.signIn();
      if ("Ok" in dataUser) {
        if ('user' in dataUser.Ok) {
          setUser(dataUser.Ok.user);
        } else if ('brand' in dataUser.Ok) {
          setUser(dataUser.Ok.brand);
        } else if ('partnership' in dataUser.Ok) {
          setUser(dataUser.Ok.partnership);
        } else if ('creator' in dataUser.Ok) {
          setUser(dataUser.Ok.creator);
        }
      } else {
        setUser(null)
      }
    };
    getUser()
  }, [isAuthenticated, backend]);

  async function init() {
    // const authClient = await AuthClient.create();
    const identity = authClient.getIdentity();
    setIdentity(identity);

    if (!identity.getPrincipal().isAnonymous()) {
      setIsAuthenticated(true);
    }
  }

  const updateUser = (user: User) => {

    setUser(user);
  }

  const handleLoginClick = () => {
    setIsModalOpen(true);
  };

  const login = async (providerUrl: string) => {
    // const authClient = await AuthClient.create();
    await authClient.login({
      identityProvider: providerUrl,
      onSuccess: () => {
        const identity = authClient.getIdentity();
        setIdentity(identity);
        setIsAuthenticated(true);
      },
      onError: (err) => console.error("Error al iniciar sesión:", err),
    });
  };

  const handleProviderSelection = async (providerUrl: string) => {
    setIsModalOpen(false);      // Cierra el modal
    await login(providerUrl);   // Llama a `login` con el proveedor seleccionado
  };

  const logout = async () => {
    setUser(null);
    // const authClient = await AuthClient.create();
    await authClient.logout();
    setIdentity(new AnonymousIdentity());
    setIsAuthenticated(false);
    setBackend(
      createActor(canisterId, {
        agentOptions: { identity: new AnonymousIdentity(), host }
      })
    );
  };

  return (
    <SessionContext.Provider value={{ user, identity, backend, isAuthenticated, updateUser, login: handleLoginClick, logout }}>
      {children}
      <ModalProviderSelect
        internetIdentityUrl={host}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectProvider={handleProviderSelection}
      />
    </SessionContext.Provider>
  );
};

export const useSession = (): SessionContextType => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};
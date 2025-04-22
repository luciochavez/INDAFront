import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
import Button from './Button';
import { createActor } from "../declarations/backend";
import { _SERVICE } from "../declarations/backend/backend.did";
import { AuthClient } from "@dfinity/auth-client";
import { Actor, ActorSubclass, HttpAgent, AnonymousIdentity, Identity } from "@dfinity/agent";
import ModalProviderSelect from './ModalProviderSelect';
// import { connect } from 'http2';
// import { get } from 'http';

/*
declare global {
  interface Window {
    ic?: {
      plug?: {
        requestConnect: (options: { whitelist: string[], host: string }) => Promise<boolean>;
        getPrincipal: () => Promise<any>;
        agent?: {
          getIdentity?: () => any;
        };
        createActor: (options: {
          canisterId: string;
          interfaceFactory: any;
        }) => Promise<any>;
      };
    };
  }
}
  */

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [identity, setIdentity] = useState<Identity>(new AnonymousIdentity());
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [textButton, setTextButton] = useState("Connect Wallet");
  const [isConnected, setIsConnected] = useState(false);
  const [dataUser, setDataUser] = useState(null);
  const [showModalRegister, setShowModalRegister] = useState(false);

  const host = import.meta.env.VITE_DFX_NETWORK === "ic" ? "https://icp0.io" : "http://localhost:4943";
  const canisterId = import.meta.env.VITE_CANISTER_ID_BACKEND;

  const [backend, setBackend] = useState<ActorSubclass<_SERVICE>>(
    createActor(canisterId, {
      agentOptions: { identity: new AnonymousIdentity(), host }
    })
  );

  const links = [
    { name: 'Candid UI', href: 'https://a4gq6-oaaaa-aaaab-qaa4q-cai.raw.icp0.io/?id=st35g-iaaaa-aaaal-ascpq-cai' },
    { name: 'Features', href: '#features' },
    { name: 'Token', href: '#token' },
    { name: 'Roadmap', href: '#roadmap' },
    { name: 'Community', href: '#community' }
  ];

  useEffect(() => {
    const setupAgent = async () => {
      const agent = new HttpAgent({
        identity,
        host,
      });
      setBackend(createActor(canisterId, { agentOptions: { identity, host } }));
      console.log("whoAmI from useEffect()", await backend.whoAmI());
    };
    setupAgent();
  }, [identity, canisterId, host]);


  const logout = async () => {
    const authClient = await AuthClient.create();
    await authClient.logout();
    setIdentity(new AnonymousIdentity());
    setIsAuthenticated(false);
    setBackend(
      createActor(canisterId, {
        agentOptions: { identity: new AnonymousIdentity(), host }
      })
    );
  };

  const loginWithII = async (providerUrl: string) => {
    const authClient = await AuthClient.create();
    await authClient.login({
      identityProvider: providerUrl,
      onSuccess: async () => {
        setIdentity(authClient.getIdentity());
        console.log(identity.getPrincipal().toText())
        // setBackend(createActor(canisterId, {
        //   agentOptions: { identity, host }
        // }))
        setIsAuthenticated(true);
        setTextButton("Desconectar");
      },
      onError: (err) => console.error("Error al iniciar sesión:", err),
    });
  };

  const connectWithPlug = async () => {
    if (!window.ic?.plug) {
      alert("Plug Wallet no está disponible.");
      return;
    }

    const connected = await window.ic.plug.requestConnect({
      whitelist: [canisterId],
      host,
    });

    if (connected) {
      localStorage.setItem("plugConnected", "true");
      setIsConnected(true);
      const plugPrincipal = await window.ic.plug.getPrincipal();
      console.log(plugPrincipal.toText())
      const plugIdentity = window.ic.plug.agent?.getIdentity?.();
      setIdentity(plugIdentity);

      setBackend(createActor(canisterId, {
        agentOptions: { identity: plugIdentity, host }
      }))
      

      setIsAuthenticated(true);

      setTextButton("Desconectar");
      console.log("WhoAmI", await backend.whoAmI())

    } else {
      console.warn("No se pudo conectar con Plug.");
      setTextButton("Connectar la Wallet");
      localStorage.removeItem("plugConnected");
    }
  };

  const checkDataUser = async () => {
    console.log("Verificando usuario")
    const user = await backend.signIn()
    const amI = await backend.whoAmI()
    console.log(user, amI)
    if ("Ok" in user) {
      setDataUser(user.Ok)
      console.log("User ________\n", user.Ok, "\nUser ________")
    } else {
      setShowModalRegister(true);
      setDataUser(null)
    }

  }

  const handleSubmit = async () => {
    const input_mr_nombre = document.getElementById("mr_nombre") as HTMLInputElement;
    const input_mr_apellido = document.getElementById("mr_apellido") as HTMLInputElement;
    const input_mr_correo = document.getElementById("mr_correo") as HTMLInputElement;
    const val_mr_nombre = input_mr_nombre.value;
    const val_mr_apellido = input_mr_apellido.value;
    const val_mr_correo = input_mr_correo.value;
    console.log("si llega");
    console.log(val_mr_nombre);
    console.log(val_mr_apellido);
    console.log(val_mr_correo);
    console.log(backend);
    const response = await backend.signUp({ name: val_mr_nombre, lastName: val_mr_apellido, email: val_mr_correo });
    if ("Ok" in response) {
      setShowModalRegister(false);
    }
    console.log(response);
    console.log("si llega 2");
  };

  const handleProviderSelection = async (provider: string) => {
    setIsModalOpen(false);
    console.log(provider);
    console.log("Identitdad antes de la conexion: ", identity.getPrincipal().toText())
    if (provider === "plug") {
      await connectWithPlug();
    } else {
      await loginWithII(provider);
    }
    console.log("Identitdad luego de la conexion: ", identity.getPrincipal().toText())
  };

  const handleConnect = async () => {
    if (isAuthenticated) {
      logout()
      await window.ic.plug?.disconnect();
      setTextButton("Conectar Wallet");
      setIsConnected(false);
      setIsAuthenticated(false)
      localStorage.removeItem("plugConnected");
      setIsModalOpen(false);
    } else {
      setIsModalOpen(true);
    }
  };

  useEffect(() => {
    const init = async () => {
      console.log("init")
      if (await window.ic?.plug.isConnected()) {
        console.log("Conectado con Plug wallet")
        setIsConnected(true);
        setTextButton("Desconectar");

        const plugPrincipal = await window.ic.plug.getPrincipal();
        const plugIdentity = window.ic.plug.agent?.getIdentity?.();
        console.log(plugPrincipal.toText())
        setIdentity(plugIdentity);
        setIsAuthenticated(true);

        const backend_idl = (await import("../declarations/backend")).idlFactory;

        // Create HttpAgent with Plug identity explicitly
        const agent = new HttpAgent({
          identity: plugIdentity,
          host,
        });

        if (import.meta.env.VITE_DFX_NETWORK === "local") {
          try {
            await agent.fetchRootKey();
          } catch (error) {
            console.warn("No se pudo obtener la root key en local:", error);
          }
        }

        // Create actor with explicit agent
        const plugActor = Actor.createActor(backend_idl, {
          agent,
          canisterId,
        }) as ActorSubclass<_SERVICE>;
        console.log(canisterId)
        setBackend(plugActor);
        checkDataUser();
        return;
      }

      const authClient = await AuthClient.create();
      const currentIdentity = authClient.getIdentity();
      setIdentity(currentIdentity);
      console.log("init", currentIdentity.getPrincipal().toText())
      setIsAuthenticated(!currentIdentity.getPrincipal().isAnonymous());

      const agent = new HttpAgent({
        identity: identity,
        host,
      });

      if (import.meta.env.VITE_DFX_NETWORK === "local") {
        try {
          await agent.fetchRootKey();
        } catch (error) {
          console.warn("No se pudo obtener la root key en local:", error);
        }
      }

      const actor = createActor(canisterId, { agent });
      setBackend(actor);
      console.log("hola ", await backend.whoAmI())  
    };

    init();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled ? 'bg-white bg-opacity-80 backdrop-blur-md shadow-sm' : 'bg-transparent'
    )}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Logo variant={isScrolled ? 'default' : 'white'} />

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-1">
            {links.map(link => (
              <a
                key={link.name}
                href={link.href}
                className={cn(
                  'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  isScrolled
                    ? 'text-gray-700 hover:text-inda-blue'
                    : 'text-white/80 hover:text-white'
                )}
              >
                {link.name}
              </a>
            ))}
            <a
              href="https://github.com/leonshion"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                isScrolled
                  ? 'text-gray-700 hover:text-inda-blue'
                  : 'text-white/80 hover:text-white'
              )}
            >
              GitHub
            </a>
          </div>

          <div className="hidden md:flex items-center">
            <Button id="boton-connect-wallet"
              onClick={handleConnect}
              variant={isScrolled ? 'primary' : 'outline'}
              size="sm"
              className={`w-40 ${!isScrolled ? 'text-white' : ''}`}
            >
              {textButton}
            </Button>
          </div>

          {isModalOpen && !isConnected && (
            <ModalProviderSelect
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onSelectProvider={handleProviderSelection}
            />
          )}

          {showModalRegister && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">Registro</h2>
                <input
                  id="mr_nombre"
                  type="text"
                  placeholder="Nombre"
                  className="w-full p-2 mb-3 border border-gray-300 rounded"
                />
                <input
                  id="mr_apellido"
                  type="text"
                  placeholder="Apellido"
                  className="w-full p-2 mb-3 border border-gray-300 rounded"
                />
                <input
                  id="mr_correo"
                  type="email"
                  placeholder="Correo"
                  className="w-full p-2 mb-4 border border-gray-300 rounded"
                />
                <div className="flex justify-end gap-2">
                  <button
                    className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
                    onClick={() => setShowModalRegister(false)}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                    onClick={() => handleSubmit()}
                  >
                    Enviar
                  </button>
                </div>
              </div>
            </div>
          )}


          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              className={cn(
                'inline-flex items-center justify-center p-2 rounded-md transition-colors',
                isScrolled
                  ? 'text-gray-700 hover:text-inda-blue hover:bg-gray-100'
                  : 'text-white hover:text-white hover:bg-white/10'
              )}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      <div
        className={cn(
          'fixed inset-0 top-16 z-40 bg-white transform transition-transform duration-300 ease-in-out md:hidden',
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {links.map(link => (
            <a
              key={link.name}
              href={link.href}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-inda-blue hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a
            href="https://github.com/leonshion"
            target="_blank"
            rel="noopener noreferrer"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-inda-blue hover:bg-gray-50"
          >
            GitHub
          </a>
          <div className="pt-4 px-3">
            <Button variant="primary" className="w-full">
              Launch App
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

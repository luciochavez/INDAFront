
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
import Button from './Button';
import {createActor} from "../declarations/backend"
import { _SERVICE} from "../declarations/backend/backend.did";
import { AuthClient } from "@dfinity/auth-client";
import {ActorSubclass, HttpAgent, AnonymousIdentity, Identity} from "@dfinity/agent"
import ModalProviderSelect from './ModalProviderSelect';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [identity, setIdentity] = useState<Identity>(new AnonymousIdentity());
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [backend, setBackend] = useState<ActorSubclass<_SERVICE> | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const host = import.meta.env.VITE_DFX_NETWORK === "ic" ? "https://icp0.io" : "http://localhost:8080" ;
  const canisterId = import.meta.env.VITE_CANISTER_ID_BACKEND;
  const links = [
    { name: 'Candid UI', href: 'https://a4gq6-oaaaa-aaaab-qaa4q-cai.raw.icp0.io/?id=st35g-iaaaa-aaaal-ascpq-cai' },
    { name: 'Features', href: '#features' },
    { name: 'Token', href: '#token' },
    { name: 'Roadmap', href: '#roadmap' },
    { name: 'Community', href: '#community' }
  ];

  const login = async (providerUrl: string) => {
    const authClient = await AuthClient.create();
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

  useEffect(() => {
    const init = async () => {
      const authClient = await AuthClient.create();
      const currentIdentity = authClient.getIdentity();
      setIdentity(currentIdentity);
      setIsAuthenticated(!currentIdentity.getPrincipal().isAnonymous());

      // Configurar agente con la identidad actual
      const agent = new HttpAgent({
        identity,
        host
      });
      
      if (import.meta.env.VITE_DFX_NETWORK === "local") {
        try {
          await agent.fetchRootKey();
        } catch (error) {
          console.warn("No se pudo obtener la root key en local:", error);
        }
      }
      // Crear actor
      const actor = createActor(canisterId, { agent });
      setBackend(actor);
    };

    init();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleConnect = async() => {
    console.log("conectando... ", showModal)
    setShowModal(true)
  };

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
            <Button 
              onClick={handleConnect}
              variant={isScrolled ? 'primary' : 'outline'} 
              size="sm"
              className={!isScrolled ? 'text-white' : undefined}
            >
              Connect Wallet
            </Button>
          </div>
          {showModal &&
            <ModalProviderSelect
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            onSelectProvider={handleProviderSelection}
          />}
          
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

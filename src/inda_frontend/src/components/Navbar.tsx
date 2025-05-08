import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
import Button from './Button';
import {useSession} from '../contexts/sessionContext';
import UserMenu from './UserMenu';
// import { _SERVICE } from "../declarations/backend/backend.did";
// import { AuthClient } from "@dfinity/auth-client";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const [showModalRegister, setShowModalRegister] = useState(false);

  const { backend, user, isAuthenticated, login, logout, updateUser} = useSession();

  const links = [
    { name: 'Candid UI', href: 'https://a4gq6-oaaaa-aaaab-qaa4q-cai.raw.icp0.io/?id=st35g-iaaaa-aaaal-ascpq-cai' },
    { name: 'Features', href: '#features' },
    { name: 'Token', href: '#token' },
    { name: 'Roadmap', href: '#roadmap' },
    { name: 'Community', href: '#community' }
  ];


  useEffect(() => {
    if (!isAuthenticated) {
      setShowModalRegister(false);
      return;
    }
    const timeout = setTimeout(() => {
      setShowModalRegister(!user);
      console.log("User", user);
    }, 2500);
   
    return () => clearTimeout(timeout);
  }, [user, isAuthenticated]);

  const handleSubmit = async () => {
    const input_mr_nombre = document.getElementById("mr_nombre") as HTMLInputElement;
    const input_mr_apellido = document.getElementById("mr_apellido") as HTMLInputElement;
    const input_mr_correo = document.getElementById("mr_correo") as HTMLInputElement;
    const val_mr_nombre = input_mr_nombre.value;
    const val_mr_apellido = input_mr_apellido.value;
    const val_mr_correo = input_mr_correo.value;

    const response = await backend.signUp({ name: val_mr_nombre, lastName: val_mr_apellido, email: val_mr_correo });
    console.log("Response", response);
    if ("Ok" in response) {
      if("user" in response.Ok) {
        updateUser(response.Ok.user);
      }
    }
  };

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
            {!isAuthenticated ? <Button id="boton-connect-wallet"
              onClick={isAuthenticated? logout: login}
              variant={isScrolled ? 'primary' : 'outline'}
              size="sm"
              className={`w-40 ${!isScrolled ? 'text-white' : ''}`}
            >
              Connect
            </Button>:
            <UserMenu/>
            }
          </div>      

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
          'fixed inset-0 top-16 z-40 transform transition-transform duration-300 ease-in-out md:hidden',
          isMenuOpen ? 'translate-x-0' : 'translate-x-full',
          
        )}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
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

          <div className="pt-4 px-3 bg">
            {!isAuthenticated ? <Button id="boton-connect-wallet"
              onClick={isAuthenticated? logout: login}
              variant={isScrolled ? 'primary' : 'outline'}
              size="sm"
              className="w-full"
            >
              Connect
            </Button>:
            <UserMenu/>
            }
          </div> 

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

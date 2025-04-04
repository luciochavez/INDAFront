import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
import ConnectWallet from './ConnectWallet';
import { cn } from '@/lib/utils';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Features', href: '#features' },
    { name: 'Token', href: '#token' },
    { name: 'Roadmap', href: '#roadmap' },
    { name: 'Community', href: '#community' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300',
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Logo variant={isScrolled || isMenuOpen ? 'default' : 'white'} />
          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={cn(
                  'font-medium text-sm transition-colors duration-300',
                  isScrolled 
                    ? 'text-inda-black hover:text-inda-blue' 
                    : 'text-white hover:text-white/80'
                )}
              >
                {link.name}
              </a>
            ))}
          </div>
          
          <div className="hidden md:flex">
            <ConnectWallet />
          </div>
          
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className={cn(
                'p-2 rounded-md transition-colors',
                isScrolled 
                  ? 'text-inda-black hover:bg-gray-100' 
                  : 'text-white hover:bg-white/10'
              )}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
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
        <div className="p-5 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="block py-3 text-lg font-medium text-inda-black hover:text-inda-blue"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <div className="pt-5">
            <ConnectWallet className="w-full" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

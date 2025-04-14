import { useState } from 'react';
import styled from 'styled-components';
import { Wallet, ChevronDown, Menu } from 'lucide-react';

const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 50;
  transition: all 0.3s;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (min-width: 768px) {
    padding: 0 1.5rem;
    height: 5rem;
  }
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1a1a;
  transition: all 0.3s;
  
  span {
    color: #2563eb;
  }
`;

const DesktopNav = styled.div`
  display: none;
  align-items: center;
  gap: 2rem;

  @media (min-width: 768px) {
    display: flex;
  }
`;

const NavLink = styled.a`
  font-weight: 500;
  font-size: 0.875rem;
  color: #1a1a1a;
  transition: color 0.3s;
  
  &:hover {
    color: #2563eb;
  }
`;

const ConnectButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;
  border-radius: 0.375rem;
  font-weight: 500;
  font-size: 0.875rem;
  padding: 0.625rem 1rem;
  background: linear-gradient(to right, #2563eb, #7c3aed);
  color: white;
  border: none;
  cursor: pointer;
  transition: background 0.3s;
  position: relative;
  overflow: hidden;

  &:hover {
    background: linear-gradient(to right, #7c3aed, #2563eb);
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(255, 255, 255, 0.1);
    opacity: 0;
    transition: opacity 0.3s;
  }

  &:hover::before {
    opacity: 1;
  }
`;

const MobileMenuButton = styled.button`
  padding: 0.5rem;
  border-radius: 0.375rem;
  color: #1a1a1a;
  transition: background 0.3s;
  
  &:hover {
    background: #f3f4f6;
  }

  @media (min-width: 768px) {
    display: none;
  }
`;

const MobileMenu = styled.div<{ isOpen: boolean }>`
  position: fixed;
  inset: 0;
  top: 4rem;
  z-index: 40;
  background: white;
  transform: ${({ isOpen }) => 
    isOpen ? 'translateX(0)' : 'translateX(100%)'};
  transition: transform 0.3s ease-in-out;
  padding: 1.25rem;

  @media (min-width: 768px) {
    display: none;
  }
`;

const MobileNavLink = styled.a`
  display: block;
  padding: 0.75rem 0;
  font-size: 1.125rem;
  font-weight: 500;
  color: #1a1a1a;
  
  &:hover {
    color: #2563eb;
  }
`;

export const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <NavContainer>
        <NavContent>
          <Logo>Inda<span>social </span></Logo>
          
          <DesktopNav>
            <NavLink href="#home">Home</NavLink>
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#token">Token</NavLink>
            <NavLink href="#roadmap">Roadmap</NavLink>
            <NavLink href="#community">Community</NavLink>
            
            <ConnectButton>
              <Wallet size={16} />
              Connect Wallet
              <ChevronDown size={16} />
            </ConnectButton>
          </DesktopNav>

          <MobileMenuButton 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <Menu size={24} />
          </MobileMenuButton>
        </NavContent>
      </NavContainer>
      <MobileMenu isOpen={isMenuOpen}>
        <MobileNavLink href="#home">Home</MobileNavLink>
        <MobileNavLink href="#features">Features</MobileNavLink>
        <MobileNavLink href="#token">Token</MobileNavLink>
        <MobileNavLink href="#roadmap">Roadmap</MobileNavLink>
        <MobileNavLink href="#community">Community</MobileNavLink>
        
        <div style={{ paddingTop: '1.25rem' }}>
          <ConnectButton>
            <Wallet size={16} />
            Connect Wallet
            <ChevronDown size={16} />
          </ConnectButton>
        </div>
      </MobileMenu>
    </>
  );
};

export default NavBar
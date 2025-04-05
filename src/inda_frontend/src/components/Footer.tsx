
import React from 'react';
import Logo from './Logo';
import { Twitter, Github, Globe } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-inda-black text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="col-span-1 md:col-span-2">
            <Logo variant="white" className="mb-6" />
            <p className="text-gray-400 mb-6 max-w-md">
              Indasocial is a decentralized social media platform built on the Internet Computer Protocol, creating a user-owned ecosystem where content creators and users truly benefit from their participation.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com/leonshion" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Github size={20} />
              </a>
              <a href="https://twitter.com/indasocial_mx" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://discord.gg/D4gJNemzPj" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Globe size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Platform</h3>
            <ul className="space-y-3">
              <li><a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
              <li><a href="#token" className="text-gray-400 hover:text-white transition-colors">INDA Token</a></li>
              <li><a href="#roadmap" className="text-gray-400 hover:text-white transition-colors">Roadmap</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Whitepaper</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Developers</a></li>
              <li><a href="#community" className="text-gray-400 hover:text-white transition-colors">Community</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Indasocial. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

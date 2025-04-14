
import React from 'react';
import { ArrowUpRight, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ScrollReveal from './ScrollReveal';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ConnectWallet from './ConnectWallet';

const WalletSection: React.FC = () => {
  return (
    <section className="py-20 md:py-32 bg-inda-light relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-inda-blue/20 to-inda-purple/20 rounded-tl-[100px] blur-2xl"></div>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <ScrollReveal>
              <span className="inline-block px-3 py-1 text-xs font-medium text-inda-blue bg-inda-blue/10 rounded-full mb-4">
                Connect to ICP
              </span>
            </ScrollReveal>
            
            <ScrollReveal animation="slideUp" delay={200}>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 tracking-tight">
                Seamlessly Connect Your <span className="text-inda-blue">Internet Computer Wallet</span>
              </h2>
            </ScrollReveal>
            
            <ScrollReveal animation="fadeIn" delay={300}>
              <p className="text-lg text-gray-600 mb-6">
                Integration with Internet Computer Protocol allows for seamless wallet connection, enabling you to interact with the platform, manage your INDA tokens, and participate in the ecosystem.
              </p>
            </ScrollReveal>
            
            <ScrollReveal animation="fadeIn" delay={400}>
              <p className="text-lg text-gray-600 mb-8">
                Your data remains secure and under your control with our decentralized authentication system, powered by Internet Identity and NFID.
              </p>
            </ScrollReveal>
            
            <ScrollReveal animation="fadeIn" delay={500}>
              <div className="flex flex-col sm:flex-row gap-4">
                <ConnectWallet />
                <a 
                  href="https://www.notion.so/mileoon/INDASOCIAL-WHITEPAPER-1a9855c74f39802aa398d9b1b8f0668e?pvs=4" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-2.5 text-sm font-medium text-inda-black border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Read Whitepaper <ArrowUpRight className="w-5 h-5" />
                </a>
              </div>
            </ScrollReveal>
          </div>
          
          <div className="relative">
            <ScrollReveal animation="slideUp" delay={200}>
              <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
                <div className="mb-6">
                  <div className="w-12 h-12 bg-inda-blue/10 rounded-full flex items-center justify-center mb-4">
                    <Wallet className="w-6 h-6 text-inda-blue" />
                  </div>
                  <h3 className="text-xl font-bold text-inda-black mb-2">Connect Your Wallet</h3>
                  <p className="text-gray-600">Securely connect your Internet Computer wallet to access the full functionality of the platform.</p>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-inda-light rounded-lg border border-gray-100 flex items-center">
                    <Avatar className="w-10 h-10 mr-4 bg-white">
                      <AvatarImage src="https://internetcomputer.org/img/IC-logo.svg" alt="Internet Computer" />
                      <AvatarFallback className="bg-white text-inda-blue">IC</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium text-inda-black">Internet Identity</h4>
                      <p className="text-sm text-gray-500">Secure, anonymous blockchain authentication</p>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-inda-light rounded-lg border border-gray-100 flex items-center">
                    <Avatar className="w-10 h-10 mr-4 bg-white">
                      <AvatarImage src="https://nfid.one/icons/icon-144x144.png" alt="NFID" />
                      <AvatarFallback className="bg-white text-inda-purple">NF</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium text-inda-black">NFID</h4>
                      <p className="text-sm text-gray-500">Cross-chain identity for Web3 applications</p>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-inda-light rounded-lg border border-gray-100 flex items-center">
                    <Avatar className="w-10 h-10 mr-4 bg-white">
                      <AvatarImage src="https://plugwallet.ooo/assets/images/plug-logo.svg" alt="Plug Wallet" />
                      <AvatarFallback className="bg-white text-blue-500">PW</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium text-inda-black">Plug Wallet</h4>
                      <p className="text-sm text-gray-500">Browser extension for ICP assets</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WalletSection;

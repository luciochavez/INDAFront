
import React, { useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import Button from './Button';

const Hero: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background con overlay de gradiente */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-inda-black to-inda-dark opacity-90"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519389950473-47ba0277781c')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
      </div>
      
      {/* Círculos animados */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-inda-blue opacity-10 rounded-full filter blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-inda-purple opacity-10 rounded-full filter blur-3xl animate-pulse animation-delay-2000"></div>
      
      {/* Contenido */}
      <div className="container mx-auto px-4 pt-32 pb-24 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal animation="fadeIn" duration="fast">
            <span className="inline-block px-3 py-1 mb-6 text-xs font-medium tracking-wider text-white uppercase bg-inda-blue/20 backdrop-blur-sm rounded-full">
              Built on Internet Computer Protocol
            </span>
          </ScrollReveal>
          
          <ScrollReveal animation="slideUp" delay={200}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-tight mb-6">
              The Web3 <span className="text-inda-blue">Social Network</span>
            </h1>
          </ScrollReveal>
          
          <ScrollReveal animation="slideUp" delay={400}>
            <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto">
              Experience true ownership of your social identity and content. Connect with others in a decentralized environment powered by the Internet Computer.
            </p>
          </ScrollReveal>
          
          <ScrollReveal animation="fadeIn" delay={600}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="primary" hasArrow>
                Join The Platform
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                About INDA Token
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </div>
      
      {/* Indicador de scroll */}
      <div className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex flex-col items-center">
          <span className="text-sm text-white/70 mb-2">Scroll to explore</span>
          <ArrowDown className="animate-bounce" />
        </div>
      </div>
    </div>
  );
};

export default Hero;

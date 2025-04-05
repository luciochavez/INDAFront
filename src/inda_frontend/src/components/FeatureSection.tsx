
import React from 'react';
import { Coins, ShieldCheck, BarChart, Users, Share2, Zap } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import FeatureCard from './FeatureCard';
import Button from './Button';

const FeatureSection: React.FC = () => {
  const features = [
    {
      icon: Coins,
      title: "Own Your Content",
      description: "Full ownership of your content and data with blockchain validation and monetization opportunities.",
    },
    {
      icon: Users,
      title: "Decentralized Governance",
      description: "Community-driven decisions on platform development and policies through token-based voting.",
    },
    {
      icon: ShieldCheck,
      title: "Privacy & Security",
      description: "Industry-leading privacy features with ICP's secure architecture and user-controlled data sharing.",
    },
    {
      icon: BarChart,
      title: "Creator Economy",
      description: "Direct monetization channels between creators and audiences without platform intermediaries.",
    },
    {
      icon: Share2,
      title: "Seamless Experience",
      description: "User-friendly interface that makes blockchain technology accessible to everyone.",
    },
    {
      icon: Zap,
      title: "Scalable Architecture",
      description: "Built on Internet Computer for high performance and unlimited scalability.",
    },
  ];

  return (
    <section id="features" className="py-20 md:py-32 bg-white relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-inda-blue/5 rounded-bl-full"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-inda-purple/5 rounded-tr-full"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <ScrollReveal>
            <span className="inline-block px-3 py-1 text-xs font-medium text-inda-blue bg-inda-blue/10 rounded-full mb-4">
              Platform Features
            </span>
          </ScrollReveal>
          
          <ScrollReveal animation="slideUp" delay={200}>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 tracking-tight">
              Redefining Social Media with <span className="text-inda-blue">Blockchain</span>
            </h2>
          </ScrollReveal>
          
          <ScrollReveal animation="fadeIn" delay={400}>
            <p className="text-lg text-gray-600">
              Indasocial combines cutting-edge blockchain technology with intuitive social features to create a new paradigm of online interaction and content sharing.
            </p>
          </ScrollReveal>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 100}
            />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <ScrollReveal animation="fadeIn" delay={800}>
            <Button variant="primary" size="lg" hasArrow>
              Learn More
            </Button>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;

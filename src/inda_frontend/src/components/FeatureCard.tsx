
import React from 'react';
import { LucideIcon } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

type FeatureCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
};

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description, delay = 0 }) => {
  return (
    <ScrollReveal animation="fadeInUp" delay={delay}>
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
        <div className="w-12 h-12 bg-inda-blue/10 rounded-full flex items-center justify-center mb-4">
          <Icon className="w-6 h-6 text-inda-blue" />
        </div>
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </ScrollReveal>
  );
};

export default FeatureCard;

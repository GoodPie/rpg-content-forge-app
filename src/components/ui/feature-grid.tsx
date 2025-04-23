import * as React from "react";
import { FeatureCard, FeatureCardProps } from "@/components/ui/feature-card";

export interface FeatureGridProps {
  features: Omit<FeatureCardProps, 'className'>[];
  className?: string;
}

/**
 * FeatureGrid component for displaying a grid of feature cards
 * Used on multiple pages to showcase features in a consistent layout
 */
export const FeatureGrid = ({ features, className = "" }: FeatureGridProps) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 ${className}`}>
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          title={feature.title}
          description={feature.description}
          href={feature.href}
          icon={feature.icon}
        />
      ))}
    </div>
  );
};
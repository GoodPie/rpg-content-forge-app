import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export interface StatItem {
  label: string;
  value: string | number;
  percentage: number;
}

export interface StatCardProps {
  title: string;
  stats: StatItem[];
  className?: string;
}

/**
 * StatCard component for displaying statistics with progress bars
 * Used to show metrics and progress in a visual way
 */
export const StatCard = ({ title, stats, className = "" }: StatCardProps) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {stats.map((stat, index) => (
          <div key={index}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-(--muted-foreground)">{stat.label}</span>
              <span className="text-sm font-medium text-(--muted-foreground)">{stat.value}</span>
            </div>
            <div className="w-full bg-(--accent) rounded-full h-2">
              <div 
                className="bg-(--primary) h-2 rounded-full" 
                style={{ width: `${stat.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
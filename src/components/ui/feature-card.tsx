import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";

export interface FeatureCardProps {
  title: string;
  description: string;
  href: string;
  icon?: React.ReactNode;
}

/**
 * FeatureCard component for displaying feature information with optional icon
 * Used across multiple pages to showcase features in a consistent way
 */
export const FeatureCard = ({ title, description, href, icon }: FeatureCardProps) => {
  return (
    <Link href={href} className="block group">
      <Card className="hover:shadow-md transition-shadow bg-(--background) h-full">
        <CardHeader>
          <div className="flex items-center">
            {icon && (
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-(--primary)/10 flex items-center justify-center text-(--primary)">
                {icon}
              </div>
            )}
            <CardTitle className={`${icon ? 'ml-4' : ''} group-hover:text-(--primary) transition-colors`}>
              {title}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-base">{description}</CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
};

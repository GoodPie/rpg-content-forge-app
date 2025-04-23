import Link from 'next/link';
import {Card, CardHeader, CardTitle, CardContent, CardDescription} from "@/components/ui/card";

export interface FeatureCardProps {
  title: string;
  description: string;
  href: string;
  icon?: React.ReactNode;
  count?: number;
}

export const TemplateCard = ({title, description, href, icon, count}: FeatureCardProps) => {
  return (
    <Link href={href} className="block group">

      <Card className="hover:shadow-md transition-shadow bg-(--background) h-full">
        <CardHeader>
          <div className="flex items-center justify-between">

            <div className={"flex items-center justify-start"}>
              {icon && (
                <div
                  className="flex-shrink-0 h-10 w-10 rounded-full bg-(--primary)/10 flex items-center justify-center text-(--primary)">
                  {icon}
                </div>
              )}
              <CardTitle className={`${icon ? 'ml-4' : ''} group-hover:text-(--primary) transition-colors`}>
                {title}
              </CardTitle>
            </div>
            <div>
          <span
            className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none bg-(--primary)/10 text-(--primary) rounded">
            {count ?? '0'}
          </span>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <CardDescription className="text-base">{description}</CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
};

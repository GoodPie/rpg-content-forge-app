import { Card } from "@/components/ui/card";

export interface PrincipleCardProps {
  title: string;
  description: string;
}

/**
 * PrincipleCard component for displaying principles or core concepts
 * Used to showcase key principles in a consistent way
 */
export const PrincipleCard = ({ title, description }: PrincipleCardProps) => {
  return (
    <Card className="border-(--border) p-4">
      <h3 className="text-lg font-semibold mb-1 text-(--foreground)">
        {title}
      </h3>
      <p className="text-(--muted-foreground)">{description}</p>
    </Card>
  );
};
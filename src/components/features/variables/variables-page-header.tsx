'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

interface VariablesPageHeaderProps {
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
}

export function VariablesPageHeader({
  title,
  description,
  buttonText,
  buttonHref,
}: Readonly<VariablesPageHeaderProps>) {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground">
          {description}
        </p>
      </div>
      <Link href={buttonHref}>
        <Button asChild>
          <span>
            <PlusCircle className="mr-2 h-4 w-4" />
            {buttonText}
          </span>
        </Button>
      </Link>
    </div>
  );
}
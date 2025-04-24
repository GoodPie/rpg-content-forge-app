'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

interface EmptyLibraryStateProps {
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
}

export function EmptyLibraryState({
  title,
  description,
  buttonText,
  buttonHref,
}: Readonly<EmptyLibraryStateProps>) {
  return (
    <div className="text-center py-12">
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6">
        {description}
      </p>
      <Link href={buttonHref}>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          {buttonText}
        </Button>
      </Link>
    </div>
  );
}
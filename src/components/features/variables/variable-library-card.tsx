'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { VariableLibrary } from '@/types/variables';

interface VariableLibraryCardProps {
  library: VariableLibrary;
}

export function VariableLibraryCard({ library }: Readonly<VariableLibraryCardProps>) {
  return (
    <Card key={library.id} className="overflow-hidden">
      <CardHeader className="pb-2">
        <Link href={`/content-database/variables/${library.id}`} className="hover:text-primary transition-colors">
          <CardTitle className="cursor-pointer">{library.name}</CardTitle>
        </Link>
        <CardDescription>
          {library.tags ? library.tags : 'No tags'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {library.description}
        </p>
        <p className="text-sm mt-2">
          <span className="font-medium">{library.variables.length}</span> variables
        </p>
      </CardContent>
      <CardFooter>
        <Link href={`/content-database/variables/${library.id}`}>
          <Button asChild className="w-full">
            View Library
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

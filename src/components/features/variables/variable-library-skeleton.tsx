'use client';

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface VariableLibrarySkeletonProps {
  count?: number;
}

export function VariableLibrarySkeleton({ count = 3 }: Readonly<VariableLibrarySkeletonProps>) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(count)].map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <CardHeader className="pb-2">
            <Skeleton className="h-5 w-3/4 mb-2"/>
            <Skeleton className="h-4 w-full"/>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-full mb-2"/>
            <Skeleton className="h-4 w-2/3"/>
          </CardContent>
          <CardFooter>
            <Skeleton className="h-9 w-full"/>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
'use client';

import { VariableValueForm } from '@/components/features/variables/variable-value-form';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { use } from 'react';

export default function NewVariableValuePage({ params }: { params: { id: string; variableId: string } }) {
  const unwrappedParams = use(params);
  
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild className="mb-2">
          <Link href={`/content-database/variables/${unwrappedParams.id}/variables/${unwrappedParams.variableId}`}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Variable
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Add Value</h1>
        <p className="text-muted-foreground">
          Create a new possible value for this variable
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <VariableValueForm 
          variableId={unwrappedParams.variableId} 
          libraryId={unwrappedParams.id} 
        />
      </div>
    </div>
  );
}
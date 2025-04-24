'use client';

import { VariableForm } from '@/components/features/variables/variable-form';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function NewVariablePage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild className="mb-2">
          <Link href={`/content-database/variables/${params.id}`}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Library
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Add Variable</h1>
        <p className="text-muted-foreground">
          Create a new variable for this library
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <VariableForm libraryId={params.id} />
      </div>
    </div>
  );
}
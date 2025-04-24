'use client';

import { VariableLibraryForm } from '@/components/features/variables/variable-library-form';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function NewVariableLibraryPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild className="mb-2">
          <Link href="/content-database/variables">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Libraries
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Create Variable Library</h1>
        <p className="text-muted-foreground">
          Create a new collection of variables for procedural content
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <VariableLibraryForm />
      </div>
    </div>
  );
}
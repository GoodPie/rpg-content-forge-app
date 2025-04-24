'use client';

import { useState, useEffect } from 'react';
import { VariableLibraryForm } from '@/components/features/variables/variable-library-form';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import { getVariableLibrary } from '@/app/content-database/variables/actions';
import { VariableLibrary } from '@/types/variables';

export default function EditVariableLibraryPage({ params }: { params: { id: string } }) {
  const [library, setLibrary] = useState<VariableLibrary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch the library
        const response = await getVariableLibrary(params.id);
        if (response.success && response.data) {
          setLibrary(response.data);
        } else {
          setError(response.error || 'Failed to fetch variable library');
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="container mx-auto py-6">
        <div className="mb-6">
          <Skeleton className="h-10 w-40 mb-2" />
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>
        <Skeleton className="h-[500px] w-full rounded-lg" />
      </div>
    );
  }

  if (error || !library) {
    return (
      <div className="container mx-auto py-6">
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild className="mb-2">
            <Link href={`/content-database/variables/${params.id}`}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Library
            </Link>
          </Button>
        </div>
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-md">
          <p className="text-red-600 dark:text-red-400">
            {error || 'Variable library not found'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild className="mb-2">
          <Link href={`/content-database/variables/${params.id}`}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Library
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Edit Variable Library</h1>
        <p className="text-muted-foreground">
          Update the details of this variable library
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <VariableLibraryForm 
          library={library} 
          isEdit={true} 
        />
      </div>
    </div>
  );
}
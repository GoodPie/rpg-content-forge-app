'use client';

import { useState, useEffect } from 'react';
import { VariableValueForm } from '@/components/features/variables/variable-value-form';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import { getVariableLibrary } from '@/app/content-database/variables/actions';
import { VariableValue } from '@/types/variables';
import { use } from 'react';

export default function EditVariableValuePage({ params }: { params: { id: string; variableId: string; valueId: string } }) {
  const unwrappedParams = use(params);
  const [value, setValue] = useState<VariableValue | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch the library which includes all variables
        const response = await getVariableLibrary(unwrappedParams.id);
        if (response.success && response.data) {
          // Find the specific variable in the library
          const foundVariable = response.data.variables.find(v => v.id === unwrappedParams.variableId);
          if (foundVariable) {
            // Find the specific value in the variable
            const foundValue = foundVariable.values.find(v => v.id === unwrappedParams.valueId);
            if (foundValue) {
              setValue(foundValue);
            } else {
              setError('Value not found in this variable');
            }
          } else {
            setError('Variable not found in this library');
          }
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
  }, [unwrappedParams.id, unwrappedParams.variableId, unwrappedParams.valueId]);

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

  if (error || !value) {
    return (
      <div className="container mx-auto py-6">
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild className="mb-2">
            <Link href={`/content-database/variables/${unwrappedParams.id}/variables/${unwrappedParams.variableId}`}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Variable
            </Link>
          </Button>
        </div>
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-md">
          <p className="text-red-600 dark:text-red-400">
            {error || 'Value not found'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild className="mb-2">
          <Link href={`/content-database/variables/${unwrappedParams.id}/variables/${unwrappedParams.variableId}`}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Variable
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Edit Value</h1>
        <p className="text-muted-foreground">
          Update this variable value
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <VariableValueForm 
          value={value} 
          variableId={unwrappedParams.variableId} 
          libraryId={unwrappedParams.id} 
          isEdit={true} 
        />
      </div>
    </div>
  );
}
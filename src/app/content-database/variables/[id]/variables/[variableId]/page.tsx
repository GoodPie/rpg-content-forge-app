'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronLeft, Edit, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { toast } from "sonner";
import { getVariableLibrary, deleteVariable } from '@/app/content-database/variables/actions';
import { VariableLibrary, Variable, VariableValue } from '@/types/variables';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

export default function VariablePage({ params }: { params: { id: string; variableId: string } }) {
  const router = useRouter();
  const [library, setLibrary] = useState<VariableLibrary | null>(null);
  const [variable, setVariable] = useState<Variable | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch the library which includes all variables
        const response = await getVariableLibrary(params.id);
        if (response.success && response.data) {
          setLibrary(response.data);
          
          // Find the specific variable in the library
          const foundVariable = response.data.variables.find(v => v.id === params.variableId);
          if (foundVariable) {
            setVariable(foundVariable);
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
  }, [params.id, params.variableId]);

  const handleDeleteVariable = async () => {
    try {
      const response = await deleteVariable(params.variableId);
      if (response.success) {
        toast.success('The variable has been deleted successfully.');
        router.push(`/content-database/variables/${params.id}`);
        router.refresh();
      } else {
        toast.error(response.error || 'Failed to delete variable');
      }
    } catch (error) {
      console.error('Error deleting variable:', error);
      toast.error('An unexpected error occurred');
    }
  };

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

  if (error || !library || !variable) {
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
            {error || 'Variable not found'}
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
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{variable.name}</h1>
            <p className="text-muted-foreground">
              {variable.values.length} possible values
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/content-database/variables/${params.id}/variables/${variable.id}/edit`}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Variable
              </Link>
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Variable
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete the variable and all its values.
                    This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteVariable}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="values">Values ({variable.values.length})</TabsTrigger>
          <TabsTrigger value="usage">Usage</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Variable Details</CardTitle>
              <CardDescription>
                Information about this variable
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium">Description</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {variable.description || 'No description provided'}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium">Values</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  This variable has {variable.values.length} possible values.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium">Library</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Part of the <Link href={`/content-database/variables/${library.id}`} className="text-blue-500 hover:underline">{library.name}</Link> library
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium">Created</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {variable.createdAt ? new Date(variable.createdAt).toLocaleDateString() : 'Unknown'}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium">Last Updated</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {variable.updatedAt ? new Date(variable.updatedAt).toLocaleDateString() : 'Unknown'}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="values" className="mt-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Values</h2>
            <Button asChild>
              <Link href={`/content-database/variables/${params.id}/variables/${variable.id}/values/new`}>
                <Plus className="mr-2 h-4 w-4" />
                Add Value
              </Link>
            </Button>
          </div>

          {variable.values.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No values found</h3>
                <p className="text-muted-foreground mb-6">
                  Add your first value to make this variable useful.
                </p>
                <Button asChild>
                  <Link href={`/content-database/variables/${params.id}/variables/${variable.id}/values/new`}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Value
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {variable.values.map((value) => (
                <Card key={value.id} className="overflow-hidden">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-medium">{value.text}</p>
                        {value.condition && (
                          <p className="text-sm text-muted-foreground mt-1">
                            <span className="font-medium">Condition:</span> {value.condition}
                          </p>
                        )}
                        <p className="text-sm text-muted-foreground mt-1">
                          <span className="font-medium">Weight:</span> {value.weight}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/content-database/variables/${params.id}/variables/${variable.id}/values/${value.id}/edit`}>
                            Edit
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="usage" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Using This Variable</CardTitle>
              <CardDescription>
                Learn how to use this variable in your templates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium">Basic Usage</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  To use this variable in a template, wrap the variable name in double curly braces:
                </p>
                <pre className="bg-muted p-2 rounded-md mt-2 text-sm font-mono">
                  {"{{"}<span className="text-blue-500">{variable.name}</span>{"}}"}
                </pre>
              </div>

              <div>
                <h3 className="text-sm font-medium">Example</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  When this variable is used in a template, it will be replaced with one of its values:
                </p>
                <div className="bg-muted p-2 rounded-md mt-2">
                  <p className="text-sm mb-2">Possible outputs:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    {variable.values.slice(0, 5).map((value, index) => (
                      <li key={index} className="text-sm">
                        {value.text}
                        {value.condition && (
                          <span className="text-xs text-muted-foreground ml-2">
                            (when {value.condition})
                          </span>
                        )}
                      </li>
                    ))}
                    {variable.values.length > 5 && (
                      <li className="text-sm text-muted-foreground">
                        And {variable.values.length - 5} more...
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
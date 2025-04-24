'use client';

import React from 'react';
import {useRouter} from 'next/navigation';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {Skeleton} from '@/components/ui/skeleton';
import {ChevronLeft, Edit, Plus, Trash2} from 'lucide-react';
import Link from 'next/link';
import {deleteVariableLibrary} from '@/app/content-database/variables/actions';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import {useVariableLibrary, useTabs, useEntityDelete} from '@/hooks';

export default function VariableLibraryPage({params}: { params: { id: string } }) {
  const router = useRouter();

  // Unwrap the params Promise
  const unwrappedParams = React.use(params);

  // Use the variable library hook to fetch and manage the library data
  const {library, isLoading, error} = useVariableLibrary(unwrappedParams.id);

  // Use the tabs hook to manage the active tab
  const {activeTab, handleTabChange} = useTabs('overview');

  // Use the entity delete hook to handle library deletion
  const {handleDelete, isDeleting: _isDeleting} = useEntityDelete(
    () => deleteVariableLibrary(unwrappedParams.id),
    {
      successMessage: 'The variable library has been deleted successfully.',
      errorMessage: 'Failed to delete library',
      redirectPath: '/content-database/variables',
    }
  );

  if (isLoading) {
    return (
      <div className="container mx-auto py-6">
        <div className="mb-6">
          <Skeleton className="h-10 w-40 mb-2"/>
          <Skeleton className="h-8 w-64 mb-2"/>
          <Skeleton className="h-4 w-96"/>
        </div>
        <Skeleton className="h-[500px] w-full rounded-lg"/>
      </div>
    );
  }

  if (error || !library) {
    return (
      <div className="container mx-auto py-6">
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild className="mb-2">
            <Link href="/content-database/variables">
              <ChevronLeft className="mr-2 h-4 w-4"/>
              Back to Libraries
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
          <Link href="/content-database/variables">
            <ChevronLeft className="mr-2 h-4 w-4"/>
            Back to Libraries
          </Link>
        </Button>
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{library.name}</h1>
            <p className="text-muted-foreground">
              {library.tags || 'No tags'}
            </p>
          </div>
          <div className="flex gap-2">

            <Link href={`/content-database/variables/${unwrappedParams.id}/edit`}>
              <Button variant="outline" size="sm" asChild>
                <span>
                  <Edit className="h-4 w-4"/>
                  Edit Library
                </span>
              </Button>
            </Link>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  <Trash2 className="h-4 w-4"/>
                  Delete Library
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete the variable library and all its variables.
                    This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={handleTabChange} className="mb-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="variables">Variables ({library.variables.length})</TabsTrigger>
          <TabsTrigger value="usage">Usage</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Library Details</CardTitle>
              <CardDescription>
                Information about this variable library
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium">Description</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {library.description}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium">Variables</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  This library contains {library.variables.length} variables with a total of {
                  library.variables.reduce((total, variable) => total + variable.values.length, 0)
                } possible values.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium">Created</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {library.createdAt ? new Date(library.createdAt).toLocaleDateString() : 'Unknown'}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium">Last Updated</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {library.updatedAt ? new Date(library.updatedAt).toLocaleDateString() : 'Unknown'}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="variables" className="mt-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Variables</h2>

            <Link href={`/content-database/variables/${unwrappedParams.id}/variables/new`}>
              <Button asChild>
                <span>
                  <Plus className="h-4 w-4"/>
                  Add Variable
                </span>
              </Button>
            </Link>

          </div>

          {library.variables.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No variables found</h3>
                <p className="text-muted-foreground mb-6">
                  Add your first variable to start building procedural content.
                </p>
                <Button asChild>
                  <Link href={`/content-database/variables/${unwrappedParams.id}/variables/new`}>
                    <Plus className="mr-2 h-4 w-4"/>
                    Add Variable
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {library.variables.map((variable) => (
                <Card key={variable.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{variable.name}</CardTitle>
                        <CardDescription>
                          {variable.values.length} possible values
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Link href={`/content-database/variables/${unwrappedParams.id}/variables/${variable.id}`}>
                          <Button variant="ghost" size="sm" asChild>
                            View
                          </Button>
                        </Link>
                        <Link href={`/content-database/variables/${unwrappedParams.id}/variables/${variable.id}/edit`}>
                          <Button variant="outline" size="sm" asChild>
                            <span>
                              <Edit className="mr-1 h-3 w-3" />
                              Edit
                            </span>
                          </Button>
                        </Link>
                        <Link href={`/content-database/variables/${unwrappedParams.id}/variables/${variable.id}/values/new`}>
                          <Button variant="outline" size="sm" asChild>
                            <span>
                              <Plus className="mr-1 h-3 w-3" />
                              Add Value
                            </span>
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm">
                      <p className="text-muted-foreground mb-2">
                        {variable.description || 'No description'}
                      </p>
                      <div className="mt-2">
                        <h4 className="font-medium mb-1">Values:</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          {variable.values.slice(0, 3).map((value) => (
                            <li key={value.id} className="text-sm">
                              {value.text}
                              {value.condition && (
                                <span className="text-xs text-muted-foreground ml-2">
                                  (when {value.condition})
                                </span>
                              )}
                            </li>
                          ))}
                          {variable.values.length > 3 && (
                            <li className="text-sm text-muted-foreground">
                              And {variable.values.length - 3} more...
                            </li>
                          )}
                        </ul>
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
              <CardTitle>Using Variables in Templates</CardTitle>
              <CardDescription>
                Learn how to use variables from this library in your templates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium">Basic Usage</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  To use a variable in a template, wrap the variable name in double curly braces:
                </p>
                <pre className="bg-muted p-2 rounded-md mt-2 text-sm font-mono">
                  The {"{{"}<span className="text-blue-500">variable_name</span>{"}}"} will be replaced with a random value.
                </pre>
              </div>

              <div>
                <h3 className="text-sm font-medium">Available Variables</h3>
                <div className="mt-2 space-y-2">
                  {library.variables.map((variable) => (
                    <div key={variable.id} className="bg-muted p-2 rounded-md">
                      <code className="text-sm font-mono">
                        {"{{"}<span className="text-blue-500">{variable.name}</span>{"}}"}
                      </code>
                      <p className="text-xs text-muted-foreground mt-1">
                        {variable.description || 'No description'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium">Example</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Here's an example of how to use variables from this library:
                </p>
                <pre className="bg-muted p-2 rounded-md mt-2 text-sm font-mono whitespace-pre-wrap">
                  {library.variables.length > 0 ? (
                    `As I walked through the ${"{{"}<span className="text-blue-500">${
                      library.variables.find(v => v.name.includes('forest') || v.name.includes('environment'))?.name ||
                      library.variables[0].name
                    }</span>{"}}"}...`
                  ) : (
                    'Add variables to see an example.'
                  )}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

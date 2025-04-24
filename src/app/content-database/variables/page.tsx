'use client';

import {useState} from 'react';
import {useVariableLibraries} from '@/hooks/use-variables';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {Skeleton} from '@/components/ui/skeleton';
import {PlusCircle} from 'lucide-react';
import Link from 'next/link';

export default function VariablesPage() {
  const {libraries, isLoading, error} = useVariableLibraries();
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Variable Libraries</h1>
          <p className="text-muted-foreground">
            Manage reusable variable collections for procedural content
          </p>
        </div>
        <Link href="/content-database/variables/new">
          <Button asChild>
            <span><PlusCircle className="mr-2 h-4 w-4"/>
              New Library
            </span>
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Libraries</TabsTrigger>
          <TabsTrigger value="recent">Recently Updated</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
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
          ) : error ? (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-md">
              <p className="text-red-600 dark:text-red-400">{error}</p>
            </div>
          ) : libraries.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No variable libraries found</h3>
              <p className="text-muted-foreground mb-6">
                Create your first variable library to start building procedural content.
              </p>
              <Link href="/content-database/variables/new">
                <Button asChild>
                  <PlusCircle className="mr-2 h-4 w-4"/>
                  Create Variable Library
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {libraries.map((library) => (
                <Card key={library.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardTitle>{library.name}</CardTitle>
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
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="recent" className="mt-4">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
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
          ) : error ? (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-md">
              <p className="text-red-600 dark:text-red-400">{error}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...libraries]
                .sort((a, b) => new Date(b.updatedAt || 0).getTime() - new Date(a.updatedAt || 0).getTime())
                .slice(0, 6)
                .map((library) => (
                  <Card key={library.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <CardTitle>{library.name}</CardTitle>
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
                ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <div className="mt-12 bg-muted p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">About Variable Libraries</h2>
        <p className="mb-4">
          Variable libraries are collections of reusable variables that can be used across multiple templates.
          They help create more dynamic and varied procedural content by providing a centralized place to manage
          text variations, conditional content, and weighted options.
        </p>
        <h3 className="text-lg font-medium mt-6 mb-2">Key Features:</h3>
        <ul className="list-disc pl-6 space-y-1">
          <li>Create named variables with multiple possible values</li>
          <li>Add conditions to values for context-sensitive content</li>
          <li>Assign weights to control how often each value appears</li>
          <li>Organize variables into themed libraries</li>
          <li>Reuse variables across multiple templates</li>
        </ul>
      </div>
    </div>
  );
}

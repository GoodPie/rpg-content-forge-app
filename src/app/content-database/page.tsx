import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { FeatureCard } from "@/components/ui/feature-card";

const ContentDatabasePage = () => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-(--foreground) mb-2">Content Database</h1>
        <p className="text-lg text-(--muted-foreground)">
          Store and organize all templates and assets with comprehensive metadata management.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <FeatureCard 
          title="Content Packs" 
          description="Organize templates and assets into reusable, shareable packs"
          href="/content-database/packs"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
          }
        />
        <FeatureCard 
          title="Templates" 
          description="Browse, search, and manage all templates in the database"
          href="/content-database/templates"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          }
        />
        <FeatureCard 
          title="Variable Libraries" 
          description="Manage reusable variable collections for procedural content"
          href="/content-database/variables"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          }
        />
        <FeatureCard 
          title="Import Content" 
          description="Import templates, packs, and variables from external sources"
          href="/content-database/import"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
          }
        />
        <FeatureCard 
          title="Search" 
          description="Find content by name, type, tags, and other metadata"
          href="/content-database/search"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          }
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Recent Content</CardTitle>
            <Button asChild variant="link" size="sm" className="p-0">
              <Link href="/content-database/templates">
                View All
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="text-(--muted-foreground) text-center py-8">
              <p>No recent content found.</p>
              <p className="mt-2">Create or import content to get started.</p>
              <div className="mt-4 flex justify-center space-x-4">
                <Button asChild>
                  <Link href="/template-editor">
                    Create Content
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/content-database/import">
                    Import Content
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Database Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-(--muted-foreground)">Content Packs</span>
                <span className="text-sm font-medium text-(--muted-foreground)">0</span>
              </div>
              <div className="w-full bg-(--accent) rounded-full h-2">
                <div className="bg-(--primary) h-2 rounded-full" style={{ width: '0%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-(--muted-foreground)">Templates</span>
                <span className="text-sm font-medium text-(--muted-foreground)">0</span>
              </div>
              <div className="w-full bg-(--accent) rounded-full h-2">
                <div className="bg-(--primary) h-2 rounded-full" style={{ width: '0%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-(--muted-foreground)">Variable Libraries</span>
                <span className="text-sm font-medium text-(--muted-foreground)">0</span>
              </div>
              <div className="w-full bg-(--accent) rounded-full h-2">
                <div className="bg-(--primary) h-2 rounded-full" style={{ width: '0%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-(--muted-foreground)">Storage Used</span>
                <span className="text-sm font-medium text-(--muted-foreground)">0 MB</span>
              </div>
              <div className="w-full bg-(--accent) rounded-full h-2">
                <div className="bg-(--primary) h-2 rounded-full" style={{ width: '0%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>About Content Database</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose dark:prose-invert max-w-none">
            <p>
              The Content Database is the central repository for all your procedural content. It provides tools for organizing,
              managing, and searching your templates, variable libraries, and content packs.
            </p>

            <h3>Key Features</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-lg">Content Packs</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <CardDescription className="text-base">
                    Group related templates and assets into packs that can be exported, shared, and reused across projects.
                    Content packs can include templates, variable libraries, and other resources.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-lg">Template Management</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <CardDescription className="text-base">
                    Browse, search, and organize all your templates. View template details, edit metadata, and manage
                    relationships between templates.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-lg">Variable Libraries</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <CardDescription className="text-base">
                    Create and manage reusable collections of variables that can be shared across multiple templates.
                    This promotes consistency and reduces duplication.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-lg">Import/Export</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <CardDescription className="text-base">
                    Import content from external sources and export your content for use in games or sharing with others.
                    Supports multiple formats for maximum compatibility.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>

            <h3 className="mt-6">Getting Started</h3>
            <ol>
              <li>Create templates using the Template Editor</li>
              <li>Organize related templates into content packs</li>
              <li>Create variable libraries for reusable content</li>
              <li>Use the search functionality to find specific content</li>
              <li>Export your content for use in games</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


export default ContentDatabasePage;

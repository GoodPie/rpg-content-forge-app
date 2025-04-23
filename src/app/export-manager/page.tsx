'use client';.

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { FeatureGrid } from "@/components/ui/feature-grid";
import { EmptyState } from "@/components/ui/empty-state";
import { SelectField } from "@/components/ui/select-field";
import { CheckboxField } from "@/components/ui/checkbox-field";
import { InfoCard } from "@/components/ui/info-card";

export default function ExportManagerPage() {
  // Define features for the feature grid
  const exportFeatures = [
    {
      title: "JSON Export",
      description: "Export content as JSON files with a standard structure for easy integration",
      href: "/export-manager/json",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "SQLite Export",
      description: "Export content as an SQLite database for efficient querying and storage",
      href: "/export-manager/sqlite",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      )
    },
    {
      title: "Binary Export",
      description: "Export content as a binary package for maximum compression and performance",
      href: "/export-manager/binary",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "Custom Format",
      description: "Configure and create custom export formats for specific game engines or platforms",
      href: "/export-manager/custom",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      title: "Export History",
      description: "View and manage previous exports with options to download or delete",
      href: "/export-manager/history",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  return (
    <div>
      <PageHeader 
        title="Export Manager"
        description="Package content for use in games with multiple export formats and optimization options."
      />

      <FeatureGrid features={exportFeatures} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Quick Export</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <SelectField
                id="content-pack"
                label="Select Content Pack"
                options={[
                  { value: "", label: "Select a content pack" },
                  { value: "all", label: "All Content" }
                ]}
              />

              <SelectField
                id="export-format"
                label="Export Format"
                options={[
                  { value: "json", label: "JSON" },
                  { value: "sqlite", label: "SQLite" },
                  { value: "binary", label: "Binary" }
                ]}
                defaultValue="json"
              />

              <CheckboxField
                id="include-metadata"
                label="Include metadata"
                defaultChecked={true}
              />

              <CheckboxField
                id="optimize-size"
                label="Optimize for size"
                defaultChecked={true}
              />

              <Button

                onClick={() => alert('Export functionality would be implemented here')}
              >
                Export Content
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Exports</CardTitle>
          </CardHeader>
          <CardContent>
            <EmptyState
              message="No recent exports found."
              submessage="Use the export options to create your first export."
            />
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>About Export Manager</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose dark:prose-invert max-w-none">
            <p>
              The Export Manager allows you to package your procedural content for use in games or sharing with others.
              It supports multiple export formats and provides options for optimizing and customizing your exports.
            </p>

            <h3>Export Formats</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <InfoCard
                title="JSON Package"
                description="Export your content as JSON files with a standard structure. This format is easy to read and modify, making it ideal for development and debugging."
                className="border-(--border)"
              >
                <ul className="mt-2 text-(--muted-foreground) text-sm">
                  <li>✓ Human-readable format</li>
                  <li>✓ Easy to integrate with web applications</li>
                  <li>✓ Standard format with wide support</li>
                  <li>✗ Larger file size</li>
                  <li>✗ Slower parsing for large datasets</li>
                </ul>
              </InfoCard>

              <InfoCard
                title="SQLite Database"
                description="Export your content as an SQLite database for efficient querying and storage. This format is ideal for applications that need to query content dynamically."
                className="border-(--border)"
              >
                <ul className="mt-2 text-(--muted-foreground) text-sm">
                  <li>✓ Efficient querying with SQL</li>
                  <li>✓ Smaller file size than JSON</li>
                  <li>✓ Good for relational data</li>
                  <li>✗ Requires SQLite support in the target platform</li>
                  <li>✗ Less human-readable than JSON</li>
                </ul>
              </InfoCard>

              <InfoCard
                title="Binary Package"
                description="Export your content as a binary package for maximum compression and performance. This format is ideal for production environments where size and loading speed are critical."
                className="border-(--border)"
              >
                <ul className="mt-2 text-(--muted-foreground) text-sm">
                  <li>✓ Smallest file size</li>
                  <li>✓ Fastest loading and parsing</li>
                  <li>✓ Can include encryption for commercial content</li>
                  <li>✗ Not human-readable</li>
                  <li>✗ Requires custom parsing code</li>
                </ul>
              </InfoCard>

              <InfoCard
                title="Custom Format"
                description="Configure and create custom export formats for specific game engines or platforms. This allows you to tailor the export to your exact needs."
                className="border-(--border)"
              >
                <ul className="mt-2 text-(--muted-foreground) text-sm">
                  <li>✓ Tailored to specific requirements</li>
                  <li>✓ Can optimize for specific platforms</li>
                  <li>✓ Supports custom metadata and structures</li>
                  <li>✗ Requires more configuration</li>
                  <li>✗ May have limited compatibility</li>
                </ul>
              </InfoCard>
            </div>

            <h3 className="mt-6">Export Process</h3>
            <ol>
              <li>Select the content pack or individual templates to export</li>
              <li>Choose the export format that best suits your needs</li>
              <li>Configure export options such as metadata inclusion and optimization</li>
              <li>Generate the export package</li>
              <li>Download the package or view export details</li>
            </ol>

            <h3 className="mt-6">Game Integration</h3>
            <p>
              The exported content can be integrated into games using our reference implementations for popular game engines.
              These implementations provide APIs for loading and using the procedural content in your game.
            </p>
            <p>
              For custom integrations, refer to our documentation on the export format specifications and the procedural
              content API.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import Link from 'next/link';
import {TemplateCard} from "@/components/ui/template-card";
import {Card, CardHeader, CardTitle, CardContent, CardDescription} from "@/components/ui/card";
import {Button} from "@/components/ui/button";

const TemplateEditorPage = () => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-(--foreground) mb-2">Template Editor</h1>
        <p className="text-lg text-(--muted-foreground)">
          Create and edit procedural content templates with support for variables, conditions, and branching narratives.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <TemplateCard
          title="Encounters"
          description="Interactive scenarios with text, options, and outcomes"
          href="/template-editor/encounters"
          count={0}
        />
        <TemplateCard
          title="Locations"
          description="Places with descriptions, points of interest, and encounters"
          href="/template-editor/locations"
          count={0}
        />
        <TemplateCard
          title="NPCs"
          description="Characters with procedural names, appearances, personalities, and dialogue"
          href="/template-editor/npcs"
          count={0}
        />
        <TemplateCard
          title="Items"
          description="Objects with procedural properties and variations"
          href="/template-editor/items"
          count={0}
        />
        <TemplateCard
          title="Quests"
          description="Multi-step objectives with procedural elements"
          href="/template-editor/quests"
          count={0}
        />
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Recent Templates</CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <p className="text-(--muted-foreground)">No recent templates found.</p>
          <p className="mt-2 text-(--muted-foreground)">Create a new template to get started.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start">
            <div
              className="flex-shrink-0 h-8 w-8 rounded-full bg-(--primary) flex items-center justify-center text-(--primary-foreground) font-bold">1
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-(--foreground)">Choose a template type</h3>
              <p className="text-(--muted-foreground)">Select the type of content you want to create from the options
                above.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div
              className="flex-shrink-0 h-8 w-8 rounded-full bg-(--primary) flex items-center justify-center text-(--primary-foreground) font-bold">2
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-(--foreground)">Define template properties</h3>
              <p className="text-(--muted-foreground)">Set the basic metadata for your template, such as name,
                description, and tags.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div
              className="flex-shrink-0 h-8 w-8 rounded-full bg-(--primary) flex items-center justify-center text-(--primary-foreground) font-bold">3
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-(--foreground)">Add procedural content</h3>
              <p className="text-(--muted-foreground)">Create text with variable placeholders, conditional sections, and
                branching options.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div
              className="flex-shrink-0 h-8 w-8 rounded-full bg-(--primary) flex items-center justify-center text-(--primary-foreground) font-bold">4
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-(--foreground)">Test and refine</h3>
              <p className="text-(--muted-foreground)">Use the preview feature to see variations of your template and
                refine as needed.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default TemplateEditorPage;
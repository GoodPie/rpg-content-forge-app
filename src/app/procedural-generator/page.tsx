import Link from 'next/link';
import {FeatureCard} from "@/components/ui/feature-card";
import {Button} from "@/components/ui/button";
import { getAllEncounters } from '@/app/template-editor/encounters/actions';
import { RecentTemplates } from '@/components/features/templates/recent-templates';

const ProceduralGeneratorPage = async () => {
  // Fetch encounters for the recent templates section
  const encountersResponse = await getAllEncounters();
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Procedural Generator</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Preview and test variations of templates with tools for analyzing procedural potential and optimizing
          variation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <FeatureCard
          title="Text Variation Viewer"
          description="See dozens of variations of text elements with different variable combinations"
          href="/procedural-generator/text-variation"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7"/>
            </svg>
          }
        />
        <FeatureCard
          title="Structural Variation Analyzer"
          description="Visualize different narrative paths and branching options"
          href="/procedural-generator/structural-variation"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"/>
            </svg>
          }
        />
        <FeatureCard
          title="Conditional Logic Tester"
          description="Test how variables and conditions affect content generation"
          href="/procedural-generator/conditional-logic"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4"/>
            </svg>
          }
        />
        <FeatureCard
          title="Seed Explorer"
          description="Generate variations with different seeds and save interesting ones"
          href="/procedural-generator/seed-explorer"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          }
        />
        <FeatureCard
          title="Template Analyzer"
          description="Analyze the procedural potential of templates and identify areas for improvement"
          href="/procedural-generator/template-analyzer"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
            </svg>
          }
        />
      </div>

      <div className="mb-8">
        {/* Use the RecentTemplates component */}
        {encountersResponse.success && encountersResponse.encounters && (
          <RecentTemplates encounters={encountersResponse?.encounters} />
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Understanding Procedural
          Generation</h2>
        <div className="prose dark:prose-invert max-w-none">
          <p>
            Procedural generation allows you to create virtually unlimited content variations from a single template.
            The Procedural Generator provides tools to preview, test, and analyze these variations.
          </p>

          <h3>Key Concepts</h3>

          <h4>1. Text Variation</h4>
          <p>
            Replace variables with different text options to create unique descriptions and narratives.
            For example, &rdquo;You enter a <span>{"\"{{room_size}}\""}</span> <span>{"\"{{room_type}}\""}</span> could
            generate &rdquo;You enter a vast chamber&rdquo; or &rdquo;You enter a small cave.&rdquo;
          </p>

          <h4>2. Structural Variation</h4>
          <p>
            Create different paths and outcomes based on player choices or random selection.
            This allows for branching narratives and replayable content.
          </p>

          <h4>3. Conditional Logic</h4>
          <p>
            Show or hide content based on conditions like player stats, previous choices, or game state.
            This makes content responsive to the player&#39;s experience.
          </p>

          <h4>4. Seeds</h4>
          <p>
            A seed is a value that determines which random variations are selected.
            Using the same seed will always produce the same output, allowing for reproducible content.
          </p>

          <h3>Getting Started</h3>
          <ol>
            <li>Create a template in the Template Editor</li>
            <li>Use the Text Variation Viewer to see different text combinations</li>
            <li>Test conditional logic with the Conditional Logic Tester</li>
            <li>Explore different seeds to find interesting variations</li>
            <li>Analyze your template to identify areas for improvement</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default ProceduralGeneratorPage;

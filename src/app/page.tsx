import Link from "next/link";
import { FeatureCard } from "@/components/ui/feature-card";
import { PrincipleCard } from "@/components/ui/principle-card";

export default function Home() {
  return (
    <div className="">
      <section className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          RPG Content Forge
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          A comprehensive environment for developing procedurally generated content for text-based adventure games.
        </p>
        <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
          <p className="text-blue-800 dark:text-blue-200">
            Create virtually unlimited unique player experiences with a small amount of authored content through procedural generation.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
          Core Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            title="Template Editor"
            description="Create and edit procedural content templates with support for variables, conditions, and branching narratives."
            href="/template-editor"
          />
          <FeatureCard
            title="Procedural Generator"
            description="Preview and test variations of templates with tools for analyzing procedural potential."
            href="/procedural-generator"
          />
          <FeatureCard
            title="Content Simulator"
            description="Test content with the D20 system in simulated gameplay to ensure quality and balance."
            href="/content-simulator"
          />
          <FeatureCard
            title="Content Database"
            description="Store and organize all templates and assets with comprehensive metadata management."
            href="/content-database"
          />
          <FeatureCard
            title="Export Manager"
            description="Package content for use in games with multiple export formats and optimization options."
            href="/export-manager"
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
          Core Principles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <PrincipleCard
            title="Procedurality"
            description="All content is designed for maximum procedural variation"
          />
          <PrincipleCard
            title="Modularity"
            description="Content is organized in discrete, combinable packs"
          />
          <PrincipleCard
            title="Extensibility"
            description="The system can be expanded to support new content types"
          />
          <PrincipleCard
            title="Usability"
            description="Accessible for both technical and non-technical content creators"
          />
          <PrincipleCard
            title="Portability"
            description="Content packs can be exported in standard formats"
          />
          <PrincipleCard
            title="Collaboration"
            description="Support for team-based content development"
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
          Getting Started
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Select a feature from the sidebar to begin creating procedural content, or check out the documentation for more information.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/template-editor"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Start Creating
          </Link>
          <Link
            href="/docs"
            className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            View Documentation
          </Link>
        </div>
      </section>
    </div>
  );
}

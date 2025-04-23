import React from 'react';

/**
 * Reusable component for displaying template syntax help information
 */
export const TemplateSyntaxHelp = () => {
  return (
    <div className="mt-8 bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Template Syntax Help</h2>
      <div className="prose dark:prose-invert max-w-none">
        <h3>Variables</h3>
        <p>
          Use double curly braces to define a variable: {"{{"}<span className="font-mono">variable_name</span>{"}}"}
        </p>
        <p>
          Define variable options in a separate section or in the variable editor.
        </p>

        <h3>Conditions</h3>
        <p>
          Use conditions to show content only when certain criteria are met:
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-2 rounded">
          {`{{#if player_class == "wizard"}}
  You sense magical energies nearby.
{{else}}
  Nothing seems out of the ordinary.
{{/if}}`}
        </pre>

        <h3>Options</h3>
        <p>
          Define player choices with the options syntax:
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-2 rounded">
          {`[[options]]
  [[option title="Approach cautiously"]]
    You approach with careful steps...
  [[/option]]
  [[option title="Call out a greeting"]]
    You raise your voice in greeting...
  [[/option]]
[[/options]]`}
        </pre>
      </div>
    </div>
  );
};

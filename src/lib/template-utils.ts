// Utility functions for template variable parsing and replacement

/**
 * Parses variables from template content
 * @param content The template content to parse
 * @returns A record of variable names to arrays of possible values
 */
export const parseVariables = (content: string): Record<string, string[]> => {
  const variableRegex = /{{([^}]+)}}/g;
  const variables: Record<string, string[]> = {};

  // Find all variable definitions in the content
  const lines = content.split('\n');

  for (const line of lines) {
    // Check if line contains a variable definition
    if (line.trim().match(/^\s*([a-zA-Z0-9_]+):\s*\[(.*)\]\s*$/)) {
      const match = line.trim().match(/^\s*([a-zA-Z0-9_]+):\s*\[(.*)\]\s*$/);
      if (match) {
        const [, varName, varValues] = match;
        variables[varName] = varValues.split(',').map(v => v.trim());
      }
    }

    // Also check for variables in the text
    let match;
    while ((match = variableRegex.exec(content)) !== null) {
      const varName = match[1].trim();
      if (!variables[varName]) {
        variables[varName] = [];
      }
    }
  }

  return variables;
};

/**
 * Extracts the template text from content (first part before Variables section)
 * @param content The full template content
 * @returns The template text without variable definitions
 */
export const extractTemplateText = (content: string): string => {
  let templateText = content;
  const variablesIndex = content.indexOf('Variables:');
  if (variablesIndex !== -1) {
    templateText = content.substring(0, variablesIndex).trim();
  }
  return templateText;
};

/**
 * Simple seeded random number generator
 * @param seed The seed string
 * @param max The maximum value (exclusive)
 * @returns A number between 0 (inclusive) and max (exclusive)
 */
const seededRandom = (seed: string, max: number): number => {
  // Simple hash function to convert seed string to a number
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash) + seed.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  // Use the hash to generate a number between 0 and max
  return Math.abs(hash % max);
};

/**
 * Replaces variables in a template with random values from their arrays
 * @param template The template text with variables
 * @param variables A record of variable names to arrays of possible values
 * @param seed Optional seed for random number generation
 * @returns The template with variables replaced with random values
 */
export const replaceVariables = (
  template: string, 
  variables: Record<string, string[]>,
  seed?: string
): string => {
  let result = template;

  // Replace each variable with a random value from its array
  for (const [varName, values] of Object.entries(variables)) {
    if (values.length > 0) {
      let randomValue;

      if (seed) {
        // Use seeded random if seed is provided
        const seedForVar = `${seed}-${varName}`;
        const randomIndex = seededRandom(seedForVar, values.length);
        randomValue = values[randomIndex];
      } else {
        // Use regular random if no seed is provided
        randomValue = values[Math.floor(Math.random() * values.length)];
      }

      const regex = new RegExp(`{{${varName}}}`, 'g');
      result = result.replace(regex, randomValue);
    }
  }

  return result;
};

/**
 * Generates multiple variations of a template
 * @param templateText The template text with variables
 * @param variables A record of variable names to arrays of possible values
 * @param count The number of variations to generate
 * @param seed Optional seed for random number generation
 * @returns An array of template variations
 */
export const generateVariations = (
  templateText: string,
  variables: Record<string, string[]>,
  count: number,
  seed?: string
): string[] => {
  const variations: string[] = [];

  for (let i = 0; i < count; i++) {
    // If seed is provided, make it unique for each variation
    const variationSeed = seed ? `${seed}-variation-${i}` : undefined;
    const variation = replaceVariables(templateText, variables, variationSeed);
    variations.push(variation);
  }

  return variations;
};

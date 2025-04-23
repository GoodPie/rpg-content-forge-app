'use client';

import { useState } from 'react';
import Link from 'next/link';
import {Button} from "@/components/ui/button";

export default function TextVariationPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [variationCount, setVariationCount] = useState<number>(5);
  const [seed, setSeed] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [variations, setVariations] = useState<string[]>([]);
  
  // Mock templates - in a real app, these would come from an API or database
  const templates = [
    { id: 'forest_stranger', name: 'Forest Stranger Encounter' },
    { id: 'abandoned_mine', name: 'Abandoned Mine Location' },
    { id: 'village_elder', name: 'Village Elder NPC' },
  ];
  
  const handleGenerate = () => {
    if (!selectedTemplate) return;
    
    setIsGenerating(true);
    
    // Simulate API call to generate variations
    setTimeout(() => {
      // Mock variations based on the selected template
      let generatedVariations: string[] = [];
      
      if (selectedTemplate === 'forest_stranger') {
        const movementVerbs = ['walk', 'trek', 'journey', 'make your way', 'wander'];
        const forestStates = ['dim', 'misty', 'dense', 'shadowy', 'sunlit', 'ancient', 'quiet'];
        const discoveryVerbs = ['spot', 'notice', 'catch sight of', 'observe', 'come across'];
        const strangers = ['a hooded figure', 'an old man sitting on a stump', 'a wounded traveler', 'a merchant resting from the road'];
        const landmarks = ['a small campfire', 'a strange stone formation', 'an ancient tree', 'a small clearing'];
        
        for (let i = 0; i < variationCount; i++) {
          const movementVerb = movementVerbs[Math.floor(Math.random() * movementVerbs.length)];
          const forestState = forestStates[Math.floor(Math.random() * forestStates.length)];
          const discoveryVerb = discoveryVerbs[Math.floor(Math.random() * discoveryVerbs.length)];
          const stranger = strangers[Math.floor(Math.random() * strangers.length)];
          const landmark = landmarks[Math.floor(Math.random() * landmarks.length)];
          
          generatedVariations.push(`As you ${movementVerb} through the ${forestState} forest, you ${discoveryVerb} ${stranger} near ${landmark}.`);
        }
      } else if (selectedTemplate === 'abandoned_mine') {
        const adjectives = ['Abandoned', 'Lost', 'Forgotten', 'Ancient', 'Haunted', 'Collapsed'];
        const mineTypes = ['Mine', 'Dig', 'Excavation', 'Quarry', 'Pit', 'Delve', 'Shaft'];
        const entranceDescs = [
          'Mining equipment lies scattered about, covered in years of dust.',
          'Wooden supports rot around the entrance, threatening collapse.',
          'Cart tracks disappear into the dark maw of the mine.',
          'The entrance is partially collapsed, leaving only a narrow passage.'
        ];
        const interiorDescs = [
          'The tunnel leads into darkness punctuated by the sound of dripping water.',
          'A musty smell emanates from the depths of the shaft.',
          'The walls glitter faintly with remnants of mineral deposits.',
          'Distant echoes suggest vast chambers deep within.'
        ];
        
        for (let i = 0; i < variationCount; i++) {
          const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
          const mineType = mineTypes[Math.floor(Math.random() * mineTypes.length)];
          const entranceDesc = entranceDescs[Math.floor(Math.random() * entranceDescs.length)];
          const interiorDesc = interiorDescs[Math.floor(Math.random() * interiorDescs.length)];
          
          generatedVariations.push(`The ${adjective} ${mineType} looms before you. ${entranceDesc} ${interiorDesc}`);
        }
      } else if (selectedTemplate === 'village_elder') {
        const ageDescs = [
          'Gray-haired and stooped with age,',
          'Despite advanced years, still hale and strong,',
          'With deeply lined face and wise eyes,',
          'White-bearded and ancient,'
        ];
        const buildDescs = [
          'of slight build but dignified bearing,',
          'sturdy and weathered by a lifetime of work,',
          'thin but surprisingly spry,',
          'with gnarled hands that speak of decades of labor,'
        ];
        const features = [
          'eyes that twinkle with hidden knowledge,',
          'a face marked with the wrinkles of frequent smiles,',
          'a prominent scar from some long-ago trial,',
          'an ornate walking staff always in hand,'
        ];
        const clothing = [
          'dressed in simple but well-maintained clothes.',
          'wearing garments that reflect local traditions.',
          'adorned with symbols of office and authority.',
          'wearing practical, mended clothing that speaks of hard times.'
        ];
        
        for (let i = 0; i < variationCount; i++) {
          const ageDesc = ageDescs[Math.floor(Math.random() * ageDescs.length)];
          const buildDesc = buildDescs[Math.floor(Math.random() * buildDescs.length)];
          const feature = features[Math.floor(Math.random() * features.length)];
          const clothingDesc = clothing[Math.floor(Math.random() * clothing.length)];
          
          generatedVariations.push(`${ageDesc} ${buildDesc} with ${feature} ${clothingDesc}`);
        }
      }
      
      setVariations(generatedVariations);
      setIsGenerating(false);
    }, 1000);
  };
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Text Variation Viewer</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Generate and view multiple variations of text elements with different variable combinations.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-6">
            <div>
              <label htmlFor="template" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select Template
              </label>
              <select
                id="template"
                value={selectedTemplate}
                onChange={(e) => setSelectedTemplate(e.target.value)}
                className="block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-white"
              >
                <option value="">Select a template</option>
                {templates.map((template) => (
                  <option key={template.id} value={template.id}>
                    {template.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="count" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Number of Variations
              </label>
              <input
                type="number"
                id="count"
                min={1}
                max={20}
                value={variationCount}
                onChange={(e) => setVariationCount(parseInt(e.target.value) || 5)}
                className="block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-white"
              />
            </div>
            
            <div>
              <label htmlFor="seed" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Seed (Optional)
              </label>
              <input
                type="text"
                id="seed"
                value={seed}
                onChange={(e) => setSeed(e.target.value)}
                placeholder="Leave blank for random seed"
                className="block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-white"
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Using the same seed will generate the same variations.
              </p>
            </div>
            
            <div>
              <Button
                onClick={handleGenerate}
                disabled={!selectedTemplate || isGenerating}>
                {isGenerating ? 'Generating...' : 'Generate Variations'}
              </Button>
            </div>
          </div>
          
          <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Template Variables</h2>
            {selectedTemplate === 'forest_stranger' && (
              <div className="space-y-2">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">movement_verb:</span> walk, trek, journey, make your way, wander
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">forest_state:</span> dim, misty, dense, shadowy, sunlit, ancient, quiet
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">discovery_verb:</span> spot, notice, catch sight of, observe, come across
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">a_stranger:</span> a hooded figure, an old man sitting on a stump, a wounded traveler, a merchant resting from the road
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">a_landmark:</span> a small campfire, a strange stone formation, an ancient tree, a small clearing
                </p>
              </div>
            )}
            {selectedTemplate === 'abandoned_mine' && (
              <div className="space-y-2">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">adjective:</span> Abandoned, Lost, Forgotten, Ancient, Haunted, Collapsed
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">mine_type:</span> Mine, Dig, Excavation, Quarry, Pit, Delve, Shaft
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">entrance_desc:</span> Various descriptions of the mine entrance
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">interior_desc:</span> Various descriptions of the mine interior
                </p>
              </div>
            )}
            {selectedTemplate === 'village_elder' && (
              <div className="space-y-2">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">age_description:</span> Various descriptions of the elder's age
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">build_description:</span> Various descriptions of the elder's build
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">distinctive_feature:</span> Various distinctive features
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">clothing_description:</span> Various clothing descriptions
                </p>
              </div>
            )}
            {!selectedTemplate && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Select a template to see its variables.
              </p>
            )}
          </div>
        </div>
        
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Generated Variations</h2>
            
            {variations.length > 0 ? (
              <div className="space-y-4">
                {variations.map((variation, index) => (
                  <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-gray-800 dark:text-gray-200">{variation}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400">
                  {isGenerating ? 'Generating variations...' : 'Select a template and click "Generate Variations" to see text variations.'}
                </p>
              </div>
            )}
          </div>
          
          <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Tips for Text Variation</h2>
            <div className="prose dark:prose-invert max-w-none">
              <ul>
                <li>Use variables for elements that should change between variations</li>
                <li>Create diverse options for each variable to increase variety</li>
                <li>Consider conditional variations based on context (time of day, location, etc.)</li>
                <li>Use nested variables for even more variation</li>
                <li>Save seeds that produce particularly good variations</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
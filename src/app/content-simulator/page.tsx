import Link from 'next/link';
import {FeatureCard} from "@/components/ui/feature-card";
import {Button} from "@/components/ui/button";

export default function ContentSimulatorPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Content Simulator</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Test content with the D20 system in simulated gameplay to ensure quality and balance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <FeatureCard
          title="Character Sheet"
          description="Create and manage character profiles for testing content with different character types"
          href="/content-simulator/character"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
          }
        />
        <FeatureCard
          title="Inventory"
          description="Manage items and equipment for testing how they affect gameplay"
          href="/content-simulator/inventory"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/>
            </svg>
          }
        />
        <FeatureCard
          title="Journal"
          description="Track quests, notes, and other information during simulation"
          href="/content-simulator/journal"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
            </svg>
          }
        />
        <FeatureCard
          title="Run Simulation"
          description="Play through content in a simulated environment to test gameplay experience"
          href="/content-simulator/simulation"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          }
        />
        <FeatureCard
          title="Dice Roller"
          description="Test probability and randomness with virtual dice for D20 system mechanics"
          href="/content-simulator/dice"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
            </svg>
          }
        />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Simulations</h2>
        <div className="text-gray-600 dark:text-gray-400 text-center py-8">
          <p>No recent simulations found.</p>
          <p className="mt-2">Create a character and start a simulation to test your content.</p>

          <Button asChild>
            <Link href="/content-simulator/character">
              Create Character
            </Link>
          </Button>

        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">About Content Simulation</h2>
          <div className="prose dark:prose-invert max-w-none">
            <p>
              The Content Simulator allows you to test your procedural content in a simulated gameplay environment.
              This helps ensure that your content is balanced, engaging, and functions as expected in the game.
            </p>

            <h3>Key Features</h3>
            <ul>
              <li><strong>Character Creation:</strong> Create test characters with different attributes, classes, and
                backgrounds
              </li>
              <li><strong>Inventory Management:</strong> Test how items and equipment affect gameplay</li>
              <li><strong>Journal System:</strong> Track quests, notes, and other information during simulation</li>
              <li><strong>Dice Rolling:</strong> Test probability and randomness with virtual dice</li>
              <li><strong>Interactive Simulation:</strong> Play through content as if in a real game</li>
            </ul>

            <h3>Benefits of Simulation</h3>
            <ul>
              <li>Identify balance issues before they reach players</li>
              <li>Test how different character types experience your content</li>
              <li>Ensure procedural variations maintain quality and coherence</li>
              <li>Verify that conditional content triggers correctly</li>
              <li>Test the overall flow and pacing of your content</li>
            </ul>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">D20 System Overview</h2>
          <div className="prose dark:prose-invert max-w-none">
            <p>
              The Content Simulator uses the D20 system, a tabletop role-playing game mechanic that forms the basis
              for many popular games. Understanding this system will help you create balanced content.
            </p>

            <h3>Core Mechanics</h3>
            <ul>
              <li><strong>Ability Scores:</strong> Strength, Dexterity, Constitution, Intelligence, Wisdom, Charisma
              </li>
              <li><strong>Skill Checks:</strong> Roll d20 + skill modifier vs. difficulty class (DC)</li>
              <li><strong>Attack Rolls:</strong> Roll d20 + attack bonus vs. armor class (AC)</li>
              <li><strong>Saving Throws:</strong> Roll d20 + save modifier vs. difficulty class (DC)</li>
            </ul>

            <h3>Difficulty Classes</h3>
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
              <tr>
                <th
                  className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Difficulty
                </th>
                <th
                  className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">DC
                </th>
                <th
                  className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Example
                  Task
                </th>
              </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td className="px-4 py-2 text-sm">Very Easy</td>
                <td className="px-4 py-2 text-sm">5</td>
                <td className="px-4 py-2 text-sm">Climb a knotted rope</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-sm">Easy</td>
                <td className="px-4 py-2 text-sm">10</td>
                <td className="px-4 py-2 text-sm">Hear an approaching guard</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-sm">Medium</td>
                <td className="px-4 py-2 text-sm">15</td>
                <td className="px-4 py-2 text-sm">Leap across a 10-foot chasm</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-sm">Hard</td>
                <td className="px-4 py-2 text-sm">20</td>
                <td className="px-4 py-2 text-sm">Break down a wooden door</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-sm">Very Hard</td>
                <td className="px-4 py-2 text-sm">25</td>
                <td className="px-4 py-2 text-sm">Swim against a strong current</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-sm">Nearly Impossible</td>
                <td className="px-4 py-2 text-sm">30</td>
                <td className="px-4 py-2 text-sm">Track a creature across solid stone</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}


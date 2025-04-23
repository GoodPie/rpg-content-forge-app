import Link from 'next/link';

export default function ExportManagerPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Export Manager</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Package content for use in games with multiple export formats and optimization options.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <FeatureCard 
          title="JSON Export" 
          description="Export content as JSON files with a standard structure for easy integration"
          href="/export-manager/json"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          }
        />
        <FeatureCard 
          title="SQLite Export" 
          description="Export content as an SQLite database for efficient querying and storage"
          href="/export-manager/sqlite"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
            </svg>
          }
        />
        <FeatureCard 
          title="Binary Export" 
          description="Export content as a binary package for maximum compression and performance"
          href="/export-manager/binary"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          }
        />
        <FeatureCard 
          title="Custom Format" 
          description="Configure and create custom export formats for specific game engines or platforms"
          href="/export-manager/custom"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          }
        />
        <FeatureCard 
          title="Export History" 
          description="View and manage previous exports with options to download or delete"
          href="/export-manager/history"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Quick Export</h2>
            <div className="space-y-6">
              <div>
                <label htmlFor="content-pack" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Select Content Pack
                </label>
                <select
                  id="content-pack"
                  className="block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-white"
                >
                  <option value="">Select a content pack</option>
                  <option value="all">All Content</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="export-format" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Export Format
                </label>
                <select
                  id="export-format"
                  className="block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-white"
                >
                  <option value="json">JSON</option>
                  <option value="sqlite">SQLite</option>
                  <option value="binary">Binary</option>
                </select>
              </div>
              
              <div className="flex items-center">
                <input
                  id="include-metadata"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  defaultChecked
                />
                <label htmlFor="include-metadata" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Include metadata
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  id="optimize-size"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  defaultChecked
                />
                <label htmlFor="optimize-size" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Optimize for size
                </label>
              </div>
              
              <button
                type="button"
                className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => alert('Export functionality would be implemented here')}
              >
                Export Content
              </button>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Exports</h2>
          <div className="text-gray-600 dark:text-gray-400 text-center py-8">
            <p>No recent exports found.</p>
            <p className="mt-2">Use the export options to create your first export.</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">About Export Manager</h2>
        <div className="prose dark:prose-invert max-w-none">
          <p>
            The Export Manager allows you to package your procedural content for use in games or sharing with others.
            It supports multiple export formats and provides options for optimizing and customizing your exports.
          </p>
          
          <h3>Export Formats</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">JSON Package</h4>
              <p className="text-gray-600 dark:text-gray-400">
                Export your content as JSON files with a standard structure. This format is easy to read and modify,
                making it ideal for development and debugging.
              </p>
              <ul className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
                <li>✓ Human-readable format</li>
                <li>✓ Easy to integrate with web applications</li>
                <li>✓ Standard format with wide support</li>
                <li>✗ Larger file size</li>
                <li>✗ Slower parsing for large datasets</li>
              </ul>
            </div>
            
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">SQLite Database</h4>
              <p className="text-gray-600 dark:text-gray-400">
                Export your content as an SQLite database for efficient querying and storage. This format is ideal
                for applications that need to query content dynamically.
              </p>
              <ul className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
                <li>✓ Efficient querying with SQL</li>
                <li>✓ Smaller file size than JSON</li>
                <li>✓ Good for relational data</li>
                <li>✗ Requires SQLite support in the target platform</li>
                <li>✗ Less human-readable than JSON</li>
              </ul>
            </div>
            
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Binary Package</h4>
              <p className="text-gray-600 dark:text-gray-400">
                Export your content as a binary package for maximum compression and performance. This format is ideal
                for production environments where size and loading speed are critical.
              </p>
              <ul className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
                <li>✓ Smallest file size</li>
                <li>✓ Fastest loading and parsing</li>
                <li>✓ Can include encryption for commercial content</li>
                <li>✗ Not human-readable</li>
                <li>✗ Requires custom parsing code</li>
              </ul>
            </div>
            
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Custom Format</h4>
              <p className="text-gray-600 dark:text-gray-400">
                Configure and create custom export formats for specific game engines or platforms. This allows you
                to tailor the export to your exact needs.
              </p>
              <ul className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
                <li>✓ Tailored to specific requirements</li>
                <li>✓ Can optimize for specific platforms</li>
                <li>✓ Supports custom metadata and structures</li>
                <li>✗ Requires more configuration</li>
                <li>✗ May have limited compatibility</li>
              </ul>
            </div>
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
      </div>
    </div>
  );
}

function FeatureCard({ title, description, href, icon }: { title: string; description: string; href: string; icon: React.ReactNode }) {
  return (
    <Link href={href} className="block group">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-md transition-shadow h-full">
        <div className="flex items-center mb-4">
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300">
            {icon}
          </div>
          <h3 className="ml-4 text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {title}
          </h3>
        </div>
        <p className="text-gray-600 dark:text-gray-400">{description}</p>
      </div>
    </Link>
  );
}
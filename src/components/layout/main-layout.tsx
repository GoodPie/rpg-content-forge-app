'use client';

import { ReactNode, useState } from 'react';
import { Header } from './header';
import { Sidebar } from './sidebar';

/**
 * Main layout component that combines header and sidebar
 * Provides a consistent layout for all pages in the application
 */
export function MainLayout({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar toggle button for mobile */}
        <button
          className="md:hidden fixed bottom-4 right-4 z-10 p-2 rounded-full bg-blue-500 text-white shadow-lg"
          onClick={toggleSidebar}
          aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isSidebarOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
        
        {/* Sidebar */}
        <div 
          className={`${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 transition-transform duration-300 ease-in-out fixed md:static inset-y-0 left-0 z-20 md:z-0 pt-16 md:pt-0 w-64 md:w-64 bg-gray-50 dark:bg-gray-800 md:h-[calc(100vh-4rem)] overflow-y-auto`}
        >
          <Sidebar />
        </div>
        
        {/* Main content */}
        <main className={`flex-1 p-4 md:p-8 pt-20 md:pt-8 overflow-y-auto transition-all duration-300 ease-in-out`}>
          {children}
        </main>
        
        {/* Overlay for mobile sidebar */}
        {isSidebarOpen && (
          <div 
            className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-10"
            onClick={() => setIsSidebarOpen(false)}
            aria-hidden="true"
          />
        )}
      </div>
    </div>
  );
}
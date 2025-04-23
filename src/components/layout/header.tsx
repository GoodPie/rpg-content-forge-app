'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';
import { mainNavigationItems, DesktopNavLink, MobileNavLink } from './navigation-links';

/**
 * Header component for the application
 * Includes navigation links and responsive menu
 */
export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname() || '';

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-(--background) shadow-sm">
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16">
          <div className="flex justify-start">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-(--foreground)">
                Content Creation Tool
              </Link>
            </div>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:ml-6 md:flex md:space-x-8">
            {mainNavigationItems.map((item) => (
              <DesktopNavLink 
                key={item.href}
                item={item}
                isActive={pathname.startsWith(item.href)}
              />
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <Button
              className="inline-flex items-center justify-center p-2 rounded-md text-(--muted-foreground) hover:text-(--foreground) hover:bg-(--accent)"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed */}
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Icon when menu is open */}
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div
        className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}
        id="mobile-menu"
      >
        <div className="pt-2 pb-3 space-y-1">
          {mainNavigationItems.map((item) => (
            <MobileNavLink 
              key={item.href}
              item={item}
              isActive={pathname.startsWith(item.href)}
            />
          ))}
        </div>
      </div>
    </header>
  );
}

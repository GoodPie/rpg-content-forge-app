import { useState } from 'react';

/**
 * Custom hook for managing tab state
 * @param defaultTab - The default active tab
 * @returns An object containing the active tab and a function to change it
 */
export const useTabs = <T extends string>(defaultTab: T) => {
  const [activeTab, setActiveTab] = useState<T>(defaultTab);

  const handleTabChange = (tab: T) => {
    setActiveTab(tab);
  };

  return { activeTab, handleTabChange };
};
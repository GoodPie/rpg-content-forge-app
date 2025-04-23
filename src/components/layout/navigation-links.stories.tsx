import type { Meta, StoryObj } from "@storybook/react";
import { DesktopNavLink, MobileNavLink, SidebarNavLink, NavigationItem } from "./navigation-links";

// Sample navigation item for stories
const sampleItem: NavigationItem = {
  href: "#",
  label: "Sample Link"
};

const meta = {
  title: "Layout/NavigationLinks",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

// DesktopNavLink stories
type DesktopNavLinkStory = StoryObj<typeof DesktopNavLink>;

export const DesktopNavLinkActive: DesktopNavLinkStory = {
  name: "Desktop Nav Link (Active)",
  render: () => (
    <DesktopNavLink item={sampleItem} isActive={true} />
  ),
};

export const DesktopNavLinkInactive: DesktopNavLinkStory = {
  name: "Desktop Nav Link (Inactive)",
  render: () => (
    <DesktopNavLink item={sampleItem} isActive={false} />
  ),
};

// MobileNavLink stories
type MobileNavLinkStory = StoryObj<typeof MobileNavLink>;

export const MobileNavLinkActive: MobileNavLinkStory = {
  name: "Mobile Nav Link (Active)",
  render: () => (
    <MobileNavLink item={sampleItem} isActive={true} />
  ),
};

export const MobileNavLinkInactive: MobileNavLinkStory = {
  name: "Mobile Nav Link (Inactive)",
  render: () => (
    <MobileNavLink item={sampleItem} isActive={false} />
  ),
};

// SidebarNavLink stories
type SidebarNavLinkStory = StoryObj<typeof SidebarNavLink>;

export const SidebarNavLinkActive: SidebarNavLinkStory = {
  name: "Sidebar Nav Link (Active)",
  render: () => (
    <SidebarNavLink item={sampleItem} isActive={true} />
  ),
};

export const SidebarNavLinkInactive: SidebarNavLinkStory = {
  name: "Sidebar Nav Link (Inactive)",
  render: () => (
    <SidebarNavLink item={sampleItem} isActive={false} />
  ),
};

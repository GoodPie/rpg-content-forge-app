import type { Meta, StoryObj } from "@storybook/react";
import { FeatureCard } from "./feature-card";

const meta: Meta<typeof FeatureCard> = {
  title: "UI/FeatureCard",
  component: FeatureCard,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FeatureCard>;

export const Default: Story = {
  args: {
    title: "Template Editor",
    description: "Create and manage templates for procedural content generation.",
    href: "/template-editor",
  },
};

export const WithIcon: Story = {
  args: {
    title: "Content Simulator",
    description: "Simulate how your content will appear in different contexts and scenarios.",
    href: "/content-simulator",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
};

export const LongDescription: Story = {
  args: {
    title: "Procedural Generator",
    description: "Generate dynamic content using procedural algorithms. This is a longer description that demonstrates how the card handles more text content and wraps it appropriately.",
    href: "/procedural-generator",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
        <line x1="16" y1="8" x2="2" y2="22" />
        <line x1="17.5" y1="15" x2="9" y2="15" />
      </svg>
    ),
  },
};
import type { Meta, StoryObj } from "@storybook/react";
import { MainLayout } from "./main-layout";

const meta: Meta<typeof MainLayout> = {
  title: "Layout/MainLayout",
  component: MainLayout,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MainLayout>;

export const Default: Story = {
  args: {
    children: (
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4">Page Content</h1>
        <p className="mb-4">This is an example of content that would be displayed in the main area.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">Panel 1</div>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">Panel 2</div>
        </div>
      </div>
    ),
  },
};
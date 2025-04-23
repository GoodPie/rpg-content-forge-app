import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "outline", "secondary", "ghost", "link", "primary"],
    },
    size: {
      control: "select",
      options: ["default", "sm", "md", "lg", "icon"],
    },
    isLoading: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
    asChild: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Button",
    variant: "default",
    size: "default",
  },
};

export const Primary: Story = {
  args: {
    children: "Primary Button",
    variant: "primary",
    size: "default",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary Button",
    variant: "secondary",
    size: "default",
  },
};

export const Outline: Story = {
  args: {
    children: "Outline Button",
    variant: "outline",
    size: "default",
  },
};

export const Ghost: Story = {
  args: {
    children: "Ghost Button",
    variant: "ghost",
    size: "default",
  },
};

export const Link: Story = {
  args: {
    children: "Link Button",
    variant: "link",
    size: "default",
  },
};

export const Destructive: Story = {
  args: {
    children: "Destructive Button",
    variant: "destructive",
    size: "default",
  },
};

export const Small: Story = {
  args: {
    children: "Small Button",
    size: "sm",
  },
};

export const Medium: Story = {
  args: {
    children: "Medium Button",
    size: "md",
  },
};

export const Large: Story = {
  args: {
    children: "Large Button",
    size: "lg",
  },
};

export const Icon: Story = {
  args: {
    children: "🔍",
    size: "icon",
  },
};

export const Loading: Story = {
  args: {
    children: "Loading Button",
    isLoading: true,
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled Button",
    disabled: true,
  },
};

export const WithLeftIcon: Story = {
  args: {
    children: "Button with Left Icon",
    leftIcon: "🔍",
  },
};

export const WithRightIcon: Story = {
  args: {
    children: "Button with Right Icon",
    rightIcon: "→",
  },
};
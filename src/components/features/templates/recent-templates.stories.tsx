import type { Meta, StoryObj } from "@storybook/react";
import { RecentTemplates } from "./recent-templates";

const meta: Meta<typeof RecentTemplates> = {
  title: "Features/Templates/RecentTemplates",
  component: RecentTemplates,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof RecentTemplates>;

// Mock encounters for the stories
const mockEncounters = [
  {
    id: "1",
    name: "Forest Stranger Encounter",
    description: "An encounter with a mysterious stranger in the forest",
    content: "As you {{movement_verb}} through the {{forest_state}} forest, you {{discovery_verb}} {{a_stranger}} near {{a_landmark}}.",
    tags: [
      { id: "1", name: "forest" },
      { id: "2", name: "npc" },
      { id: "3", name: "level1-5" },
    ],
  },
  {
    id: "2",
    name: "Abandoned Mine",
    description: "An exploration of an abandoned mine with potential dangers",
    content: "The {{adjective}} {{mine_type}} looms before you. {{entrance_desc}} {{interior_desc}}",
    tags: [
      { id: "4", name: "dungeon" },
      { id: "5", name: "exploration" },
      { id: "6", name: "level3-7" },
    ],
  },
  {
    id: "3",
    name: "Village Elder",
    description: "A conversation with a wise village elder who may have information",
    content: "{{age_desc}} {{build_desc}} with {{feature}} {{clothing}}",
    tags: [
      { id: "7", name: "npc" },
      { id: "8", name: "village" },
      { id: "9", name: "quest-giver" },
    ],
  },
];

export const Default: Story = {
  args: {
    encounters: mockEncounters,
    maxItems: 5,
  },
};

export const Empty: Story = {
  args: {
    encounters: [],
    maxItems: 5,
  },
};

export const SingleItem: Story = {
  args: {
    encounters: [mockEncounters[0]],
    maxItems: 5,
  },
};

export const LimitedItems: Story = {
  args: {
    encounters: mockEncounters,
    maxItems: 2,
  },
};
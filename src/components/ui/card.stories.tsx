import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, CardAction } from "./card";
import { Button } from "./button";

const meta: Meta<typeof Card> = {
  title: "UI/Card",
  component: Card,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content goes here. This is where the main content of the card is displayed.</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  ),
};

export const WithAction: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card with Action</CardTitle>
        <CardDescription>This card has an action button</CardDescription>
        <CardAction>
          <Button variant="outline" size="sm">Action</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>Card content with an action button in the header.</p>
      </CardContent>
      <CardFooter className="justify-between">
        <Button variant="outline" size="sm">Cancel</Button>
        <Button size="sm">Submit</Button>
      </CardFooter>
    </Card>
  ),
};

export const SimpleCard: Story = {
  render: () => (
    <Card className="w-[350px] p-6">
      <h3 className="text-lg font-semibold">Simple Card</h3>
      <p className="mt-2">A simple card without using the sub-components.</p>
    </Card>
  ),
};
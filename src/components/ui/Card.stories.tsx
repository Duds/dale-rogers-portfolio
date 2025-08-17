import type { Meta, StoryObj } from "@storybook/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./Card";
import { Button } from "./Button";

const meta: Meta<typeof Card> = {
  title: "UI/Card",
  component: Card,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A flexible card component with header, content, and footer sections.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: { type: "text" },
      description: "Additional CSS classes to apply to the card",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          This is the main content of the card. You can put any content here.
        </p>
      </CardContent>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
  ),
};

export const WithImage: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Featured Project</CardTitle>
        <CardDescription>Service Design Case Study</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="aspect-video bg-muted rounded-md mb-4"></div>
        <p>
          This card demonstrates how to include images or other media content
          within the card structure.
        </p>
      </CardContent>
      <CardFooter className="justify-between">
        <Button variant="outline">View Details</Button>
        <Button>Contact</Button>
      </CardFooter>
    </Card>
  ),
};

export const StatsCard: Story = {
  render: () => (
    <Card className="w-[200px] text-center">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">85%</CardTitle>
        <CardDescription>Success Rate</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Projects completed successfully
        </p>
      </CardContent>
    </Card>
  ),
};

export const ProfileCard: Story = {
  render: () => (
    <Card className="w-[300px]">
      <CardHeader className="text-center">
        <div className="w-20 h-20 bg-muted rounded-full mx-auto mb-4"></div>
        <CardTitle>Dale Rogers</CardTitle>
        <CardDescription>Service Design Consultant</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Experience:</span>
            <span className="text-sm font-medium">15+ years</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Specialties:</span>
            <span className="text-sm font-medium">UX, Strategy</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-center">
        <Button variant="outline" className="w-full">
          View Portfolio
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const ContentOnly: Story = {
  render: () => (
    <Card className="w-[400px]">
      <CardContent className="pt-6">
        <p className="text-lg leading-relaxed">
          This is a card with only content, no header or footer. Useful for
          simple content display or when you want to customize the layout
          completely.
        </p>
      </CardContent>
    </Card>
  ),
};

export const InteractiveCard: Story = {
  render: () => (
    <Card className="w-[350px] cursor-pointer hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle>Interactive Card</CardTitle>
        <CardDescription>Hover to see the effect</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This card demonstrates interactive states and hover effects.</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Click Me</Button>
      </CardFooter>
    </Card>
  ),
};

export const AllCardComponents: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>Header Section</CardTitle>
          <CardDescription>Contains title and description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Content section for main information</p>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            Footer for actions or metadata
          </p>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Another Card</CardTitle>
          <CardDescription>Showing different content</CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            You can compose cards in many different ways to create rich layouts.
          </p>
        </CardContent>
        <CardFooter>
          <Button>Primary Action</Button>
        </CardFooter>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Multiple cards showing different compositions and layouts.",
      },
    },
  },
};

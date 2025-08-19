import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./Card";

const meta: Meta<typeof Card> = {
  title: "UI/Card",
  component: Card,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A versatile card component that can display content with optional clickable functionality and various styling options.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: { type: "text" },
      description: "The title displayed at the top of the card",
    },
    clickable: {
      control: { type: "boolean" },
      description: "Whether the card should appear clickable with hover effects",
    },
    href: {
      control: { type: "text" },
      description: "Optional URL to make the card a link",
    },
    class: {
      control: { type: "text" },
      description: "Additional CSS classes to apply to the card",
    },
    children: {
      control: { type: "text" },
      description: "The content to display inside the card",
    },
  },
  args: {
    title: "Card Title",
    clickable: false,
    href: undefined,
    class: "",
    children: "This is the card content. It can contain any HTML elements, text, or other components.",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Default Card",
  },
};

export const WithLongTitle: Story = {
  args: {
    title: "This is a very long card title that might wrap to multiple lines to test how the component handles longer text",
  },
};

export const NoTitle: Story = {
  args: {
    title: undefined,
  },
};

export const Clickable: Story = {
  args: {
    clickable: true,
    title: "Clickable Card",
  },
};

export const AsLink: Story = {
  args: {
    href: "#",
    title: "Link Card",
    children: "This card acts as a link. Click to navigate.",
  },
};

export const WithRichContent: Story = {
  render: (args) => (
    <Card {...args}>
      <div className="space-y-4">
        <p className="text-gray-600">
          This card contains rich content with multiple elements.
        </p>
        <div className="flex gap-2">
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">Tag 1</span>
          <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">Tag 2</span>
        </div>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Action Button
        </button>
      </div>
    </Card>
  ),
  args: {
    title: "Rich Content Card",
  },
};

export const CaseStudyCard: Story = {
  render: (args) => (
    <Card {...args}>
      <div className="space-y-4">
        <div className="aspect-video bg-gray-200 rounded"></div>
        <h3 className="text-xl font-semibold">Case Study Title</h3>
        <p className="text-gray-600">
          Brief description of the case study and the outcomes achieved.
        </p>
        <div className="flex gap-2">
          <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-sm">Service Design</span>
          <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-sm">Strategy</span>
        </div>
      </div>
    </Card>
  ),
  args: {
    title: "Case Study",
    clickable: true,
  },
};

export const ServiceCard: Story = {
  render: (args) => (
    <Card {...args}>
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-purple-100 rounded-full mx-auto flex items-center justify-center">
          <span className="text-2xl">🎯</span>
        </div>
        <h3 className="text-lg font-semibold">Service Name</h3>
        <p className="text-gray-600 text-sm">
          Description of the service and what it offers to clients.
        </p>
        <button className="px-4 py-2 bg-brand-highlight text-white rounded hover:bg-brand-highlight text-sm">
          Learn More
        </button>
      </div>
    </Card>
  ),
  args: {
    title: undefined,
    clickable: false,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
      <Card title="Default Card" clickable={false}>
        Basic card with title and content.
      </Card>

      <Card title="Clickable Card" clickable={true}>
        Card that appears interactive with hover effects.
      </Card>

      <Card href="#" title="Link Card">
        Card that acts as a navigation link.
      </Card>

      <Card title="No Content">
        Card with only a title.
      </Card>

      <Card clickable={true}>
        Card without title but with content.
      </Card>

      <Card title="Custom Styling" class="border-2 border-purple-300 bg-purple-50">
        Card with custom CSS classes applied.
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All card variants displayed together for comparison and testing.",
      },
    },
  },
};

export const ResponsiveGrid: Story = {
  render: () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-7xl">
      {Array.from({ length: 8 }, (_, i) => (
        <Card key={i} title={`Card ${i + 1}`} clickable={true}>
          <p className="text-sm text-gray-600">
            This card demonstrates responsive grid behavior across different screen sizes.
          </p>
        </Card>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Responsive grid layout showing how cards adapt to different screen sizes.",
      },
    },
  },
};

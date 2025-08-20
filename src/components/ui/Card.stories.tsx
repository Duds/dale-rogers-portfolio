import type { Meta, StoryObj } from "@storybook/react";
import Card from "./Card.jsx";

const meta: Meta<typeof Card> = {
  title: "UI/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "The title of the card",
    },
    description: {
      control: "text",
      description: "The description text",
    },
    image: {
      control: "text",
      description: "URL of the card image",
    },
    link: {
      control: "text",
      description: "URL for the card link",
    },
    tags: {
      control: "object",
      description: "Array of tags to display",
    },
    variant: {
      control: "select",
      options: ["default", "featured", "compact"],
      description: "Visual variant of the card",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Sample Card Title",
    description:
      "This is a sample card description that demonstrates the card component's appearance and functionality.",
    image: "https://via.placeholder.com/400x250",
    link: "/sample-link",
    tags: ["Design", "UI", "Component"],
    variant: "default",
  },
};

export const Featured: Story = {
  args: {
    title: "Featured Case Study",
    description:
      "A detailed case study showcasing our design process and outcomes for a major client project.",
    image: "https://via.placeholder.com/500x300",
    link: "/case-studies/featured",
    tags: ["Case Study", "Design", "Strategy"],
    variant: "featured",
  },
};

export const Compact: Story = {
  args: {
    title: "Compact Card",
    description: "A shorter description for compact card variants.",
    image: "https://via.placeholder.com/300x200",
    link: "/compact-example",
    tags: ["Compact", "Example"],
    variant: "compact",
  },
};

export const NoImage: Story = {
  args: {
    title: "Card Without Image",
    description:
      "This card demonstrates how the component looks without an image, relying on text content and styling.",
    link: "/no-image-example",
    tags: ["Text Only", "Content"],
    variant: "default",
  },
};

export const LongTitle: Story = {
  args: {
    title:
      "This is a very long card title that demonstrates how the component handles extended text content in the title field",
    description: "A standard description to accompany the long title.",
    image: "https://via.placeholder.com/400x250",
    link: "/long-title-example",
    tags: ["Long Title", "Text Handling"],
    variant: "default",
  },
};

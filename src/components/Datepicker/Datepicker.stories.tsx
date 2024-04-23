import type { Meta, StoryObj } from "@storybook/react";
import Datepicker from "./DatepickerView";

const meta = {
  title: "Datepicker",
  component: Datepicker,
  parameters: {},
  argTypes: {
    value: {},
    onChange: () => {},
  },
} satisfies Meta<typeof Datepicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};

export const WithShortcuts: Story = {
  args: {
    showShortcuts: true,
  },
};

export const WithFooter: Story = {
  args: {
    showFooter: true,
  },
};

export const Complete: Story = {
  args: {
    showShortcuts: true,
    showFooter: true,
  },
};

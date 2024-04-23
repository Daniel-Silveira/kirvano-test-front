import type { Meta, StoryObj } from "@storybook/react";
import Datepicker from "./DatepickerView";

const meta = {
  title: "Datepicker",
  component: Datepicker,
  parameters: {},
  argTypes: {},
} satisfies Meta<typeof Datepicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    showFooter: false,
    showShortcuts: false,
  },
};

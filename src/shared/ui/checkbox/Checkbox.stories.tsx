import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Checkbox } from './Checkbox';

const meta = {
    title: 'Example/Checkbox',
    component: Checkbox,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: { onChange: fn() },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Checked: Story = {
    args: {
        checked: true,
        disabled: false,
        children: 'Hello world',
    },
};

export const Indeterminate: Story = {
    args: {
        checked: false,
        disabled: false,
        children: 'Hello world',
    },
};

export const Disabled: Story = {
    args: {
        checked: true,
        disabled: true,
        children: 'Hello world',
    },
};

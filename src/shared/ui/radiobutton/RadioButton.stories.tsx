import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { RadioButton } from './RadioButton';

const meta = {
    title: 'Components/RadioButton',
    component: RadioButton,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: { onChange: fn() },
} satisfies Meta<typeof RadioButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Checked: Story = {
    args: {
        name: 'one',
        value: 'Hello world',
        checked: true,
        children: 'Hello world',
    },
};

export const Indeterminate: Story = {
    args: {
        name: 'one',
        value: 'Hello world',
        checked: false,
        children: 'Hello world',
    },
};

export const Disabled: Story = {
    args: {
        name: 'one',
        value: 'Hello world',
        checked: true,
        disabled: true,
        children: 'Hello world',
    },
};

import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Textarea } from './Textarea';

const meta = {
    title: 'Example/Textarea',
    component: Textarea,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
        controls: { expanded: true },
    },
    argTypes: {
        label: { control: { type: 'text' } },
        placeholder: { control: { type: 'text' } },
        error: { control: { type: 'boolean' } },
        disabled: { control: { type: 'boolean' } },
    },
    args: {
        onClick: fn(),
    },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        label: 'Text-area',
        placeholder: 'Text-area',
    },
};

export const Error: Story = {
    args: {
        label: 'Text-area',
        placeholder: 'Text-area',
        error: true,
        errorText: 'Error text',
    },
};

export const Disabled: Story = {
    args: {
        label: 'Text-area',
        placeholder: 'Text-area',
        disabled: true,
    },
};

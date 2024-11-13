import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Button } from './Button';
import Link from 'next/link';

const meta = {
    title: 'Components/Button',
    component: Button,
    parameters: {
        backgrounds: {
            values: [
                { name: 'Dark', value: '#0D0D0D' },
                { name: 'Light', value: '#fdfdfd' },
            ],
        },
    },
    tags: ['autodocs'],
    argTypes: {
        as: {
            description: 'Type of polymorphic component (button, a, Link from NextJs) ',
        },
        variant: {
            description: 'Type of button style',
            options: ['text', 'contained', 'outlined', 'default'],
        },
    },
    args: { onClick: fn(), children: 'Button', variant: 'default', disabled: false, as: 'button', fullWidth: false },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        variant: 'default',
    },
};

export const Text: Story = {
    args: {
        variant: 'text',
    },
};

export const Contained: Story = {
    args: {
        variant: 'contained',
    },
};

export const Outlined: Story = {
    args: {
        variant: 'outlined',
    },
};

export const FullWidth: Story = {
    args: {
        fullWidth: true,
    },
};

export const LanguageRu: Story = {
    args: {
        isLanguageBtn: true,
        language: 'ru',
    },
};

export const LanguageEn: Story = {
    args: {
        isLanguageBtn: true,
        language: 'en',
    },
};

export const LinkExternal: Story = {
    args: {
        as: 'a',
        href: '/',
    },
};

export const LinkNextJs: Story = {
    args: {
        as: Link,
        href: '/',
    },
};

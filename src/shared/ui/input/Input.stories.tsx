import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Input from './Input';

const meta: Meta<typeof Input> = {
    title: 'Example/InputComponent',
    component: Input,
    parameters: {
        backgrounds: {
            default: 'dark',
        },
    },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Email: Story = {
    render: () => <Input name="Email" type="email" color="#ccc" />,
};

export const Password: Story = {
    render: () => <Input name="Password" type="password" color="#ccc" />,
};

export const Text: Story = {
    render: () => <Input name="Text" type="text" color="#ccc" />,
};

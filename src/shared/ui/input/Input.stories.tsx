import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Input from './Input';

const meta: Meta<typeof Input> = {
    title: 'Example/InputComponent',
    component: Input,
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Input type="email" label="Email" variant="text" placeholder="Epam@epam.com" />
            <Input type="password" label="Password" variant="text" placeholder="Password" />
            <Input type="search" label="Search" variant="search" placeholder="Input search" />
        </div>
    ),
};

export const Error: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Input type="email" error="Заполните это поле" label="Email" variant="text" placeholder="Epam@epam.com" />
            <Input type="password" error="Заполните это поле" label="Password" variant="text" placeholder="Password" />
            <Input
                type="search"
                error="Заполните это поле"
                label="Search"
                variant="search"
                placeholder="Input search"
            />
        </div>
    ),
};

export const Disabled: Story = {
    render: () => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
            }}
        >
            <Input type="email" disabled={true} label="Email" variant="text" placeholder="Epam@epam.com" />
            <Input type="password" disabled={true} label="Password" variant="text" placeholder="Password" />
            <Input type="search" disabled={true} label="Search" variant="search" placeholder="Input search" />
        </div>
    ),
};

import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Input from './Input';
import { PasswordInput } from './Password/PasswordInput';
import { SearchInput } from './Search/SearchInput';

const meta: Meta<typeof Input> = {
    title: 'Example/InputComponent',
    component: Input,
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Input type={'text'} label="Default" />
            <Input type={'text'} error="Заполните поле" label="Default" />
            <Input type={'text'} disabled label="Default" />
        </div>
    ),
};

export const Email: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Input type={'email'} label="Email" />
            <Input type={'email'} error="Заполните поле" label="Email" />
            <Input type={'email'} disabled label="Email" />
        </div>
    ),
};

export const Password: Story = {
    render: () => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
            }}
        >
            <PasswordInput />
            <PasswordInput error="Обязательное поле" />
            <PasswordInput disabled />
        </div>
    ),
};

export const Search: Story = {
    render: () => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
            }}
        >
            <SearchInput />
            <SearchInput error="Заполните поле" />
            <SearchInput disabled />
        </div>
    ),
};

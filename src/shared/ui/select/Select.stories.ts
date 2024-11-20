import { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';
import './../../../app/styles/styles.scss';
import './../../../shared/assets/fonts';

const meta = {
    title: 'Components/Select',
    component: Select,
    tags: ['autodocs'],
    argTypes: {
        options: { control: 'object' },
        onChange: { action: 'changed' },
        value: { control: 'text' },
        isDisabled: { control: 'boolean' },
        children: { control: 'text' },
    },
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        options: [
            { value: 'option1', label: 'Select box1' },
            { value: 'option2', label: 'Select box2' },
            { value: 'option3', label: 'Select box3' },
        ],
    },
};
export const Language: Story = {
    args: {
        options: [
            { value: 'en', label: 'English', flag: '/svg/en.svg' },
            { value: 'ru', label: 'Russian', flag: '/svg/ru.svg' },
        ],
    },
};
export const LanguageIcon: Story = {
    args: {
        options: [
            { value: 'en', label: '', flag: '/svg/en.svg' },
            { value: 'ru', label: '', flag: '/svg/ru.svg' },
        ],
    },
};
export const Disabled: Story = {
    args: {
        options: [
            { value: 'option1', label: 'Select box1' },
            { value: 'option2', label: 'Select box2' },
            { value: 'option3', label: 'Select box3' },
        ],
        isDisabled: true,
    },
};

import { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';
import './../../../app/styles/styles.scss';
import './../../../shared/assets/fonts';

const meta = {
    title: 'Components/Select',
    component: Select,
    argTypes: {
        as: { control: 'text' },
        languageOptions: { control: 'object' },
        options: { control: 'object' },
        onChange: { action: 'changed' },
        defaultLanguage: { control: 'object' },
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
        languageOptions: [
            { value: 'en', label: 'English', flag: '/svg/en.svg' },
            { value: 'ru', label: 'Russian', flag: '/svg/ru.svg' },
        ],
        defaultLanguage: { value: 'en', label: 'English', flag: '/svg/en.svg' },
    },
};
export const LanguageIcon: Story = {
    args: {
        languageOptions: [
            { value: 'en', label: '', flag: '/svg/en.svg' },
            { value: 'ru', label: '', flag: '/svg/ru.svg' },
        ],
        defaultLanguage: { value: 'ru', label: '', flag: '/svg/ru.svg' },
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

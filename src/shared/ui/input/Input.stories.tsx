// Input.stories.tsx
import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Input } from './Input';

export default {
    title: 'Components/Input',
    component: Input,
} as Meta;

const Template: StoryFn = args => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {
    placeholder: 'Введите текст...',
};

export const Disabled = Template.bind({});
Disabled.args = {
    disabled: true,
    placeholder: 'Поле отключено',
};

export const WithValue = Template.bind({});
WithValue.args = {
    value: 'Предустановленное значение',
};

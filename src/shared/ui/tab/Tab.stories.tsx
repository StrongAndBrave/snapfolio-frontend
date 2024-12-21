import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useState, MouseEvent } from 'react';

import { Tab } from './Tab';

const meta = {
    title: 'Components/Tabs',
    component: Tab,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullwidth',
    },
    argTypes: {
        primary: { control: 'boolean' },
        label: { control: 'text' },
        onClick: { action: 'clicked' },
        disabled: { control: 'boolean' },
    },
    args: { onClick: fn() },
} satisfies Meta<typeof Tab>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        primary: true,
        label: 'Tab',
    },
    render: args => {
        const [isActive, setIsActive] = useState<boolean>(false);

        const handleTabClick = () => {
            setIsActive(prev => !prev);
        };

        return <Tab {...args} isActive={isActive} onClick={handleTabClick} />;
    },
};

export const Secondary: Story = {
    args: {
        label: 'Tab',
    },
    render: args => {
        const [isActive, setIsActive] = useState<boolean>(false);

        const handleTabClick = () => {
            setIsActive(prev => !prev);
        };

        return <Tab {...args} isActive={isActive} onClick={handleTabClick} />;
    },
};

export const PrimaryDisabled: Story = {
    args: {
        primary: true,
        label: 'Tabs',
        disabled: true,
    },
};

export const SecondaryDisabled: Story = {
    args: {
        label: 'Tabs',
        disabled: true,
    },
};

export const MultipleTabsExample: Story = {
    render: args => {
        const [activeLabel, setActiveLabel] = useState<string>('Tab1');

        const handleTabClick = (label: string) => {
            setActiveLabel(label);
        };

        const handleTabClickWrapper = (event: MouseEvent<HTMLButtonElement>) => {
            const label = (event.target as HTMLButtonElement).textContent!;
            handleTabClick(label);
        };

        return (
            <div>
                <div style={{ display: 'flex' }}>
                    <Tab {...args} label="Tab1" isActive={activeLabel === 'Tab1'} onClick={handleTabClickWrapper} />
                    <Tab {...args} label="Tab2" isActive={activeLabel === 'Tab2'} onClick={handleTabClickWrapper} />
                    <Tab {...args} label="Tab3" isActive={activeLabel === 'Tab3'} onClick={handleTabClickWrapper} />
                    <Tab {...args} label="Tab4" disabled />
                </div>
                <p>Content: {activeLabel}</p>
            </div>
        );
    },
    args: {
        primary: true,
        label: 'Tab',
        disabled: false,
    },
};

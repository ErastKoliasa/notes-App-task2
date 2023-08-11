import type { Meta, StoryObj } from '@storybook/react';
import '../index.css'
import Select from '../components/Select/Select';

const meta: Meta<typeof Select> = {
    title: 'App/Select',
    component: Select,
    tags: ['autodocs'],
}

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultSelect: Story = {
    args: {
        name: "text",
        value: "",
        className: "px-3 py-2 border border-slate-400 rounded-md text-sm shadow-sm",
        options: ["Text", "Text", "Text"]
    }
};

export const FocusSelect: Story = {
    args: {
        ...DefaultSelect.args,
        className: "px-3 py-2 border border-slate-400 rounded-md text-sm shadow-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500",
    }
};


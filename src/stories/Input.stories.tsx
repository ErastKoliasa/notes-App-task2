import type { Meta, StoryObj } from '@storybook/react';
import '../index.css'
import Input from '../components/Input/Input';

const meta: Meta<typeof Input> = {
    title: 'App/Input',
    component: Input,
    tags: ['autodocs'],
}

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultInput: Story = {
    args: {
        type: "text",
        value: "",
        className: "px-3 py-2 border border-slate-400 rounded-md text-sm shadow-sm",
    }
};

export const FocusInput: Story = {
    args: {
        ...DefaultInput.args,
        className: "px-3 py-2 border border-slate-400 rounded-md text-sm shadow-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500",
    }
};

export const InvalidInput: Story = {
    args: {
        ...DefaultInput.args,
        className: "px-3 py-2 border border-slate-400 rounded-md text-sm shadow-sm focus:outline-none invalid:border-pink-500 ring-1 invalid:ring-pink-500",
    }
};


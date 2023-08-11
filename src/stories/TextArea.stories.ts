import type { Meta, StoryObj } from '@storybook/react';
import '../index.css'
import TextArea from '../components/TextArea/TextArea';

const meta: Meta<typeof TextArea> = {
    title: 'App/TextArea',
    component: TextArea,
    tags: ['autodocs'],
}

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultTextArea: Story = {
    args: {
        name: "text",
        value: "",
        className: "px-3 py-2 border border-slate-400 rounded-md text-sm shadow-sm",
    }
};

export const FocusTextArea: Story = {
    args: {
        ...DefaultTextArea.args,
        className: "px-3 py-2 border border-slate-400 rounded-md text-sm shadow-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500",
    }
};

export const InvalidTextArea: Story = {
    args: {
        ...DefaultTextArea.args,
        className: "px-3 py-2 border border-slate-400 rounded-md text-sm shadow-sm focus:outline-none invalid:border-pink-500 ring-1 invalid:ring-pink-500",
    }
};


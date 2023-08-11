import type { Meta, StoryObj } from '@storybook/react';
import Button from '../components/Buttons/Button';
import '../index.css'
import { buttonArchieveStyle } from '../components/Tables/ArchiveTable/ArchivedNotes';
import { buttonActiveStyle, modalStyles} from '../components/Tables/TablesContainer';

const meta: Meta<typeof Button> = {
  title: 'App/Button',
  component: Button, 
  tags: ['autodocs'],
}

export default meta;

type Story = StoryObj<typeof meta>;

export const ActiveButton: Story = {
  args: {
    children: "Some text",
    className: buttonActiveStyle,
  }
};

export const ArchiveButton: Story = {
  args: {...ActiveButton.args, className: buttonArchieveStyle}
}

export const ModalButton: Story = {
  args: {...ActiveButton.args, className: modalStyles.button}
}


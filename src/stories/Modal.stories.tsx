import type { Meta, StoryObj } from '@storybook/react';
import "../components/Modal/modal.css"
import Modal from '../components/Modal/Modal';
import { modalStyles } from '../components/Tables/TablesContainer';

const meta: Meta<typeof Modal> = {
    title: 'App/Modal',
    component: Modal,
    tags: ['autodocs'],
}

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultModal: Story = {
    args: {
        active: true,
        children: <div>
            <h2 className={"text-2xl m-3 text-center font-bold"}>Some text</h2>
            <form className="modal__noteForm-add">
                <label htmlFor="input">Some text:</label>
                <input type="text" id="input" value="Some text" required className={modalStyles.input}/>
                <label htmlFor="textArea">Some text:</label>
                <textarea name="textArea" id="textArea" value="Some text" required className={modalStyles.textarea}></textarea>
                <label htmlFor="select">Some text:</label>
                <select name="select" id="select" value="Some text" required className={modalStyles.select}>
                    <option value="Some text">Some text</option>
                    <option value="Some text">Some text</option>
                    <option value="Some text">Some text</option>
                </select>
                <button className={modalStyles.button}>Some text</button>
            </form>
        </div>
    }
};

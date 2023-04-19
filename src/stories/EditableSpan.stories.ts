import type { Meta, StoryObj } from '@storybook/react';
import {EditableSpan} from '../EditableSpan';


const meta: Meta<typeof EditableSpan> = {
    title: 'Todolist/EditableSpan',
    component: EditableSpan,
    tags: ['autodocs'],
    argTypes: {
        onChange: {
            action: 'changes are committed'
        }
    },
};

export default meta;
type Story = StoryObj<typeof EditableSpan>;

export const EditableSpanStory: Story = {
    args: {
        title: 'HTML'
    },
}

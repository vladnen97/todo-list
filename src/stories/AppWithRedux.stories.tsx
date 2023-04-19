import type { Meta, StoryObj } from '@storybook/react';
import {AppWithRedux} from '../AppWithRedux';
import {Provider} from 'react-redux';
import {store} from '../store/store';


const meta: Meta<typeof AppWithRedux> = {
    title: 'Todolist/App',
    component: AppWithRedux,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AppWithRedux>;

export const AppStory: Story = {
    render: () =><Provider store={store}><AppWithRedux/></Provider>
}

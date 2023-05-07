import type { Meta, StoryObj } from '@storybook/react';
import {App} from '../App';
import {ReduxStoreProviderDecorator} from '../store/ReduxStoreProviderDecorator';


const meta: Meta<typeof App> = {
    title: 'Todolist/App',
    component: App,
    tags: ['autodocs'],
    decorators: [ReduxStoreProviderDecorator]
};

export default meta;
type Story = StoryObj<typeof App>;

export const AppStory: Story = {}

import type { Meta, StoryObj } from "@storybook/react";
import { App } from "../app/App";
import { ReduxStoreProviderDecorator } from "./ReduxStoreProviderDecorator";

const meta: Meta<typeof App> = {
    title: "Todolist/App",
    component: App,
    tags: ["autodocs"],
    decorators: [ReduxStoreProviderDecorator],
};

export default meta;
type Story = StoryObj<typeof App>;

export const AppStory: Story = {};

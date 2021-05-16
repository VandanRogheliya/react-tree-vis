// Button.stories.tsx

import React from 'react'

import { Meta, Story } from '@storybook/react'
import BinarySearchTree from '../BinarySearchTree'

export default {
  title: 'Tree/Binary Search Tree',
  component: BinarySearchTree,
} as Meta

export const Primary: Story = () => <BinarySearchTree />
Primary.storyName = 'Random'

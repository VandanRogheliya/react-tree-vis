import React, { useRef, useState } from 'react'

import { Meta, Story } from '@storybook/react'
import BinarySearchTree from '../components/BinarySearchTree'
import useTree from '../hooks/useTree'

export default {
  title: 'Tree/Binary Search Tree',
  component: BinarySearchTree,
} as Meta

export const Primary: Story = () => {
  const ref = useRef(null)
  const { insert, delete } = useTree(ref)
  const [insertValue, setInsertValue] = useState(0)
  return (
    <>
      <div>
        <input
          type="number"
          onChange={(elem) =>
            setInsertValue(parseInt(elem.currentTarget.value))
          }
        />
        <button onClick={() => insert(insertValue)}>Insert</button>
        <input
          type="number"
          onChange={(elem) =>
            setInsertValue(parseInt(elem.currentTarget.value))
          }
        />
        <button onClick={() => insert(insertValue)}>Insert</button>
      </div>
      <BinarySearchTree ref={ref} />
    </>
  )
}
Primary.storyName = 'Random'

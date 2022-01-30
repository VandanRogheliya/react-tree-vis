import React from 'react'
import { Meta, Story } from '@storybook/react'
import { MaxHeap, useHeap } from '..'
import { handleStyleArgTypes } from '../util'
import { useState } from '@storybook/addons'
import MaxHeapDoc from './docs/MaxHeapDoc.mdx'

export default {
  title: 'Tree/Max Heap',
  component: MaxHeap,
  argTypes: handleStyleArgTypes(),
  parameters: { docs: { page: MaxHeapDoc } },
} as Meta

export const AllFunctions: Story = ({ ...args }) => {
  const {
    ref,
    insert,
    remove,
    generateRandomTree,
    clear,
    extractTop,
    getData,
  } = useHeap()

  const [insertValue, setInsertValue] = useState(0)
  const [removeValue, setRemoveValue] = useState(0)
  const [randomNodeCount, setRandomNodeCount] = useState(0)
  const [data, setData] = useState<number[]>([])
  const [top, setTop] = useState<number>(null)

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <input
          type="number"
          onChange={(elem) =>
            setInsertValue(parseInt(elem.currentTarget.value))
          }
        />
        <button onClick={() => insert(insertValue)}>Insert</button>
        <br />
        <input
          type="number"
          onChange={(elem) =>
            setRemoveValue(parseInt(elem.currentTarget.value))
          }
        />
        <button onClick={() => remove(removeValue)}>Remove</button>
        <br />
        <input
          type="number"
          onChange={(elem) =>
            setRandomNodeCount(parseInt(elem.currentTarget.value))
          }
        />
        <button onClick={() => generateRandomTree(randomNodeCount)}>
          Generate random heap
        </button>
        <br />
        <button onClick={() => clear()}>Clear</button>
        <br />
        <button onClick={() => setTop(extractTop())}>Extract top</button>
        <p>{top}</p>
        <br />
        <button onClick={() => setData(getData())}>Get data</button>
        <p>
          {data.map((num) => (
            <span key={num}>{num},</span>
          ))}
        </p>
      </div>
      <MaxHeap ref={ref} data={[1, 2, 3]} treeStyles={{ ...args }} />
    </>
  )
}

import { Meta, Story } from '@storybook/react'
import React, { useState } from 'react'
import { RedBlackTree, useRedBlackTree } from '..'
import { handleStyleArgTypes } from '../util'
import RedBlackTreeDoc from './docs/RedBlackTreeDoc.mdx'

export default {
  title: 'Tree/Red Black Tree',
  component: RedBlackTree,
  argTypes: handleStyleArgTypes(),
  parameters: { docs: { page: RedBlackTreeDoc } },
} as Meta

export const SimpleExample: Story = ({ ...args }) => {
  const { ref, insert, remove, search } = useRedBlackTree()

  const [insertValue, setInsertValue] = useState(0)
  const [removeValue, setRemoveValue] = useState(0)
  const [searchValue, setSearchValue] = useState(0)
  const [found, setFound] = useState(false)

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
          onChange={(elem) => {
            setFound(false)
            setSearchValue(parseInt(elem.currentTarget.value))
          }}
        />
        <button onClick={() => setFound(search(searchValue))}>Search</button>
        <p>Found: {found ? 'Yes' : 'No'}</p>
      </div>
      <RedBlackTree ref={ref} data={[2, 1, 3]} treeStyles={{ ...args }} />
    </>
  )
}

export const AllFunctions: Story = ({ ...args }) => {
  const {
    ref,
    insert,
    remove,
    search,
    getData,
    clear,
    generateRandomTree,
    checkTreeType,
  } = useRedBlackTree()

  const [insertValue, setInsertValue] = useState(0)
  const [removeValue, setRemoveValue] = useState(0)
  const [searchValue, setSearchValue] = useState(0)
  const [randomValue, setRandomValue] = useState(0)
  const [found, setFound] = useState(false)
  const [data, setData] = useState([])
  const [treeType, setTreeType] = useState([])

  const [defaultData, setDefaultData] = useState([1, 2, 3])

  return (
    <>
      <div>
        <input
          type="number"
          onChange={(elem) =>
            setInsertValue(parseInt(elem.currentTarget.value))
          }
          onKeyUp={(e) => {
            if (e.keyCode === 13) insert(insertValue)
          }}
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
          onChange={(elem) => {
            setFound(false)
            setSearchValue(parseInt(elem.currentTarget.value))
          }}
        />
        <button onClick={() => setFound(search(searchValue))}>Search</button>
        <span>Found: {found ? 'Yes' : 'No'}</span>
        <br />
        <button
          onClick={() => {
            setData(getData('inorder'))
          }}
        >
          Get Data
        </button>
        <span>{data.map((e) => `${e} `)}</span>
        <br />
        <button onClick={clear}>Clear</button>
        <br />
        <input
          type="number"
          onChange={(elem) =>
            setRandomValue(parseInt(elem.currentTarget.value))
          }
        />
        <button onClick={() => generateRandomTree(randomValue)}>Random</button>
        <br />
        <button onClick={() => setTreeType(checkTreeType())}>
          Check Tree Type
        </button>
        <span>
          {treeType.map(
            (e, index) => `${e},${index !== treeType.length - 1 ? ' ' : ''}`,
          )}
        </span>
        <br />
        <button
          onClick={() =>
            setDefaultData([...defaultData, defaultData.length + 1])
          }
        >
          Append element to data
        </button>
      </div>
      <RedBlackTree ref={ref} data={defaultData} treeStyles={{ ...args }} />
    </>
  )
}

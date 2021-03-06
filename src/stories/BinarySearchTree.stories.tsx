import React, { useState } from 'react'
import { Meta, Story } from '@storybook/react'
import { BinarySearchTree, useBinarySearchTree } from '../index'
import { handleStyleArgTypes } from '../util'
import BinarySearchTreeDoc from './docs/BinarySearchTreeDoc.mdx'

export default {
  title: 'Tree/Binary Search Tree',
  component: BinarySearchTree,
  argTypes: handleStyleArgTypes(),
  parameters: { docs: { page: BinarySearchTreeDoc } },
} as Meta

export const SimpleExample: Story = ({ ...args }) => {
  const { ref, insert, remove, search } = useBinarySearchTree()

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
      <BinarySearchTree ref={ref} data={[2, 1, 3]} treeStyles={{ ...args }} />
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
    balance,
    generateRandomTree,
    checkTreeType,
  } = useBinarySearchTree()

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
        <button onClick={balance}>Balance</button>
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
      <BinarySearchTree ref={ref} data={defaultData} treeStyles={{ ...args }} />
    </>
  )
}

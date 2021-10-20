import React, { useEffect, useState } from 'react'
import { Meta, Story } from '@storybook/react'
import { Trie, useTrie } from '../index'
import { handleStyleArgTypes } from '../util'

export default {
  title: 'Tree/Trie',
  component: Trie,
  argTypes: handleStyleArgTypes(),
} as Meta

export const AllFunctions: Story = ({ ...args }) => {
  const {
    ref,
    insert,
    remove,
    search,
    searchPrefix,
    getAllWords,
    generateRandomTrie,
    removeHighlight,
  } = useTrie()

  const [insertValue, setInsertValue] = useState('')
  const [removeValue, setRemoveValue] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [searchPrefixValue, setSearchPrefixValue] = useState('')
  const [found, setFound] = useState<'Yes' | 'No' | 'Not searched'>(
    'Not searched',
  )
  const [randomValue, setRandomValue] = useState(0)
  const [data, setData] = useState([])

  useEffect(() => {
    searchPrefix && searchPrefix(searchPrefixValue)
  }, [searchPrefixValue, searchPrefix])

  return (
    <>
      <div>
        <input
          type="number"
          onChange={(elem) =>
            setRandomValue(parseInt(elem.currentTarget.value))
          }
        />
        <button onClick={() => generateRandomTrie(randomValue)}>
          Generate random tree
        </button>
        <br />
        <input
          type="text"
          onChange={(elem) => setInsertValue(elem.currentTarget.value)}
        />
        <button onClick={() => insert(insertValue)}>Insert</button>
        <br />
        <input
          type="text"
          onChange={(elem) => setRemoveValue(elem.currentTarget.value)}
        />
        <button onClick={() => remove(removeValue)}>Remove</button>
        <br />
        <input
          type="text"
          onChange={(elem) => {
            setSearchPrefixValue(elem.currentTarget.value)
          }}
          placeholder="Search prefix"
        />
        <br />
        <button onClick={() => setData(getAllWords())}>Get all words</button>
        <div>
          {data.map((word) => (
            <p key={word}>{word}</p>
          ))}
        </div>
        <br />
        <input
          type="text"
          onChange={(elem) => {
            setFound('Not searched')
            setSearchValue(elem.currentTarget.value)
          }}
        />
        <button onClick={() => setFound(search(searchValue) ? 'Yes' : 'No')}>
          Search
        </button>
        <p>Found: {found}</p>
        <br />
        <button onClick={() => removeHighlight()}>Remove highlight</button>
      </div>
      <Trie
        ref={ref}
        data={['cook', 'cold', 'cap', 'cooker', 'cool']}
        treeStyles={{ ...args }}
      />
    </>
  )
}

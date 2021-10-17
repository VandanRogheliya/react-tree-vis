import React, { forwardRef, useEffect, useImperativeHandle } from 'react'
import { TREE_ID } from '../constants'
import TrieDataStructure from '../data-structures/Trie'
import useTreeState from '../hooks/useTreeState'
import useTreeStyle from '../hooks/useTreeStyle'
import '../styles/BinarySearchTree.css'
import { TreeStylesType, TrieRefType } from '../types'
import { compareArray } from '../util'

type TrieProps = {
  data?: string[]
  treeStyles?: TreeStylesType
}

const Trie: React.ForwardRefRenderFunction<TrieRefType, TrieProps> = (
  { data, treeStyles }: TrieProps,
  ref: React.MutableRefObject<TrieRefType>,
) => {
  const { tree, treeJSX, setTree } = useTreeState<TrieDataStructure>(null)
  useTreeStyle(treeStyles)

  const trieFunctions: TrieRefType = {
    insert: (word: string) => {
      // if tree is empty
      if (!tree?.root) {
        const newTree = new TrieDataStructure()
        newTree.insert(word)
        setTree(newTree)
        return
      }

      tree.insert(word)
      setTree(tree)
    },
    remove: (word: string) => {
      if (!tree?.root || !word) return false
      if (tree.deleteWord(word)) {
        setTree(tree.root ? tree : null)
        return true
      }
      return false
    },
    search: (word: string) => {
      if (!tree?.root || !word) return false
      if (tree.searchWord(word)) {
        // Highlights the word in the trie
        tree.findPrefix(word)
        setTree(tree)
        return true
      }
      return false
    },
    searchPrefix: (word: string) => {
      if (!tree?.root) return false
      const isPrefixFound = tree.findPrefix(word)
      setTree(tree)
      return isPrefixFound
    },
    getAllWords: () => {
      if (!tree?.root) return []
      return tree.findAllWords()
    },
    generateRandomTrie: (wordCount: number) => {
      const newTrie = new TrieDataStructure(wordCount)
      setTree(newTrie)
    },
    removeHighlight: () => {
      tree.removeHighligt()
      setTree(tree)
    },
  }

  useImperativeHandle(ref, () => trieFunctions)

  const handleData = () => {
    const newTree = new TrieDataStructure()
    data.forEach((elem) => newTree.insert(elem))
    setTree(newTree)
  }

  useEffect(() => {
    if (data) handleData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <div id={TREE_ID}>
      <ul>{treeJSX}</ul>
    </div>
  )
}

// returns true if data has changed
const compareTrie = (previousPros: TrieProps, newProps: TrieProps) =>
  previousPros.data &&
  newProps.data &&
  compareArray(previousPros.data, newProps.data)

export default React.memo(forwardRef(Trie), compareTrie)
// export default forwardRef(Trie)

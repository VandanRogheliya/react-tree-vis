import React, { forwardRef, useEffect, useImperativeHandle } from 'react'
import { TREE_ID } from '../constants'
import BST from '../data-structures/BSTree'
import useTreeState from '../hooks/useTreeState'
import useTreeStyle from '../hooks/useTreeStyle'
import '../styles/BinarySearchTree.css'
import {
  BinaryTreeCheckType,
  BinaryTreeRefType,
  TraversalOrderType,
  TreeStylesType,
} from '../types'
import { compareArray } from '../util'

type BSTProps = {
  data?: number[]
  treeStyles?: TreeStylesType
}

const BinarySearchTree: React.ForwardRefRenderFunction<
  BinaryTreeRefType,
  BSTProps
> = (
  { data, treeStyles }: BSTProps,
  ref: React.MutableRefObject<BinaryTreeRefType>,
) => {
  const { tree, treeJSX, setTree } = useTreeState(null)
  useTreeStyle(treeStyles)

  useImperativeHandle(ref, () => ({
    insert: (value: number) => {
      // if tree is empty
      if (!tree?.root) {
        const newTree = new BST()
        newTree.insert(value)
        setTree(newTree)
        return
      }

      tree.insert(value)
      setTree(tree)
    },
    remove: (value: number): boolean => {
      if (!tree?.root) return false

      if (!tree.search(value)) return false
      tree.remove(value)
      setTree(tree.root ? tree : null)
      return true
    },
    search: (value: number): boolean => {
      if (!tree?.root) return false
      const foundNode = tree.search(value)
      if (foundNode) setTree(tree)
      return foundNode
    },
    getData: (traversalOrder: TraversalOrderType): number[] => {
      const traversalData = []
      tree[traversalOrder](traversalData)
      return traversalData
    },
    clear: () => {
      setTree(new BST())
    },
    balance: () => {
      tree.balance()
      setTree(tree)
    },
    generateRandomTree: (countOfNodes: number) => {
      const newTree = new BST(countOfNodes)
      setTree(newTree)
    },
    checkTreeType: (): BinaryTreeCheckType[] => {
      return tree.checkBST()
    },
  }))

  const handleData = () => {
    const newTree = new BST()
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
const compareBinarySearchTree = (previousPros: BSTProps, newProps: BSTProps) =>
  previousPros.data &&
  newProps.data &&
  compareArray(previousPros.data, newProps.data)

export default React.memo(forwardRef(BinarySearchTree), compareBinarySearchTree)

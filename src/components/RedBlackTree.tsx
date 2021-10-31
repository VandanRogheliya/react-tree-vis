import useTreeState from '../hooks/useTreeState'
import {
  BinaryTreeCheckType,
  SelfBalancingTreeRefType,
  TraversalOrderType,
  TreeStylesType,
} from '../types'
import RBTree from '../data-structures/RedBlackTree'
import useTreeStyle from '../hooks/useTreeStyle'
import React, { forwardRef, useEffect, useImperativeHandle } from 'react'
import { TREE_ID } from '../constants'
import { compareArray } from '../util'

type RedBlackTreeProps = {
  data?: number[]
  treeStyles?: TreeStylesType
}

const RedBlackTree: React.ForwardRefRenderFunction<
  SelfBalancingTreeRefType,
  RedBlackTreeProps
> = (
  { data, treeStyles }: RedBlackTreeProps,
  ref: React.MutableRefObject<SelfBalancingTreeRefType>,
) => {
  const { tree, treeJSX, setTree } = useTreeState<RBTree>(null)
  useTreeStyle(treeStyles)

  useImperativeHandle(ref, () => ({
    insert: (value: number) => {
      // if tree is empty
      if (!tree?.root) {
        const newTree = new RBTree()
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
      setTree(new RBTree())
    },
    generateRandomTree: (countOfNodes: number) => {
      const newTree = new RBTree(countOfNodes)
      setTree(newTree)
    },
    checkTreeType: (): BinaryTreeCheckType[] => {
      return tree.checkBinaryTree()
    },
  }))

  const handleData = () => {
    const newTree = new RBTree()
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
const compareRedBlackTree = (
  previousPros: RedBlackTreeProps,
  newProps: RedBlackTreeProps,
) =>
  previousPros.data &&
  newProps.data &&
  compareArray(previousPros.data, newProps.data)

export default React.memo(forwardRef(RedBlackTree), compareRedBlackTree)

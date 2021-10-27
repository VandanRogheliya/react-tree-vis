import React, { forwardRef, useEffect, useImperativeHandle } from 'react'
import { TREE_ID } from '../constants'
import AVL from '../data-structures/AVLTree'
import useTreeState from '../hooks/useTreeState'
import useTreeStyle from '../hooks/useTreeStyle'
import {
  AVLTreeRefType,
  BinaryTreeCheckType,
  TraversalOrderType,
  TreeStylesType,
} from '../types'
import { compareArray } from '../util'

type AVLTreeProps = {
  data?: number[]
  treeStyles?: TreeStylesType
}

const AVLTree: React.ForwardRefRenderFunction<AVLTreeRefType, AVLTreeProps> = (
  { data, treeStyles }: AVLTreeProps,
  ref: React.MutableRefObject<AVLTreeRefType>,
) => {
  const { tree, treeJSX, setTree } = useTreeState<AVL>(null)
  useTreeStyle(treeStyles)

  useImperativeHandle(ref, () => ({
    insert: (value: number) => {
      // if tree is empty
      if (!tree?.root) {
        const newTree = new AVL()
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
      setTree(new AVL())
    },
    generateRandomTree: (countOfNodes: number) => {
      const newTree = new AVL(countOfNodes)
      setTree(newTree)
    },
    checkTreeType: (): BinaryTreeCheckType[] => {
      return tree.checkAVL()
    },
  }))

  const handleData = () => {
    const newTree = new AVL()
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
const compareAVLTree = (previousPros: AVLTreeProps, newProps: AVLTreeProps) =>
  previousPros.data &&
  newProps.data &&
  compareArray(previousPros.data, newProps.data)

export default React.memo(forwardRef(AVLTree), compareAVLTree)

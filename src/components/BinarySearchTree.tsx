import React, { forwardRef, useEffect, useImperativeHandle } from 'react'
import BST from '../data-structures/BSTree'
import useTreeState from '../hooks/useTreeState'
import '../styles/BinarySearchTree.css'
import { BinaryTreeCheckType, TraversalOrderType } from '../types'

type BSTHandle = {
  insert: () => void
}

type BSTProps = {
  data?: number[]
}

const BinarySearchTree: React.ForwardRefRenderFunction<BSTHandle, BSTProps> = (
  { data }: BSTProps,
  ref: React.MutableRefObject<any>,
) => {
  const { tree, treeJSX, setTree } = useTreeState(null)

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
    document.getElementById('tree').style.setProperty('--border-color', '#f88') // TODO: integrate css variables
    // window
    //   .getComputedStyle(document.getElementById('tree'))
    //   .getPropertyValue('--border-color')
    // console.log(
    //   ,
    // )
  }, [data])

  return (
    <div id="tree" className="tree" ref={ref}>
      <ul>{treeJSX}</ul>
    </div>
  )
}

export default forwardRef(BinarySearchTree)

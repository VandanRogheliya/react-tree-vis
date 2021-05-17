import React, { forwardRef, useEffect, useImperativeHandle } from 'react'
import BST from '../data-structures/BSTree'
import useTreeState from '../hooks/useTreeState'
import '../styles/BinarySearchTree.css'

type BSTHandle = {
  insert: () => void
}

type BSTProps = {
  data?: number[]
}

const BinarySearchTree: React.ForwardRefRenderFunction<BSTHandle, BSTProps> = (
  {}: BSTProps,
  ref: React.MutableRefObject<any>,
) => {
  const { tree, treeJSX, setTree } = useTreeState(null)

  useImperativeHandle(ref, () => ({
    insert: (value: number) => {
      tree.insert(value)
      setTree(tree)
    },
    remove: (value: number): boolean => {
      if (!tree.search(value)) return false
      tree.remove(value)
      setTree(tree)
      return true
    },
  }))

  useEffect(() => {
    const newTree = new BST(3)
    setTree(newTree)
  }, [])

  return (
    <div className="tree" ref={ref}>
      <ul>{treeJSX}</ul>
    </div>
  )
}

export default forwardRef(BinarySearchTree)

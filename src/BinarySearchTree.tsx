import React, { useEffect, useState } from 'react'
import BST, { Node } from './data-structures/BSTree'
import './styles/BinarySearchTree.css'

type BSTProps = {
  data?: number[]
}

const BinarySearchTree = ({ data }: BSTProps): JSX.Element => {
  const [tree, setTree] = useState<BST>(null)
  // const [tree, setTree] = useState<BST>(null)
  useEffect(() => {
    const newTree = new BST(10)
    setTree(newTree)
  }, [])
  // useEffect(() => {
  //   // TODO: Handle data
  //   console.log(data)
  // }, [])
  return (
    <div className="tree">
      <ul>{tree?.root?.currentJSX}</ul>
    </div>
  )
}

export default BinarySearchTree

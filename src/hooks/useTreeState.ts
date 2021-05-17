import { useState } from 'react'
import BST from '../data-structures/BSTree'

type TreeType = BST
type ReturnType = {
  tree: TreeType
  treeJSX: JSX.Element
  setTree: (newTreeObject: TreeType) => void
}

const useTreeState = (treeObject: TreeType): ReturnType => {
  const [tree, setTreeInternal] = useState<TreeType>(treeObject)
  const [treeJSX, setTreeJSX] = useState<JSX.Element>(
    treeObject?.root.currentJSX,
  )
  const setTree = (newTreeObject: TreeType) => {
    setTreeInternal(newTreeObject)
    setTreeJSX(newTreeObject?.root?.currentJSX)
  }
  return { tree, treeJSX, setTree }
}

export default useTreeState

import { useState } from 'react'
import BST from '../data-structures/BSTree'

type ReturnType<TreeType> = {
  tree: TreeType
  treeJSX: JSX.Element
  setTree: (newTreeObject: TreeType) => void
}

function useTreeState<TreeType = BST>(
  treeObject: TreeType,
): ReturnType<TreeType> {
  const [tree, setTreeInternal] = useState<TreeType>(treeObject)
  const [treeJSX, setTreeJSX] = useState<JSX.Element>(
    (treeObject as any)?.root.currentJSX,
  )
  const setTree = (newTreeObject: TreeType) => {
    setTreeInternal(newTreeObject)
    setTreeJSX((newTreeObject as any)?.root?.currentJSX)
  }
  return { tree, treeJSX, setTree }
}

export default useTreeState

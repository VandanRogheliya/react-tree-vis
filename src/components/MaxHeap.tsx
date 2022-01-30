import React, { forwardRef, useEffect, useImperativeHandle } from 'react'
import { TREE_ID } from '../constants'
import { MaxHeap as MaxHeapDataStructure } from '../data-structures/Heap'
import useTreeState from '../hooks/useTreeState'
import useTreeStyle from '../hooks/useTreeStyle'
import { HeapRefType, TreeStylesType } from '../types'
import { compareArray } from '../util'

type HeapProps = {
  data?: number[]
  treeStyles?: TreeStylesType
}

const MaxHeap: React.ForwardRefRenderFunction<HeapRefType, HeapProps> = (
  { data, treeStyles }: HeapProps,
  ref: React.MutableRefObject<HeapRefType>,
) => {
  const { tree, treeJSX, setTree } = useTreeState<MaxHeapDataStructure>(null)
  useTreeStyle(treeStyles)

  useImperativeHandle(ref, () => ({
    insert: (value: number) => {
      // if tree is empty
      if (tree?.isEmpty()) {
        const newTree = new MaxHeapDataStructure()
        newTree.insert(value)
        setTree(newTree)
        return
      }

      tree.insert(value)
      setTree(tree)
    },
    remove: (value: number): boolean => {
      if (tree?.isEmpty()) return false
      tree.remove(value)
      setTree(tree)
      return true
    },
    getData: (): number[] => {
      return tree.heap
    },
    clear: () => {
      setTree(new MaxHeapDataStructure())
    },
    generateRandomTree: (countOfNodes: number) => {
      const newTree = new MaxHeapDataStructure(countOfNodes)
      setTree(newTree)
    },
    extractTop: () => {
      const top = tree.removeTop()
      setTree(tree)
      return top
    },
  }))

  const handleData = () => {
    const newTree = new MaxHeapDataStructure()
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
const compareHeap = (previousPros: HeapProps, newProps: HeapProps) =>
  previousPros.data &&
  newProps.data &&
  compareArray(previousPros.data, newProps.data)

export default React.memo(forwardRef(MaxHeap), compareHeap)

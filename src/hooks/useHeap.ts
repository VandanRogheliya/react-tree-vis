import React, { useEffect, useRef, useState } from 'react'
import {
  ClearFunctionType,
  ExtractTopFunctionType,
  GenerateRandomTreeFunctionType,
  GetHeapDataFunctionType,
  HeapRefType,
  InsertFunctionType,
  RemoveFunctionType,
} from '../types'

type UseTreeReturnType = {
  ref: React.MutableRefObject<HeapRefType>
  insert: InsertFunctionType
  remove: RemoveFunctionType
  getData: GetHeapDataFunctionType
  clear: ClearFunctionType
  generateRandomTree: GenerateRandomTreeFunctionType
  extractTop: ExtractTopFunctionType
}

const useBinarySearchTree = (): UseTreeReturnType => {
  const ref = useRef<HeapRefType>(null)
  const [insertFunction, setInsertFunction] = useState<InsertFunctionType>(null)
  const [removeFunction, setRemoveFunction] = useState<RemoveFunctionType>(null)
  const [clearFunction, setClearFunction] = useState<ClearFunctionType>(null)
  const [generateRandomTreeFunction, setGenerateRandomTreeFunction] =
    useState<GenerateRandomTreeFunctionType>(null)
  const [extractTopFunction, setExtractTopFunction] =
    useState<ExtractTopFunctionType>(null)
  const [getDataFunction, setGetDataFunction] =
    useState<GetHeapDataFunctionType>(null)

  useEffect(() => {
    setInsertFunction(() => (value: number) => ref?.current?.insert(value))
    setRemoveFunction(() => (value: number) => ref?.current?.remove(value))
    setClearFunction(() => () => ref?.current?.clear())
    setGenerateRandomTreeFunction(
      () => (countOfNodes: number) =>
        ref?.current?.generateRandomTree(countOfNodes),
    )
    setExtractTopFunction(() => () => ref?.current?.extractTop())
    setGetDataFunction(() => () => ref?.current?.getData())
  }, [ref])

  return {
    ref,
    insert: insertFunction,
    remove: removeFunction,
    clear: clearFunction,
    generateRandomTree: generateRandomTreeFunction,
    extractTop: extractTopFunction,
    getData: getDataFunction,
  }
}

export default useBinarySearchTree

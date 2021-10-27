import React, { useEffect, useRef, useState } from 'react'
import {
  AVLTreeRefType,
  CheckTreeTypeFunctionType,
  ClearFunctionType,
  GenerateRandomTreeFunctionType,
  GetDataFunctionType,
  InsertFunctionType,
  RemoveFunctionType,
  SearchFunctionType,
  TraversalOrderType,
} from '../types'

type UseTreeReturnType = {
  ref: React.MutableRefObject<AVLTreeRefType>
  insert: InsertFunctionType
  remove: RemoveFunctionType
  search: SearchFunctionType
  getData: GetDataFunctionType
  clear: ClearFunctionType
  generateRandomTree: GenerateRandomTreeFunctionType
  checkTreeType: CheckTreeTypeFunctionType
}

const useBinarySearchTree = (): UseTreeReturnType => {
  const ref = useRef<AVLTreeRefType>(null)
  const [insertFunction, setInsertFunction] = useState<InsertFunctionType>(null)
  const [removeFunction, setRemoveFunction] = useState<RemoveFunctionType>(null)
  const [searchFunction, setSearchFunction] = useState<SearchFunctionType>(null)
  const [getDataFunction, setGetDataFunction] =
    useState<GetDataFunctionType>(null)
  const [clearFunction, setClearFunction] = useState<ClearFunctionType>(null)
  const [generateRandomTreeFunction, setGenerateRandomTreeFunction] =
    useState<GenerateRandomTreeFunctionType>(null)
  const [checkTreeTypeFunction, setCheckTreeTypeFunction] =
    useState<CheckTreeTypeFunctionType>(null)

  useEffect(() => {
    setInsertFunction(() => (value: number) => ref?.current?.insert(value))
    setRemoveFunction(() => (value: number) => ref?.current?.remove(value))
    setSearchFunction(() => (value: number) => ref?.current?.search(value))
    setGetDataFunction(
      () => (traversalOrder: TraversalOrderType) =>
        ref?.current?.getData(traversalOrder),
    )
    setClearFunction(() => () => ref?.current?.clear())
    setGenerateRandomTreeFunction(
      () => (countOfNodes: number) =>
        ref?.current?.generateRandomTree(countOfNodes),
    )
    setCheckTreeTypeFunction(() => () => ref?.current?.checkTreeType())
  }, [ref])

  return {
    ref,
    insert: insertFunction,
    remove: removeFunction,
    search: searchFunction,
    getData: getDataFunction,
    clear: clearFunction,
    generateRandomTree: generateRandomTreeFunction,
    checkTreeType: checkTreeTypeFunction,
  }
}

export default useBinarySearchTree

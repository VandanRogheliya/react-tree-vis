import React, { useEffect, useRef, useState } from 'react'
import {
  BalanceFunctionType,
  BinaryTreeRefType,
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
  ref: React.MutableRefObject<BinaryTreeRefType>
  insert: InsertFunctionType
  remove: RemoveFunctionType
  search: SearchFunctionType
  getData: GetDataFunctionType
  clear: ClearFunctionType
  balance: BalanceFunctionType
  generateRandomTree: GenerateRandomTreeFunctionType
  checkTreeType: CheckTreeTypeFunctionType
}

const useBinarySearchTree = (): UseTreeReturnType => {
  const ref = useRef<BinaryTreeRefType>(null)
  const [insertFunction, setInsertFunction] = useState<InsertFunctionType>(null)
  const [removeFunction, setRemoveFunction] = useState<RemoveFunctionType>(null)
  const [searchFunction, setSearchFunction] = useState<SearchFunctionType>(null)
  const [getDataFunction, setGetDataFunction] =
    useState<GetDataFunctionType>(null)
  const [clearFunction, setClearFunction] = useState<ClearFunctionType>(null)
  const [balanceFunction, setBalanceFunction] =
    useState<BalanceFunctionType>(null)
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
    setBalanceFunction(() => () => ref?.current?.balance())
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
    balance: balanceFunction,
    generateRandomTree: generateRandomTreeFunction,
    checkTreeType: checkTreeTypeFunction,
  }
}

export default useBinarySearchTree

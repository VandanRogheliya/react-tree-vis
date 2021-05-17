import React, { useEffect, useState } from 'react'
import { BinaryTreeCheckType, TraversalOrderType } from '../types'

type InsertFunctionType = (value: number) => void
type RemoveFunctionType = (value: number) => boolean
type SearchFunctionType = (value: number) => boolean
type GetDataFunctionType = (traversalOrder: TraversalOrderType) => number[]
type ClearFunctionType = () => void
type BalanceFunctionType = () => void
type GenerateRandomTreeFunctionType = (countOfNodes: number) => void
type CheckTreeTypeFunctionType = () => BinaryTreeCheckType[]

type ReturnType = {
  insert: InsertFunctionType
  remove: RemoveFunctionType
  search: SearchFunctionType
  getData: GetDataFunctionType
  clear: ClearFunctionType
  balance: BalanceFunctionType
  generateRandomTree: GenerateRandomTreeFunctionType
  checkTreeType: CheckTreeTypeFunctionType
}

const useTree = (ref: React.MutableRefObject<any>): ReturnType => {
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
  }, [])

  return {
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

export default useTree

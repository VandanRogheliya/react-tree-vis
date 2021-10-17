import { MutableRefObject, useEffect, useRef, useState } from 'react'
import {
  GenerateRandomTrieFunctionType,
  GetAllWordsFunctionTrieType,
  InsertFunctionTrieType,
  RemoveFunctionTrieType,
  RemoveHighlightTrieFunctionType,
  SearchFunctionTrieType,
  SearchPrefixFunctionTrieType,
  TrieRefType,
} from '../types'

type ReturnType = {
  ref: MutableRefObject<TrieRefType>
  insert: InsertFunctionTrieType
  remove: RemoveFunctionTrieType
  search: SearchFunctionTrieType
  searchPrefix: SearchPrefixFunctionTrieType
  getAllWords: GetAllWordsFunctionTrieType
  generateRandomTrie: GenerateRandomTrieFunctionType
  removeHighlight: RemoveHighlightTrieFunctionType
}

const useTrie = (): ReturnType => {
  const ref = useRef<TrieRefType>(null)
  const [insert, setInsert] = useState<InsertFunctionTrieType>(null)
  const [remove, setRemove] = useState<RemoveFunctionTrieType>(null)
  const [search, setSearch] = useState<SearchFunctionTrieType>(null)
  const [searchPrefix, setSearchPrefix] =
    useState<SearchPrefixFunctionTrieType>(null)
  const [getAllWords, setGetAllWords] =
    useState<GetAllWordsFunctionTrieType>(null)
  const [generateRandomTrie, setGenerateRandomTrie] =
    useState<GenerateRandomTrieFunctionType>(null)
  const [removeHighlight, setRemoveHighlight] =
    useState<RemoveHighlightTrieFunctionType>(null)

  useEffect(() => {
    if (!ref?.current) return
    setInsert(() => (word: string) => ref?.current?.insert(word))
    setRemove(() => (word: string) => ref?.current?.remove(word))
    setSearch(() => (word: string) => ref?.current?.search(word))
    setSearchPrefix(() => (word: string) => ref?.current?.searchPrefix(word))
    setGetAllWords(() => () => ref?.current?.getAllWords())
    setGenerateRandomTrie(
      () => (num: number) => ref?.current?.generateRandomTrie(num),
    )
    setRemoveHighlight(() => () => ref?.current?.removeHighlight())
  }, [ref])

  return {
    ref,
    insert,
    generateRandomTrie,
    getAllWords,
    remove,
    search,
    searchPrefix,
    removeHighlight,
  }
}

export default useTrie

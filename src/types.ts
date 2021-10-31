import {
  BINARY_TREE_TYPE,
  INORDER_KEY,
  POSTORDER_KEY,
  PREORDER_KEY,
} from './constants'

export type TraversalOrderType =
  | typeof INORDER_KEY
  | typeof POSTORDER_KEY
  | typeof PREORDER_KEY

export const { BALANCED, COMPLETE, FULL, PERFECT } = BINARY_TREE_TYPE

export type BinaryTreeCheckType =
  | typeof BALANCED
  | typeof COMPLETE
  | typeof FULL
  | typeof PERFECT

export type TreeStylesType = {
  lineColor?: string
  lineHoverColor?: string
  lineRadius?: string
  nodeBorderRadius?: string
  nodeBorder?: string
  nodeBackgroundColor?: string
  nodeFontColor?: string
  nodeShadow?: string
  nodeTextShadow?: string
  nodeFontSize?: string
  nodeFontFamily?: string
  nodeRedBackgroundColor?: string
  nodeBlackBackgroundColor?: string
  nodeAvlHeightFontSize?: string
  nodeHighlightBorder?: string
  nodeHighlightBackgroundColor?: string
  nodeHighlightFontColor?: string
  nodeHighlightShadow?: string
  nodeHighlightTextShadow?: string
  nodeHoverBorder?: string
  nodeHoverBackgroundColor?: string
  nodeHoverFontColor?: string
  nodeHoverShadow?: string
  nodeHoverTextShadow?: string
  nodeNullFontColor?: string
  nodeNullHoverFontColor?: string
  transitionDuration?: string
}

export type InsertFunctionType = (value: number) => void
export type RemoveFunctionType = (value: number) => boolean
export type SearchFunctionType = (value: number) => boolean
export type GetDataFunctionType = (
  traversalOrder: TraversalOrderType,
) => number[]
export type ClearFunctionType = () => void
export type BalanceFunctionType = () => void
export type GenerateRandomTreeFunctionType = (countOfNodes: number) => void
export type CheckTreeTypeFunctionType = () => BinaryTreeCheckType[]

export type BinaryTreeRefType = {
  insert: InsertFunctionType
  remove: RemoveFunctionType
  search: SearchFunctionType
  getData: GetDataFunctionType
  clear: ClearFunctionType
  balance: BalanceFunctionType
  generateRandomTree: GenerateRandomTreeFunctionType
  checkTreeType: CheckTreeTypeFunctionType
}

export type InsertFunctionTrieType = (word: string) => void
export type RemoveFunctionTrieType = (word: string) => boolean
export type SearchFunctionTrieType = (word: string) => boolean
export type SearchPrefixFunctionTrieType = (word: string) => boolean
export type GetAllWordsFunctionTrieType = () => string[]
export type GenerateRandomTrieFunctionType = (num: number) => void
export type RemoveHighlightTrieFunctionType = () => void

export type TrieRefType = {
  insert: InsertFunctionTrieType
  remove: RemoveFunctionTrieType
  search: SearchFunctionTrieType
  searchPrefix: SearchPrefixFunctionTrieType
  getAllWords: GetAllWordsFunctionTrieType
  generateRandomTrie: GenerateRandomTrieFunctionType
  removeHighlight: RemoveHighlightTrieFunctionType
}

export type SelfBalancingTreeRefType = {
  insert: InsertFunctionType
  remove: RemoveFunctionType
  search: SearchFunctionType
  getData: GetDataFunctionType
  clear: ClearFunctionType
  generateRandomTree: GenerateRandomTreeFunctionType
  checkTreeType: CheckTreeTypeFunctionType
}

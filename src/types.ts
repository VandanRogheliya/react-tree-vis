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

/** Inserts the value */
export type InsertFunctionType = (value: number) => void
/** removes the value */
export type RemoveFunctionType = (value: number) => boolean
/**
 * Searches the value and return true if found. Also, node found is highlighted
 */
export type SearchFunctionType = (value: number) => boolean
/** Returns traversal of the tree */
export type GetDataFunctionType = (
  traversalOrder: TraversalOrderType,
) => number[]
/** Removes all nodes */
export type ClearFunctionType = () => void
/** Balances the tree */
export type BalanceFunctionType = () => void
/** Removes all nodes and inserts countOfNodes random values. */
export type GenerateRandomTreeFunctionType = (countOfNodes: number) => void
/** Checks whether the current tree is balanced, complete, perfect or full */
export type CheckTreeTypeFunctionType = () => BinaryTreeCheckType[]
/** Returns all the data in the heap */
export type GetHeapDataFunctionType = () => number[]

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

/** Inserts word */
export type InsertFunctionTrieType = (word: string) => void
/** Removes word */
export type RemoveFunctionTrieType = (word: string) => boolean
/** Searchs the whole word. If it is found then the word is highlighted */
export type SearchFunctionTrieType = (word: string) => boolean
/** Searchs the given prefix. If it is found then the prefix is highlighted */
export type SearchPrefixFunctionTrieType = (word: string) => boolean
/** Returns an array of all words */
export type GetAllWordsFunctionTrieType = () => string[]
/** Removes all words and inserts num random words */
export type GenerateRandomTrieFunctionType = (num: number) => void
/** Removes highlight */
export type RemoveHighlightTrieFunctionType = () => void
/** Extracts top element in the heap */
export type ExtractTopFunctionType = () => number

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

export type HeapRefType = {
  insert: InsertFunctionType
  remove: RemoveFunctionType
  generateRandomTree: GenerateRandomTreeFunctionType
  clear: ClearFunctionType
  extractTop: ExtractTopFunctionType
  getData: GetHeapDataFunctionType
}

export type TableDataType = {
  head: string[]
  body: string[][]
}

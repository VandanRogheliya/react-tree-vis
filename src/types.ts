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

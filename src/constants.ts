import { TableDataType } from './types'

export const INORDER_KEY = 'inorder'
export const POSTORDER_KEY = 'postorder'
export const PREORDER_KEY = 'preorder'

export const BINARY_TREE_TYPE = {
  BALANCED: 'balanced',
  COMPLETE: 'complete',
  PERFECT: 'perfect',
  FULL: 'full',
}

export const TREE_ID = 'react-tree-vis'

export const CSS_VARIABLE_MAP = {
  lineColor: {
    variableName: '--line-color',
    defaultValue: '#ccc',
    description: 'Color of the line connecting nodes',
  },
  lineHoverColor: {
    variableName: '--line-hover-color',
    defaultValue: '#5f6674',
    description: 'Hover color of the line connecting nodes',
  },
  lineRadius: {
    variableName: '--line-radius',
    defaultValue: '5px',
    description: 'Radius of curves in the line',
  },
  nodeBorder: {
    variableName: '--node-border',
    defaultValue: 'none',
    description:
      'Border style of the nodes. Syntax of short-hand CSS border property is accepted here.',
  },
  nodeBorderRadius: {
    variableName: '--node-border-radius',
    defaultValue: '200px',
    description: '',
  },
  nodeBackgroundColor: {
    variableName: '--node-bg-color',
    defaultValue: '#fff',
    description: '',
  },
  nodeFontColor: {
    variableName: '--node-font-color',
    defaultValue: '#666',
    description: '',
  },
  nodeShadow: {
    variableName: '--node-shadow',
    defaultValue: '-5px -5px 20px #fff, 5px 5px 20px #babecc',
    description: 'Syntax of short-hand CSS shadow property accepted here.',
  },
  nodeTextShadow: {
    variableName: '--node-text-shadow',
    defaultValue: 'none',
    description: 'Syntax of short-hand CSS shadow property accepted here.',
  },
  nodeFontSize: {
    variableName: '--node-font-size',
    defaultValue: '20px',
    description: '',
  },
  nodeFontFamily: {
    variableName: '--node-font-family',
    defaultValue: 'arial, verdana, tahoma',
    description: '',
  },
  nodeAvlHeightFontSize: {
    variableName: '--node-avl-height-font-size',
    defaultValue: '13px',
    description: '',
  },
  nodeRedBackgroundColor: {
    variableName: '--node-red-bg-color',
    defaultValue: '#da606066',
    description: '',
  },
  nodeBlackBackgroundColor: {
    variableName: '--node-black-bg-color',
    defaultValue: '#acacac66',
    description: '',
  },
  nodeHighlightBorder: {
    variableName: '--node-hl-border',
    defaultValue: 'none',
    description: 'Syntax of short-hand CSS border property is accepted here.',
  },
  nodeHighlightBackgroundColor: {
    variableName: '--node-hl-bg-color',
    defaultValue: '#fff',
    description: '',
  },
  nodeHighlightFontColor: {
    variableName: '--node-hl-font-color',
    defaultValue: '#fff',
    description: '',
  },
  nodeHighlightShadow: {
    variableName: '--node-hl-shadow',
    defaultValue: '-5px -5px 20px #fff, 5px 5px 20px #babecc',
    description: 'Syntax of short-hand CSS shadow property accepted here.',
  },
  nodeHighlightTextShadow: {
    variableName: '--node-hl-text-shadow',
    defaultValue:
      '0 0 5px #fff, 0 0 10px #fff, 0 0 15px #00ff15, 0 0 20px #00ff15, 0 0 25px #00ff15, 0 0 30px #00ff15, 0 0 35px #00ff15',
    description: 'Syntax of short-hand CSS shadow property accepted here.',
  },
  nodeHoverBorder: {
    variableName: '--node-hover-border',
    defaultValue: 'none',
    description: 'Syntax of short-hand CSS border property is accepted here.',
  },
  nodeHoverBackgroundColor: {
    variableName: '--node-hover-bg-color',
    defaultValue: '#fff',
    description: '',
  },
  nodeHoverFontColor: {
    variableName: '--node-hover-font-color',
    defaultValue: '#002574',
    description: '',
  },
  nodeHoverShadow: {
    variableName: '--node-hover-shadow',
    defaultValue: '-1px -1px 5px #fff, 1px 1px 5px #babecc',
    description: 'Syntax of short-hand CSS shadow property accepted here.',
  },
  nodeHoverTextShadow: {
    variableName: '--node-hover-text-shadow',
    defaultValue: 'none',
    description: 'Syntax of short-hand CSS shadow property accepted here.',
  },
  nodeNullFontColor: {
    variableName: '--node-null-font-color',
    defaultValue: '#7c7c7c2f',
    description: '',
  },
  nodeNullHoverFontColor: {
    variableName: '--node-null-hover-font-color',
    defaultValue: '#ff0000b9',
    description: '',
  },
  transitionDuration: {
    variableName: '--transition',
    defaultValue: '0.5s',
    description: '',
  },
}

export const AVL_TREE_PROPS: TableDataType = {
  head: ['Prop', 'Type', 'Required', 'Description'],
  body: [
    [
      '<code>ref</code>',
      '<code>React.MutableRefObject&lt;any&gt;</code>',
      '❌',
      'Allows interaction with AVLTree component. <code>ref</code> object passed, is obtained from <code>useAVLTree()</code>.',
    ],
    [
      '<code>data</code>',
      '<code>number[]</code>',
      '❌',
      'Elements in the array are inserted into the tree on mount.',
    ],
    [
      '<code>treeStyles</code>',
      '<code>object</code>',
      '❌',
      'Allows overriding default style of the component. Checkout treeStyles object story under STYLES for more info.',
    ],
  ],
}

export const RED_BLACK_TREE_PROPS: TableDataType = {
  head: ['Prop', 'Type', 'Required', 'Description'],
  body: [
    [
      '<code>ref</code>',
      '<code>React.MutableRefObject&lt;any&gt;</code>',
      '❌',
      'Allows interaction with RedBlackTree component. <code>ref</code> object passed, is obtained from <code>useRedBlackTree()</code>.',
    ],
    [
      '<code>data</code>',
      '<code>number[]</code>',
      '❌',
      'Elements in the array are inserted into the tree on mount.',
    ],
    [
      '<code>treeStyles</code>',
      '<code>object</code>',
      '❌',
      'Allows overriding default style of the component. Checkout treeStyles object story under STYLES for more info.',
    ],
  ],
}

export const BINARY_SEARCH_TREE_PROPS: TableDataType = {
  head: ['Prop', 'Type', 'Required', 'Description'],
  body: [
    [
      '<code>ref</code>',
      '<code>React.MutableRefObject&lt;any&gt;</code>',
      '❌',
      'Allows interaction with BST component. <code>ref</code> object passed, is obtained from <code>useBinarySearchTree()</code>.',
    ],
    [
      '<code>data</code>',
      '<code>number[]</code>',
      '❌',
      'Elements in the array are inserted into the tree on mount.',
    ],
    [
      '<code>treeStyles</code>',
      '<code>object</code>',
      '❌',
      'Allows overriding default style of the component. Checkout treeStyles object story under STYLES for more info.',
    ],
  ],
}

export const HEAP_PROPS: TableDataType = {
  head: ['Prop', 'Type', 'Required', 'Description'],
  body: [
    [
      '<code>ref</code>',
      '<code>React.MutableRefObject&lt;any&gt;</code>',
      '❌',
      'Allows interaction with Heap component. <code>ref</code> object passed, is obtained from <code>useHeap()</code>.',
    ],
    [
      '<code>data</code>',
      '<code>number[]</code>',
      '❌',
      'Elements in the array are inserted into the tree on mount.',
    ],
    [
      '<code>treeStyles</code>',
      '<code>object</code>',
      '❌',
      'Allows overriding default style of the component. Checkout treeStyles object story under STYLES for more info.',
    ],
  ],
}

export const TRIE_PROPS: TableDataType = {
  head: ['Prop', 'Type', 'Required', 'Description'],
  body: [
    [
      '<code>ref</code>',
      '<code>React.MutableRefObject&lt;any&gt;</code>',
      '❌',
      'Allows interaction with Trie component. <code>ref</code> object passed, is obtained from <code>useTrie()</code>.',
    ],
    [
      '<code>data</code>',
      '<code>string[]</code>',
      '❌',
      'Elements in the array are inserted into the trie on mount.',
    ],
    [
      '<code>treeStyles</code>',
      '<code>object</code>',
      '❌',
      'Allows overriding default style of the component. Checkout treeStyles object story under STYLES for more info.',
    ],
  ],
}

export const AVL_HOOK_PROPERTIES: TableDataType = {
  head: ['Property', 'Type', 'Description'],
  body: [
    [
      '<code>ref</code>',
      '<code>React.MutableRefObject&lt;any&gt;</code>',
      'Pass this ref object to your tree component. It binds the functions returned by this hook to that component.',
    ],
    [
      '<code>insert</code>',
      '<code>(value: number) => void</code>',
      'Inserts the value',
    ],
    [
      '<code>remove</code>',
      '<code>(value: number) => boolean</code>',
      'removes the value',
    ],
    [
      '<code>search</code>',
      '<code>(value: number) => boolean</code>',
      'Searches the value and returns true if found. Also, node found is highlighted',
    ],
    [
      '<code>getData</code>',
      '<code>(traversalOrder: TraversalOrderType) => number[]</code>',
      'Returns traversal of the tree',
    ],
    ['<code>clear</code>', '<code>() => void</code>', 'Removes all nodes '],
    [
      '<code>generateRandomTree</code>',
      '<code>(countOfNodes: number) => void</code>',
      'Removes all nodes and inserts countOfNodes random values.',
    ],
    [
      '<code>checkTreeType</code>',
      '<code>() => BinaryTreeCheckType[]</code>',
      'Checks whether the current tree is balanced, complete, perfect or full',
    ],
  ],
}

export const BINARY_SEARCH_TREE_HOOK_PROPERTIES: TableDataType = {
  head: ['Property', 'Type', 'Description'],
  body: [
    [
      '<code>ref</code>',
      '<code>React.MutableRefObject&lt;any&gt;</code>',
      'Pass this ref object to your tree component. It binds the functions returned by this hook to that component.',
    ],
    [
      '<code>insert</code>',
      '<code>(value: number) => void</code>',
      'Inserts the value',
    ],
    [
      '<code>remove</code>',
      '<code>(value: number) => boolean</code>',
      'removes the value',
    ],
    [
      '<code>search</code>',
      '<code>(value: number) => boolean</code>',
      'Searches the value and returns true if found. Also, node found is highlighted',
    ],
    [
      '<code>getData</code>',
      '<code>(traversalOrder: TraversalOrderType) => number[]</code>',
      'Returns traversal of the tree',
    ],
    ['<code>clear</code>', '<code>() => void</code>', 'Removes all nodes'],
    ['<code>balance</code>', '<code>() => void</code>', '	Balances the tree'],
    [
      '<code>generateRandomTree</code>',
      '<code>(countOfNodes: number) => void</code>',
      'Removes all nodes and inserts countOfNodes random values.',
    ],
    [
      '<code>checkTreeType</code>',
      '<code>() => BinaryTreeCheckType[]</code>',
      'Checks whether the current tree is balanced, complete, perfect or full',
    ],
  ],
}

export const HEAP_HOOK_PROPERTIES: TableDataType = {
  head: ['Property', 'Type', 'Description'],
  body: [
    [
      '<code>ref</code>',
      '<code>React.MutableRefObject&lt;any&gt;</code>',
      'Pass this ref object to your tree component. It binds the functions returned by this hook to that component.',
    ],
    [
      '<code>insert</code>',
      '<code>(value: number) => void</code>',
      'Inserts the value',
    ],
    [
      '<code>remove</code>',
      '<code>(value: number) => boolean</code>',
      'removes the value',
    ],
    [
      '<code>getData</code>',
      '<code>() => number[]</code>',
      'Returns internal array used to create heap',
    ],
    ['<code>clear</code>', '<code>() => void</code>', 'Removes all nodes '],
    [
      '<code>generateRandomTree</code>',
      '<code>(countOfNodes: number) => void</code>',
      'Removes all nodes and inserts countOfNodes random values.',
    ],
    [
      '<code>extractTop</code>',
      '<code>() => number</code>',
      'Extracts the top most value from the heap and returns it',
    ],
  ],
}

export const TRIE_HOOK_PROPERTIES: TableDataType = {
  head: ['Property', 'Type', 'Description'],
  body: [
    [
      '<code>ref</code>',
      '<code>React.MutableRefObject&lt;any&gt;</code>',
      'Pass this ref object to your Trie component. It binds the functions returned by this hook to that component.',
    ],
    [
      '<code>insert</code>',
      '<code>(word: string) => void</code>',
      'Inserts the word',
    ],
    [
      '<code>remove</code>',
      '<code>(word: string) => boolean</code>',
      'removes the word',
    ],
    [
      '<code>search</code>',
      '<code>(word: string) => boolean</code>',
      'Searches the word and returns true if found. Also, the nodes are highlighted.',
    ],
    [
      '<code>searchPrefix</code>',
      '<code>(word: string) => boolean</code>',
      'Searches the prefix and return true if full prefix is present. Also, the nodes are highlighted.',
    ],
    [
      '<code>getAllWords</code>',
      '<code>() => string[]</code>',
      'Returns an array of all the words in trie',
    ],
    [
      '<code>generateRandomTrie</code>',
      '<code>(countOfWords: number) => void</code>',
      'Removes all nodes and inserts countOfNodes random words.',
    ],
    [
      '<code>removeHighlight</code>',
      '<code>() => void</code>',
      'Removes highlight from all the nodes, if any',
    ],
  ],
}

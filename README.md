<h1 align="center">Welcome to React Tree Vis 👋</h1>
<p align="center">
  <img alt="Version" src="https://img.shields.io/npm/dw/react-tree-vis?style=for-the-badge" />
  <img alt="Version" src="https://img.shields.io/bundlephobia/minzip/react-tree-vis?style=for-the-badge" />
  <a href="https://github.com/VandanRogheliya/react-tree-vis#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg?style=for-the-badge" />
  </a>
  <a href="http://www.typescriptlang.org/" target="_blank">
    <img src="https://img.shields.io/badge/%3C%2F%3E-typescript-blue?style=for-the-badge" />
  </a>
  <a href="https://github.com/VandanRogheliya/react-tree-vis/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg?style=for-the-badge" />
  </a>
  <a href="https://github.com/VandanRogheliya/react-tree-vis/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/VandanRogheliya/react-tree-vis?style=for-the-badge" />
  </a>
</p>
<p align="center"> 
  <img src="./react-tree-vis-demo.gif" width="700" />
<p/>

> Allows you to store and manage information in different tree data structures.

### :video_game: [Code Sandbox](https://codesandbox.io/s/react-tree-vis-simple-example-h7rh8?file=/src/App.js)

### ✨ [Storybook](https://vandanrogheliya.github.io/react-tree-vis)

### :gift: [NPM](https://www.npmjs.com/package/react-tree-vis)

## Features

- :package: Only 4kb minified & gzipped / no dependencies
- :hammer_and_wrench: Perform tree operations with a simple function call
- :rocket: Components made with only JSX and CSS
- :nail_care: Make the components of your own with styling options

## Data Structures Covered

- Binary Search Tree

> Trie, AVL Tree and more coming soon :see_no_evil:

## Who is this library for?

If you are looking for a way to not just only display your data in a tree format but also interact with it, react-tree-vis might be for you. You can simply pass an array of numbers to display it or use our API to insert, delete, search and much more. With react-tree-vis, you can style your tree component with props or override with CSS. Everything is documented below! Also, I would recommend checking out other similar libraries too.

## Documentation

### Installation

```sh
# Yarn
yarn add react-tree-vis

# NPM
npm install react-tree-vis
```

### Quick start

We are displaying data in BST and interacting with it using `useTree`. Play around with this example [here](https://codesandbox.io/s/react-tree-vis-simple-example-h7rh8?file=/src/App.js).

```js
import { BinarySearchTree, useTree } from 'react-tree-vis'
import { useState } from 'react'

export default function App() {
  const { ref, insert, remove } = useTree()

  const [insertValue, setInsertValue] = useState(0)
  const [removeValue, setRemoveValue] = useState(0)

  return (
    <div className="App">
      <input
        type="number"
        onChange={(elem) => setInsertValue(parseInt(elem.currentTarget.value))}
      />
      <button onClick={() => insert(insertValue)}>Insert</button>
      <br />
      <input
        type="number"
        onChange={(elem) => setRemoveValue(parseInt(elem.currentTarget.value))}
      />
      <button onClick={() => remove(removeValue)}>Remove</button>

      <BinarySearchTree data={[2, 1, 3]} ref={ref} />
    </div>
  )
}
```

### BinarySearchTree

It organizes numbers in a binary search tree and exposes various styling options.

#### Props

| Prop         | Type                          | Required | Description                                                                               |
| ------------ | ----------------------------- | -------- | ----------------------------------------------------------------------------------------- |
| `ref`        | `React.MutableRefObject<any>` | :x:      | Allows interaction with BST component. `ref` object passed, is obtained from `useTree()`. |
| `data`       | `number[]`                    | :x:      | Elements in the array are inserted into the tree on mount.                                |
| `treeStyles` | `object`                      | :x:      | Allows overriding default style of the component.                                         |

#### `treeStyles` object

An object with properties described below can be passed to `treeStyles` prop to override default styles.

| Property                       | Type     | Description                                                                                         | Default                                                                                                                 |
| ------------------------------ | -------- | --------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `lineColor`                    | `string` | Color of the line connecting nodes                                                                  | `#ccc`                                                                                                                  |
| `lineHoverColor`               | `string` | Hover color of the line connecting nodes                                                            | `#5f6674`                                                                                                               |
| `lineRadius`                   | `string` | Radius of curves in the line                                                                        | `5px`                                                                                                                   |
| `nodeBorder`                   | `string` | Border style of the nodes. Syntax of short-hand CSS border property is accepted here.               | `none`                                                                                                                  |
| `nodeBorderRadius`             | `string` | Border radius of the nodes                                                                          | `200px`                                                                                                                 |
| `nodeBackgroundColor`          | `string` | Background color of the nodes                                                                       | `#fff`                                                                                                                  |
| `nodeShadow`                   | `string` | Shadow property of the nodes. Syntax of short-hand CSS shadow property accepted here.               | `-5px -5px 20px #fff, 5px 5px 20px #babecc`                                                                             |
| `nodeFontColor`                | `string` | Font color of the text inside the nodes                                                             | `#666`                                                                                                                  |
| `nodeTextShadow`               | `string` | Font shadow of text inside the nodes.                                                               | `none`                                                                                                                  |
| `nodeHighlightBorder`          | `string` | Border style of the highlighted nodes\*. Syntax of short-hand CSS border property is accepted here. | `none`                                                                                                                  |
| `nodeHighlightBackgroundColor` | `string` | Background color of the highlighted nodes                                                           | `#fff`                                                                                                                  |
| `nodeHighlightShadow`          | `string` | Shadow property of the highlighted nodes. Syntax of short-hand CSS shadow property accepted here.   | `-5px -5px 20px #fff, 5px 5px 20px #babecc`                                                                             |
| `nodeHighlightFontColor`       | `string` | Font color of the text inside the highlighted nodes                                                 | `#fff`                                                                                                                  |
| `nodeHighlightTextShadow`      | `string` | Font shadow of text inside the highlighted nodes.                                                   | `0 0 5px #fff, 0 0 10px #fff, 0 0 15px #00ff15, 0 0 20px #00ff15, 0 0 25px #00ff15, 0 0 30px #00ff15, 0 0 35px #00ff15` |
| `nodeHoverBorder`              | `string` | Border style of the hovered nodes. Syntax of short-hand CSS border property is accepted here.       | `none`                                                                                                                  |
| `nodeHoverBackgroundColor`     | `string` | Background color of the hovered nodes                                                               | `#fff`                                                                                                                  |
| `nodeHoverShadow`              | `string` | Shadow property of the hovered nodes. Syntax of short-hand CSS shadow property accepted here.       | `-1px -1px 5px #fff, 1px 1px 5px #babecc`                                                                               |
| `nodeHoverFontColor`           | `string` | Font color of the text inside the hovered nodes                                                     | `#002574`                                                                                                               |
| `nodeHoverTextShadow`          | `string` | Font shadow of text inside the hovered nodes.                                                       | `none`                                                                                                                  |
| `nodeNullFontColor`            | `string` | Font color of the null nodes                                                                        | `#7c7c7c2f`                                                                                                             |
| `nodeNullHoverFontColor`       | `string` | Font color of the hovered null nodes                                                                | `#ff0000b9`                                                                                                             |
| `transitionDuration`           | `string` | CSS transition duration                                                                             | `0.5s`                                                                                                                  |

##### \* Nodes searched successfully in the tree are highlighted.

[This story](https://vandanrogheliya.github.io/react-tree-vis/?path=/story/tree-binary-search-tree--simple-example) allows you to play around with styles! (Refresh to apply styles. Working on improving UX here. Here is a rabbit for inconvenience caused. :rabbit:)

Feel styling options are limited? You can always override them with CSS. All the tree components are given id `react-tree-vis`. Refer to [this CSS file](https://github.com/VandanRogheliya/react-tree-vis/blob/master/src/styles/BinarySearchTree.css) for selectors. Also check out [this codesandbox example](https://codesandbox.io/s/overriding-css-mwp9b?file=/src/styles.css).

### useTree()

This hook allows you to interact with your tree. Insert, remove, search and so much more!

#### Usage

```js
import { useTree } from 'react-tree-vis'

const tree = useTree()
```

It returns an object with the following properties.

| Property             | Type                                                 | Description                                                                                                  |
| -------------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `ref`                | `React.MutableRefObject<any>`                        | Pass this ref object to your tree component. It binds the functions returned by this hook to that component. |
| `insert`             | `(value: number) => void`                            | Inserts the value                                                                                            |
| `remove`             | `(value: number) => boolean`                         | removes the value                                                                                            |
| `search`             | `(value: number) => boolean`                         | Searches the value and return true if found. Also, node found is highlighted                                 |
| `getData`            | `(traversalOrder: TraversalOrderType) => number[]`\* | Return traversal of the tree                                                                                 |
| `clear`              | `() => void`                                         | Removes all nodes                                                                                            |
| `balance`            | `() => void`                                         | Balances the tree                                                                                            |
| `generateRandomTree` | `(countOfNodes: number) => void`                     | Removes all nodes and inserts `countOfNodes` random values.                                                  |
| `checkTreeType`      | `() => BinaryTreeCheckType[]`\*\*                    | Checks whether the current tree is balanced, complete, perfect or full                                       |

##### \* `TraversalOrderType = 'inorder' | 'postorder' | 'preorder'`

##### \*\* `BinaryTreeCheckType = 'balanced' | 'complete' | 'perfect' | 'full' `

## Development

### Install

```sh
yarn install
```

### Develop

```sh
yarn storybook
```

### Run tests

```sh
yarn test
```

## Author

👤 **Vandan Rogheliya**

- Twitter: [@vandan_roghelia](https://twitter.com/vandan_roghelia)
- Github: [@VandanRogheliya](https://github.com/VandanRogheliya)
- LinkedIn: [@vandanrogheliya](https://linkedin.com/in/vandanrogheliya)

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2021 [Vandan Rogheliya](https://github.com/VandanRogheliya).<br />
This project is [MIT](https://github.com/VandanRogheliya/react-tree-vis/blob/master/LICENSE) licensed.

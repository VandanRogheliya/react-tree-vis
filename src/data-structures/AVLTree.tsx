import React from 'react'
import { BINARY_TREE_TYPE } from '../constants'

const LEFT = 'left'
const RIGHT = 'right'

const { BALANCED, COMPLETE, FULL, PERFECT } = BINARY_TREE_TYPE

const NULL_NODE_JSX = (
  <li className="null">
    <div>null</div>
  </li>
)

const getNormalNodeJSX = (
  value: number,
  height: number,
  leftJSX: JSX.Element,
  rightJSX: JSX.Element,
  isHighlighted = false,
) => (
  <li key={value}>
    <div className={`normal ${isHighlighted ? 'highlight' : ''}`}>
      {value} <p className="height">{height}</p>
    </div>
    <ul>
      {leftJSX} {rightJSX}
    </ul>
  </li>
)

class Node {
  value: number
  height: number
  left: Node
  right: Node
  parent: Node
  leftJSX: JSX.Element
  rightJSX: JSX.Element
  currentJSX: JSX.Element

  constructor(value: number) {
    this.value = value
    this.height = 0
    this.left = null
    this.right = null
    this.parent = null
    this.leftJSX = NULL_NODE_JSX
    this.rightJSX = NULL_NODE_JSX
    this.currentJSX = getNormalNodeJSX(
      this.value,
      this.height,
      this.leftJSX,
      this.rightJSX,
    )
  }

  //Inserting JSX of a new node
  insert(node: Node, isLeft: boolean) {
    const newJSX = node.currentJSX

    if (isLeft) {
      this.leftJSX = newJSX
    } else {
      this.rightJSX = newJSX
    }
    this.setJSX()
    this.updateRootJSX()
  }

  //Updating JSX of a node
  setJSX() {
    this.currentJSX = getNormalNodeJSX(
      this.value,
      this.height,
      this.leftJSX,
      this.rightJSX,
    )
  }

  //Updating JSX of the whole tree
  updateRootJSX() {
    if (this.parent !== null) {
      if (this.parent.left === this) this.parent.insert(this, true)
      else this.parent.insert(this, false)
    }
  }

  //Changing a child to null
  setChildToNull(isLeft: boolean) {
    if (isLeft) {
      this.leftJSX = NULL_NODE_JSX
    } else {
      this.rightJSX = NULL_NODE_JSX
    }
    this.setJSX()
    this.updateRootJSX()
  }

  //interchanging a child with a grandchild
  setChildToChildsChild(isLeftChild: boolean, isLeft: boolean) {
    if (isLeftChild) {
      if (isLeft) {
        this.leftJSX = this.left.left.currentJSX
        this.setJSX()
      } else {
        this.leftJSX = this.left.right.currentJSX
        this.setJSX()
      }
    } else {
      if (isLeft) {
        this.rightJSX = this.right.left.currentJSX
        this.setJSX()
      } else {
        this.rightJSX = this.right.right.currentJSX

        this.setJSX()
      }
    }
    this.updateRootJSX()
  }

  //Removing JSX of a deleted node
  remove(childrenCondtion?: string) {
    if (!this.parent) return
    if (!childrenCondtion) {
      if (this.parent.left === this) {
        this.parent.setChildToNull(true)
      } else {
        this.parent.setChildToNull(false)
      }
    } else if (childrenCondtion === LEFT) {
      if (this.parent.left === this) {
        this.parent.setChildToChildsChild(true, true)
      } else {
        this.parent.setChildToChildsChild(false, true)
      }
    } else {
      if (this.parent.left === this) {
        this.parent.setChildToChildsChild(true, false)
      } else {
        this.parent.setChildToChildsChild(false, false)
      }
    }
  }

  //Updates value of a node JSX
  updateValue(value: number) {
    this.value = value
    this.setJSX()
    this.updateRootJSX()
  }

  //Adds Highlight to node JSX
  addHighlight() {
    // TODO: Test
    this.currentJSX = getNormalNodeJSX(
      this.value,
      this.height,
      this.leftJSX,
      this.rightJSX,
      true,
    )

    this.updateRootJSX()
  }

  //Clears Highlight of the node JSX
  clearHighlight() {
    this.setJSX()

    this.updateRootJSX()
  }

  //Updating JSX after balancing
  balanceJSX() {
    if (!this.left && this.right) {
      this.right.balanceJSX()

      this.rightJSX = this.right.currentJSX
      this.setChildToNull(true)
    } else if (!this.right && this.left) {
      this.left.balanceJSX()

      this.leftJSX = this.left.currentJSX
      this.setChildToNull(false)
    } else if (this.right && this.left) {
      this.left.balanceJSX()
      this.right.balanceJSX()

      this.leftJSX = this.left.currentJSX
      this.rightJSX = this.right.currentJSX
      this.setJSX()
      this.updateRootJSX()
    } else {
      this.leftJSX = NULL_NODE_JSX

      this.rightJSX = NULL_NODE_JSX
      this.setJSX()
      this.updateRootJSX()
    }
  }
}

class AVL {
  root: Node
  highlightedNode: Node
  leafDepth: number
  constructor(num = 0) {
    this.root = null
    if (num) {
      this.generateRandomBST(num)
    }
    this.highlightedNode = null
    this.leafDepth = -1
  }

  //Helper functions
  rotateRight(node: Node) {
    const tempNode = node.left
    if (node.left.right) node.left.right.parent = node
    node.left = node.left.right

    //For Handling JSX
    tempNode.parent = node.parent
    node.parent = tempNode
    //For Handling JSX END

    tempNode.right = node
    tempNode.height = this.setHeight(tempNode)
    node.height = this.setHeight(node)
    return tempNode
  }

  rotateLeft(node: Node) {
    const tempNode = node.right
    if (node.right.left) node.right.left.parent = node
    node.right = node.right.left

    //For Handling JSX
    tempNode.parent = node.parent
    node.parent = tempNode
    //For Handling JSX END

    tempNode.left = node
    // tempNode.left
    tempNode.height = this.setHeight(tempNode)
    node.height = this.setHeight(node)
    return tempNode
  }

  //Sets hight of a node
  setHeight(node: Node) {
    if (node === null) return -1
    const leftHeight = node.left !== null ? node.left.height : -1
    const rightHeight = node.right !== null ? node.right.height : -1
    return Math.max(leftHeight, rightHeight) + 1
  }

  //Checks if a sub tree is balanced
  balanceCheck(node: Node) {
    if (node === null) return 0
    const leftHeight = node.left !== null ? node.left.height : -1
    const rightHeight = node.right !== null ? node.right.height : -1
    return leftHeight - rightHeight
  }

  //Balances the Tree
  balance(node: Node) {
    const balance = this.balanceCheck(node)
    if (balance > 1) {
      if (this.setHeight(node.left.left) > this.setHeight(node.left.right)) {
        node = this.rotateRight(node)
      } else {
        node.left = this.rotateLeft(node.left)

        node = this.rotateRight(node)
      }
    } else if (balance < -1) {
      if (this.setHeight(node.right.right) > this.setHeight(node.right.left)) {
        node = this.rotateLeft(node)
      } else {
        node.right = this.rotateRight(node.right)

        node = this.rotateLeft(node)
      }
    }
    if (node !== null) node.height = this.setHeight(node)
    if (node && node.right) node.right.balanceJSX()
    if (node && node.left) node.left.balanceJSX()
    return node
  }

  findMax(node = this.root) {
    if (node == null) {
      return node
    } else if (node.right == null) {
      return node
    } else {
      return this.findMax(node.right)
    }
  }

  findMin(node = this.root) {
    if (node == null) {
      return node
    } else if (node.left == null) {
      return node
    } else {
      return this.findMin(node.left)
    }
  }

  //inserting a new node
  insert(value: number) {
    this.clearHighlight()
    const newNode = new Node(value)
    if (this.root === null) this.root = newNode
    else this.root = this.insertNode(this.root, newNode)
  }

  insertNode(node: Node, newNode: Node) {
    if (newNode.value < node.value) {
      if (node.left === null) {
        node.left = newNode
        newNode.parent = node
        node.insert(newNode, true)
      } else node.left = this.insertNode(node.left, newNode)
    } else {
      if (node.right === null) {
        node.right = newNode
        newNode.parent = node
        node.insert(newNode, false)
      } else node.right = this.insertNode(node.right, newNode)
    }

    node = this.balance(node)
    return node
  }

  //Deleting node
  remove(value: number) {
    this.clearHighlight()
    this.root = this.removeNode(this.root, value)
  }

  removeNode(node: Node, value: number) {
    if (node === null || typeof node === 'undefined') return null
    else if (value < node.value) {
      node.left = this.removeNode(node.left, value)
      // return node
    } else if (value > node.value) {
      node.right = this.removeNode(node.right, value)
      // return node
    } else {
      if (node.left === null && node.right === null) {
        node.remove(null)
        node = null
        // return node
      } else if (node.left === null) {
        node.remove(RIGHT)
        node.right.parent = node.parent
        node = node.right
        // return node
      } else if (node.right === null) {
        node.remove(LEFT)
        node.left.parent = node.parent
        node = node.left
        // return node
      } else {
        const minNodeOfRight = this.findMin(node.right)
        node.updateValue(minNodeOfRight.value)

        node.right = this.removeNode(node.right, minNodeOfRight.value)
      }
    }
    node = this.balance(node)
    return node
  }

  //Tree Traversal
  preorder(list: number[], node = this.root) {
    if (node !== null) {
      list.push(node.value)
      this.preorder(list, node.left)
      this.preorder(list, node.right)
    }
  }

  inorder(list: number[], node = this.root) {
    if (node !== null) {
      this.inorder(list, node.left)
      list.push(node.value)
      this.inorder(list, node.right)
    }
  }

  postorder(list: number[], node = this.root) {
    if (node !== null) {
      this.postorder(list, node.left)
      this.postorder(list, node.right)
      list.push(node.value)
    }
  }

  //Search
  search(value: number, node = this.root) {
    this.clearHighlight()

    if (node === null) return false
    else if (node.value === value) {
      node.addHighlight()
      this.highlightedNode = node
      return true
    } else if (node.value > value) return this.search(value, node.left)
    else return this.search(value, node.right)
  }

  //Random Tree generator
  generateRandomBST(num: number) {
    const upper = 0
    const lower = num * 2 + 10
    const elements = new Set()

    for (let i = 0; i < num; i++) {
      let value = Math.floor(Math.random() * (upper - lower + 1)) + lower
      while (elements.has(value)) {
        value = Math.floor(Math.random() * (upper - lower + 1)) + lower
      }
      elements.add(value)

      this.insert(value)
    }
  }

  //BST Checker
  //Main Checker function
  checkAVL() {
    const BSTTypeList = []
    if (this.isBalanced()) {
      BSTTypeList.push(BALANCED)
    }
    if (this.isComplete()) {
      BSTTypeList.push(COMPLETE)
    }
    if (this.isPerfect()) {
      BSTTypeList.push(PERFECT)
    }
    if (this.isFull()) {
      BSTTypeList.push(FULL)
    }
    return BSTTypeList
  }

  //Subfunctions
  //balance
  isBalanced(node = this.root) {
    if (node === null) return true
    const leftH = node.left ? node.left.height : -1
    const rightH = node.right ? node.right.height : -1
    if (Math.abs(leftH - rightH) <= 1) {
      return this.isBalanced(node.left) && this.isBalanced(node.right)
    } else {
      return false
    }
  }

  //complete
  isComplete() {
    const totalNodes = this.countNodes()
    return this.isComplete2(0, totalNodes)
  }
  isComplete2(index: number, totalNodes: number, node = this.root) {
    if (node === null) return true
    else if (index >= totalNodes) return false
    else {
      let ans = this.isComplete2(index * 2 + 1, totalNodes, node.left)
      ans &= this.isComplete2(index * 2 + 2, totalNodes, node.right)
      return ans
    }
  }

  //perfect
  isPerfect() {
    if (!this.isFull() || !this.isComplete()) return false
    return this.isPerfect2()
  }

  isPerfect2(node = this.root, depth = 0) {
    if (!node) return true
    depth++
    if (!node.right && !node.left) {
      if (this.leafDepth !== -1 && this.leafDepth !== depth) return false
      this.leafDepth = depth
    }
    return (
      this.isPerfect2(node.left, depth) && this.isPerfect2(node.right, depth)
    )
  }

  //full
  isFull(node = this.root) {
    if (node === null) return true
    else if (node.left === null && node.right === null) return true
    else if (node.left !== null && node.right !== null) {
      let ans: boolean
      ans = this.isFull(node.left)
      ans &&= this.isFull(node.right)
      return ans
    } else return false
  }

  countNodes(node = this.root) {
    if (node === null) return 0
    return this.countNodes(node.left) + 1 + this.countNodes(node.right)
  }

  //Clears highlight of previously searched nodes
  clearHighlight() {
    if (this.highlightedNode) {
      this.highlightedNode.clearHighlight()
      this.highlightedNode = null
    }
  }
}

export default AVL

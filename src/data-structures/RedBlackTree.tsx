import React from 'react'
import { BINARY_TREE_TYPE } from '../constants'

type Color = typeof RED | typeof BLACK

const BLACK = 0
const RED = 1
const { BALANCED, COMPLETE, FULL, PERFECT } = BINARY_TREE_TYPE

const getNormalNodeJSX = (
  value: number,
  leftJSX: JSX.Element,
  rightJSX: JSX.Element,
  color: Color,
  isHighlighted = false,
) => (
  <li key={value}>
    <div
      className={`normal ${color === RED ? 'red' : 'black'} ${
        isHighlighted ? 'highlight' : ''
      }`}
    >
      {value}
    </div>
    <ul>
      {leftJSX} {rightJSX}
    </ul>
  </li>
)

class NullNode {
  color: number
  isNull: boolean
  parent: Node
  currentJSX: JSX.Element
  value: null
  left: null
  right: null
  insert() {
    return
  }
  addHighlight() {
    return
  }
  constructor() {
    this.color = BLACK
    this.isNull = true
    this.parent = null
    this.currentJSX = (
      <li className="null">
        <div className={`null black`}>null</div>
      </li>
    )
  }
}

class Node {
  value: number
  color: Color
  right: Node | NullNode
  left: Node | NullNode
  parent: Node
  isNull: boolean
  currentJSX: JSX.Element

  constructor(value: number) {
    const newNullNode = new NullNode()
    newNullNode.parent = this
    this.value = value
    this.color = RED
    this.right = newNullNode
    this.left = newNullNode
    this.parent = null
    this.isNull = false

    this.currentJSX = (
      <li key={this.value}>
        <div className={`normal red`}>{this.value}</div>
        <ul>
          {this.left.currentJSX} {this.right.currentJSX}
        </ul>
      </li>
    )
  }

  //Updating html of a node
  setHtml() {
    this.currentJSX = getNormalNodeJSX(
      this.value,
      this.left.currentJSX,
      this.right.currentJSX,
      this.color,
    )
  }

  //Updating html of the whole tree
  updateRootHtml() {
    if (this.parent !== null) {
      this.parent.insert()
    }
  }

  //Inserting new node to tree
  insert() {
    this.setHtml()
    this.updateRootHtml()
  }

  //Adds Highlight to node html
  addHighlight() {
    this.currentJSX = getNormalNodeJSX(
      this.value,
      this.left.currentJSX,
      this.right.currentJSX,
      this.color,
      true,
    )

    this.updateRootHtml()
  }

  //Clears Highlight of the node html
  clearHighlight() {
    this.setHtml()
    this.updateRootHtml()
  }
}

class RBT {
  root: Node | NullNode
  highlighted: Node
  leafDepth: number

  constructor(num = 0) {
    const newNullNode = new NullNode()
    this.root = newNullNode
    if (num) {
      this.generateRandomBST(num)
    }
    this.highlighted = null
    this.leafDepth = -1
  }

  //Helper functions
  //Rotate right
  rotateRight(node: Node, toRecolor: boolean) {
    const parent = node.parent
    node.parent = parent.parent
    if (parent.parent !== null) {
      if (parent.parent.left === parent) {
        parent.parent.left = node
      } else {
        parent.parent.right = node
      }
    }
    const right = node.right
    node.right = parent
    parent.parent = node
    parent.left = right
    right.parent = parent
    if (toRecolor) {
      node.color = BLACK
      parent.color = RED
    }
  }

  //Rotate left
  rotateLeft(node: Node, toRecolor: boolean) {
    const parent = node.parent
    node.parent = parent.parent
    if (parent.parent !== null) {
      if (parent.parent.right === parent) {
        parent.parent.right = node
      } else {
        parent.parent.left = node
      }
    }
    const left = node.left
    node.left = parent
    parent.parent = node
    parent.right = left
    left.parent = parent
    if (toRecolor) {
      node.color = BLACK
      parent.color = RED
    }
  }

  //Find sibling
  siblingOf(node: Node) {
    if (node.parent === null) return null
    if (node.parent.left === node) {
      return node.parent.right
    } else {
      return node.parent.left
    }
  }

  //Finding min value
  findMin(node = this.root) {
    if (node.isNull) {
      return node
    } else if (node.left.isNull) {
      return node
    } else {
      return this.findMin(node.left)
    }
  }

  //Insert
  insert(value: number) {
    this.root = this.insertNode(null, this.root as Node, value)
  }

  //Insert helper function
  insertNode(parent: Node, node: Node, value: number) {
    if (node.isNull) {
      const newNode = new Node(value)
      if (parent === null) {
        newNode.color = BLACK
        newNode.insert()
        return newNode
      } else {
        newNode.parent = parent
        return newNode
      }
    }

    if (node.value === value) {
      return node
    }

    let isLeft: boolean
    if (node.value > value) {
      const left = this.insertNode(node, node.left as Node, value)
      if (left === node.parent) {
        node.insert()
        return left
      }
      node.left = left
      isLeft = true
    } else {
      const right = this.insertNode(node, node.right as Node, value)
      if (right === node.parent) {
        node.insert()
        return right
      }
      node.right = right
      isLeft = false
    }

    if (isLeft) {
      if (node.left.color === RED && node.color === RED) {
        const sibling = this.siblingOf(node)
        if (sibling.color === BLACK || sibling.isNull) {
          if (node.parent.left === node) {
            this.rotateRight(node, true)
          } else {
            this.rotateRight(node.left as Node, false)
            node = node.parent
            this.rotateLeft(node, true)
          }
        } else {
          node.color = BLACK
          sibling.color = BLACK
          if (node.parent.parent !== null) {
            node.parent.color = RED
          }
        }
      }
    } else {
      if (node.right.color === RED && node.color === RED) {
        const sibling = this.siblingOf(node)
        if (sibling.color === BLACK || sibling.isNull) {
          if (node.parent.right === node) {
            this.rotateLeft(node, true)
          } else {
            this.rotateLeft(node.right as Node, false)
            node = node.parent
            this.rotateRight(node, true)
          }
        } else {
          node.color = BLACK
          sibling.color = BLACK
          if (node.parent.parent !== null) {
            node.parent.color = RED
          }
        }
      }
    }

    if (!node.left.isNull) node.left.insert()
    if (!node.right.isNull) node.right.insert()

    return node
  }

  //Delete Node
  remove(value: number, node = this.root) {
    this.clearHighlight()
    if (node.isNull) {
      return
    }
    if (node.value === value) {
      if (node.left.isNull || node.right.isNull) {
        const tempParent = node.parent
        this.deleteOneChild(node as Node)
        if (tempParent) {
          if (!tempParent.left.isNull) tempParent.left.insert()
          if (!tempParent.right.isNull) tempParent.right.insert()
          tempParent.insert()
          if (tempParent.parent) tempParent.parent.insert()
        } else if (!this.root.isNull) this.root.insert()
      } else {
        const smallestRight = this.findMin(node.right)
        node.value = smallestRight.value
        node.insert()
        this.remove(smallestRight.value, node.right)
      }
    }

    if (node.value > value) {
      this.remove(value, node.left)
    } else {
      this.remove(value, node.right)
    }
  }

  //Delete helper functions
  deleteOneChild(node: Node) {
    let child

    if (node.left.isNull) {
      child = node.right
    } else {
      child = node.left
    }
    this.replaceChild(child, node)
    if (node.color === BLACK) {
      if (child.color === RED) {
        child.color = BLACK
        child.insert()
      } else this.deleteCase1(child)
    }
  }

  //All cases
  deleteCase1(node: Node) {
    if (node.parent === null) {
      this.root = node
      if (!this.root.isNull) this.root.insert()
      return
    }
    this.deleteCase2(node)
  }

  deleteCase2(node: Node) {
    const sibling = this.siblingOf(node)
    if (sibling.color === RED) {
      if (sibling.parent.left === sibling)
        this.rotateRight(sibling as Node, true)
      else this.rotateLeft(sibling as Node, true)
      if (sibling.parent === null) this.root = sibling
    }
    this.deleteCase3(node)
  }

  deleteCase3(node: Node) {
    const sibling = this.siblingOf(node)
    if (
      node.parent.color === BLACK &&
      sibling.color === BLACK &&
      sibling.left.color === BLACK &&
      sibling.right.color === BLACK
    ) {
      sibling.color = RED
      this.deleteCase1(node.parent)
    } else {
      this.deleteCase4(node)
    }
  }

  deleteCase4(node: Node) {
    const sibling = this.siblingOf(node)
    if (
      node.parent.color === RED &&
      sibling.color === BLACK &&
      sibling.left.color === BLACK &&
      sibling.right.color === BLACK
    ) {
      sibling.color = RED
      node.parent.color = BLACK
      return
    } else {
      this.deleteCase5(node)
    }
  }

  deleteCase5(node: Node) {
    const sibling = this.siblingOf(node)
    if (sibling.color === BLACK) {
      if (
        node.parent.left === node &&
        sibling.right.color === BLACK &&
        sibling.left.color === RED
      ) {
        this.rotateRight(sibling.left as Node, true)
        sibling.insert()
      } else if (
        node.parent.right === node &&
        sibling.left.color === BLACK &&
        sibling.right.color === RED
      ) {
        this.rotateLeft(sibling.right as Node, true)
        sibling.insert()
      }
    }
    this.deleteCase6(node)
  }

  deleteCase6(node: Node) {
    const sibling = this.siblingOf(node)
    sibling.color = sibling.parent.color
    sibling.parent.color = BLACK
    if (node.parent.left === node) {
      sibling.right.color = BLACK
      this.rotateLeft(sibling as Node, false)
      if (!sibling.right.isNull) sibling.right.insert()
      if (!sibling.left.isNull) sibling.left.insert()
    } else {
      sibling.left.color = BLACK
      this.rotateRight(sibling as Node, false)
      if (!sibling.right.isNull) sibling.right.insert()
      if (!sibling.left.isNull) sibling.left.insert()
    }
    if (sibling.parent === null) {
      this.root = sibling
    }
  }

  replaceChild(child: Node, node: Node) {
    child.parent = node.parent
    if (node.parent === null) this.root = child
    else {
      if (node.parent.left === node) {
        node.parent.left = child
      } else {
        node.parent.right = child
      }
    }
  }

  //Tree Traversal
  preorder(list: number[], node = this.root) {
    if (!node.isNull) {
      list.push(node.value)
      this.preorder(list, node.left)
      this.preorder(list, node.right)
    }
  }

  inorder(list: number[], node = this.root) {
    if (!node.isNull) {
      this.inorder(list, node.left)
      list.push(node.value)
      this.inorder(list, node.right)
    }
  }

  postorder(list: number[], node = this.root) {
    if (!node.isNull) {
      this.postorder(list, node.left)
      this.postorder(list, node.right)
      list.push(node.value)
    }
  }

  //Search
  search(value: number, node = this.root) {
    this.clearHighlight()

    if (node.isNull) return false
    else if (node.value === value) {
      node.addHighlight()
      this.highlighted = node as Node
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
  checkBinaryTree() {
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
    if (node.isNull) return true
    const leftH = this.height(node.left)
    const rightH = this.height(node.right)
    if (Math.abs(leftH - rightH) <= 1) {
      return this.isBalanced(node.left) && this.isBalanced(node.right)
    } else {
      return false
    }
  }

  //Find height
  height(node = this.root) {
    if (node.isNull) return -1
    let ans: number
    ans = this.height(node.left)
    ans = Math.max(this.height(node.right), ans)
    return ans + 1
  }

  //complete
  isComplete() {
    const totalNodes = this.countNodes()
    return this.isComplete2(0, totalNodes)
  }
  isComplete2(index: number, totalNodes: number, node = this.root) {
    if (node.isNull) return true
    else if (index >= totalNodes) return false
    else {
      let ans = this.isComplete2(index * 2 + 1, totalNodes, node.left)
      ans &= this.isComplete2(index * 2 + 2, totalNodes, node.right)
      return ans
    }
  }

  //perfect EDITED
  isPerfect() {
    if (!this.isFull() || !this.isComplete()) return false
    return this.isPerfect2()
  }

  isPerfect2(node = this.root, depth = 0) {
    if (node.isNull) return true
    depth++
    if (node.right.isNull && node.left.isNull) {
      if (this.leafDepth !== -1 && this.leafDepth !== depth) return false
      this.leafDepth = depth
    }
    return (
      this.isPerfect2(node.left, depth) && this.isPerfect2(node.right, depth)
    )
  }

  //full
  isFull(node = this.root) {
    if (node.isNull) return true
    else if (node.left.isNull && node.right.isNull) return true
    else if (!node.left.isNull && !node.right.isNull) {
      let ans
      ans = this.isFull(node.left)
      ans &= this.isFull(node.right)
      return ans
    } else return false
  }

  countNodes(node = this.root) {
    if (node.isNull) return 0
    return this.countNodes(node.left) + 1 + this.countNodes(node.right)
  }

  //Clears highlight of previously searched nodes
  clearHighlight() {
    if (this.highlighted) {
      this.highlighted.clearHighlight()
      this.highlighted = null
    }
  }
}

export default RBT

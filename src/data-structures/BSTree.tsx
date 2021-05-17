import React from 'react'
import { BINARY_TREE_TYPE } from '../constants'
import { BinaryTreeCheckType } from '../types'

const LEFT = 'left'
const RIGHT = 'right'
export class Node {
  value: number
  left: Node
  right: Node
  parent: Node
  leftJSX: JSX.Element
  rightJSX: JSX.Element
  currentJSX: JSX.Element

  constructor(value: number) {
    this.value = value
    this.left = null
    this.right = null
    this.parent = null

    this.leftJSX = (
      <li className="null">
        <div>null</div>
      </li>
    )

    this.rightJSX = (
      <li className="null">
        <div className="null">null</div>
      </li>
    )

    this.currentJSX = (
      <li key={this.value}>
        <div className="normal">{this.value}</div>
        <ul>
          {this.leftJSX} {this.rightJSX}
        </ul>
      </li>
    )
  }

  //Inserts a node in JSX
  insert(node: Node, isLeft: boolean): void {
    const newJSX = node.currentJSX

    if (isLeft) {
      this.leftJSX = newJSX
    } else {
      this.rightJSX = newJSX
    }
    this.setJSX()
    this.updateRootJSX()
  }

  //Updates JSX for the node
  setJSX(): void {
    this.currentJSX = (
      <li>
        <div className="normal">{this.value}</div>
        <ul>
          {this.leftJSX} {this.rightJSX}
        </ul>
      </li>
    )
  }

  //Updates the whole JSX
  updateRootJSX(): void {
    if (this.parent !== null) {
      if (this.parent.left === this) this.parent.insert(this, true)
      else this.parent.insert(this, false)
    }
  }

  //Sets one child to null
  setChildToNull(isLeft: boolean): void {
    if (isLeft) {
      this.leftJSX = (
        <li className="null">
          <div>null</div>
        </li>
      )
    } else {
      this.rightJSX = (
        <li className="null">
          <div>null</div>
        </li>
      )
    }
    this.setJSX()
    this.updateRootJSX()
  }

  //Sets grandchild to child
  setChildToChildsChild(isLeftChild: boolean, isLeft: boolean): void {
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

  //Removes a node from JSX
  remove(childrenCondtion: string): void {
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

  //Updates the value of a node
  updateValue(value: number): void {
    this.value = value
    this.setJSX()
    this.updateRootJSX()
  }

  //Adds highlight to a node when searched
  addHighlight(): void {
    this.currentJSX = (
      <li key={this.value}>
        <div className="normal highlight">{this.value}</div>
        <ul>
          {this.leftJSX} {this.rightJSX}
        </ul>
      </li>
    )

    this.updateRootJSX()
  }

  //Removes the highlight
  clearHighlight(): void {
    this.setJSX()

    this.updateRootJSX()
  }

  //Changes the JSX when tree is balanced
  balanceJSX(): void {
    if (!this.left && this.right) {
      this.rightJSX = this.right.currentJSX
      this.setChildToNull(true)
    } else if (!this.right && this.left) {
      this.leftJSX = this.left.currentJSX
      this.setChildToNull(false)
    } else if (this.right && this.left) {
      this.leftJSX = this.left.currentJSX
      this.rightJSX = this.right.currentJSX
      this.setJSX()
      this.updateRootJSX()
    } else {
      this.leftJSX = (
        <li className="null">
          <div>null</div>
        </li>
      )

      this.rightJSX = (
        <li className="null">
          <div className="null">null</div>
        </li>
      )
      this.setJSX()
      this.updateRootJSX()
    }
  }
}

class BST {
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

  //inserting a new node
  insert(value: number): void {
    this.clearHighlight()
    const newNode = new Node(value)
    if (this.root === null) {
      this.root = newNode
    } else this.insertNode(this.root, newNode)
  }

  insertNode(node: Node, newNode: Node): void {
    if (newNode.value < node.value) {
      if (node.left === null) {
        node.left = newNode
        newNode.parent = node
        node.insert(newNode, true)
      } else this.insertNode(node.left, newNode)
    } else {
      if (node.right === null) {
        node.right = newNode
        newNode.parent = node
        node.insert(newNode, false)
      } else this.insertNode(node.right, newNode)
    }
  }

  //Finding max value
  findMax(node = this.root): Node {
    if (node == null) return node
    else if (node.right == null) {
      return node
    } else {
      return this.findMax(node.right)
    }
  }

  //Finding min value
  findMin(node = this.root): Node {
    if (node == null) return node
    else if (node.left == null) {
      return node
    } else {
      return this.findMin(node.left)
    }
  }

  //Deleting node
  remove(value: number): void {
    this.clearHighlight()
    this.root = this.removeNode(this.root, value)
  }

  // TODO: Probably returning a node is not required, handling it simialr to insert function
  removeNode(node: Node, value: number): Node {
    if (node === null) return null
    else if (value < node.value) {
      node.left = this.removeNode(node.left, value)
      return node
    } else if (value > node.value) {
      node.right = this.removeNode(node.right, value)
      return node
    } else {
      if (node.left === null && node.right === null) {
        node.remove(null)
        node = null
        return node
      }
      if (node.left === null) {
        node.remove(RIGHT)
        node.right.parent = node.parent
        node = node.right
        return node
      } else if (node.right === null) {
        node.remove(LEFT)
        node.left.parent = node.parent
        node = node.left
        return node
      }
      const minNodeOfRight = this.findMin(node.right)
      node.updateValue(minNodeOfRight.value)

      node.right = this.removeNode(node.right, minNodeOfRight.value)
      return node
    }
  }

  //Find height
  height(node = this.root): number {
    if (node === null) return -1
    let ans: number
    ans = this.height(node.left)
    ans = Math.max(this.height(node.right), ans)
    return ans + 1
  }

  //Count number of nodes
  countNodes(node = this.root): number {
    if (node === null) return 0
    return this.countNodes(node.left) + 1 + this.countNodes(node.right)
  }

  //BST traversal
  preorder(list: number[], node = this.root): void {
    if (node !== null) {
      list.push(node.value)
      this.preorder(list, node.left)
      this.preorder(list, node.right)
    }
  }

  inorder(list: number[], node = this.root): void {
    if (node !== null) {
      this.inorder(list, node.left)
      list.push(node.value)
      this.inorder(list, node.right)
    }
  }

  postorder(list: number[], node = this.root): void {
    if (node !== null) {
      this.postorder(list, node.left)
      this.postorder(list, node.right)
      list.push(node.value)
    }
  }

  //Search
  search(value: number, node = this.root): boolean {
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
  generateRandomBST(num: number): void {
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
  checkBST(): BinaryTreeCheckType[] {
    const { BALANCED, COMPLETE, FULL, PERFECT } = BINARY_TREE_TYPE
    const BSTTypeList: BinaryTreeCheckType[] = []
    if (this.isBalanced()) {
      BSTTypeList.push(BALANCED)
    }
    if (this.isComplete()) {
      BSTTypeList.push(COMPLETE)
    }
    if (this.isPerfect()) {
      BSTTypeList.push(FULL)
    }
    if (this.isFull()) {
      BSTTypeList.push(PERFECT)
    }
    return BSTTypeList
  }

  //Subfunctions
  //balance
  isBalanced(node = this.root): boolean {
    if (node === null) return true
    const leftHeight = this.height(node.left)
    const rightHeight = this.height(node.right)
    if (Math.abs(leftHeight - rightHeight) <= 1) {
      return this.isBalanced(node.left) && this.isBalanced(node.right)
    } else {
      return false
    }
  }

  //complete
  isComplete(): boolean {
    const totalNodes = this.countNodes()
    return this.isComplete2(0, totalNodes)
  }
  isComplete2(index: number, totalNodes: number, node = this.root): boolean {
    if (node === null) return true
    else if (index >= totalNodes) return false
    else {
      let ans = this.isComplete2(index * 2 + 1, totalNodes, node.left)
      ans &&= this.isComplete2(index * 2 + 2, totalNodes, node.right)
      return ans
    }
  }

  //perfect
  isPerfect(): boolean {
    if (!this.isFull() || !this.isComplete()) return false
    return this.isPerfect2()
  }

  isPerfect2(node = this.root, depth = 0): boolean {
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
  isFull(node = this.root): boolean {
    if (node === null) return true
    else if (node.left === null && node.right === null) return true
    else if (node.left !== null && node.right !== null) {
      let ans: boolean
      ans = this.isFull(node.left)
      ans &&= this.isFull(node.right)
      return ans
    } else return false
  }

  //Balancing BST
  // TODO: improve the algorithm, it does not work for repeated values
  balance(node = this.root): void {
    this.clearHighlight()
    const nodes: Node[] = []
    this.BSTToArr(node, nodes)
    const length = nodes.length
    this.root = null

    this.makeBST(nodes, 0, length - 1)
  }

  //Balancing sub functions
  BSTToArr(node: Node, nodes: Node[]): void {
    if (node !== null) {
      this.BSTToArr(node.left, nodes)
      nodes.push(node)
      this.BSTToArr(node.right, nodes)
    }
  }

  //making BST from array
  makeBST(nodes: Node[], start: number, end: number): void {
    if (start > end) {
      return
    }
    const mid = Math.floor((start + end) / 2)
    this.insert(nodes[mid].value)
    this.makeBST(nodes, start, mid - 1)
    this.makeBST(nodes, mid + 1, end)
  }

  clearHighlight(): void {
    if (this.highlightedNode) {
      this.highlightedNode.clearHighlight()
      this.highlightedNode = null
    }
  }
}

export default BST

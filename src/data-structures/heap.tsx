import React from 'react'

class Heap {
  end: number
  heap: number[]
  currentJSX: JSX.Element
  constructor(num = 0) {
    this.end = 0
    this.heap = []
    this.currentJSX = null
    if (num) {
      this.generateRandomHeap(num)
    }
  }

  heapifyUp(j: number) {
    console.error(j + ": Base class's heapifyUp called")
  }
  heapifyDown(j = 0) {
    console.error(j + ": Base class's heapifyDown called")
  }

  //Checks if heap is empty
  isEmpty() {
    return this.end === 0
  }

  //inserts a new value into the heap
  insert(value: number) {
    this.heap[this.end] = value
    this.heapifyUp(this.end++)
    this.currentJSX = this.updateJSX()
  }

  //Extracts the top value
  removeTop() {
    if (this.isEmpty()) return null
    const poppedTopElement = this.heap[0]
    this.heap[0] = this.heap[--this.end]
    this.heapifyDown()
    this.heap.pop()
    this.currentJSX = this.updateJSX()

    return poppedTopElement
  }

  //Deletes a specified value
  deleteEl(value: number, isMinHeap = true) {
    const index = this.heap.indexOf(value)
    if (index === -1) return
    this.heap[index] = isMinHeap
      ? Number.NEGATIVE_INFINITY
      : Number.POSITIVE_INFINITY
    this.heapifyUp(index)
    this.removeTop()
  }

  //Updates the whole JSX
  updateJSX(parentIndex = 0) {
    if (!this.end) return null
    const child1Index = 2 * parentIndex + 1
    const child2Index = child1Index + 1

    if (child2Index >= this.end && child1Index >= this.end) {
      return (
        <li key={parentIndex}>
          <div className="normal">{this.heap[parentIndex]}</div>
          <ul>
            <li className="null">
              <div className="null">null</div>
            </li>
            <li className="null">
              <div className="null">null</div>
            </li>
          </ul>
        </li>
      )
    } else if (child2Index >= this.end && child1Index < this.end) {
      const child1JSX = this.updateJSX(child1Index)
      return (
        <li key={parentIndex}>
          <div className="normal">{this.heap[parentIndex]}</div>
          <ul>
            {child1JSX}
            <li className="null">
              <div className="null">null</div>
            </li>
          </ul>
        </li>
      )
    } else if (child2Index < this.end && child1Index >= this.end) {
      const child2JSX = this.updateJSX(child2Index)
      return (
        <li key={parentIndex}>
          <div className="normal">{this.heap[parentIndex]}</div>
          <ul>
            <li className="null">
              <div className="null">null</div>
            </li>
            {child2JSX}
          </ul>
        </li>
      )
    } else {
      const child1JSX = this.updateJSX(child1Index)
      const child2JSX = this.updateJSX(child2Index)
      return (
        <li key={parentIndex}>
          <div className="normal">{this.heap[parentIndex]}</div>
          <ul>
            {child1JSX}
            {child2JSX}
          </ul>
        </li>
      )
    }
  }

  //inserts num random values
  generateRandomHeap(num: number) {
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
}

export class MinHeap extends Heap {
  //Helper functions
  heapifyUp(childIndex: number) {
    if (childIndex === 0) return
    let parentIndex = childIndex
    if (parentIndex % 2 === 0) parentIndex -= 2
    else parentIndex--
    parentIndex /= 2
    if (this.heap[parentIndex] > this.heap[childIndex]) {
      ;[this.heap[parentIndex], this.heap[childIndex]] = [
        this.heap[childIndex],
        this.heap[parentIndex],
      ]
      this.heapifyUp(parentIndex)
    }
  }

  heapifyDown(parentIndex = 0) {
    const child1Index = 2 * parentIndex + 1
    const child2Index = child1Index + 1

    if (child2Index >= this.end && child1Index >= this.end) return
    else if (child2Index >= this.end && child1Index < this.end) {
      if (this.heap[child1Index] < this.heap[parentIndex]) {
        ;[this.heap[parentIndex], this.heap[child1Index]] = [
          this.heap[child1Index],
          this.heap[parentIndex],
        ]
        this.heapifyDown(child1Index)
      }
    } else if (child2Index < this.end && child1Index >= this.end) {
      if (this.heap[child2Index] < this.heap[parentIndex]) {
        ;[this.heap[parentIndex], this.heap[child2Index]] = [
          this.heap[child2Index],
          this.heap[parentIndex],
        ]
        this.heapifyDown(child2Index)
      }
    } else {
      if (
        this.heap[parentIndex] > this.heap[child1Index] ||
        this.heap[parentIndex] > this.heap[child2Index]
      ) {
        if (this.heap[child1Index] < this.heap[child2Index]) {
          ;[this.heap[parentIndex], this.heap[child1Index]] = [
            this.heap[child1Index],
            this.heap[parentIndex],
          ]
          this.heapifyDown(child1Index)
        } else {
          ;[this.heap[parentIndex], this.heap[child2Index]] = [
            this.heap[child2Index],
            this.heap[parentIndex],
          ]
          this.heapifyDown(child2Index)
        }
      }
    }
  }

  remove(value: number) {
    return this.deleteEl(value)
  }
}

export class MaxHeap extends Heap {
  //Helper Functions
  heapifyUp(childIndex: number) {
    if (childIndex === 0) return
    let parentIndex = childIndex
    if (parentIndex % 2 === 0) parentIndex -= 2
    else parentIndex--
    parentIndex /= 2
    if (this.heap[parentIndex] < this.heap[childIndex]) {
      ;[this.heap[parentIndex], this.heap[childIndex]] = [
        this.heap[childIndex],
        this.heap[parentIndex],
      ]
      this.heapifyUp(parentIndex)
    }
  }

  heapifyDown(parentIndex = 0) {
    const child1Index = 2 * parentIndex + 1
    const child2Index = child1Index + 1

    if (child2Index >= this.end && child1Index >= this.end) return
    else if (child2Index >= this.end && child1Index < this.end) {
      if (this.heap[child1Index] > this.heap[parentIndex]) {
        ;[this.heap[parentIndex], this.heap[child1Index]] = [
          this.heap[child1Index],
          this.heap[parentIndex],
        ]
        this.heapifyDown(child1Index)
      }
    } else if (child2Index < this.end && child1Index >= this.end) {
      if (this.heap[child2Index] > this.heap[parentIndex]) {
        ;[this.heap[parentIndex], this.heap[child2Index]] = [
          this.heap[child2Index],
          this.heap[parentIndex],
        ]
        this.heapifyDown(child2Index)
      }
    } else {
      if (
        this.heap[parentIndex] < this.heap[child1Index] ||
        this.heap[parentIndex] < this.heap[child2Index]
      ) {
        if (this.heap[child1Index] > this.heap[child2Index]) {
          ;[this.heap[parentIndex], this.heap[child1Index]] = [
            this.heap[child1Index],
            this.heap[parentIndex],
          ]
          this.heapifyDown(child1Index)
        } else {
          ;[this.heap[parentIndex], this.heap[child2Index]] = [
            this.heap[child2Index],
            this.heap[parentIndex],
          ]
          this.heapifyDown(child2Index)
        }
      }
    }
  }
  remove(value: number) {
    return this.deleteEl(value, false)
  }
}

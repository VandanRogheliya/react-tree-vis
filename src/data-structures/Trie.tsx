import React from 'react'
import words from '../AllWords'

const ADD_HIGHLIGHT = true

class nodeTrie {
  isEnd: boolean
  children: { [key: string]: nodeTrie }
  parent: nodeTrie
  key: string
  childrenJSX: JSX.Element[]
  currentJSX: JSX.Element

  constructor(key: string) {
    this.isEnd = false
    this.children = {}
    this.parent = null
    this.key = key
    this.childrenJSX = []
    this.currentJSX = (
      <li key={this.key}>
        <div className="normal">{key ? key : 'Root'}</div>
        {this.childrenJSX.length ? <ul>{this.childrenJSX}</ul> : null}
      </li>
    )
  }

  updateJSX(isAddHighlight = false) {
    this.childrenJSX = []
    const keys = Object.keys(this.children)
    for (let i = 0; i < keys.length; i++) {
      this.childrenJSX.push(this.children[keys[i]].currentJSX)
    }

    this.currentJSX = (
      <li key={this.key}>
        <div
          className={`normal ${this.isEnd ? 'end' : ''} ${
            isAddHighlight ? 'highlight' : ''
          }`}
        >
          {this.key ? this.key : 'Root'}
        </div>
        {this.childrenJSX.length ? <ul>{this.childrenJSX}</ul> : null}
      </li>
    )

    if (this.parent) this.parent.updateJSX(isAddHighlight)
  }
}

class Trie {
  root: nodeTrie
  highlightedTill: nodeTrie

  constructor(num = null) {
    this.root = new nodeTrie(null)
    this.highlightedTill = null
    if (num) this.randomTrie(num)
  }

  insert(word: string): void {
    if (word === '') return
    word = word.trim()
    word = word.toUpperCase()
    let node = this.root
    for (let i = 0; i < word.length; i++) {
      if (!node.children[word[i]]) {
        node.children[word[i]] = new nodeTrie(word[i])
        node.children[word[i]].parent = node
      }
      node = node.children[word[i]]
      if (i === word.length - 1) node.isEnd = true
    }
    node.updateJSX()
  }

  searchWord(word: string): boolean {
    if (word === '') return false
    word = word.trim()
    word = word.toUpperCase()
    let node = this.root
    for (let i = 0; i < word.length; i++) {
      if (!node.children[word[i]]) return false
      node = node.children[word[i]]
      if (i === word.length - 1) return node.isEnd
    }
    return false
  }

  deleteWord(word: string): boolean {
    if (!this.searchWord(word)) return false
    word = word.trim()
    word = word.toUpperCase()
    let node = this.root
    for (let i = 0; i < word.length; i++) {
      node = node.children[word[i]]
    }
    node.isEnd = false

    if (
      Object.keys(node.children).length === 0
      // TODO: test without condition below
      // node.children.constructor === Object
    ) {
      node = node.parent
      for (let i = word.length - 1; i >= 0; i--) {
        if (node === this.root) {
          delete node.children[word[i]]
          break
        }
        if (node.isEnd) {
          delete node.children[word[i]]
          break
        }

        if (Object.keys(node.children).length > 1) {
          delete node.children[word[i]]
          break
        }
        node = node.parent
      }
    }

    node.updateJSX()
  }

  findPrefix(word: string): boolean {
    // removes highlight if any
    if (this.highlightedTill) {
      this.highlightedTill.updateJSX()
      this.highlightedTill = null
    }
    if (word === '') return false
    word = word.trim()
    word = word.toUpperCase()
    let node = this.root
    for (let i = 0; i < word.length; i++) {
      if (!node.children[word[i]]) return false
      node = node.children[word[i]]
    }
    node.updateJSX(ADD_HIGHLIGHT)
    this.highlightedTill = node
    return true
  }

  findAllWords(): string[] {
    const node = this.root
    const allWords = []
    for (let i = 0; i < Object.keys(node.children).length; i++) {
      this.findAllWordsHelper(
        node.children[Object.keys(node.children)[i]],
        allWords,
      )
    }
    return allWords
  }

  findAllWordsHelper(node: nodeTrie, allWords: string[], word = ''): void {
    word += node.key
    if (node.isEnd) allWords.push(word)
    for (let i = 0; i < Object.keys(node.children).length; i++) {
      this.findAllWordsHelper(
        node.children[Object.keys(node.children)[i]],
        allWords,
        word,
      )
    }
  }

  //Inserts num random words to the trie
  randomTrie(num: number): void {
    if (num > 993) num = 993
    const allWords = words['words']
    const upper = 0
    const lower = num * 2 + 10
    const indexOfWordsAdded = new Set()
    for (let i = 0; i < num; i++) {
      let value = Math.floor(Math.random() * (upper - lower + 1)) + lower
      while (indexOfWordsAdded.has(value) || value > 993) {
        value = Math.floor(Math.random() * (upper - lower + 1)) + lower
      }
      indexOfWordsAdded.add(value)
      this.insert(allWords[value])
    }
  }
}

export default Trie

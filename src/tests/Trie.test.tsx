import React from 'react'
import { render } from '@testing-library/react'
import { Trie, useTrie } from '../index'
import words from '../AllWords'
import { renderHook } from '@testing-library/react-hooks'
import { act } from 'react-dom/test-utils'

const WORDS = words.words.slice(0, 100)

describe('trie', () => {
  it('should insert all words', () => {
    const {
      result: {
        current: { ref, insert, getAllWords },
      },
    } = renderHook(() => useTrie())
    // TODO: Investigate why insert does not work without data prop
    render(<Trie ref={ref} data={['test']} />)
    act(() => {
      WORDS.forEach((word) => insert(word))
    })

    const wordsInTrieAfterInsert = new Set(getAllWords())
    WORDS.forEach((word) =>
      expect(wordsInTrieAfterInsert.has(word.toUpperCase())).toBeTruthy(),
    )
  })

  it('should delete all words', () => {
    const {
      result: {
        current: { ref, remove, getAllWords },
      },
    } = renderHook(() => useTrie())
    render(<Trie ref={ref} data={WORDS} />)
    act(() => {
      WORDS.forEach((word) => remove(word))
    })

    const wordsInTrieAfterRemove = getAllWords()
    expect(wordsInTrieAfterRemove.length).toBeFalsy()
  })

  it('should search all words', () => {
    const {
      result: {
        current: { ref, search },
      },
    } = renderHook(() => useTrie())
    render(<Trie ref={ref} data={WORDS} />)

    act(() => {
      WORDS.forEach((word) => expect(search(word)).toBeTruthy())
    })
  })
})

import React from 'react'
import { render, screen } from '@testing-library/react'
import { renderHook, act } from '@testing-library/react-hooks'
import { RedBlackTree, useRedBlackTree } from '..'
import { BINARY_TREE_TYPE } from '../constants'
import '@testing-library/jest-dom'

const DATA = [
  40, 29, 74, 48, 97, 80, 25, 30, 100, 101, 42, 91, 33, 81, 86, 204, 44, 64, 99,
  22, 31, 38, 24, 96, 14, 56, 37, 46, 20, 43,
]

describe('Red black tree', () => {
  it('should display all data', () => {
    render(<RedBlackTree data={DATA} />)
    DATA.forEach((num) => expect(screen.getByText(num)).toBeInTheDocument())
  })

  it('should insert all data', () => {
    // TODO: investigate why insert does not work without data prop
    const { result } = renderHook(() => useRedBlackTree())
    render(<RedBlackTree ref={result.current.ref} data={[-1]} />)
    act(() => {
      DATA.forEach((num) => result.current.insert(num))
    })

    DATA.forEach((num) => expect(screen.getByText(num)).toBeInTheDocument())
  })

  it('should delete all data', () => {
    const { result } = renderHook(() => useRedBlackTree())
    render(<RedBlackTree ref={result.current.ref} data={DATA} />)
    act(() => {
      DATA.forEach((num) => result.current.remove(num))
    })

    DATA.forEach((num) => expect(screen.queryByText(num)).toBeNull())
  })

  it('should generate balanced trees', () => {
    const { result } = renderHook(() => useRedBlackTree())
    render(<RedBlackTree ref={result.current.ref} data={DATA} />)
    expect(result.current.checkTreeType()).toContain(BINARY_TREE_TYPE.BALANCED)
  })
})

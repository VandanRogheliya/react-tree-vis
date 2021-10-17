import React from 'react'
import { renderHook, act } from '@testing-library/react-hooks'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BinarySearchTree, useBinarySearchTree } from '../index'

const DATA = [
  4, 29, 74, 48, 97, 80, 25, 30, 0, 101, 42, 91, 33, 81, 86, 204, 44, 64, 9, 22,
  31, 38, 24, 96, 14, 56, 37, 46, 20, 43,
]

describe('binary search tree', () => {
  it('should display all data', () => {
    render(<BinarySearchTree data={DATA} />)
    DATA.forEach((num) => expect(screen.getByText(num)).toBeInTheDocument())
  })

  it('should insert all data', () => {
    // TODO: investigate why insert does not work without data prop
    const { result } = renderHook(() => useBinarySearchTree())
    render(<BinarySearchTree ref={result.current.ref} data={[-1]} />)
    act(() => {
      DATA.forEach((num) => result.current.insert(num))
    })

    DATA.forEach((num) => expect(screen.getByText(num)).toBeInTheDocument())
  })

  it('should delete all data', () => {
    const { result } = renderHook(() => useBinarySearchTree())
    render(<BinarySearchTree ref={result.current.ref} data={DATA} />)
    act(() => {
      DATA.forEach((num) => result.current.remove(num))
    })

    DATA.forEach((num) => expect(screen.queryByText(num)).toBeNull())
  })
})

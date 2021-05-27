import React, { useRef } from 'react'
import { renderHook, act } from '@testing-library/react-hooks'
import { render, screen } from '@testing-library/react'
import BinarySearchTree from '../components/BinarySearchTree'
import '@testing-library/jest-dom'
import useTree from '../hooks/useTree'

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
    const { result: resultUseRef } = renderHook(() => useRef(null))
    // TODO: investigate why insert does not work without data prop
    render(<BinarySearchTree ref={resultUseRef.current} data={[-1]} />)
    const { result: resultUseTree } = renderHook(() =>
      useTree(resultUseRef.current),
    )
    act(() => {
      DATA.forEach((num) => resultUseTree.current.insert(num))
    })

    DATA.forEach((num) => expect(screen.getByText(num)).toBeInTheDocument())
  })

  it('should delete all data', () => {
    const { result: resultUseRef } = renderHook(() => useRef(null))
    render(<BinarySearchTree ref={resultUseRef.current} data={DATA} />)
    const { result: resultUseTree } = renderHook(() =>
      useTree(resultUseRef.current),
    )
    act(() => {
      DATA.forEach((num) => resultUseTree.current.remove(num))
    })

    DATA.forEach((num) => expect(screen.queryByText(num)).toBeNull())
  })
})

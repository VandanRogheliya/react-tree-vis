import React from 'react'
import { render } from '@testing-library/react'
import BinarySearchTree from '../components/BinarySearchTree'

describe('binary search', () => {
  it('will display data correctly', () => {
    const data = [1, 2, 3]
    render(<BinarySearchTree data={data} />)
  })
})

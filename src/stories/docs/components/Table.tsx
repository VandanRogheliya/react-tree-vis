import React from 'react'
import { TableDataType } from '../../../types'

type Props = {
  data: TableDataType
}

const Table = ({ data: { head, body } }: Props) => (
  <table className="storybook-table">
    <thead>
      <tr>
        {head.map((columnHeading) => (
          <th key={columnHeading}>{columnHeading}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {body.map((row, index) => (
        <tr key={index}>
          {row.map((cell) => (
            <td key={cell} dangerouslySetInnerHTML={{ __html: cell }}></td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
)

export default Table

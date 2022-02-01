import { CSS_VARIABLE_MAP } from './constants'
import { TableDataType } from './types'

export const compareArray = (array1: any[], array2: any[]): boolean => {
  if (array1.length !== array2.length) return false
  for (let i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) return false
  }
  return true
}

export const handleStyleArgTypes = (): Record<string, any> => {
  const argTypes = {}
  for (const [style, { defaultValue }] of Object.entries(CSS_VARIABLE_MAP)) {
    argTypes[style] = {
      control: {
        type: style.includes('Color') ? 'color' : 'text',
      },
      defaultValue,
    }
  }
  return argTypes
}

export const getTreeStylesInTableDataFormat = () => {
  const data: TableDataType = { head: [], body: [] }
  data.head = ['Property', 'Type', 'Description', 'Default']
  data.body = Object.entries(CSS_VARIABLE_MAP).map(
    ([key, { description, defaultValue }]) => [
      `<code>${key}</code>`,
      '<code>string</code>',
      description,
      `<code>${defaultValue}</code>`,
    ],
  )
  return data
}

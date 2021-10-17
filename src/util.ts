import { CSS_VARIABLE_MAP } from './constants'

export const compareArray = (array1: any[], array2: any[]): boolean => {
  if (array1.length !== array2.length) return false
  for (let i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) return false
  }
  return true
}

export const handleStyleArgTypes = () => {
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

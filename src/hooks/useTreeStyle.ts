import { useEffect } from 'react'
import { CSS_VARIABLE_MAP, TREE_ID } from '../constants'
import { TreeStylesType } from '../types'

const useTreeStyle = (treeStyles: TreeStylesType): void => {
  useEffect(() => {
    for (const [style, value] of Object.entries(treeStyles)) {
      document
        .getElementById(TREE_ID)
        .style.setProperty(CSS_VARIABLE_MAP[style].variableName, value)
    }
  }, [treeStyles])
}
export default useTreeStyle

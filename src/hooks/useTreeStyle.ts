import { useEffect } from 'react'
import { CSS_VARIABLE_MAP, TREE_ID } from '../constants'
import { TreeStylesType } from '../types'

const useTreeStyle = (treeStyles: TreeStylesType): void => {
  const handleStyles = () => {
    if (!treeStyles) return
    for (const [style, value] of Object.entries(treeStyles)) {
      document
        .getElementById(TREE_ID)
        .style.setProperty(CSS_VARIABLE_MAP[style].variableName, value)
    }
  }
  useEffect(() => {
    handleStyles()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [treeStyles])
}
export default useTreeStyle

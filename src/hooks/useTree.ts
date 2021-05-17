import React, { useEffect, useState } from 'react'

type InsertFunctionType = (value: number) => void
type DeleteFunctionType = (value: number) => boolean

type ReturnType = {
  insert: InsertFunctionType
  delete: DeleteFunctionType
}

const useTree = (ref: React.MutableRefObject<any>): ReturnType => {
  const [insertFunction, setInsertFunction] = useState<InsertFunctionType>(null)

  const [deleteFunction, setDeleteFunction] = useState<DeleteFunctionType>(null)

  useEffect(() => {
    setInsertFunction(() => (value: number) => ref?.current?.insert(value))
    setDeleteFunction(() => (value: number) => ref?.current?.delete(value))
  }, [])

  return { insert: insertFunction, delete: deleteFunction }
}

export default useTree

export const updateObject = (oldObject, propsToUpdate) => {
  return {
    ...oldObject,
    ...propsToUpdate
  }
}
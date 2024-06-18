const removeNestedEmpty = (initialObj) => {
  const obj = initialObj
  Object.keys(obj).forEach((key) => {
    if (obj[key] === null || obj[key] === 0 || obj[key] === '' || obj[key] === undefined)
      delete obj[key]
    else if (Array.isArray(obj[key]) && obj[key].length === 0) delete obj[key]
    else if (Object.keys(obj[key]).length === 0 && obj[key].constructor === Object) delete obj[key]
    else if (obj[key] && typeof obj[key] === 'object') removeNestedEmpty(obj[key])
  })
  return obj
}
const removeEmpty = (obj) => {
  return removeNestedEmpty(removeNestedEmpty(obj))
}

export const isObj = (obj) => {
  if (obj) return Object.keys(obj).length !== 0 && obj.constructor === Object
  return false
}

export default removeEmpty

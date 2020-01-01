export const validateInput = (value, pattern) => {
  if (pattern.test(value)) {
    return true
  }
  return false
}

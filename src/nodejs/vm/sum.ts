export function curry(targetFn, ...existingArgs) {
  return (...args) => {
    const totalArgs = [...existingArgs, ...args]
    if (totalArgs.length >= targetFn.length) {
      return targetFn(...totalArgs)
    }
    return curry(targetFn, ...totalArgs)
  }
}

const qs = require('qs')

const createURL = (state) => `?${qs.stringify(state)}`

const pathToSearchState = (path) => {
  return path?.includes('?')
    ? qs.parse(path?.substring(path?.indexOf('?') + 1))
    : {}
}

const searchStateToURL = (location, searchState) => {
  const { configure, ...restSearchState } = searchState
  return searchState
    ? `${location.pathname}?${qs.stringify(restSearchState)}`
    : ''
}

export { createURL, pathToSearchState, searchStateToURL }

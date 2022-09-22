const qs = require('qs')

const createURL = (state) => `?${qs.stringify(state)}`

const pathToSearchState = (path) => {
  return path?.includes('?')
    ? qs.parse(path?.substring(path?.indexOf('?') + 1))
    : {}
}

const searchStateToURL = (router, searchState) => {
  console.log(searchState, 'searchState')

  const { configure, ...restSearchState } = searchState
  return searchState
    ? `${router.pathname}?${qs.stringify(restSearchState)}`
    : ''
}

export { createURL, pathToSearchState, searchStateToURL }

import algoliasearchLite from 'algoliasearch/lite'

const fullTextSearch = {
  appId: process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  key: process.env.NEXT_PUBLIC_ALGOLIA_KEY,
}

const indexName = fullTextSearch.indexName // `notes`, `customers`, etc.
const searchKey = fullTextSearch.searchKey

const searchClientLite = algoliasearchLite(
  fullTextSearch.appId,
  fullTextSearch.key,
)

export { indexName, searchKey, searchClientLite }

import algoliasearch from 'algoliasearch';

const fullTextSearch = {
  appId: process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  key: process.env.NEXT_PUBLIC_ALGOLIA_KEY,
}

const indexName = fullTextSearch.indexName // `notes`, `customers`, etc.
const searchKey = fullTextSearch.searchKey

const searchClientLite = algoliasearch(
  fullTextSearch.appId,
  fullTextSearch.key,
)

const algoliaIndex = searchClientLite.initIndex("nfts");

export { indexName, searchKey, searchClientLite, algoliaIndex }

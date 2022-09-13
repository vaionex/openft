const functions = require('firebase-functions')
const algoliasearch = require('algoliasearch')

const ALGOLIA_ID = functions.config().algolia.app
const ALGOLIA_SEARCH_KEY = functions.config().algolia.key

const client = algoliasearch(ALGOLIA_ID, ALGOLIA_SEARCH_KEY)
const index = client.initIndex('nfts')

exports.addToIndex = functions.firestore
  .document('nfts/{nftId}')
  .onCreate((snap) => {
    const data = snap.data()
    const objectID = snap.id

    return index.saveObject({
      ...data,
      objectID,
    })
  })

exports.updateIndex = functions.firestore
  .document('nfts/{nftId}')
  .onUpdate((change) => {
    const newData = change.after.data()
    const objectID = change.after.id

    return index.saveObject({
      ...newData,
      objectID,
    })
  })

exports.deleteFromIndex = functions.firestore
  .document('nfts/{nftId}')
  .onDelete((snap) => index.deleteObject(snap.id))

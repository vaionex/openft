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

    //filter indexable data
    const indexableData = {
      objectID,
      uid: data.uid,
      name: data.name,
      description: data.description,
      imageURL: data.imageURL,
      amount: data.amount,
      artist: data.artist,
      userId: data.userId,
    }

    return index.saveObject(indexableData)
  })

exports.updateIndex = functions.firestore
  .document('nfts/{nftId}')
  .onUpdate((change) => {
    const newData = change.after.data()
    const objectID = change.after.id

    //filter indexable data
    const indexableData = {
      objectID,
      uid: newData.uid,
      name: newData.name,
      description: newData.description,
      imageURL: newData.imageURL,
      amount: newData.amount,
      artist: newData.artist,
      userId: newData.userId,
    }

    return index.saveObject(indexableData)
  })

exports.deleteFromIndex = functions.firestore
  .document('nfts/{nftId}')
  .onDelete((snap) => index.deleteObject(snap.id))

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
      tokenId: data.tokenId,
      name: data.name,
      description: data.description,
      imageURL: data.imageURL,
      amount: data.amount,
      ownerId: data.ownerId,
      minterId: data.minterId,
      offerHex: data.offerHex,
      likes: data.likes,
      timestamp: data.timestamp,
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
      tokenId: newData.tokenId,
      name: newData.name,
      description: newData.description,
      imageURL: newData.imageURL,
      amount: newData.amount,
      ownerId: newData.ownerId,
      minterId: newData.minterId,
      offerHex: newData.offerHex,
      likes: newData.likes,
      timestamp: newData.timestamp,
    }

    return index.saveObject(indexableData)
  })

exports.deleteFromIndex = functions.firestore
  .document('nfts/{nftId}')
  .onDelete((snap) => index.deleteObject(snap.id))

//deploy only specific function
//firebase deploy --only functions:addToIndex,

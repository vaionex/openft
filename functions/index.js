const functions = require('firebase-functions')
const algoliasearch = require('algoliasearch')
const { defineString } = require('firebase-functions/params')

// const ALGOLIA_ID = functions.config().algolia.app
// const ALGOLIA_SEARCH_KEY = functions.config().algolia.key
const ALGOLIA_ID = defineString('NEXT_PUBLIC_ALGOLIA_APP_ID')
const ALGOLIA_SEARCH_KEY = defineString('NEXT_PUBLIC_ALGOLIA_KEY')

const client = algoliasearch(ALGOLIA_ID.value(), ALGOLIA_SEARCH_KEY.value())
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
      amountInBSV: data.amountInBSV,
      ownerId: data.ownerId,
      minterId: data.minterId,
      offerHex: data.offerHex,
      likes: data.likes,
      timestamp: data.timestamp,
      status: data.status,
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
      amountInBSV: newData.amountInBSV,
      ownerId: newData.ownerId,
      minterId: newData.minterId,
      offerHex: newData.offerHex,
      likes: newData.likes,
      timestamp: newData.timestamp,
      status: newData.status,
    }

    return index.saveObject(indexableData)
  })

exports.deleteFromIndex = functions.firestore
  .document('nfts/{nftId}')
  .onDelete((snap) => index.deleteObject(snap.id))

//deploy only specific function
//firebase deploy --only functions:addToIndex,

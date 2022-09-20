import { firebaseAuth, firebaseDb, firebaseStorage } from '@/firebase/init'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  limit,
  orderBy,
  query,
  setDoc,
  startAfter,
  startAt,
  updateDoc,
  where,
  Timestamp,
} from 'firebase/firestore'
import {
  getStorage,
  ref,
  uploadBytes,
  deleteObject,
  getDownloadURL,
  uploadString,
} from 'firebase/storage'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  updatePassword,
  updateEmail,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  sendPasswordResetEmail,
} from 'firebase/auth'
import store from '@/redux/store'
import {
  setAuthenticated,
  setUserData,
  setUserPending,
} from '@/redux/slices/user'
import { clearRegistrationForm } from '@/redux/slices/registration-form'
import {
  createwallet,
  getWalletAddressAndPaymail,
  getwalletDetails,
} from '@/services/relysia-queries'
import apiConfig from '@/config/relysiaApi'
import { storageBucketUrl } from './config'
import { v4 as uuidv4 } from 'uuid'

const firebaseGetUserInfoFromDb = async (id) => {
  try {
    const docRef = doc(firebaseDb, 'users', id)
    const docSnap = await getDoc(docRef)
    return docSnap.data()
  } catch (error) {
    console.error(error)
  }
}

const firebaseIsUsernameExist = async (username) => {
  console.log(username)
  const querySnapshot = await getDocs(collection(firebaseDb, 'users'))
  let isExist

  querySnapshot.forEach((doc) => {
    if (doc.data().username === username) {
      isExist = true
    }
  })

  return isExist
}

const firebaseLogin = async ({ email, password, rememberMe }) => {
  try {
    await setPersistence(
      firebaseAuth,
      rememberMe ? browserLocalPersistence : browserSessionPersistence,
    )
    const auth = await signInWithEmailAndPassword(firebaseAuth, email, password)
    return {
      name: auth.user.displayName,
      uid: auth.user.uid,
      email: auth.user.email,
      accessToken: auth.user.accessToken,
    }
  } catch (error) {
    return { error: 'Incorrect email or password.' }
  }
}

const firebaseRegister = async (data) => {
  const { coverImageForUpload, profileImageForUpload, dataForServer } = data
  const { email, password, username, name } = dataForServer
  try {
    const response = await createUserWithEmailAndPassword(
      firebaseAuth,
      email,
      password,
    )

    const { user } = response

    if (user) {
      store.dispatch(setAuthenticated(!!user))
    }

    const infos = {
      displayName: name,
      name: name,
      email: user.email,
      username: username,
      uid: user.uid,
      createdAt: user.metadata.creationTime,
      profileImage: null,
      coverImage: null,
      socialLinks: {
        facebook: dataForServer.facebook || '',
        instagram: dataForServer.instagram || '',
        website: dataForServer.website || '',
      },
    }
    await setDoc(doc(firebaseDb, 'users', user.uid), infos)
    const userFromDb = await firebaseGetUserInfoFromDb(user.uid).then(
      async (user) => {
        await firebaseUploadUserImage({
          user,
          imageFile: profileImageForUpload.file,
          imageType: 'profileImage',
        })

        await firebaseUploadUserImage({
          user,
          imageFile: coverImageForUpload.file,
          imageType: 'coverImage',
        })
      },
    )

    return userFromDb
  } catch (error) {
    console.log(error)
    return error.message
  }
}

const firebaseLogout = async () => {
  await firebaseAuth.signOut()
  store.dispatch(clearRegistrationForm())
}

const firebaseLoginWithGoogle = async () => {
  try {
    const firebaseGoogleProvider = new GoogleAuthProvider()
    firebaseGoogleProvider.setCustomParameters({
      prompt: 'select_account',
    })
    const userInfo = await signInWithPopup(firebaseAuth, firebaseGoogleProvider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential?.accessToken
        // The signed-in user info.
        const user = result.user
        let fileRef = ref(
          firebaseStorage,
          `profiles/${user.uid}_256x256?alt=media`,
        )
        if (user.photoURL) {
          await uploadBytes(fileRef, user.photoURL)
        }
        const userInfoFromDb = await firebaseGetUserInfoFromDb(user.uid)
        if (!userInfoFromDb) {
          const infos = {
            displayName: user.displayName,
            email: user.email,
            uid: user.uid,
            photoPATH: null,
            createdAt: user.metadata.creationTime,
          }

          await setDoc(doc(firebaseDb, 'users', user.uid), infos)
          store.dispatch(
            setUserData({
              name: user.displayName,
              uid: user.uid,
              email: user.email,
              photoURL: user.photoURL,
            }),
          )
        } else {
          store.dispatch(
            setUserData({
              name: user.displayName,
              uid: user.uid,
              email: user.email,
              photoURL: user.photoURL,
            }),
          )
        }
        return { credential, token, user }
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code
        const errorMessage = error.message
        // The email of the user's account used.
        const email = error.email
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error)
        console.error({ errorCode, errorMessage, email, credential })
      })
    return userInfo?.user
  } catch (error) {
    console.error(error)
  }
}

const firebaseChangePassword = async (user, newPassword) => {
  try {
    await updatePassword(user, newPassword)

    return { success: 'Password change successful.' }
  } catch (error) {
    console.log(error)
    return {
      error: error.message,
    }
  }
}

const firebaseResetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(firebaseAuth, email)
    return { success: true, message: 'Password reset email sent.' }
  } catch (error) {
    return {
      error: true,
    }
  }
}

const firebaseUploadNftImage = async ({ file, userId }) => {
  try {
    const imagePath = `nfts/${userId}/${uuidv4()}`
    const fileRef = ref(firebaseStorage, imagePath)
    const metadata = {
      contentType: `image/${file.ext}`,
    }
    const fileFromStorage = await uploadBytes(fileRef, file, metadata)
    const url = await getDownloadURL(fileRef)
    return { url, fileFromStorage }
  } catch (error) {
    console.log(error)
    return { error: error.message }
  }
}

const firebaseUploadUserImage = async ({ user, imageFile, imageType }) => {
  if (!!user && !!imageFile) {
    const imageFolder = imageType === 'profileImage' ? 'profiles' : 'banners'
    const imagePath = `${imageFolder}/${user.uid}`
    const userInfoFromDb = await firebaseGetUserInfoFromDb(user.uid)
    const userRef = doc(firebaseDb, 'users', user.uid)
    const fileRef = ref(firebaseStorage, imagePath)
    const oldRef = ref(firebaseStorage, userInfoFromDb[imageType])

    try {
      await uploadBytes(fileRef, imageFile)

      const firebaseProfileURL = await getDownloadURL(
        ref(firebaseStorage, imagePath),
      )
      await updateProfile(user, { [imageType]: firebaseProfileURL })

      if (userInfoFromDb[imageType]) {
        deleteObject(oldRef).catch((error) => console.log(error))
      }

      store.dispatch(
        setUserData({
          [imageType]: firebaseProfileURL,
        }),
      )

      await updateDoc(userRef, {
        ...userInfoFromDb,
        [imageType]: firebaseProfileURL,
      })
    } catch (error) {
      console.log(error)
    }
  }
  return { message: 'fail' }
}

const firebaseDeleteImage = async ({ uid, imageType }) => {
  const storage = getStorage()
  const userInfoFromDb = await firebaseGetUserInfoFromDb(uid)
  const imgRef = ref(storage, userInfoFromDb[imageType])
  const userRef = doc(firebaseDb, 'users', uid)

  deleteObject(imgRef).catch((error) => alert(error.message))
  store.dispatch(
    setUserData({
      [imageType]: '',
    }),
  )
  await updateDoc(userRef, {
    ...userInfoFromDb,
    [imageType]: '',
  })
}

const firebaseUpdateProfile = async ({ uid, values }) => {
  try {
    const userInfoFromDb = await firebaseGetUserInfoFromDb(uid)
    const mergedValues = { ...userInfoFromDb, ...values }
    const userRef = doc(firebaseDb, 'users', uid)
    await updateDoc(userRef, mergedValues, uid)
    store.dispatch(setUserData(mergedValues))
    return mergedValues
  } catch (error) {
    console.log(error)
    return { error: error.message }
  }
}

const updateUserEmail = async (user, email) => {
  try {
    await updateEmail(user, email)
    store.dispatch(
      setUserData({
        name: user.displayName,
        uid: user.uid,
        email: email,
      }),
    )

    return { success: 'Email has been updated.' }
  } catch (error) {
    console.log(error)
    return {
      error: error.message,
    }
  }
}

const firebaseGetSingleDoc = async (collectionName, id) => {
  try {
    const docRef = doc(firebaseDb, collectionName, id)
    const docSnap = await getDoc(docRef)
    return docSnap.data()
  } catch (error) {
    console.error(error)
  }
}

const firebaseGetNftProductsCount = async () => {
  try {
    const querySnapshot = await getDocs(collection(firebaseDb, 'nftCounter'))
    const nftCount = querySnapshot.docs[0].data().count

    return nftCount
  } catch (error) {
    console.error(error.message)
  }
}

const firebaseGetNftProducts = async (pageLimit, page) => {
  const start = page > 1 && pageLimit * parseInt(page) - pageLimit - 1

  const nftsRef = collection(firebaseDb, 'nfts')
  const queryRef = query(
    nftsRef,
    orderBy('timestamp', 'desc'),
    limit(pageLimit),
  )

  const collectionSize = await firebaseGetNftProductsCount()
  const documentSnapshots = await getDocs(queryRef)

  const lastVisible = documentSnapshots.docs[start]
  const nextRef = collection(firebaseDb, 'nfts')

  const next = query(
    nextRef,
    orderBy('timestamp', 'desc'),
    startAfter(lastVisible || ''),
    limit(pageLimit),
  )

  const nextSnapshots = await getDocs(next)

  const nfts = nextSnapshots.docs.map((doc) => {
    const nft = doc.data()
    nft.id = doc.id
    return nft
  })

  return { nftsData: JSON.parse(JSON.stringify(nfts)), collectionSize }
}

const firebaseGetFilteredNftProducts = async (pageLimit, page, priceRange) => {
  const { minPrice, maxPrice } = priceRange
  const start = page > 1 && pageLimit * +page - pageLimit - 1

  const nftsRef = collection(firebaseDb, 'nfts')
  const queryRef = query(
    nftsRef,
    orderBy('amount', 'desc'),
    where('amount', '>=', +minPrice),
    where('amount', '<=', +maxPrice),
  )

  const documentSnapshots = await getDocs(queryRef)

  const lastVisible = documentSnapshots.docs[start]
  const nextRef = collection(firebaseDb, 'nfts')

  const next = query(
    nextRef,
    limit(pageLimit),
    orderBy('amount', 'desc'),
    where('amount', '>=', minPrice),
    where('amount', '<=', maxPrice),
    startAfter(lastVisible || ''),
  )

  const nextSnapshots = await getDocs(next)

  const nfts = nextSnapshots.docs.map((doc) => {
    const nft = doc.data()
    nft.id = doc.id
    return nft
  })

  return {
    nftsData: JSON.parse(JSON.stringify(nfts)),
    collectionSize: documentSnapshots.docs.length,
  }
}

const firebaseAddDoc = async (collectionName, obj) => {
  try {
    const docRef = collection(firebaseDb, collectionName)
    const nftDoc = await addDoc(docRef, { ...obj, timestamp: Timestamp.now() })
    await firebaseUpdateDoc(collectionName, nftDoc.id, {
      uid: nftDoc.id,
    })

    return nftDoc
  } catch (error) {
    console.error(error.message)
  }
}

const firebaseUpdateDoc = async (collectionName, id, obj) => {
  try {
    const docRef = doc(firebaseDb, collectionName, id)
    await updateDoc(docRef, obj)
  } catch (error) {
    console.error(error)
  }
}

const firebaseDeleteDoc = async (collectionName, id) => {
  try {
    const docRef = doc(firebaseDb, collectionName, id)
    await deleteDoc(docRef)
  } catch (error) {
    console.error(error)
  }
}

const firebaseGetAuthorizedUser = () => {
  const fn = firebaseAuth.onAuthStateChanged(async (userResponse) => {
    if (userResponse) {
      const user = await firebaseGetUserInfoFromDb(userResponse.uid)
      store.dispatch(setUserData(user))
      store.dispatch(setAuthenticated(true))
      store.dispatch(setUserPending(false))
    } else {
      console.log('not auth')
      store.dispatch(setAuthenticated(false))
      setTimeout(() => {
        store.dispatch(setUserPending(false))
      }, 1000)
    }
  })

  return fn
}

const firebaseOnIdTokenChange = async () => {
  const walletId = '00000000-0000-0000-0000-000000000000'
  const paymail = store.getState().user.paymail
  const address = store.getState().user.address

  firebaseAuth.onIdTokenChanged(async (user) => {
    if (user) {
      apiConfig.defaults.headers.common['authToken'] = user.accessToken
      if (!paymail && !address) {
        const walletData = await getWalletAddressAndPaymail(walletId)
        if (walletData.address && walletData.paymail) {
          getwalletDetails(walletId, store.dispatch)
        } else {
          createwallet('default', store.dispatch)
        }
      }
    }
  })
}

const firebaseGetNftImageUrl = async (userId, fileName, size) => {
  const path = encodeURIComponent(`nfts/${userId}/${fileName}`)

  return new Promise((resolve, reject) => {
    switch (size) {
      case 'small':
        resolve(`${storageBucketUrl}${path}_400x400?alt=media`)
      case 'normal':
        resolve(`${storageBucketUrl}${path}_600x600?alt=media`)
      default:
        reject('Invalid size')
    }
  })
}

export {
  firebaseLogin,
  firebaseRegister,
  firebaseGetAuthorizedUser,
  firebaseLogout,
  firebaseUploadUserImage,
  firebaseUpdateProfile,
  firebaseLoginWithGoogle,
  firebaseChangePassword,
  firebaseResetPassword,
  firebaseGetUserInfoFromDb,
  firebaseGetNftProducts,
  firebaseGetFilteredNftProducts,
  firebaseIsUsernameExist,
  firebaseGetSingleDoc,
  firebaseAddDoc,
  firebaseDeleteDoc,
  firebaseUpdateDoc,
  firebaseDeleteImage,
  firebaseOnIdTokenChange,
  firebaseUploadNftImage,
  firebaseGetNftImageUrl,
}

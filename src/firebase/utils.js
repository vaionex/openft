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
  getMultiFactorResolver,
  updatePassword,
  updateEmail,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  sendPasswordResetEmail,
  sendEmailVerification,
  PhoneAuthProvider,
  PhoneMultiFactorGenerator,
  RecaptchaVerifier,
} from 'firebase/auth'
import store from '@/redux/store'
import {
  setAuthenticated,
  setMnemonicPopup,
  setNotifications,
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
import {
  SendNotification,
  CreateNovuSubscriber,
} from '@/services/novu-notifications'

const notificationObj = {
  'app-notification': {
    itemSold: false,
    purchases: false,
    priceChanges: false,
    itemUpdates: false,
  },
  'email-notification': {
    itemSoldEmail: false,
    purchasesEmail: false,
    priceChangesEmail: false,
    itemUpdatesEmail: false,
  },
}

let rsl
const firebaseLoginMfa = async ({ verificationId, verificationCode }) => {
  const cred = PhoneAuthProvider.credential(verificationId, verificationCode)
  const multiFactorAssertion = PhoneMultiFactorGenerator.assertion(cred)
  // Complete sign-in.
  const { user } = await rsl.resolveSignIn(multiFactorAssertion)
  if (user) {
    apiConfig.defaults.headers.common['authToken'] = user.accessToken
    const userFromDb = await firebaseGetUserInfoFromDb(user.uid, 'users')
    const userNotifications = await firebaseGetSingleDoc(
      'notifications',
      user.uid,
    )
    return {
      user: {
        ...userFromDb,
        ...user.reloadUserInfo,
        accessToken: user.accessToken,
      },
      userNotifications: {
        'app-notification':
          userNotifications && userNotifications['app-notification']
            ? userNotifications['app-notification']
            : null,
        'email-notification':
          userNotifications && userNotifications['email-notification']
            ? userNotifications['email-notification']
            : null,
      },
    }
  }
}

const firebaseLogin = async ({
  email,
  password,
  rememberMe,
  setVerifyID,
  setError,
}) => {
  const recaptchaVerifier = new RecaptchaVerifier(
    '2fa-captcha',
    {
      callback: (verificationId) => setVerifyID(verificationId),
      'expired-callback': () => setVerifyID(null),
      size: 'invisible',
    },
    firebaseAuth,
  )

  const user = await setPersistence(
    firebaseAuth,
    rememberMe ? browserLocalPersistence : browserSessionPersistence,
  ).then(async () => {
    const usr = await signInWithEmailAndPassword(firebaseAuth, email, password)
      .then(async (userCredential) => {
        const user = await firebaseGetUserInfoFromDb(
          userCredential.user.uid,
          'users',
        )
        const userNotifications = await firebaseGetSingleDoc(
          'notifications',
          userCredential.user.uid,
        )
        return {
          user: {
            ...user,
            ...userCredential.user.reloadUserInfo,
            accessToken: userCredential.user.accessToken,
          },
          userNotifications: {
            'app-notification':
              userNotifications && userNotifications['app-notification']
                ? userNotifications['app-notification']
                : null,
            'email-notification':
              userNotifications && userNotifications['email-notification']
                ? userNotifications['email-notification']
                : null,
          },
        }
      })
      .catch(async (error) => {
        console.log(error)
        if (error.code == 'auth/multi-factor-auth-required') {
          const resolver = getMultiFactorResolver(firebaseAuth, error)
          // Ask user which second factor to use.

          const phoneInfoOptions = {
            multiFactorHint: resolver.hints[0],
            session: resolver.session,
          }
          const phoneAuthProvider = new PhoneAuthProvider(firebaseAuth)
          // Send SMS verification code
          phoneAuthProvider
            .verifyPhoneNumber(phoneInfoOptions, recaptchaVerifier)
            .then(function (verificationId) {
              setVerifyID(verificationId)
            })
          rsl = resolver
        } else if (error.code == 'auth/wrong-password') {
          setError('The password is incorrect.')
        } else if (error.code == 'auth/user-not-found') {
          setError('This mail does not exist.')
        }
      })
    return usr
  })
  return user
}

const userCreateNotification = {
  type: 'account_created',
  message: 'Your wallet has been created successfully',
}

const firebaseGetUserInfoFromDb = async (id, collection) => {
  try {
    const docRef = doc(firebaseDb, collection, id)
    const docSnap = await getDoc(docRef)
    return docSnap.data()
  } catch (error) {
    console.error(error)
  }
}

const fireGetNftsFromFavList = async (favArray) => {
  const nftsRef = collection(firebaseDb, 'nfts')
  const queryRef = query(nftsRef, where('tokenId', 'in', [...favArray]))

  const documentSnapshots = await getDocs(queryRef)

  const nfts = documentSnapshots.docs.map((doc) => {
    const nft = doc.data()
    nft.id = doc.id
    return nft
  })

  return {
    nftsData: JSON.parse(JSON.stringify(nfts)),
    collectionSize: documentSnapshots.docs.length,
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
      store.dispatch(setMnemonicPopup(true))
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
    await firebaseAddDocWithID('notifications', notificationObj, user.uid)
    await CreateNovuSubscriber(user.uid, user.email, username)
    await SendNotification(
      user.uid,
      'Your wallet has been created successfully',
    )
    const userFromDb = await firebaseGetUserInfoFromDb(user.uid, 'users').then(
      async (user) => {
        profileImageForUpload &&
          (await firebaseUploadUserImage({
            user,
            imageFile: profileImageForUpload.file,
            imageType: 'profileImage',
          }))

        coverImageForUpload &&
          (await firebaseUploadUserImage({
            user,
            imageFile: coverImageForUpload.file,
            imageType: 'coverImage',
          }))
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
    const provider = new GoogleAuthProvider()
    const { user } = await signInWithPopup(firebaseAuth, provider)
    const userFromDb = await firebaseGetUserInfoFromDb(user.uid, 'users')
    if (userFromDb) {
      const userNotifications = await firebaseGetSingleDoc(
        'notifications',
        user.uid,
      )
      store.dispatch(setAuthenticated(!!user))
      store.dispatch(
        setNotifications({
          'app-notification':
            userNotifications && userNotifications['app-notification']
              ? userNotifications['app-notification']
              : null,
          'email-notification':
            userNotifications && userNotifications['email-notification']
              ? userNotifications['email-notification']
              : null,
        }),
      )
      return userFromDb
    } else {
      const checkUsername = await firebaseIsUsernameExist(
        user.email.split('@')[0],
      )
      const infos = {
        displayName: user.displayName,
        name: user.displayName,
        email: user.email,
        username: checkUsername ? '' : user.email.split('@')[0],
        uid: user.uid,
        createdAt: user.metadata.creationTime,
        profileImage: user.photoURL,
        coverImage: null,
        bio: '',
        jobTitle: '',
        showJobTitle: false,
        socialLinks: {
          facebook: '',
          instagram: '',
          website: '',
        },
      }
      await setDoc(doc(firebaseDb, 'users', user.uid), infos)
      await firebaseAddDocWithID('notifications', notificationObj, user.uid)
      return infos
    }
  } catch (error) {
    return { error: 'Incorrect email or password.' }
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
      contentType: file.type,
    }
    const fileFromStorage = await uploadBytes(fileRef, file, metadata)
    // const url = await getDownloadURL(fileRef)
    return { fileFromStorage }
  } catch (error) {
    console.log('firebaseUploadNftImage error', error)
    return { error: error.message }
  }
}

const firebaseUploadUserImage = async ({ user, imageFile, imageType }) => {
  if (!!user && !!imageFile) {
    const imageFolder = imageType === 'profileImage' ? 'profiles' : 'banners'
    const imagePath = `${imageFolder}/${user.uid}`
    const userInfoFromDb = await firebaseGetUserInfoFromDb(user.uid, 'users')
    const userRef = doc(firebaseDb, 'users', user.uid)
    const fileRef = ref(firebaseStorage, imagePath)
    const oldRef = ref(firebaseStorage, userInfoFromDb[imageType])

    try {
      if (userInfoFromDb[imageType]) {
        await firebaseDeleteImage({ uid: user.uid, imageType })
      }

      await uploadBytes(fileRef, imageFile)

      const firebaseProfileURL = await getDownloadURL(
        ref(firebaseStorage, imagePath),
      )
      if (firebaseProfileURL) {
        await updateProfile(user, { [imageType]: firebaseProfileURL })
        store.dispatch(
          setUserData({
            [imageType]: firebaseProfileURL,
          }),
        )

        await updateDoc(userRef, {
          ...userInfoFromDb,
          [imageType]: firebaseProfileURL,
        })
      }
    } catch (error) {
      console.log('error', error.message)
    }
  }
  return { message: 'fail' }
}

const firebaseDeleteImage = async ({ uid, imageType }) => {
  const storage = getStorage()
  const userInfoFromDb = await firebaseGetUserInfoFromDb(uid, 'users')
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
    const userInfoFromDb = await firebaseGetUserInfoFromDb(uid, 'users')
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

const firebaseGetNftByUsername = async (username) => {
  const nftsRef = collection(firebaseDb, 'nfts')
  const queryRef = query(nftsRef, where('username', '==', username))

  const documentSnapshots = await getDocs(queryRef)

  const nfts = documentSnapshots.docs.map((doc) => {
    const nft = doc.data()
    nft.id = doc.id
    return nft
  })

  return {
    nftsData: JSON.parse(JSON.stringify(nfts)),
    collectionSize: documentSnapshots.docs.length,
  }
}

const firebaseGetUserByPaymail = async (paymail) => {
  try {
    const paymailRef = collection(firebaseDb, 'users')
    const queryRef = query(paymailRef, where('paymail', '==', paymail))
    const documentSnapshots = await getDocs(queryRef)

    const userData = documentSnapshots.docs.map((doc) => {
      const userPaymail = doc.data()
      userPaymail.id = doc.id
      return userPaymail
    })

    return {
      userData: JSON.parse(JSON.stringify(userData)),
    }
  } catch (error) {
    console.error(error)
  }
}

const firebaseGetUserDetailByUsername = async (username) => {
  const nftsRef = collection(firebaseDb, 'users')
  const queryRef = query(nftsRef, where('username', '==', username))

  const documentSnapshots = await getDocs(queryRef)

  const nfts = documentSnapshots.docs.map((doc) => {
    const nft = doc.data()
    nft.id = doc.id
    return nft
  })

  return {
    nftsData: JSON.parse(JSON.stringify(nfts)),
    collectionSize: documentSnapshots.docs.length,
  }
}

const firebaseAddDocWithRandomID = async (collectionName, obj) => {
  try {
    const docRef = collection(firebaseDb, collectionName)
    const dc = await addDoc(docRef, { ...obj, timestamp: Timestamp.now() })
    await firebaseUpdateDoc(collectionName, dc.id, {
      uid: dc.id,
    })

    return dc
  } catch (error) {
    console.error(error.message)
  }
}

const firebaseAddDocWithID = async (collectionName, obj, uid) => {
  try {
    const dc = await setDoc(doc(firebaseDb, collectionName, uid), {
      ...obj,
      timestamp: Timestamp.now(),
    })
      .then(() => true)
      .catch(() => false)
    return dc
  } catch (error) {
    console.log('Error creating document: ', error)
  }
}

const firebaseAddNewNotification = async (uid, obj) => {
  try {
    const notificationRef = collection(
      firebaseDb,
      'notifications',
      uid,
      'notifications',
    )
    const dc = await addDoc(notificationRef, {
      ...obj,
      timestamp: Timestamp.now(),
    })
      .then(() => true)
      .catch(() => false)
    return dc
  } catch (error) {
    console.log(error)
  }
}

const firebaseGetMsgNotification = async (uId) => {
  const snapshot = await getDocs(
    collection(firebaseDb, 'notifications', uId, 'notifications'),
  )
  let notifications = []
  snapshot.docs.forEach((doc) => {
    notifications.push({ id: doc.id, ...doc.data() })
  })
  return notifications
}

const firebaseAddDoc = async (collectionName, uid, obj) => {
  try {
    const dc = await setDoc(doc(firebaseDb, collectionName, uid), {
      ...obj,
      timestamp: Timestamp.now(),
    })
    return dc
  } catch (error) {
    console.error(error.message)
  }
}

const firebaseSetDoc = async (collection, id, obj) => {
  try {
    const docRef = doc(firebaseDb, collection, id)
    await setDoc(docRef, { ...obj, timestamp: Timestamp.now() })
    return true
  } catch (error) {
    console.error('firebaseSetDoc err', error.message)
    return null
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
      apiConfig.defaults.headers.common['authToken'] = userResponse.accessToken
      const user = await firebaseGetUserInfoFromDb(userResponse.uid, 'users')
      const userNotifications = await firebaseGetSingleDoc(
        'notifications',
        userResponse.uid,
      )
      store.dispatch(
        setUserData({
          ...user,
          ...userResponse.reloadUserInfo,
          emailVerified: userResponse.emailVerified,
          phoneNumber: userResponse.phoneNumber,
          accessToken: userResponse.accessToken,
        }),
      )
      store.dispatch(
        setNotifications({
          'app-notification':
            userNotifications && userNotifications['app-notification']
              ? userNotifications['app-notification']
              : null,
          'email-notification':
            userNotifications && userNotifications['email-notification']
              ? userNotifications['email-notification']
              : null,
        }),
      )
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
  firebaseAuth.onIdTokenChanged(async (user) => {
    const paymail = store.getState().wallet.paymail
    const address = store.getState().wallet.address
    if (user && !paymail && !address) {
      apiConfig.defaults.headers.common['authToken'] = user.accessToken
      await getwalletDetails(store.dispatch)
      if (!paymail && !address) {
        const walletData = await getWalletAddressAndPaymail()
        if (walletData.address && walletData.paymail) {
          getwalletDetails(store.dispatch)
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

const firebaseVerifyMail = async () => {
  const actionCodeSettings = {
    url: 'http://localhost:3000/user-settings/mfa',
  }
  const res = await sendEmailVerification(
    firebaseAuth.currentUser,
    actionCodeSettings,
  )
    .then(() => {
      return true
    })
    .catch((err) => {
      console.log(err)
      return false
    })

  return res
}

export {
  firebaseLogin,
  firebaseLoginMfa,
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
  firebaseSetDoc,
  firebaseAddDocWithID,
  firebaseAddNewNotification,
  firebaseGetMsgNotification,
  firebaseAddDocWithRandomID,
  firebaseDeleteDoc,
  firebaseUpdateDoc,
  firebaseDeleteImage,
  firebaseOnIdTokenChange,
  firebaseUploadNftImage,
  firebaseGetNftByUsername,
  firebaseGetNftImageUrl,
  fireGetNftsFromFavList,
  firebaseGetUserDetailByUsername,
  firebaseVerifyMail,
  firebaseGetUserByPaymail,
}

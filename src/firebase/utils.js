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
  collectionGroup,
  getCountFromServer,
  or,
  and,
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
  EmailAuthProvider,
  reauthenticateWithCredential,
  TotpMultiFactorGenerator,
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
  getWallets,
} from '@/services/relysia-queries'
import apiConfig from '@/config/relysiaApi'
import { storageBucketUrl } from './config'
import { v4 as uuidv4 } from 'uuid'
import {
  SendNotification,
  CreateNovuSubscriber,
} from '@/services/novu-notifications'
import { connectToRelysiaSocket } from '@/services/relysia-socket'
import getRandomNum from '@/utils/getRanNum'
import resolverModifier, { resolverVerifier, returnResolver } from '@/utils/resolverModifier'
import { setLastDoc } from '@/redux/slices/nft'
import { uniqBy } from 'lodash'

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
const firebaseLoginMfa = async ({ verificationId, verificationCode, uid }) => {
  if (verificationId && !uid) {

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
  } else if (!verificationId && uid) {
    const totpResolver = returnResolver(rsl?.hints, TotpMultiFactorGenerator.FACTOR_ID)

    const multiFactorAssertion = TotpMultiFactorGenerator.assertionForSignIn(totpResolver.uid, verificationCode);
    // Finalize the sign-in.
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
}

const firebaseLogin = async ({
  email,
  password,
  rememberMe,
  setVerifyID,
  setError,
  setUid,
  setFactors,
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
        const userDetails = await firebaseGetUserDetailByUid(
          userCredential?.user?.uid,
        )
        const userNotifications = await firebaseGetSingleDoc(
          'notifications',
          userCredential.user.uid,
        )
        if (!userDetails.isExist) {
          const infos = {
            displayName: userCredential.user.displayName,
            name: userCredential.user.displayName,
            email: userCredential.user.email,
            username: userCredential.user.displayName,
            uid: userCredential.user.uid,
            createdAt: userCredential.user.metadata.creationTime,
            profileImage: userCredential.user.photoURL,
          }
          await firebaseAddDocWithID('users', infos, userCredential.user.uid)
        }
        return {
          user: {
            ...user,
            ...userCredential.user.reloadUserInfo,
            uid: userCredential.user.uid,
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
        if (error.code == 'auth/multi-factor-auth-required') {
          const resolver = getMultiFactorResolver(firebaseAuth, error)
          const resolvers = resolver.hints
          const totpEnabled = resolverVerifier(
            resolvers,
            TotpMultiFactorGenerator.FACTOR_ID,
          )

          const smsEnabled = resolverVerifier(
            resolvers,
            PhoneMultiFactorGenerator.FACTOR_ID,
          ) // if (resolvers?.length > 1) {
          if (totpEnabled && smsEnabled) {
            setFactors(true)
          } else if (totpEnabled) {
            const totpResolver = returnResolver(
              resolvers,
              TotpMultiFactorGenerator.FACTOR_ID,
            )
            setUid(totpResolver?.uid)
          } else if (smsEnabled) {
            const phoneInfoOptions = {
              multiFactorHint: returnResolver(
                resolvers,
                PhoneMultiFactorGenerator.FACTOR_ID,
              ),
              session: resolver.session,
            }
            const phoneAuthProvider = new PhoneAuthProvider(firebaseAuth)
            // Send SMS verification code
            phoneAuthProvider
              .verifyPhoneNumber(phoneInfoOptions, recaptchaVerifier)
              .then(function (verificationId) {
                setVerifyID(verificationId)
              })
          }
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

const verifyWithSelectedMfa = (selectedOption, setVerifyID, setUid) => {
  if (selectedOption === TotpMultiFactorGenerator.FACTOR_ID) {
    const totpResolver = returnResolver(
      rsl?.hints,
      TotpMultiFactorGenerator.FACTOR_ID,
    )
    setUid(totpResolver?.uid)
  } else if (selectedOption === PhoneMultiFactorGenerator.FACTOR_ID) {
    const recaptchaVerifier = new RecaptchaVerifier(
      '2fa-captcha',
      {
        callback: (verificationId) => setVerifyID(verificationId),
        'expired-callback': () => setVerifyID(null),
        size: 'invisible',
      },
      firebaseAuth,
    )
    const phoneInfoOptions = {
      multiFactorHint: returnResolver(
        rsl?.hints,
        PhoneMultiFactorGenerator.FACTOR_ID,
      ),
      session: rsl.session,
    }
    const phoneAuthProvider = new PhoneAuthProvider(firebaseAuth)
    // Send SMS verification code
    phoneAuthProvider
      .verifyPhoneNumber(phoneInfoOptions, recaptchaVerifier)
      .then(function (verificationId) {
        setVerifyID(verificationId)
      })
  }
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
const firebaseGetUserInfoFromDbByArray = async (
  ids,
  collectionName,
  collectionKey,
) => {
  try {
    const nftsRef = collection(firebaseDb, collectionName)
    const queryRef = query(nftsRef, where(collectionKey, 'in', ids))

    const documentSnapshots = await getDocs(queryRef)

    const users = documentSnapshots.docs.map((doc) => {
      const artist = doc.data()
      return {
        name: artist.name,
        profileImage: artist?.profileImage,
        username: artist?.username,
        userId: artist.uid,
      }
    })
    return users
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
    createUserWithEmailAndPassword(firebaseAuth, email, password).then(
      async ({ user }) => {
        if (user) {
          store.dispatch(setMnemonicPopup(true))
          store.dispatch(setAuthenticated(!!user))
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
          const userFromDb = await firebaseGetUserInfoFromDb(
            user.uid,
            'users',
          ).then(async (user) => {
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
          })
          return userFromDb
        }
      },
    )
  } catch (error) {
    console.log(error)
    return error.message
  }
}

const firebaseLogout = async () => {
  await firebaseAuth.signOut()
  store.dispatch(clearRegistrationForm())
}

const firebaseLoginWithGoogle = async ({ setVerifyID }) => {
  const recaptchaVerifier = new RecaptchaVerifier(
    '2fa-captcha',
    {
      callback: (verificationId) => setVerifyID(verificationId),
      'expired-callback': () => setVerifyID(null),
      size: 'invisible',
    },
    firebaseAuth,
  )

  const provider = new GoogleAuthProvider()
  provider.addScope('email')
  provider.addScope('profile')
  const userInfo = await signInWithPopup(firebaseAuth, provider)
    .then(async (result) => {
      const user = result.user
      apiConfig.defaults.headers.common['authToken'] = user.accessToken
      const userFromDb = await firebaseGetUserInfoFromDb(user.uid, 'users')
      // if (!userFromDb) {
      //   const userEmail = await firebaseGetUserDetailByEmail(
      //     user.providerData[0].email,
      //   )
      //   if (userEmail.isExist) {
      //     const error = {
      //       errorMessage: 'This email is already registered',
      //       code: 409,
      //     }
      //     return { error }
      //   }
      // }
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
        return {
          ...userFromDb,
          ...user.reloadUserInfo,
          emailVerified: user.emailVerified,
          phoneNumber: user.phoneNumber,
          accessToken: user.accessToken,
        }
      } else {
        // await updateEmail(user, user.providerData[0].email)
        // const checkUsername = await firebaseIsUsernameExist(
        //   user?.email?.split('@')[0],
        // )
        const infos = {
          displayName: user?.displayName,
          // name: user?.displayName,
          email: user?.providerData[0]?.email,
          // username: checkUsername
          //   ? user?.providerData[0].email?.split('@')[0] + getRandomNum()
          //   : user?.providerData[0].email?.split('@')[0],
          uid: user?.uid,
          createdAt: user?.metadata?.creationTime,
          isGoogleUser: true,
          googleProfileImg: user?.photoURL,
          // profileImage: null,
          // coverImage: null,
          bio: '',
          jobTitle: '',
          showJobTitle: false,
          socialLinks: {
            facebook: '',
            instagram: '',
            website: '',
          },
        }
        await setDoc(doc(firebaseDb, 'users', user?.uid), infos)
        await firebaseAddDocWithID('notifications', notificationObj, user?.uid)
        return {
          ...infos,
          ...user?.reloadUserInfo,
          emailVerified: user?.emailVerified,
          phoneNumber: user?.phoneNumber,
          accessToken: user?.accessToken,
        }
      }
    })
    .catch(async (error) => {
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
        const errorMessage = error.message
      }
      const errorCode = error?.code
      const errorMessage = error?.message
      // The email of the user's account used.
      const email = error?.email
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error)
      console.error({ errorCode, errorMessage, email, credential })
      return { error }
    })
  return userInfo
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
    const url = await getDownloadURL(fileRef)
    return { fileFromStorage, url }
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
    // const oldRef = ref(firebaseStorage, userInfoFromDb[imageType])

    try {
      if (userInfoFromDb && userInfoFromDb[imageType]) {
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
      console.log('error firebaseUploadUserImage', error.message)
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

const firebaseUpdateProfile = async ({
  uid,
  values,
  isGoogleUser,
  coverImageForUpload,
  profileImageForUpload,
}) => {
  try {
    const userInfoFromDb = await firebaseGetUserInfoFromDb(uid, 'users')
    const mergedValues = { ...userInfoFromDb, ...values }
    const userRef = doc(firebaseDb, 'users', uid)
    await updateDoc(userRef, mergedValues, uid)
    if (isGoogleUser) {
      store.dispatch(setMnemonicPopup(true))
      await CreateNovuSubscriber(uid, values.email, values.username)
      await SendNotification(uid, 'Your wallet has been created successfully')
    }

    if (profileImageForUpload || coverImageForUpload) {
      profileImageForUpload &&
        (await firebaseUploadUserImage({
          user: mergedValues,
          imageFile: profileImageForUpload.file,
          imageType: 'profileImage',
        }))

      coverImageForUpload &&
        (await firebaseUploadUserImage({
          user: mergedValues,
          imageFile: coverImageForUpload.file,
          imageType: 'coverImage',
        }))
    }

    store.dispatch(setUserData(mergedValues))
    if (!isGoogleUser) return mergedValues
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
const firebaseGetCollectionProductsCount = async () => {
  try {
    const nftsRef = collection(firebaseDb, 'nfts')
    const queryRef = query(
      nftsRef,
      or(
        where('ownerId', '==', store.getState()?.user?.currentUser?.uid || ''),
        where('minterId', '==', store.getState()?.user?.currentUser?.uid || ''),
      ),
      // where('status', '==', 'live'),
      // where('ownerId', '!=', store.getState()?.user?.currentUser?.uid || ""),
      // orderBy('ownerId', 'desc'),
      // orderBy('timestamp', 'desc'),
    )
    const snapshot = await getCountFromServer(queryRef)
    return snapshot.data().count
  } catch (error) {
    console.error(error.message)
  }
}
const firebaseGetNftCount = async () => {
  try {
    const nftsRef = collection(firebaseDb, 'nfts')
    const queryRef = query(
      nftsRef,
      where('status', '==', 'live'),
      where('ownerId', '!=', store.getState()?.user?.currentUser?.uid || ''),
      orderBy('ownerId', 'desc'),
      // orderBy('timestamp', 'desc'),
    )
    const snapshot = await getCountFromServer(queryRef)
    return snapshot.data().count
  } catch (error) {
    console.error(error.message)
  }
}
const firebaseGetNftProducts = async (pageLimit, page) => {
  const start = page > 1 && pageLimit * parseInt(page) - pageLimit - 1

  const nftsRef = collection(firebaseDb, 'nfts')
  const queryRef = query(
    nftsRef,
    where('status', '==', 'live'),
    orderBy('timestamp', 'desc'),
    limit(pageLimit),
  )

  const collectionSize = await firebaseGetNftProductsCount()
  const documentSnapshots = await getDocs(queryRef)

  const lastVisible = documentSnapshots.docs[start]
  const nextRef = collection(firebaseDb, 'nfts')

  const next = query(
    nextRef,
    where('status', '==', 'live'),
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
const firebaseGetNfts = async (pageLimit, page) => {
  const start = page > 1 && pageLimit * parseInt(page) - (pageLimit - 1)

  const nftsRef = collection(firebaseDb, 'nfts')
  const queryRef = query(
    nftsRef,
    where('status', '==', 'live'),
    where('ownerId', '!=', store.getState()?.user?.currentUser?.uid || ''),
    orderBy('ownerId', 'desc'),
    limit(pageLimit * page),
  )
  const collectionSize = await firebaseGetNftCount()
  const documentSnapshots = await getDocs(queryRef)

  const lastVisible = documentSnapshots.docs[start - 1]
  let next
  if (lastVisible) {
    next = query(
      nftsRef,
      where('status', '==', 'live'),
      where('ownerId', '!=', store.getState()?.user?.currentUser?.uid || ''),
      orderBy('ownerId', 'desc'),
      startAt(lastVisible || ''),
      limit(pageLimit),
    )
  } else {
    next = query(
      nftsRef,
      where('status', '==', 'live'),
      where('ownerId', '!=', store.getState()?.user?.currentUser?.uid || ''),
      orderBy('ownerId', 'desc'),
      limit(pageLimit),
    )
  }

  const nextSnapshots = await getDocs(next)
  const nfts = nextSnapshots.docs.map((doc) => {
    const nft = doc.data()
    nft.id = doc.id
    return nft
  })

  return { nftsData: nfts, collectionSize }
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

const firebaseGetCollection = async () => {
  const nftsRef = collection(firebaseDb, 'nfts')
  const queryRef = query(
    nftsRef,
    where('ownerId', '==', store.getState()?.user?.currentUser?.uid || ''),
    orderBy('timestamp', 'desc'),
  )

  const documentSnapshots = await getDocs(queryRef)

  const nfts = documentSnapshots.docs.map((doc) => {
    const nft = doc.data()
    nft.id = doc.id
    return nft
  })

  return { nftsData: JSON.parse(JSON.stringify(nfts)) }
}

const firebaseGetPaginatedCollection = async (pageLimit, page) => {
  const start = page > 1 && pageLimit * parseInt(page) - pageLimit - 1

  const nftsRef = collection(firebaseDb, 'nfts')
  const queryRef = query(
    nftsRef,
    where('ownerId', '==', store.getState()?.user?.currentUser?.uid || ''),
    orderBy('timestamp', 'desc'),
    limit(pageLimit * page),
  )

  const collectionSize = await firebaseGetCollectionProductsCount()
  const documentSnapshots = await getDocs(queryRef)

  const lastVisible = documentSnapshots.docs[start]
  console.log(
    '🚀 ~ file: utils.js:892 ~ firebaseGetCollection ~ lastVisible:',
    lastVisible,
  )
  const nextRef = collection(firebaseDb, 'nfts')

  const next = query(
    nextRef,
    where('ownerId', '==', store.getState()?.user?.currentUser?.uid || ''),
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
  console.log('🚀 ~ file: utils.js:914 ~ nfts ~ nfts:', nfts)

  return { nftsData: JSON.parse(JSON.stringify(nfts)), collectionSize }
}
const firebaseGetNftByUsername = async (slug, type) => {
  let queryRef
  const nftsRef = collection(firebaseDb, 'nfts')

  type == 'id'
    ? (queryRef = query(nftsRef, where('ownerId', '==', slug)))
    : (queryRef = query(nftsRef, where('username', '==', slug)))

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
const firebaseGetNftByTokenId = async (tokenId) => {
  const nftsRef = collection(firebaseDb, 'nfts')

  let queryRef = query(nftsRef, where('tokenId', '==', tokenId))

  const documentSnapshots = await getDocs(queryRef)

  const nfts = documentSnapshots.docs.map((doc) => {
    const nft = doc.data()
    nft.id = doc.id
    return nft
  })[0]

  return nfts
}

const firebaseGetUserByPaymail = async (paymail) => {
  try {
    const paymailRef = collection(firebaseDb, 'users')
    let queryRef
    paymail.includes('@')
      ? (queryRef = query(paymailRef, where('paymail', '==', paymail)))
      : (queryRef = query(paymailRef, where('address', '==', paymail)))
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

const firebaseGetUserDetailByUsername = async (slug, type) => {
  let queryRef
  const nftsRef = collection(firebaseDb, 'users')

  type == 'id'
    ? (queryRef = query(nftsRef, where('uid', '==', slug)))
    : (queryRef = query(nftsRef, where('username', '==', slug)))

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

const firebaseGetUserDetailByEmail = async (email) => {
  const docRef = collection(firebaseDb, 'users')
  const queryRef = query(docRef, where('email', '==', email))

  const documentSnapshots = await getDocs(queryRef)

  const userDetail = documentSnapshots.docs.map((doc) => {
    const user = doc.data()
    user.id = doc.id
    return user
  })

  return {
    userData: JSON.parse(JSON.stringify(userDetail)),
    isExist: documentSnapshots.docs.length > 0 ? true : false,
  }
}
const firebaseGetUserDetailByUid = async (uid) => {
  const docRef = collection(firebaseDb, 'users')
  const queryRef = query(docRef, where('uid', '==', uid))

  const documentSnapshots = await getDocs(queryRef)

  const userDetail = documentSnapshots.docs.map((doc) => {
    const user = doc.data()
    user.id = doc.id
    return user
  })

  return {
    userData: JSON.parse(JSON.stringify(userDetail)),
    isExist: documentSnapshots.docs.length > 0 ? true : false,
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
      store.dispatch(
        setUserData({
          ...userResponse.reloadUserInfo,
          emailVerified: userResponse.emailVerified,
          phoneNumber: userResponse.phoneNumber,
          accessToken: userResponse.accessToken,
          uid: userResponse.uid,
        }),
      )
      store.dispatch(setAuthenticated(true))
      store.dispatch(setUserPending(false))
      apiConfig.defaults.headers.common['authToken'] = userResponse.accessToken
      connectToRelysiaSocket(userResponse.accessToken)
      const user = await firebaseGetUserInfoFromDb(userResponse.uid, 'users')
      store.dispatch(
        setUserData({
          ...user,
        }),
      )
      const userNotifications = await firebaseGetSingleDoc(
        'notifications',
        userResponse.uid,
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
      connectToRelysiaSocket(user.accessToken)
      await getWallets()
    }
  })
}
const refreshSignIn = async (password) => {
  const user = firebaseAuth.currentUser
  var oldCredential = EmailAuthProvider.credential(user.email, password)

  var errMessage
  try {
    const { user: userResponse } = await reauthenticateWithCredential(
      user,
      oldCredential,
    )
    store.dispatch(
      setUserData({
        emailVerified: userResponse.emailVerified,
        phoneNumber: userResponse.phoneNumber,
        accessToken: userResponse.accessToken,
        uid: userResponse.uid,
      }),
    )
  } catch (err) {
    errMessage = err
  }
  return errMessage
}
const firebaseGetNftImageUrl = async (userId, fileName, size) => {
  console.log("🚀 ~ file: utils.js:1264 ~ firebaseGetNftImageUrl ~ userId, fileName:", userId, fileName)
  const path = encodeURIComponent(`nfts/${userId}/${fileName}`)

  console.log("🚀 ~ file: utils.js:1266 ~ firebaseGetNftImageUrl ~ path:", path)
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
  console.log('www', window.location.origin)
  const actionCodeSettings = {
    url: `${window.location.origin}/user-settings/mfa`,
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
  firebaseGetUserDetailByEmail,
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
  refreshSignIn,
  verifyWithSelectedMfa,
  firebaseGetNfts,
  firebaseGetUserInfoFromDbByArray,
  firebaseGetCollection,
  firebaseGetNftByTokenId,
  firebaseGetUserDetailByUid,
}

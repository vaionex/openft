import apiConfig from '@/config/relysiaApi'
import {
  updateAddress,
  updateAddressPath0,
  updatePaymail,
  updateBalance,
  updateMnemonic,
  updateWalletHistory,
} from '../redux/slices/wallet'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { firebaseDb } from '@/firebase/init'

export const getMaxNftSize = async () => {
  let snap = await getDoc(
    doc(firebaseDb, 'MusicArtGlobalVariables', 'maxNftSize'),
  )

  return {
    val:
      snap.exists &&
      snap.data() &&
      snap.data().size &&
      Number(snap.data().size) &&
      Math.floor(Number(snap.data().size) * 1048576),
    mb:
      snap.exists &&
      snap.data() &&
      snap.data().size &&
      Number(snap.data().size),
  }
}

export const getMaxNftBgSize = async () => {
  let snap = await getDoc(
    doc(firebaseDb, 'MusicArtGlobalVariables', 'maxNftBgSize'),
  )

  return {
    val:
      snap.exists &&
      snap.data() &&
      snap.data().size &&
      Number(snap.data().size) &&
      Math.floor(Number(snap.data().size) * 1048576),
    mb:
      snap.exists &&
      snap.data() &&
      snap.data().size &&
      Number(snap.data().size),
  }
}

export const updateGlobalVariableValue = async ({
  variableName,
  key,
  value,
}) => {
  await getDoc()
  await updateDoc(doc(firebaseDb, 'MusicArtGlobalVariables', variableName), {
    [key]: Number(value),
  })
}

export const getUserName = async (id) => {
  const docd = await getDoc(doc(firebaseDb, 'MusicArtUsernames', id))
  if (docd.exists) {
    let dataObj = docd.data()
    if (dataObj && dataObj.userNameDisplay) {
      return dataObj.userNameDisplay
    }
  }
  return null
}

export const countDecimals = function (value) {
  if (Math.floor(value) === value) return 0
  return value.toString().split('.')[1]?.length || 0
}

export const getwalletBal = async (walletid, dispatch) => {
  //wallet balance
  await apiConfig
    .get('/v1/metrics', {
      headers: {
        walletID: `${walletid}`,
      },
    })
    .then((res) => {
      let balInBsv =
        res.data &&
          res.data.data &&
          res.data.data.data &&
          res.data.data.data.balance &&
          res.data.data.data.balance / 100000000
          ? res.data.data.data.balance / 100000000
          : 0
      dispatch(updateBalance(balInBsv))
    })
    .catch((err) => {
      console.log('metrics error', err, err.response)
      if (
        err?.response?.data?.data?.msg?.includes('user utxos does not exists')
      ) {
        dispatch(updateBalance(0))
      }
    })
}

export const getwalletDetails = async (walletid, dispatch) => {

  apiConfig
    .get('/v1/address', {
      headers: {
        walletID: `${walletid}`,
      },
    })
    .then((res) => {
      dispatch(updateAddress(res.data.data.address))
      dispatch(updatePaymail(res.data.data.paymail))
    })
    .catch((err) => {
      console.log('address error', err, err.response)
      if (err?.response?.data?.data?.msg?.includes("you don't have 00000000")) {
        createwallet('default', dispatch)
      }
    })

  apiConfig
    .get('/v1/address?path=0', {
      headers: {
        walletID: `${walletid}`,
      },
    })
    .then((res) => {
      dispatch(updateAddressPath0(res.data.data.address))
    })
    .catch((err) => {
      console.log('address error', err, err.response)
    })

  //wallet balance
  getwalletBal(walletid, dispatch)

  //wallet mnemonic
  apiConfig
    .get('/v1/mnemonic', {
      headers: {
        walletID: `${walletid}`,
      },
    })
    .then((res) => {
      dispatch(updateMnemonic(res.data.data.mnemonic))
    })
    .catch((err) => {
      console.log(err)
    })

  //wallet history
  apiConfig
    .get('/v1/history', {
      headers: {
        walletID: `${walletid}`,
      },
    })
    .then((res) => {
      if (res.data.data.histories) {
        dispatch(updateWalletHistory(res.data.data.histories))
      } else {
        dispatch(updateWalletHistory([]))
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

export const getWalletAddressAndPaymail = async (walletId) => {
  let obj = {
    address: null,
    paymail: null,
  }
  return await apiConfig
    .get('/v1/address?path=0', {
      headers: {
        walletID: walletId,
      },
    })
    .then((res) => {
      obj.address = res.data.data.address
      obj.paymail = res.data.data.paymail
      return obj
    })
    .catch((err) => {
      return obj
    })
}

export const createwallet = async (name, dispatch) => {
  apiConfig
    .get('/v1/createWallet', {
      headers: {
        walletTitle: `${name}`,
      },
    })
    .then((res) => {
      getwalletDetails(res.data.data.walletID, dispatch)
      return true
    })
    .catch((err) => {
      console.log('wallet error', err)
    })
}

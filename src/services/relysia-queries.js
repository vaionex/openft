import apiConfig from '@/config/relysiaApi'
import {
  updateAddress,
  updateAllAddresses,
  updateAddressPath0,
  updatePaymail,
  updateBalance,
  updateMnemonic,
  updateWalletHistory,
  updateWalletDataAction,
} from '../redux/slices/wallet'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { firebaseDb } from '@/firebase/init'
import store from '@/redux/store'

const axiosRetry = require('axios-retry')

const walletID = '00000000-0000-0000-0000-000000000000'

export const getwalletBal = async (dispatch) => {
  //wallet balance
  await apiConfig
    .get('/v1/metrics', {
      headers: {
        walletID,
      },
    })
    .then((res) => {
      let balInBsv =
        res?.data?.data?.data?.balance / 100000000
          ? res?.data?.data?.data?.balance / 100000000
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

export const getwalletHistory = async (dispatch) => {
  //wallet history
  console.log('calling history api')
  await apiConfig
    .get('/v1/history', {
      headers: {
        walletID,
      },
    })
    .then((res) => {
      console.log('his res', res)
      if (res.data.data.histories) {
        dispatch(updateWalletHistory([...res.data.data.histories]))
      } else {
        dispatch(updateWalletHistory([]))
      }
    })
    .catch((err) => {
      console.log('his api err', err)
    })
}

export const metricsApiWithoutBody = async () => {
  await apiConfig
    .get('/v1/metrics')
    .then((res) => { })
    .catch((err) => {
      console.log('without body', err)
    })
}
export const getWallets = async () => {
  const defaultWallet = '00000000-0000-0000-0000-000000000000'
  await apiConfig
    .get('/v1/wallets')
    .then((data) => {
      if (
        data &&
        data.data &&
        data.data.data &&
        data.data.data.status === 'success'
      ) {
        const wallet = [...data.data.data.wallets]

        if (wallet.length === 0) {
          createwallet('default', store.dispatch)
          // createNewDefaultWallet(accessToken)
          return
        } else {
          const checkDefault = wallet.find((a) => a.walletID === defaultWallet)
          if (!checkDefault) {
            createwallet('default', store.dispatch)
            return
          }

          store.dispatch(updateWalletDataAction(wallet))

          getwalletDetails(store.dispatch)
        }

      }
    })
    .catch((err, data) => {
      console.log(data)
      console.log(err)
    })
}
export const getwalletDetails = async (dispatch) => {
  apiConfig
    .get('/v1/address', {
      headers: {
        walletID,
      },
    })
    .then((res) => {
      dispatch(updateAddress(res.data.data.address))
      dispatch(updatePaymail(res.data.data.paymail))
    })
    .catch((err) => {
      console.log('address error 3', err, err.response)
      if (err?.response?.data?.data?.msg?.includes("you don't have 00000000")) {
        createwallet('default', dispatch)
      }
    })

  apiConfig
    .get('/v1/allAddresses', {
      headers: {
        walletID,
      },
    })
    .then((res) => {
      dispatch(updateAllAddresses(res.data.data.addressess))
    })
    .catch((err) => {
      console.log('address error 2', err, err.response)
    })

  apiConfig
    .get('/v1/address?path=0', {
      headers: {
        walletID,
      },
    })
    .then((res) => {
      dispatch(updateAddressPath0(res.data.data.address))
    })
    .catch((err) => {
      console.log('address error 1', err, err.response)
    })

  //wallet balance
  getwalletBal(dispatch)

  //wallet mnemonic
  apiConfig
    .get('/v1/mnemonic', {
      headers: {
        walletID,
      },
    })
    .then((res) => {
      dispatch(updateMnemonic(res.data.data.mnemonic))
    })
    .catch((err) => {
      console.log(err)
    })

  //wallet history
  getwalletHistory(dispatch)
}

export const getWalletAddressAndPaymail = async () => {
  let obj = {
    address: null,
    paymail: null,
  }
  return await apiConfig
    .get('/v1/address?path=0', {
      headers: {
        walletID,
      },
    })
    .then((res) => {
      obj.address = res.data.data.address
      obj.paymail = res.data.data.paymail
      return obj
    })
    .catch((err) => {
      console.log('eeeeeeeeeeeer', err)
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
    .then(() => {
      getwalletDetails(dispatch)
      return true
    })
    .catch((err) => {
      console.log('wallet error', err)
    })
}

// nft upload file
export const uploadNFTFile = async (formData, walletId) => {
  if (walletId) {
    apiConfig.defaults.headers.common['walletID'] = walletId
  }

  try {
    let retryApiConfig = apiConfig
    await axiosRetry(apiConfig, {
      retries: 10, // number of retries
      retryDelay: (retryCount) => {
        console.log(`retry attempt: ${retryCount}`)
        return 3000 // time interval between retries
      },
      retryCondition: (error) => {
        console.log('retry error call', error.message, error.response.data)
        // if retry condition is not specified, by default idempotent requests are retried
        return true
      },
    })

    const res = await retryApiConfig.post('/upload', formData)

    // const res = await apiConfig.post('/upload', formData)

    return res.data.data
  } catch (err) {
    console.log('upload error', err, err.response.data)
    return false
  }
}

//minting
export const mintNFT = async (nftDetails) => {
  const { url, description, name, supply, amount, txid } = nftDetails

  const nanoid = require('nanoid').nanoid
  let nanoidPreSymbol = nanoid(6)

  const parameters = {
    name,
    protocolId: 'STAS',
    symbol: nanoidPreSymbol,
    description,
    image: url,
    tokenSupply: supply,
    decimals: 0,
    satsPerToken: 1,
    properties: {
      legal: {
        terms: 'Your token terms and description.',
        licenceId: 'T3ST-2',
      },
      issuer: {
        organisation: 'Vaionex Corp.',
        legalForm: 'Limited',
        governingLaw: 'US',
        issuerCountry: 'US',
        jurisdiction: 'US',
        email: 'info@vaionex.com',
      },
      meta: {
        schemaId: 'NFT1.0/MA',
        website: 'vaionex.com',
        legal: {
          terms:
            '© 2020 TAAL TECHNOLOGIES SEZC\nALL RIGHTS RESERVED. ANY USE OF THIS SOFTWARE IS SUBJECT TO TERMS AND CONDITIONS OF LICENSE. USE OF THIS SOFTWARE WITHOUT LICENSE CONSTITUTES INFRINGEMENT OF INTELLECTUAL PROPERTY. FOR LICENSE DETAILS OF THE SOFTWARE, PLEASE REFER TO: www.taal.com/stas-token-license-agreement',
        },
        media: [
          {
            URI: `B://${txid}`,
            type: 'image/webp',
            altURI: url,
          },
        ],
      },
    },
    splitable: false,
  }

  try {
    const response = await apiConfig.post('/v1/issue', parameters)

    return response.data.data
  } catch (error) {
    console.log('error', error)
    return false
  }
}

//create atomic swap offer
export const createAtomicSwapOffer = async (offerDetails) => {
  const { tokenId, amount, wantedAmount, sn } = offerDetails

  const parameters = {
    dataArray: [
      {
        amount,
        wantedAmount,
        type: 'BSV',
        tokenId: tokenId,
        sn: sn,
      },
    ],
  }

  try {
    let retryApiConfig = apiConfig
    await axiosRetry(apiConfig, {
      retries: 10, // number of retries
      retryDelay: (retryCount) => {
        console.log(`retry attempt: ${retryCount}`)

        try {
          let metricesApi = apiConfig.get('/v1/tokenMetrics')
          console.log('metricesApi', metricesApi.status, metricesApi.data)
        } catch (err) {
          console.log('tokenMetrics err', err)
        }

        return 5000 // time interval between retries
      },
      retryCondition: (error) => {
        console.log('retry error call', error.message, error.response.data)
        // if retry condition is not specified, by default idempotent requests are retried
        return true
      },
    })

    const response = await retryApiConfig.post('/v1/offer', parameters)

    // const response = await apiConfig.post('/v1/offer', parameters)

    return response.data.data
  } catch (error) {
    console.log('err.response', error.response.data, error.message)

    return false
  }
}

//swaping nft
export const swapNft = async (swapHex) => {
  const parameters = {
    dataArray: [
      {
        swapHex: swapHex,
      },
    ],
  }

  try {
    console.log('parameters', JSON.stringify(parameters))
    const response = await apiConfig.post('/v1/swap', parameters)

    return response.data.data
  } catch (error) {
    console.log('swap error', error)
    console.log('err.response', error.response.data, error.message)

    return {
      status: 'error',
      msg: error?.response?.data?.msg
        ? error.response.data.msg
        : 'Nft is not indexed yet, please try later!',
    }
  }
}

export const getUsersData = async (artistId) => {
  const docRef = doc(firebaseDb, 'users', artistId)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return docSnap.data()
  }
}

export const chackBalancefromApi = async () => {
  let balance = 0.0
  let currency = 'USD'
  apiConfig
    .get('v1/balance', {
      headers: {
        walletID,
        currency,
      },
    })
    .then((balanceData) => {
      console.log({ balanceData })
      if (
        balanceData &&
        balanceData.data &&
        balanceData.data.data &&
        balanceData.data.data.status === 'success'
      ) {
        const balance2 = balanceData.data.data.totalBalance
        console.log('returning', balance2.balance)
        balance = balance2.balance
        var bsv =
          balanceData.data.data.coins[0] &&
          balanceData.data.data.coins[0].balance

        console.log({
          dollarBal: balance,
          bsvBal: bsv,
        })
      }
    })
}

export const updatePaymailApi = async (paymail) => {
  try {
    console.log('paymail', paymail)
    let apiRes = await apiConfig.put(
      'v1/paymail',
      {
        newPaymailId: paymail,
      },
      {
        headers: {
          walletID,
        },
      },
    )

    if (apiRes?.data?.data?.status === 'success') {
      if (apiRes?.data?.data?.paymail) {
        store.dispatch(updatePaymail(apiRes.data.data.paymail))
      }

      return {
        ...apiRes.data.data,
      }
    } else {
      throw 'An error occured!'
    }
  } catch (error) {
    console.log('updatePaymail error', error, error?.response?.data)

    return {
      status: 'error',
      msg: error?.response?.data?.data?.msg
        ? error?.response?.data?.data?.msg
        : 'An error occured!',
    }
  }
}

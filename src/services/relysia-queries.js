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
        res?.data?.data?.balance / 100000000
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

export const metricsApiWithoutBody = async () => {
  await apiConfig
    .get('/v1/metrics')
    .then((res) => {})
    .catch((err) => {
      console.log('without body', err)
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
    .then((res) => {
      getwalletDetails(res.data.data.walletID, dispatch)
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
    const axiosRetry = require('axios-retry')

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
  const { tokenId, amount, sn } = offerDetails

  const parameters = {
    dataArray: [
      {
        amount: amount,
        type: 'BSV',
        tokenId: tokenId,
        sn: sn,
      },
    ],
  }

  try {
    const response = await apiConfig.post('/v1/offer', parameters)

    return response.data.data
  } catch (error) {
    console.log('error', error)
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
    const response = await apiConfig.post('/v1/swap', parameters)

    return response.data.data
  } catch (error) {
    console.log('swap error', error)
    console.log('err.response', error.response.data, error.message)

    return {
      status: 'error',
      msg: error?.response?.data?.msg
        ? error.response.data.msg
        : 'An error occured, please try later!',
    }
  }
}

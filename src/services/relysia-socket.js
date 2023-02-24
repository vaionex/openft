import io from 'socket.io-client'
import store from '@/redux/store'
import { updateBalance } from '../redux/slices/wallet'
import { toast } from 'react-toastify'
import { projectServiceId } from '@/config/relysiaApi'
import { getwalletHistory } from './relysia-queries'

var relysiaSocket = null
const relysiaEndpoint = 'api.relysia.com'
const isEmail = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

export const connectToRelysiaSocket = async (token) => {
  console.log('connectToRelysiaSocket', relysiaSocket)
  if (relysiaSocket) {
    return null
  }
  console.log('setting', token)
  relysiaSocket = io(`wss://${relysiaEndpoint}`, {
    auth: {
      authtoken: token,
      serviceid: projectServiceId,
    },
    transports: ['websocket', 'polling'],
  })
  try {
    console.log('socket connection func run')
    relysiaSocket.on('connect', () => {
      console.log('relysiaSocket connected')
    })
    relysiaSocket.on('disconnect', () => {
      console.log('relysiaSocket disconnected')
    })
    relysiaSocket.on('relysia-socket-connected', (message) => {
      console.log('relysia-socket-connected', message)
    })
    // Listen for message and log them as notification arrive
    relysiaSocket.on('notification', function (message) {
      //   console.log('event received notification', message)

      const paymail = store.getState().wallet.paymail
      const addresses = store.getState().wallet.addresses

      let msg = null

      if (message.type === 'BSV') {
        console.log('event received notification', message)
        console.log(paymail, addresses)
        if (
          message.sender === paymail ||
          (addresses && addresses.includes(message.sender))
        ) {
          // msg = `You have sended ${message.amount} satoshis to ${message.receiver}`;
        } else if (
          message.receiver === paymail ||
          addresses.includes(message.receiver)
        ) {
          msg = `You have received ${message.amount} satoshis in your wallet from ${message.sender}`
        }
      } else if (message.type === 'STAS') {
        if (
          !isEmail(message.receiver) &&
          (message.sender === paymail ||
            (addresses && addresses.includes(message.sender)))
        ) {
          // msg = `You have sended ${message.amount} token to ${message.receiver}`;
        } else if (
          !isEmail(message.receiver) &&
          (message.receiver === paymail || addresses.includes(message.receiver))
        ) {
          msg = `You have received ${message.amount} token in your wallet from ${message.sender}`
        }
      }
      console.log('msg', msg)
      if (msg) {
        toast.success(msg)
      }
    })
    // listen for balance and log them on balance arrive
    relysiaSocket.on('balance', async function (balance) {
      console.log('event received balance', balance)

      try {
        if (balance?.totalBalance?.balance && store.getState().wallet.bsvRate) {
          let bsvRate = store.getState().wallet.bsvRate

          let bal = Number((balance.totalBalance.balance / bsvRate).toFixed(8))
          console.log('bal event', bal)
          store.dispatch(updateBalance(bal))
          await getwalletHistory(store.dispatch)
        }
      } catch (error) {
        console.log(error)
      }
    })
    // listen for history and log them on history arrive
    // relysiaSocket.on('history', function (history) {
    //   console.log('event received history', history)
    // })
  } catch (error) {
    console.log('socket error', error)
  }
}

export const disconnectRelysiaSocket = async (id) => {
  try {
    console.log('calling disconnect 2')

    if (relysiaSocket) {
      console.log('disconnecting socket')
      relysiaSocket.off('relysia-socket-connected')
      relysiaSocket.off('notification')
      relysiaSocket.off('balance')
      relysiaSocket.off('history')
      relysiaSocket = null
    }
  } catch (err) {
    relysiaSocket = null

    console.log('disconnect err', err)
  }
}

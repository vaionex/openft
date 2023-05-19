import { useEffect, useState } from 'react'
import apiConfig from '@/config/relysiaApi'
import { useSelector } from 'react-redux'
import userSelector from '@/redux/selectors/user'
import walletSelector from '@/redux/selectors/wallet'

export default function useTokens() {
  const { currentUser, isAuthenticated } = useSelector(userSelector)
  const { walletid } = useSelector(walletSelector)
  const [tokens, setTokens] = useState([])
  const [nextPageToken, setNextPageToken] = useState(null)
  const [loading, setLoading] = useState(true)
  const canLoadMore = Boolean(nextPageToken)
  async function fetchTokens() {
    setLoading(true)
    let headers = { authToken: currentUser.accessToken }
    if (nextPageToken) headers.nextPageToken = nextPageToken
    const {
      data: {
        coins,
        meta: { nextPageToken: nextToken },
      },
    } = (await apiConfig.get('/v2/balance', { headers })).data

    const stasTokens = coins.filter((coin) => coin.protocol !== 'BSV')

    setNextPageToken(nextToken)
    setLoading(false)
    return stasTokens
  }

  async function loadMore() {
    // loadMore fetch more token & nfts if has next page token
    // and merged new chunk of tokens with the existing chunk
    if (canLoadMore) {
      const moretokens = await fetchTokens()
      setTokens((prev) => prev.concat(moretokens))
    }
  }

  useEffect(() => {
    if (!currentUser) return

    // runs on first load of hook and whenever user or
    // currentwalletId changes
    fetchTokens().then((res) => setTokens(res))
  }, [currentUser, walletid])

  return { tokens, canLoadMore, loadMore, loading }
}

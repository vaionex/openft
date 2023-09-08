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
  const [pageTokens, setPageTokens] = useState([])
  let token = apiConfig.defaults.headers.common['authToken']

  const canLoadMore = Boolean(nextPageToken)
  async function fetchTokens() {
    setLoading(true)
    let headers = {}
    let url = `/v2/balance`
    if (walletid) headers.walletID = walletid
    if (pageTokens[pageTokens.length - 1]) {
      url = `/v2/balance?nextPageToken=${pageTokens[pageTokens.length - 1]}`
    }

    const { data: { coins, meta: { nextPageToken: nextToken } } = {} } = (
      await apiConfig.get(url, { headers })
    )?.data

    setNextPageToken(nextToken)
    setPageTokens((e) => [...e, nextToken])
    setLoading(false)
    return coins
  }

  async function loadMore() {
    // loadMore fetches more tokens & nfts if there is a next page token
    // and merges the new chunk of tokens with the existing chunk
    const moreTokens = await fetchTokens()
    let stasTokens = moreTokens.filter((coin) => coin.protocol !== 'BSV')
    setTokens((prevTokens) => [...prevTokens, ...stasTokens])
  }

  useEffect(() => {
    if (!currentUser || !token) return

    // runs on first load of hook and whenever user or
    // currentwalletId changes
    fetchTokens().then((res) => {
      let stasTokens = res.filter((coin) => coin.protocol !== 'BSV')
      return setTokens(stasTokens)
    })
  }, [currentUser, walletid])

  return {
    tokens,
    canLoadMore,
    loadMore,
    loading,
    pageTokens,
    setPageTokens,
    fetchTokens,
  }
}

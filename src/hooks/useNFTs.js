import { useEffect, useState } from 'react'
import useTokens from './useTokens'

export default function useNFTs() {
  const { tokens, ...rest } = useTokens()
  const [nfts, setNfts] = useState([])

  useEffect(() => {
    const updatedNfts = tokens.filter(
      ({ splittable, sn }) => !splittable && sn !== 0,
    )
    setNfts(updatedNfts)
  }, [tokens])

  return { nfts, ...rest }
}

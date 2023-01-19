import React, { useState } from 'react'
import PropTypes from 'prop-types'

import ModalNFTSell from '../../modal-nft-sell'
import TokenInfoCard from '../token-info-card'
import { firebaseDb } from '@/firebase/init'
import { doc, getDoc } from 'firebase/firestore'

const TokenCard = ({ data, type, idx }) => {
  const [tokenInfo, setTokenInfo] = useState(null)
  let [isOpen, setIsOpen] = useState(false)
  const handleModal = async () => {
    const { tokenId } = data
    if (tokenId) {
      const docRef = doc(firebaseDb, 'nfts', tokenId)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists() && docSnap.data()) {
        setTokenInfo(docSnap.data())
      }
    }
    setIsOpen(true)
  }
  const isInFirstThree = idx < 3
  return (
    <>
      <TokenInfoCard
        data={data}
        type={type}
        isInFirstThree={isInFirstThree}
        isPrivate={true}
        handleModal={handleModal}
      />
      <ModalNFTSell
        data={data}
        tokenInfo={tokenInfo}
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false)
          setTokenInfo(null)
        }}
      />
    </>
  )
}

TokenCard.defaultProps = {
  data: {},
  type: 'default',
}

TokenCard.propTypes = {
  data: PropTypes.object.isRequired,
  type: PropTypes.oneOf(['default', 'list', 'carousel']),
}

export default TokenCard

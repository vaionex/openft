import React, { useState } from 'react'
import PropTypes from 'prop-types'

import ModalNFTSell from '../../modal-nft-sell'
import TokenInfoCard from '../token-info-card'

const TokenCard = ({ data, idx }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <TokenInfoCard
        data={data}
        type="list"
        isInFirstThree={idx < 3}
        isPrivate={true}
        handleModal={() => setIsOpen(true)}
      />
      <ModalNFTSell
        data={data}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
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

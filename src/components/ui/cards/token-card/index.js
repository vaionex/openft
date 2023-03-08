import React, { useState } from 'react'
import PropTypes from 'prop-types'

import ModalNFTSell from '../../modal-nft-sell'
import TokenInfoCard from '../token-info-card'
import ModalConfirm from '../../modal-confirm'
import { doc, writeBatch } from 'firebase/firestore'
import { firebaseDb } from '@/firebase/init'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { setDelist } from '@/redux/slices/user'

const TokenCard = ({ data, idx }) => {
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenDelist, setIsOpenDelist] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isLive, setIslive] = useState(data?.status === 'live')

  const handleToggleIsLive = async () => {
    try {
      setIsLoading(true)
      //updating database
      console.log('updating database')

      const batch = writeBatch(firebaseDb)
      const tokenRef = doc(firebaseDb, 'nfts', data?.tokenId)

      const tokenObj = {
        status: 'private',
      }

      batch.update(tokenRef, tokenObj)
      await batch.commit()

      // updating status
      setIslive(false)
      setIsOpenDelist(false)
      setIsLoading(false)
      dispatch(setDelist(true))
      toast.success('NFT Delist Successfully!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
    } catch (err) {
      setIsLoading(false)
      console.log('err', err)
    }
  }

  return (
    <>
      <TokenInfoCard
        data={data}
        type="list"
        isInFirstThree={idx < 3}
        isPrivate={true}
        handleModal={() => setIsOpen(true)}
        handleDelistModal={() => setIsOpenDelist(true)}
        isLive={isLive}
      />
      <ModalNFTSell
        data={data}
        isOpen={isOpen}
        setIslive={setIslive}
        onClose={() => setIsOpen(false)}
      />
      <ModalConfirm
        isOpen={isOpenDelist}
        button1Text={'Confirm'}
        button2Text={'Cancel'}
        title={'Are you sure you want'}
        secondTitle={'to Delist this NFT?'}
        content={
          <TokenInfoCard data={data} type="list" isInFirstThree={true} />
        }
        onClose={() => setIsOpenDelist(false)}
        onConfirm={handleToggleIsLive}
        isLoadingConfirmBtn={isLoading}
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

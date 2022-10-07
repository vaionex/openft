import React, { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { firebaseDb } from '@/firebase/init'

const useArtistData = (artistId) => {
  const [artistData, setartistData] = useState(null)

  useEffect(() => {
    if (artistId) {
      getData()
    }
  }, [artistId])

  const getData = async () => {
    const docRef = doc(firebaseDb, 'users', artistId)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      setartistData(docSnap.data())
    }
  }

  return artistData
}

export default useArtistData

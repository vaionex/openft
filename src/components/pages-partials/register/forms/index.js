import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

import YourDetails from './details'
import ChoosePassword from './choose-password'
import UploadPhoto from './upload-photo'
import AddSocials from './socials'

const components = {
  '/register': <YourDetails />,
  'choose-password': <ChoosePassword />,
  'upload-photo': <UploadPhoto />,
  'add-socials': <AddSocials />,
}

const Forms = () => {
  const router = useRouter()
  const formName = router.query.form ?? router.pathname

  useEffect(() => {
    if (!formName || !components[formName]) {
      router.replace('/')
    }
  }, [])
  if (formName && components[formName]) {
    return components[formName]
  } else {
    return null
  }
}

export default Forms

import React from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import CircleSteps from './circle'
import LineSteps from './line'
import BoxSteps from './box'

const steps = [
  {
    id: '01',
    name: 'Your details',
    description: 'Please provide your name and email',
    href: '/register',
    status: 'complete',
  },
  {
    id: '02',
    name: 'Choose a password',
    description: 'Choose a secure password',
    href: '/register?form=choose-password',
    status: 'current',
  },
  {
    id: '03',
    name: 'Upload your photo',
    description: 'Beautify your profile',
    href: '/register?form=upload-photo',
    status: 'upcoming',
  },
  {
    id: '04',
    name: 'Add your socials',
    description: 'Let people know more about you',
    href: '/register?form=add-socials',
    status: 'upcoming',
  },
]

const paths = {
  '/register': '/register',
  'choose-password': '/register?form=choose-password',
  'upload-photo': '/register?form=upload-photo',
  'add-socials': '/register?form=add-socials',
}

const StepsContainer = ({ stepsType }) => {
  const [lineStepList, setLineStepList] = useState(steps)
  const [circleStepList, setCircleStepList] = useState(steps)
  const router = useRouter()
  const formName = router.query.form ?? router.pathname

  useEffect(() => {
    if (!paths[formName]) {
      router.replace('/')
    } else {
      const newLineSteps = lineStepList.reduce((prev, current) => {
        if (current.href === paths[formName]) {
          return [
            ...prev,
            {
              ...current,
              status: 'current',
            },
          ]
        } else {
          return [
            ...prev,
            {
              ...current,
              status: 'upcoming',
            },
          ]
        }
      }, [])

      const newCircleSteps = circleStepList.reduce((prev, current) => {
        if (current.href === paths[formName]) {
          return [
            ...prev,
            {
              ...current,
              status: 'current',
            },
          ]
        } else {
          return [
            ...prev,
            {
              ...current,
              status: 'upcoming',
            },
          ]
        }
      }, [])
      setCircleStepList(newCircleSteps)
      setLineStepList(newLineSteps)
    }
  }, [formName])
  if (stepsType === 'line') {
    return <LineSteps list={lineStepList} />
  } else if (stepsType === 'box') {
    return <BoxSteps list={circleStepList} />
  } else {
    return <CircleSteps list={circleStepList} />
  }
}

export default StepsContainer

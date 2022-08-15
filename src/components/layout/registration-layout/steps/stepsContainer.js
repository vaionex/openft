import React from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import LineSteps from './line'
import BoxSteps from './box'
import CircleSteps from './circle'

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
    href: '/register/choose-password',
    status: 'current',
  },
  {
    id: '03',
    name: 'Upload your photo',
    description: 'Beautify your profile',
    href: '/register/upload-photo',
    status: 'upcoming',
  },
  {
    id: '04',
    name: 'Add your socials',
    description: 'Let people know more about you',
    href: '/register/add-socials',
    status: 'upcoming',
  },
]

const paths = {
  register: '/register',
  'choose-password': '/register/choose-password',
  'upload-photo': '/register/upload-photo',
  'add-socials': '/register/add-socials',
}

const StepsContainer = ({ stepsType }) => {
  const [lineStepList, setLineStepList] = useState(steps)
  const [circleStepList, setCircleStepList] = useState(steps)
  const router = useRouter()
  const formName = router.pathname.split('/')[2] ?? 'register'

  const createSteps = (steps) => {
    return steps.reduce((prev, current) => {
      if (current.href === paths[formName]) {
        return [...prev, { ...current, status: 'current' }]
      } else {
        return [...prev, { ...current, status: 'upcoming' }]
      }
    }, [])
  }

  useEffect(() => {
    if (!paths[formName]) {
      router.replace('/')
    } else {
      const newLineSteps = createSteps(lineStepList)
      const newCircleSteps = createSteps(circleStepList)

      setCircleStepList(newCircleSteps)
      setLineStepList(newLineSteps)
    }
  }, [formName])

  if (stepsType === 'line') return <LineSteps list={lineStepList} />
  if (stepsType === 'box') return <BoxSteps list={circleStepList} />
  if (stepsType === 'circle') return <CircleSteps list={circleStepList} />
}

export default StepsContainer

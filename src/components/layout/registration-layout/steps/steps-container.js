import React from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import LineSteps from './line'
import BoxSteps from './box'
import CircleSteps from './circle'

const steps = [
  {
    id: 1,
    name: 'Your details',
    description: 'Please provide your name and email',
    href: '/register',
    status: 'current',
  },
  {
    id: 2,
    name: 'Choose a password',
    description: 'Choose a secure password',
    href: '/register/choose-password',
    status: 'upcoming',
  },
  {
    id: 3,
    name: 'Upload your photo',
    description: 'Beautify your profile',
    href: '/register/upload-photo',
    status: 'upcoming',
  },
  {
    id: 4,
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
  const [stepList, setStepList] = useState(steps)
  const [stepCount, setStepCount] = useState(1)
  const router = useRouter()

  useEffect(() => {
    const step = steps.find((step) => step.href === router.pathname)
    setStepCount(step.id)
  }, [router.pathname])

  useEffect(() => {
    const newStepList = steps.map((step) => {
      return {
        ...step,
        status:
          step.id === stepCount
            ? 'current'
            : step.id < stepCount
            ? 'complete'
            : 'upcoming',
      }
    })

    setStepList(newStepList)
  }, [stepCount])

  if (stepsType === 'line') return <LineSteps list={stepList} />
  if (stepsType === 'box') return <BoxSteps list={stepList} />
  if (stepsType === 'circle') return <CircleSteps list={stepList} />
}

export default StepsContainer

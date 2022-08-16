import React from 'react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import LineSteps from './line'
import BoxSteps from './box'
import CircleSteps from './circle'
import { useSelector } from 'react-redux'
import registrationFormSelector from '@/redux/selectors/registration-form'

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

const StepsContainer = ({ stepsType }) => {
  const [stepList, setStepList] = useState(steps)
  const { currentStep } = useSelector(registrationFormSelector)
  const router = useRouter()

  useEffect(() => {
    const newStepList = steps.map((step) => {
      return {
        ...step,
        status:
          step.id === currentStep
            ? 'current'
            : step.id < currentStep
            ? 'completed'
            : 'upcoming',
      }
    })
    setStepList(newStepList)
  }, [currentStep])

  useEffect(() => {
    const current = steps.find((step) => step.id === currentStep)
    if (current.href !== router.pathname) {
      router.push(current.href)
    }
  }, [currentStep])

  if (stepsType === 'line') return <LineSteps list={stepList} />
  if (stepsType === 'box') return <BoxSteps list={stepList} />
  if (stepsType === 'circle') return <CircleSteps list={stepList} />
}

export default StepsContainer

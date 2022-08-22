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
    href: '/register?step=choose-password',
    status: 'upcoming',
  },
  {
    id: 3,
    name: 'Upload your photo',
    description: 'Beautify your profile',
    href: '/register?step=upload-photo',
    status: 'upcoming',
  },
  {
    id: 4,
    name: 'Add your socials',
    description: 'Let people know more about you',
    href: '/register?step=add-socials',
    status: 'upcoming',
  },
]

const StepsContainer = ({ paths, stepsType }) => {
  const router = useRouter()
  const currentStep = router.query.step
  const [stepList, setStepList] = useState(steps)

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

  switch (stepsType) {
    case 'line':
      return <LineSteps list={stepList} />
    case 'box':
      return <BoxSteps list={stepList} />
    case 'circle':
      return <CircleSteps list={stepList} />
    default:
      return null
  }
}

export default StepsContainer

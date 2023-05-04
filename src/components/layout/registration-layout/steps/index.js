import React from 'react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import LineSteps from './line'
import BoxSteps from './box'
import CircleSteps from './circle'
import { useDispatch, useSelector } from 'react-redux'
import registrationFormSelector from '@/redux/selectors/registration-form'
import { setStep } from '@/redux/slices/registration-form'

const steps = [
  {
    id: 1,
    name: 'Your details',
    description: 'Please provide your name and email',
    href: '/register?step=1',
    status: 'current',
  },
  {
    id: 2,
    name: 'Choose a password',
    description: 'Choose a secure password',
    href: '/register?step=2',
    status: 'upcoming',
  },
  {
    id: 3,
    name: 'Upload your photo',
    description: 'Beautify your profile',
    href: '/register?step=3',
    status: 'upcoming',
  },
  // {
  //   id: 4,
  //   name: 'Add your socials',
  //   description: 'Let people know more about you',
  //   href: '/register?step=4',
  //   status: 'upcoming',
  // },
]

const RegistrationSteps = ({ stepsType }) => {
  const stepsEls = [1, 2, 3, 4]
  const router = useRouter()
  const dispatch = useDispatch()
  const [stepList, setStepList] = useState(steps)
  const {
    step: currentStep
  } = useSelector(registrationFormSelector)
 

  useEffect(() => {
    if (!stepsEls.includes(+currentStep)) {
      router.push('/')
      return
    }
    const newStepList = steps.map((step) => {
      return {
        ...step,
        status:
          step.id === +currentStep
            ? 'current'
            : step.id < +currentStep
            ? 'completed'
            : 'upcoming',
      }
    })
    setStepList(newStepList)
  }, [currentStep, router])

  const goTo = (step) => {
    dispatch(setStep(step))
  }

  switch (stepsType) {
    case 'line':
      return <LineSteps list={stepList} goTo={goTo} />
    case 'box':
      return <BoxSteps list={stepList} goTo={goTo} />
    case 'circle':
      return <CircleSteps list={stepList} goTo={goTo} />
    default:
      return null
  }
}

export default RegistrationSteps

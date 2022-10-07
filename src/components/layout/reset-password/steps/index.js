import React from 'react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import LineSteps from './line'
import BoxSteps from './box'
import CircleSteps from './circle'

const steps = [
  {
    id: 1,
    name: 'Reset password',
    description: 'Create reset password link',
    href: '/reset-password?step=1',
    status: 'current',
  },
  {
    id: 2,
    name: 'New password',
    description: 'Create your new password',
    href: '/reset-password?step=2',
    status: 'upcoming',
  },
]

const ResetPasswordSteps = ({ stepsType }) => {
  const stepsEls = [1, 2, 3]
  const router = useRouter()
  const currentStep = router.query.step ?? 1
  const [stepList, setStepList] = useState(steps)

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
    router.push(`${router.pathname}?step=${step}`)
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

export default ResetPasswordSteps

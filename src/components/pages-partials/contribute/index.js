import SharedLayout from '@/components/layout/shared-layout'
import Image from 'next/image'
import React from 'react'
import ContributeFormSection from './contribute-form'

const ContributeMain = () => {
  return (
    <SharedLayout title="Contribute">
      <ContributeFormSection />
    </SharedLayout>
  )
}

export default ContributeMain

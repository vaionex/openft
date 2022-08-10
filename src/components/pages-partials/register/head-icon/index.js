import React from 'react'
import NextLink from 'next/link'
import { RegisterLogo } from '@/components/common/svgs'

const Logo = () => {
  return (
    <>
      <NextLink href="/">
        <a className="inline-block mt-10">
          <span className="sr-only">Workflow</span>
          <RegisterLogo />
        </a>
      </NextLink>
    </>
  )
}

export default Logo

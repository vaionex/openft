import Head from 'next/head'
import React from 'react'
import ResetPasswordSide from './side'
import NextLink from 'next/link'
import { Logo } from '@/components/common/svgs'
import ResetPasswordSteps from './steps'

const ResetPasswordLayout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Openft | Reset Password</title>
      </Head>

      <div className="grid min-h-screen grid-cols-12">
        <ResetPasswordSide />

        <div className="col-span-12 md:col-span-8">
          <div className="px-4 mx-auto md:hidden sm:px-6 lg:px-8">
            <NextLink href="/">
              <a className="inline-block mt-10">
                <span className="sr-only">Openft Logo</span>
                <Logo />
              </a>
            </NextLink>
          </div>

          <div className="flex flex-col h-full py-12 sm:gap-8 sm:px-6 lg:px-8">
            <ResetPasswordSteps stepsType="box" />

            {children}
            <div className="flex flex-col justify-end pt-10 sm:pt-0">
              <ResetPasswordSteps stepsType="line" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ResetPasswordLayout

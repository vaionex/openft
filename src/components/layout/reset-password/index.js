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
        <title>Nftana | Reset Password</title>
      </Head>

      <div className="grid min-h-screen grid-cols-12">
        <ResetPasswordSide />

        <div className="col-span-12 md:col-span-8">
          <div className="px-4 mx-auto md:hidden sm:px-6 lg:px-8">
            <NextLink href="/" className="outline-none inline-block">
              <div className="flex items-center cursor-pointer mt-10">
                <span className="sr-only">Nftana Logo</span>
                <div className="w-5 h-5">
                  <img
                    className="h-5 pb-0.5 flex-none"
                    src="https://www.relysia.com/_next/static/media/RelysiaLogo_1.4aba7d51.svg"
                    alt="Relysia"
                  />
                </div>
                <p className="pl-2 font-semibold text-xl text-blue-900">
                  Nftana
                </p>
              </div>
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

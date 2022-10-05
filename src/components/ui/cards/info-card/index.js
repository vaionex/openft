import { ArrowNarrowRightIcon } from '@heroicons/react/outline'
import { ArrowRightIcon } from '@heroicons/react/solid'
import NextLink from 'next/link'

const InfoCard = ({ info }) => {
  return (
    <div className="pt-6 overflow-hidden rounded-lg">
      <div className="flow-root rounded-lg bg-card">
        <div className="px-6 pb-8 -mt-6">
          <div>
            <info.icon width={48} height={48} aria-hidden="true" />
          </div>
          <h3 className="mt-8 text-lg font-semibold tracking-tight font-base">
            {info.name}
          </h3>
          <p className="mt-5 text-base text-gray-400">{info.description}</p>
        </div>
        <div className="p-6 bg-color-dark-2">
          {/* learn more */}
          <NextLink href="#">
            <a className="flex items-center text-sm hover:underline">
              Learn more{' '}
              <ArrowRightIcon width={16} height={16} className="ml-2" />
            </a>
          </NextLink>
        </div>
      </div>
    </div>
  )
}

export default InfoCard
